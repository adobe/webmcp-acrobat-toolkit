/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiProvider } from './gemini-provider.js';
import { OllamaProvider } from './ollama-provider.js';
import { GatewayProvider } from './gateway-provider.js';
import { initGeminiLive } from './gemini-live.js';
import { appendChatEvent, clearChat, showTypingIndicator, hideTypingIndicator } from './chat-ui.js';
import { hasA2ui, stripA2ui, renderA2ui, renderChoice, parseNeedsChoice, renderReview, parseNeedsReview, toResultText, A2UI_INSTRUCTION } from './a2ui-chat.js';

const statusDiv = document.getElementById('status');
const tbody = document.getElementById('tableBody');
const thead = document.getElementById('tableHeaderRow');
const copyToClipboard = document.getElementById('copyToClipboard');
const copyAsScriptToolConfig = document.getElementById('copyAsScriptToolConfig');
const copyAsJSON = document.getElementById('copyAsJSON');
const toolNames = document.getElementById('toolNames');
const inputArgsText = document.getElementById('inputArgsText');
const executeBtn = document.getElementById('executeBtn');
const toolResults = document.getElementById('toolResults');
const userPromptText = document.getElementById('userPromptText');
const promptBtn = document.getElementById('promptBtn');
const traceBtn = document.getElementById('traceBtn');
const resetBtn = document.getElementById('resetBtn');
const apiKeyBtn = document.getElementById('apiKeyBtn');
const promptResults = document.getElementById('promptResults');
const advancedSection = document.getElementById('advancedSection');
const micBtn = document.getElementById('micBtn');

// Debug mode: with ?debug=true on the panel URL (or debug flag in localStorage), reveal the
// original inspector UI — the registered-tools table, the manual Tool dropdown + Execute, the raw
// trace, and dev buttons — for testing. The clean chat is the default otherwise.
const DEBUG_UI = new URLSearchParams(location.search).get('debug') === 'true'
  || localStorage.debugUI === 'true';
if (DEBUG_UI) {
  document.body.classList.add('debug-mode');
  document.querySelectorAll('.debug-only').forEach((el) => el.classList.remove('hidden-section'));
}

// Inject content script first.
(async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id, { action: 'LIST_TOOLS' });
  } catch (error) {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = error;
    statusDiv.hidden = false;
    copyToClipboard.hidden = true;
  }
})();

let currentTools;

let userPromptPendingId = 0;
let lastSuggestedUserPrompt = '';

// Listen for the results coming back from content.js
chrome.runtime.onMessage.addListener(async ({ message, tools, url }, sender) => {
  if (!message && !tools) return;
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (sender.tab && sender.tab.id !== tab.id) return;

  tbody.innerHTML = '';
  thead.innerHTML = '';
  toolNames.innerHTML = '';

  statusDiv.textContent = message;
  statusDiv.hidden = !message;

  const haveNewTools = JSON.stringify(currentTools) !== JSON.stringify(tools);
  currentTools = tools;

  if (!tools || tools.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="100%"><i>No tools registered yet in ${url || tab.url}</i></td>`;
    tbody.appendChild(row);
    inputArgsText.value = '';
    inputArgsText.disabled = true;
    toolNames.disabled = true;
    executeBtn.disabled = true;
    copyToClipboard.hidden = true;
    return;
  }

  inputArgsText.disabled = false;
  toolNames.disabled = false;
  executeBtn.disabled = false;
  copyToClipboard.hidden = false;

  const keys = Object.keys(tools[0]);
  keys.forEach((key) => {
    const th = document.createElement('th');
    th.textContent = key;
    thead.appendChild(th);
  });

  tools.forEach((item) => {
    const row = document.createElement('tr');
    keys.forEach((key) => {
      const td = document.createElement('td');
      try {
        td.innerHTML = `<pre>${JSON.stringify(JSON.parse(item[key]), '', '  ')}</pre>`;
      } catch (error) {
        td.textContent = item[key];
      }
      row.appendChild(td);
    });
    tbody.appendChild(row);

    const option = document.createElement('option');
    option.textContent = `"${item.name}"`;
    option.value = item.name;
    option.dataset.inputSchema = item.inputSchema;
    toolNames.appendChild(option);
  });
  updateDefaultValueForInputArgs();

  if (haveNewTools) suggestUserPrompt();
});

tbody.ondblclick = () => {
  tbody.classList.toggle('prettify');
};

copyAsScriptToolConfig.onclick = async () => {
  const text = currentTools
    .map((tool) => {
      return `\
script_tools {
  name: "${tool.name}"
  description: "${tool.description}"
  input_schema: ${JSON.stringify(tool.inputSchema || { type: 'object', properties: {} })}
}`;
    })
    .join('\r\n');
  await navigator.clipboard.writeText(text);
};

copyAsJSON.onclick = async () => {
  const tools = (currentTools || []).map((tool) => {
    return {
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema
        ? JSON.parse(tool.inputSchema)
        : { type: 'object', properties: {} },
    };
  });
  await navigator.clipboard.writeText(JSON.stringify(tools, '', '  '));
};

// Interact with the page

// `aiProvider` is a GeminiProvider or OllamaProvider (both expose createChat/generateContent).
// Kept named for the rest of the file; localStorage.aiProvider selects which ('gemini' | 'ollama').
let genAI, chat;

const envModulePromise = import('./.env.json', { with: { type: 'json' } });

async function initGenAI() {
  let env;
  try {
    // Try load .env.json if present.
    env = (await envModulePromise).default;
  } catch {}
  if (env?.apiKey) localStorage.apiKey ??= env.apiKey;
  localStorage.model ??= env?.model || 'gemini-3.6-flash';
  localStorage.aiProvider ??= 'gemini';
  localStorage.ollamaUrl ??= 'http://localhost:11434';
  localStorage.ollamaModel ??= 'qwen2.5:7b';
  // Generic OpenAI-compatible gateway provider — OPT-IN, additive, and fully config-driven (no
  // endpoint/key ever hardcoded here). Point it at YOUR OpenAI-compatible endpoint — Adobe's
  // internal LLM Gateway, OpenAI, OpenRouter, a local LiteLLM proxy, etc. — via .env.json (gitignored,
  // see .env.json.example) or by setting these localStorage keys directly in the console:
  //   localStorage.gatewayKey = 'sk-...'; localStorage.gatewayBaseUrl = 'https://your-gateway';
  //   localStorage.gatewayModel = 'your-model-id'; localStorage.aiProvider = 'gateway';
  if (env?.gatewayKey) localStorage.gatewayKey ??= env.gatewayKey;
  if (env?.gatewayBaseUrl) localStorage.gatewayBaseUrl ??= env.gatewayBaseUrl;
  if (env?.gatewayModel) localStorage.gatewayModel ??= env.gatewayModel;
  // Migrate away from retired Gemini models cached from an earlier session.
  const RETIRED_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash'];
  if (RETIRED_MODELS.includes(localStorage.model)) {
    localStorage.model = 'gemini-3.6-flash';
  }

  if (localStorage.aiProvider === 'gateway') {
    genAI = (localStorage.gatewayKey && localStorage.gatewayBaseUrl)
      ? new GatewayProvider({
        apiKey: localStorage.gatewayKey,
        baseUrl: localStorage.gatewayBaseUrl,
        model: localStorage.gatewayModel,
      })
      : undefined;
  } else if (localStorage.aiProvider === 'ollama') {
    // Local model — no API key, no Google quota/503. Prompt-based tool-calling (see ollama-provider).
    genAI = new OllamaProvider({ baseUrl: localStorage.ollamaUrl, model: localStorage.ollamaModel });
  } else {
    genAI = localStorage.apiKey ? new GeminiProvider({ apiKey: localStorage.apiKey }) : undefined;
  }

  // Mirror each branch's own construction condition above exactly, so Send enables whenever genAI
  // actually got built — whichever provider localStorage.aiProvider already points at (set via the
  // "Set Gemini API key" button below for Gemini, or via console for Gateway/Ollama — see the
  // localStorage.gatewayKey/... comment above and .env.json.example).
  const ready = !!genAI;
  promptBtn.disabled = !ready;
  resetBtn.disabled = !ready;
  apiKeyBtn.textContent = localStorage.apiKey ? 'Update Gemini API key' : 'Set Gemini API key';
}
// Not `await`-ed at top level: a blocking top-level await would leave promptBtn genuinely
// `disabled` (its HTML default) for however long initGenAI() takes, so an eager first click/Enter —
// right when the panel opens — silently does nothing (a disabled button drops click events). Kick it
// off here and let promptBtn.onclick/the Enter handler below await this SAME promise instead, so an
// early click queues and runs the instant init finishes, rather than being lost.
const initGenAIPromise = initGenAI();

// The active model name for the CURRENT provider. The `model` radios pick a Gemini model; Ollama
// uses its own local tag (localStorage.ollamaModel). Passing the Gemini name to Ollama 404s the
// local API ("model 'gemini-...' not found"), so route each provider to its own model here.
function activeModel() {
  if (localStorage.aiProvider === 'gateway') return localStorage.gatewayModel || 'gpt-4o';
  return localStorage.aiProvider === 'ollama' ? localStorage.ollamaModel : localStorage.model;
}

document.querySelectorAll('input[name="model"]').forEach((radio) => {
  radio.onclick = () => {
    localStorage.model = radio.value;
    chat = undefined;
    advancedSection.hidePopover();
  };
});
// Sync the radios' checked state once localStorage.model has its default seeded — NOT a blocking
// top-level await (that would delay attaching promptBtn.onclick/Enter below, recreating the exact
// "first click does nothing" bug this file just fixed). Click handlers above are already live.
initGenAIPromise.then(() => {
  document.querySelectorAll('input[name="model"]').forEach((radio) => {
    radio.checked = radio.value === localStorage.model;
  });
});

async function suggestUserPrompt() {
  // Disabled: this auto-generates a demo suggestion by calling the model on every tool-discovery /
  // reset, which silently burns Gemini free-tier quota (and isn't needed for our flows). Re-enable
  // by removing this early return if the placeholder suggestions are wanted.
  return;
  if (currentTools.length == 0 || !genAI || userPromptText.value !== lastSuggestedUserPrompt)
    return;
  const userPromptId = ++userPromptPendingId;
  const response = await genAI.generateContent({
    model: activeModel(),
    contents: [
      '**Context:**',
      `Today's date is: ${getFormattedDate()}`,
      '**Tool Rules:**',
      '1. **Bank Transaction Filter:** Use **PAST** dates only (e.g., "last month," "December 15th," "yesterday").',
      '2. **Flight Search:** Use **FUTURE** dates only (e.g., "next week," "February 15th").',
      '3. **Accommodation Search:** Use **FUTURE** dates only (e.g., "next weekend," "March 15th").',
      '**Task:**',
      'Generate one natural user query for a range of tools below, ideally chaining them together.',
      'Ensure the date makes sense relative to today.',
      'Output the query text only.',
      '**Tools:**',
      JSON.stringify(currentTools),
    ],
  });
  if (userPromptId !== userPromptPendingId || userPromptText.value !== lastSuggestedUserPrompt)
    return;
  lastSuggestedUserPrompt = response.text;
  userPromptText.value = '';
  for (const chunk of response.text) {
    await new Promise((r) => requestAnimationFrame(r));
    userPromptText.value += chunk;
  }
}

userPromptText.onkeydown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
    event.preventDefault();
    sendPrompt();
  }
};

promptBtn.onclick = () => sendPrompt();

// Shared entry point for both the Send button and Enter-to-send. Awaits initGenAI() first — during
// the brief startup window (before that resolves) promptBtn is still `disabled` and Enter's
// `.click()`/a real click on it are no-ops, so a user typing+sending immediately on a fresh panel
// load would otherwise see NOTHING happen on their first try. This queues that intent instead: it
// resolves the instant init finishes and genAI/currentTools are actually ready, then proceeds.
async function sendPrompt() {
  await initGenAIPromise;
  try {
    await promptAI();
  } catch (error) {
    trace.push({ error });
    logPrompt(`⚠️ Error: "${error}"`);
  }
}

let trace = [];

async function promptAI({ skipUserBubble = false } = {}) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // Re-fetch tools from the active tab before every prompt. The initial LIST_TOOLS (on panel load)
  // can miss tools that register slightly later or after a machine restart — leaving currentTools
  // empty, so the model gets 0 tool definitions and hallucinates calls. This keeps them fresh.
  if (!currentTools || currentTools.length === 0) {
    try {
      await chrome.tabs.sendMessage(tab.id, { action: 'LIST_TOOLS' });
      await new Promise((r) => setTimeout(r, 400)); // let the onMessage handler set currentTools
    } catch (e) {
      console.warn('[tools] LIST_TOOLS failed — content script not injected on this tab?', e?.message);
    }
  }

  chat ??= genAI.createChat({ model: activeModel() });

  const message = userPromptText.value;
  userPromptText.value = '';
  lastSuggestedUserPrompt = '';
  promptResults.textContent += `User prompt: "${message}"\n`;
  // Skip the raw-message bubble when the caller already showed a friendly one (A2UI selection).
  if (!skipUserBubble) appendChatEvent(`User prompt: "${message}"`);
  const sendMessageParams = { message, config: getConfig() };
  trace.push({ userPrompt: sendMessageParams });
  showTypingIndicator();
  let currentResult;
  try {
    currentResult = await chat.sendMessage(sendMessageParams);
  } finally {
    hideTypingIndicator();
  }
  let finalResponseGiven = false;

  while (!finalResponseGiven) {
    const response = currentResult;
    trace.push({ response });
    const functionCalls = response.functionCalls || [];

    if (functionCalls.length === 0) {
      const responseText = response.text?.trim();
      if (!responseText) {
        logPrompt(`⚠️ AI response has no text: ${JSON.stringify(response.candidates)}\n`);
        finalResponseGiven = true;
      } else if (hasA2ui(responseText)) {
        // The model asked for a choice via an A2UI block. Show any surrounding text, render the
        // interactive UI, and pause — the user's click re-enters the conversation below.
        const prose = stripA2ui(responseText);
        if (prose) appendChatEvent(`AI result: ${prose}`);
        const chatRoot = document.getElementById('chatThread');
        const submitted = renderA2ui(responseText, chatRoot, (agentMessage, displayLabel) => {
          // Show a short friendly bubble ("Medium"); send the full instruction to the agent.
          appendChatEvent(`User prompt: "${displayLabel}"`);
          userPromptText.value = agentMessage;
          promptAI({ skipUserBubble: true }); // re-invoke with the choice; bubble already shown
        });
        if (!submitted) appendChatEvent(`AI result: ${prose || responseText}`);
        finalResponseGiven = true; // wait for the user's click (a new promptAI turn)
      } else {
        logPrompt(`AI result: ${responseText}\n`);
        finalResponseGiven = true;
      }
    } else {
      const toolResponses = [];
      let awaitingChoice = false;
      for (const { name, args } of functionCalls) {
        const inputArgs = JSON.stringify(args);
        logPrompt(`AI calling tool "${name}" with ${inputArgs}`);
        try {
          const rawResult = await executeTool(tab.id, name, inputArgs);
          // A WebMCP tool result may be a plain string (our internal transport) OR the standard
          // { content: [{ type:'text', text }] } object (e.g. the public redact demo). Normalize to
          // the text string so parseNeedsChoice/Review (which expect a string) work for both.
          const result = toResultText(rawResult);
          const choice = parseNeedsChoice(result);
          const review = parseNeedsReview(result);
          if (choice) {
            // The tool needs a user choice — render the picker in chat instead of feeding a pending
            // result back to the model. The user's click drives the next turn (re-invoking the tool).
            awaitingChoice = true;
            const chatRoot = document.getElementById('chatThread');
            renderChoice(choice, chatRoot, (agentMessage, displayLabel) => {
              appendChatEvent(`User prompt: "${displayLabel}"`);
              userPromptText.value = agentMessage;
              promptAI({ skipUserBubble: true });
            });
          } else if (review) {
            // Redact placed marks — show an Apply/Cancel review picker; the click applies or cancels.
            awaitingChoice = true;
            const chatRoot = document.getElementById('chatThread');
            if (review.prompt) appendChatEvent(`AI result: ${review.prompt}`);
            renderReview(review, chatRoot, (agentMessage, displayLabel) => {
              appendChatEvent(`User prompt: "${displayLabel}"`);
              userPromptText.value = agentMessage;
              promptAI({ skipUserBubble: true });
            }, (markIndex) => {
              // Carousel Prev/Next: scroll the PDF to the mark directly, without a chat bubble or an
              // agent turn — pure navigation. Pass back the review's docKey so the dropin reads the
              // same storage the marks were saved under. Fire-and-forget; errors logged, not surfaced.
              executeTool(tab.id, review.gotoTool, JSON.stringify({ markIndex, docKey: review.docKey }))
                .catch((e) => console.warn('[review] goto-mark failed', e));
            }, async (markIndex) => {
              // "Don't redact this": remove ONLY the mark on screen, no chat bubble, no agent turn.
              // The tool returns the UPDATED review (fresh items/count) so the carousel refreshes.
              if (!review.skipTool) return null; // host doesn't support per-mark skip; caller no-ops
              try {
                const raw = await executeTool(tab.id, review.skipTool, JSON.stringify({ markIndex, docKey: review.docKey }));
                const text = toResultText(raw);
                return JSON.parse(text);
              } catch (e) {
                console.warn('[review] skip-mark failed', e);
                return null;
              }
            });
          } else {
            // The result goes to the MODEL, but tool results are internal plumbing — the user should
            // only see the model's own natural-language confirmation, not raw JSON echoes like
            // {"applied":4}. Keep a copy in the hidden trace (for Copy trace / debugging) without
            // posting it as a chat bubble.
            toolResponses.push({ functionResponse: { name, response: { result } } });
            promptResults.textContent += `Tool "${name}" result: ${String(result)}\n`;
            promptResults.scrollTop = promptResults.scrollHeight;
          }
        } catch (e) {
          logPrompt(`⚠️ Error executing tool "${name}": ${e.message}`);
          toolResponses.push({
            functionResponse: { name, response: { error: e.message } },
          });
        }
      }

      // If we showed a picker, stop this turn and wait for the user's selection.
      if (awaitingChoice) {
        finalResponseGiven = true;
        break;
      }

      // FIXME: New WebMCP tools may not be discovered if there's a navigation.
      // An articial timeout is introduced for mitigation but it's not robust enough.
      await new Promise((r) => setTimeout(r, 500));

      const sendMessageParams = { message: toolResponses, config: getConfig() };
      trace.push({ userPrompt: sendMessageParams });
      showTypingIndicator();
      try {
        currentResult = await chat.sendMessage(sendMessageParams);
      } finally {
        hideTypingIndicator();
      }
    }
  }
}

resetBtn.onclick = () => {
  chat = undefined;
  trace = [];
  userPromptText.value = '';
  lastSuggestedUserPrompt = '';
  promptResults.textContent = '';
  clearChat();
  suggestUserPrompt();
};

apiKeyBtn.onclick = async () => {
  const apiKey = prompt('Enter Gemini API key', localStorage.apiKey);
  if (apiKey == null) return;
  localStorage.apiKey = apiKey;
  await initGenAI();
  suggestUserPrompt();
};

traceBtn.onclick = async () => {
  const text = JSON.stringify(trace, '', ' ');
  await navigator.clipboard.writeText(text);
};

executeBtn.onclick = async () => {
  toolResults.textContent = '';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const name = toolNames.selectedOptions[0].value;
  const inputArgs = inputArgsText.value;
  toolResults.textContent = await executeTool(tab.id, name, inputArgs).catch(
    (error) => `⚠️ Error: "${error}"`,
  );
};

async function executeTool(tabId, name, inputArgs) {
  try {
    const result = await chrome.tabs.sendMessage(tabId, {
      action: 'EXECUTE_TOOL',
      name,
      inputArgs,
    });
    if (result !== null) return result;
  } catch (error) {
    if (!error.message.includes('message channel is closed')) throw error;
  }
  // A navigation was triggered. The result will be on the next document.
  // TODO: Handle case where a new tab is opened.
  await waitForPageLoad(tabId);
  return await chrome.tabs.sendMessage(tabId, {
    action: 'GET_CROSS_DOCUMENT_SCRIPT_TOOL_RESULT',
  });
}

toolNames.onchange = updateDefaultValueForInputArgs;

function updateDefaultValueForInputArgs() {
  const inputSchema = toolNames.selectedOptions[0].dataset.inputSchema || '{}';
  const template = generateTemplateFromSchema(JSON.parse(inputSchema));
  inputArgsText.value = JSON.stringify(template, '', ' ');
}

// Initialize Gemini Live
initGeminiLive({
  micBtn,
  apiKeyBtn,
  getTools: () => currentTools,
  executeTool,
  logPrompt,
  getFormattedDate,
  addToTrace: (o) => trace.push(o),
});

// Utils

function logPrompt(text) {
  // Legacy plain-text log (kept for the hidden <pre>, unaffects Copy trace).
  promptResults.textContent += `${text}\n`;
  promptResults.scrollTop = promptResults.scrollHeight;
  // Styled chat thread.
  appendChatEvent(text);
}

function getFormattedDate() {
  const today = new Date();
  return today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getConfig() {
  const systemInstruction = [
    'You are Any Assistant, embedded in a browser tab.',
    'User prompts typically refer to the current tab unless stated otherwise.',
    'Use your tools to query page content when you need it.',
    // A document is always open in the tab; the tools read it directly. The agent must NEVER ask the
    // user to supply the document or its text — it must call the tools to get it.
    'A PDF document is ALREADY OPEN in this tab. NEVER ask the user to provide the document, its URL, '
    + 'or its text — you already have access. For any redaction request that names a CATEGORY '
    + '("redact the bank address", "redact all names / emails / PII / sensitive info"), you MUST first '
    + 'call get_document_text to read the open document, then call redact_regions with the matching '
    + 'items. For an EXACT word/phrase ("redact NITIN MENDIRATTA"), call find_and_redact directly. '
    + 'Do NOT reply in prose asking for clarification when a tool can get the answer — call the tool.',
    `Today's date is: ${getFormattedDate()}`,
    'CRITICAL RULE: Whenever the user provides a relative date (e.g., "next Monday", "tomorrow", "in 3 days"),  you must calculate the exact calendar date based on today\'s date.',
    // Keep replies clean and user-facing — the chat panel shows these verbatim.
    'RESPONSE STYLE: Reply ONLY with a short, friendly, user-facing message. Do NOT narrate your reasoning, plans, or internal steps. Do NOT explain which tool you are using, what parameters are missing, or how you access the document. Never output headers like "Awaiting User Input" or "Identifying …". When a task finishes, confirm in one short sentence.',
    A2UI_INSTRUCTION,
  ];

  const functionDeclarations = (currentTools || []).map((tool) => {
    return {
      name: tool.name,
      description: tool.description,
      parametersJsonSchema: tool.inputSchema
        ? JSON.parse(tool.inputSchema)
        : { type: 'object', properties: {} },
    };
  });
  return {
    systemInstruction,
    tools: [{ functionDeclarations }],
    // Let the model think, but don't return the thought text — keeps the chat panel free of
    // chain-of-thought ("I've hit a snag…", "Identifying …") without hurting tool selection.
    thinkingConfig: { includeThoughts: false },
  };
}

function generateTemplateFromSchema(schema) {
  if (!schema || typeof schema !== 'object') {
    return null;
  }

  if (schema.hasOwnProperty('const')) {
    return schema.const;
  }

  if (Array.isArray(schema.oneOf) && schema.oneOf.length > 0) {
    return generateTemplateFromSchema(schema.oneOf[0]);
  }

  if (schema.hasOwnProperty('default')) {
    return schema.default;
  }

  if (Array.isArray(schema.examples) && schema.examples.length > 0) {
    return schema.examples[0];
  }

  switch (schema.type) {
    case 'object':
      const obj = {};
      if (schema.properties) {
        Object.keys(schema.properties).forEach((key) => {
          obj[key] = generateTemplateFromSchema(schema.properties[key]);
        });
      }
      return obj;

    case 'array':
      if (schema.items) {
        return [generateTemplateFromSchema(schema.items)];
      }
      return [];

    case 'string':
      if (schema.enum && schema.enum.length > 0) {
        return schema.enum[0];
      }
      if (schema.format === 'date') {
        return new Date().toISOString().substring(0, 10);
      }
      // yyyy-MM-ddThh:mm:ss.SSS
      if (
        schema.format ===
        '^[0-9]{4}-(0[1-9]|1[0-2])-[0-9]{2}T([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9](\\.[0-9]{1,3})?)?$'
      ) {
        return new Date().toISOString().substring(0, 23);
      }
      // yyyy-MM-ddThh:mm:ss
      if (
        schema.format ===
        '^[0-9]{4}-(0[1-9]|1[0-2])-[0-9]{2}T([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$'
      ) {
        return new Date().toISOString().substring(0, 19);
      }
      // yyyy-MM-ddThh:mm
      if (schema.format === '^[0-9]{4}-(0[1-9]|1[0-2])-[0-9]{2}T([01][0-9]|2[0-3]):[0-5][0-9]$') {
        return new Date().toISOString().substring(0, 16);
      }
      // yyyy-MM
      if (schema.format === '^[0-9]{4}-(0[1-9]|1[0-2])$') {
        return new Date().toISOString().substring(0, 7);
      }
      // yyyy-Www
      if (schema.format === '^[0-9]{4}-W(0[1-9]|[1-4][0-9]|5[0-3])$') {
        return `${new Date().toISOString().substring(0, 4)}-W01`;
      }
      // HH:mm:ss.SSS
      if (schema.format === '^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9](\\.[0-9]{1,3})?)?$') {
        return new Date().toISOString().substring(11, 23);
      }
      // HH:mm:ss
      if (schema.format === '^([01][0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$') {
        return new Date().toISOString().substring(11, 19);
      }
      // HH:mm
      if (schema.format === '^([01][0-9]|2[0-3]):[0-5][0-9]$') {
        return new Date().toISOString().substring(11, 16);
      }
      if (schema.format === '^#[0-9a-zA-Z]{6}$') {
        return '#ff00ff';
      }
      if (schema.format === 'tel') {
        return '123-456-7890';
      }
      if (schema.format === 'email') {
        return 'user@example.com';
      }
      return 'example_string';

    case 'number':
    case 'integer':
      if (schema.minimum !== undefined) return schema.minimum;
      return 0;

    case 'boolean':
      return false;

    case 'null':
      return null;

    default:
      return {};
  }
}

function waitForPageLoad(tabId) {
  return new Promise((resolve) => {
    const listener = (updatedTabId, changeInfo) => {
      if (updatedTabId === tabId && changeInfo.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener);
        resolve();
      }
    };
    chrome.tabs.onUpdated.addListener(listener);
  });
}

document.querySelectorAll('.collapsible-header').forEach((header) => {
  header.addEventListener('click', () => {
    header.classList.toggle('collapsed');
    const content = header.nextElementSibling;
    if (content?.classList.contains('section-content')) {
      content.classList.toggle('is-hidden');
    }
  });
});
