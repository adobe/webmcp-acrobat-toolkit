/**
 * Chat UI renderer for the WebMCP demo.
 *
 * The extension funnels every conversational event through logPrompt() as a plain string appended
 * to a <pre>. This module turns those into a styled chat thread — user/assistant bubbles, tool-call
 * and tool-result cards — without touching the agent or tool plumbing. Both the text path
 * (sidebar.js) and the voice path (gemini-live.js) call the same appendChatEvent().
 *
 * It parses the well-known logPrompt strings back into structured events so we don't have to change
 * every call site. Unrecognized strings render as a plain system line, so nothing is ever dropped.
 */

const CHAT_ROOT_ID = 'chatThread';

/**
 * Show the internal tool-call / tool-result cards (🔧 Calling…, ✅ …done). Off for the clean
 * conversational demo — the user sees only their messages and the assistant's replies. Errors are
 * always shown regardless, so failures aren't silently swallowed. Flip to true to debug tool flow.
 */
const SHOW_TOOL_ACTIVITY = false;

/** Ensure the chat container exists (created lazily next to the legacy <pre id="promptResults">). */
function getChatRoot() {
  let root = document.getElementById(CHAT_ROOT_ID);
  if (root) return root;

  root = document.createElement('div');
  root.id = CHAT_ROOT_ID;
  root.className = 'chat-thread';

  const legacy = document.getElementById('promptResults');
  if (legacy && legacy.parentNode) {
    legacy.parentNode.insertBefore(root, legacy);
    legacy.style.display = 'none'; // keep the element (trace/reset still write to it) but hide it
  } else {
    document.body.appendChild(root);
  }
  return root;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function scrollToBottom() {
  const root = getChatRoot();
  root.scrollTop = root.scrollHeight;
}

/**
 * Phrases that mark a message as the model's internal chain-of-thought rather than a user-facing
 * reply. The clean chat should never show these. Tuned for the reasoning dumps Gemini emits (e.g.
 * "I've hit a snag…", "I've identified the `compress-pdf` tool…", "I need to prompt the user…").
 */
const REASONING_MARKERS = [
  /\bI've (?:hit|identified|zeroed|decided|pinpointed|noted)\b/i,
  /\bI (?:need to|will|should|now need|am (?:assuming|focusing|inferring))\b/i,
  /\b(?:the )?tool(?:'s)?\b.*\b(?:parameter|documentation|needs|requires|access(?:es)?)\b/i,
  /\basset_url_or_urn\b/i,
  /\b(?:compress|export|redact)[-_]pdf\b/i, // internal tool ids leaking into prose
  /\bHUMAN-IN-THE-LOOP\b/i,
];

/** True when the text reads like internal reasoning/planning we should hide. */
function isReasoning(text) {
  const body = text.replace(/\*\*[^*]+\*\*/g, '').trim(); // ignore bold headers when scoring
  return REASONING_MARKERS.some(re => re.test(body));
}

/**
 * Clean an assistant message for display.
 * - Pure reasoning/planning → null (suppressed entirely; nothing rendered).
 * - `**Header**` + reasoning body → keep only the header line(s).
 * - Plain user-facing reply → unchanged.
 */
function cleanAssistantText(text) {
  // Messages with `**Header**` blocks ("Awaiting User Input", "Identifying …") are the model's
  // thinking format — suppress the whole message.
  if (/\*\*[^*]+\*\*/.test(text)) return null;
  // Plain-prose reasoning ("I've hit a snag…", tool-internals) — suppress too.
  if (isReasoning(text)) return null;
  return text;
}

/**
 * Render a chat bubble. kind: 'user' | 'assistant' | 'system' | 'error'.
 * Returns without rendering when an assistant message is suppressed as internal reasoning.
 */
function renderBubble(kind, text) {
  let display = text;
  if (kind === 'assistant') {
    display = cleanAssistantText(text);
    if (display == null || display === '') return; // suppressed reasoning — render nothing
  }
  const root = getChatRoot();
  const row = el('div', `chat-row chat-row--${kind}`);
  const bubble = el('div', `chat-bubble chat-bubble--${kind}`, display);
  row.appendChild(bubble);
  root.appendChild(row);
  scrollToBottom();
}

/** Render a tool-call card (the agent invoking a WebMCP tool, with its args). */
function renderToolCall(toolName, argsObj) {
  const root = getChatRoot();
  const card = el('div', 'tool-card tool-card--call');
  const head = el('div', 'tool-card__head');
  head.appendChild(el('span', 'tool-card__icon', '🔧'));
  head.appendChild(el('span', 'tool-card__title', `Calling ${toolName}`));
  card.appendChild(head);
  const args = argsObj && Object.keys(argsObj).length ? argsObj : null;
  if (args) {
    card.appendChild(el('pre', 'tool-card__args', JSON.stringify(args, null, 2)));
  }
  root.appendChild(card);
  scrollToBottom();
}

/** Render a tool-result card (success or error). */
function renderToolResult(toolName, resultText, isError) {
  const root = getChatRoot();
  const card = el('div', `tool-card tool-card--result${isError ? ' tool-card--error' : ''}`);
  const head = el('div', 'tool-card__head');
  head.appendChild(el('span', 'tool-card__icon', isError ? '⚠️' : '✅'));
  head.appendChild(el('span', 'tool-card__title', `${toolName} ${isError ? 'failed' : 'done'}`));
  card.appendChild(head);
  const pretty = prettyResult(resultText);
  if (pretty) card.appendChild(el('div', 'tool-card__result', pretty));
  root.appendChild(card);
  scrollToBottom();
}

/**
 * Live-updating user bubble for streaming voice transcription: show the partial text immediately
 * and grow it as words arrive, instead of waiting for the full utterance. Call update repeatedly,
 * then finalize (or clear) when the turn completes.
 */
let streamingUserBubble = null;
export function updateStreamingUserBubble(text) {
  const root = getChatRoot();
  if (!streamingUserBubble) {
    const row = el('div', 'chat-row chat-row--user');
    streamingUserBubble = el('div', 'chat-bubble chat-bubble--user chat-bubble--streaming');
    row.appendChild(streamingUserBubble);
    root.appendChild(row);
  }
  streamingUserBubble.textContent = text;
  root.scrollTop = root.scrollHeight;
}
/** Finalize the streaming bubble (drop the streaming style). Clears the ref so the next turn starts fresh. */
export function finalizeStreamingUserBubble() {
  if (streamingUserBubble) {
    streamingUserBubble.classList.remove('chat-bubble--streaming');
    streamingUserBubble = null;
  }
}

/** Tool results are JSON strings like {"reason":"..."}; surface the human-readable bit. */
function prettyResult(resultText) {
  if (resultText == null) return '';
  try {
    const obj = JSON.parse(resultText);
    return obj.reason || obj.message || obj.result || resultText;
  } catch {
    return String(resultText);
  }
}

/**
 * Public entry point. Called by logPrompt (and voice) with the legacy string. Parses it into the
 * right bubble/card. Recognized prefixes mirror the existing logPrompt call sites.
 */
export function appendChatEvent(text) {
  if (text == null) return;
  const line = String(text).trim();

  // User prompt: 'User prompt: "redact all names"'
  let m = line.match(/^User prompt:\s*"([\s\S]*)"$/);
  if (m) return renderBubble('user', m[1]);

  // Tool call: 'AI calling tool "redact_regions" with {"category":"names"}'
  m = line.match(/^AI calling tool\s*"([^"]+)"(?:\s*with\s*([\s\S]*))?$/);
  if (m) {
    if (!SHOW_TOOL_ACTIVITY) return; // hidden in the clean conversational view
    let args = null;
    if (m[2]) { try { args = JSON.parse(m[2]); } catch { /* leave null */ } }
    return renderToolCall(m[1], args);
  }

  // Tool result: 'Tool "redact_regions" result: {...}'
  m = line.match(/^Tool\s*"([^"]+)"\s*result:\s*([\s\S]*)$/);
  if (m) {
    if (!SHOW_TOOL_ACTIVITY) {
      // Don't drop the outcome: the model (esp. in voice mode) may not speak a clean confirmation,
      // so surface the tool's own human-readable result as a plain assistant bubble.
      const outcome = prettyResult(m[2]);
      if (outcome) renderBubble('assistant', outcome);
      return;
    }
    return renderToolResult(m[1], m[2], false);
  }

  // Tool error: '⚠️ Error executing tool "redact_regions": message' — always shown.
  m = line.match(/^⚠️?\s*Error executing tool\s*"([^"]+)":\s*([\s\S]*)$/);
  if (m) return renderToolResult(m[1], m[2], true);

  // Final AI text: 'AI result: ...'
  m = line.match(/^AI result:\s*([\s\S]*)$/);
  if (m) return renderBubble('assistant', m[1]);

  // Generic warnings/errors.
  if (line.startsWith('⚠️')) return renderBubble('error', line.replace(/^⚠️\s*/, ''));

  // Anything else: a quiet system line (nothing dropped).
  return renderBubble('system', line);
}

/**
 * "Thinking…" indicator shown between sending a prompt and getting a response back — covers both
 * the model's own latency and, on a tool-calling turn, the tool round-trip before the next chunk of
 * text/A2UI is ready to render. One at a time (module-level ref); a second show() while one is
 * already up is a no-op rather than stacking bubbles.
 */
let typingBubble = null;
export function showTypingIndicator() {
  if (typingBubble) return;
  const root = getChatRoot();
  const row = el('div', 'chat-row chat-row--assistant');
  typingBubble = el('div', 'chat-bubble chat-bubble--assistant chat-bubble--typing');
  typingBubble.appendChild(el('span', 'typing-dot'));
  typingBubble.appendChild(el('span', 'typing-dot'));
  typingBubble.appendChild(el('span', 'typing-dot'));
  row.appendChild(typingBubble);
  root.appendChild(row);
  scrollToBottom();
}
export function hideTypingIndicator() {
  if (!typingBubble) return;
  typingBubble.closest('.chat-row')?.remove();
  typingBubble = null;
}

/** Clear the thread (wired to the Reset button). */
export function clearChat() {
  const root = getChatRoot();
  root.innerHTML = '';
  typingBubble = null; // the node it referenced is gone too
}
