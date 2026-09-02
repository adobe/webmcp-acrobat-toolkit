/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from './js-genai.js';
import { renderChoice, parseNeedsChoice, renderReview, parseNeedsReview, toResultText, dismissActivePicker } from './a2ui-chat.js';
import { appendChatEvent } from './chat-ui.js';

localStorage.liveModel ??= 'gemini-2.5-flash-native-audio-latest';
// Migrate off date-pinned previews to the auto-tracking 'latest' alias.
if (/native-audio-preview-\d/.test(localStorage.liveModel)) {
  localStorage.liveModel = 'gemini-2.5-flash-native-audio-latest';
}

/**
 * Resolve the tab the tools should act on. Side panels don't reliably return an active tab via
 * { currentWindow: true } (esp. when DevTools is focused), so fall back through the last focused
 * normal window and finally any active/http tab. Returns a tab or undefined.
 */
async function resolveActiveTab() {
  // 1) Active tab in the current window.
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab?.id) return tab;
  // 2) Active tab in the last focused *normal* window (skips the DevTools/panel window).
  try {
    const win = await chrome.windows.getLastFocused({ windowTypes: ['normal'], populate: true });
    tab = win?.tabs?.find((t) => t.active) || win?.tabs?.[0];
    if (tab?.id) return tab;
  } catch { /* windows API may be unavailable; fall through */ }
  // 3) Any active tab, then any http(s) tab.
  [tab] = await chrome.tabs.query({ active: true });
  if (tab?.id) return tab;
  [tab] = await chrome.tabs.query({ url: ['http://*/*', 'https://*/*'] });
  return tab;
}

class AudioScheduler {
  constructor() {
    this.ctx = null;
    this.sources = new Set();
    this.nextStartTime = 0;
    this.onSpeaking = null;
  }

  ensureContext() {
    if (this.ctx && (this.ctx.state === 'running' || this.ctx.state === 'suspended')) {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      return this.ctx;
    }
    this.ctx = new AudioContext({ sampleRate: 24000 });
    return this.ctx;
  }

  play(data) {
    const ctx = this.ensureContext();
    if (this.sources.size === 0) this.onSpeaking?.(true);

    try {
      const dataInt16 = new Int16Array(data.buffer);
      const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      const startTime = Math.max(ctx.currentTime, this.nextStartTime);
      source.start(startTime);
      this.nextStartTime = startTime + buffer.duration;
      this.sources.add(source);
      source.onended = () => {
        this.sources.delete(source);
        if (this.sources.size === 0) {
          this.onSpeaking?.(false);
        }
      };
    } catch (err) {
      console.error('Playback error:', err);
    }
  }

  clear() {
    this.sources.forEach((source) => {
      source.onended = null;
      try {
        source.stop();
      } catch {}
    });
    this.sources.clear();
    this.nextStartTime = 0;
    this.onSpeaking?.(false);
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch {}
      this.ctx = null;
    }
  }
}

class MicCapture {
  constructor(logPrompt) {
    this.logPrompt = logPrompt;
    this.onAudioData = null;
    this.onListening = null;
    this.listeningTimeout = null;
    this._onMessage = (message) => {
      if (message.type === 'audio-data') {
        this.onAudioData?.(message.data);
        this.onListening?.(true);
        if (this.listeningTimeout) clearTimeout(this.listeningTimeout);
        this.listeningTimeout = setTimeout(() => this.onListening?.(false), 200);
      } else if (message.type === 'mic-error') {
        console.error('Mic error from offscreen:', message.error);
      }
    };
  }

  async start() {
    try {
      await this.stop();

      // Check current permission state
      const permissionStatus = await navigator.permissions.query({ name: 'microphone' });
      console.debug('[WebMCP] Mic permission status:', permissionStatus.state);

      if (permissionStatus.state !== 'granted') {
        this.logPrompt(
          'ℹ️ Microphone permission required. Opening a small window to request access...',
        );

        const url = chrome.runtime.getURL('mic-permission.html');
        await chrome.windows.create({
          url,
          type: 'popup',
          width: 350,
          height: 250,
          focused: true,
          state: 'normal', // This is key to preventing full-screen inheritance on macOS
        });
        throw new Error('Permission required');
      }

      chrome.runtime.onMessage.addListener(this._onMessage);

      // 2. Create offscreen document if it doesn't exist
      if (!(await chrome.offscreen.hasDocument())) {
        await chrome.offscreen.createDocument({
          url: 'offscreen.html',
          reasons: ['USER_MEDIA'],
          justification: 'Capture microphone for Gemini Live',
        });
      }

      // 3. Send message with retry to handle race condition where document is created but not ready
      let attempts = 0;
      const sendStart = async () => {
        try {
          await chrome.runtime.sendMessage({ target: 'offscreen', type: 'start-mic' });
        } catch (e) {
          if (attempts++ < 10) {
            await new Promise((r) => setTimeout(r, 100));
            return sendStart();
          }
          throw e;
        }
      };
      await sendStart();
    } catch (err) {
      console.error('MicCapture start failed:', err);
      if (err.message !== 'Permission required') {
        this.logPrompt(`⚠️ Mic Error: ${err.message}`);
      }
      throw err;
    }
  }

  async stop() {
    chrome.runtime.onMessage.removeListener(this._onMessage);
    try {
      if (await chrome.offscreen.hasDocument()) {
        await chrome.runtime.sendMessage({ target: 'offscreen', type: 'stop-mic' }).catch(() => {});
        await chrome.offscreen.closeDocument().catch(() => {});
      }
    } catch (err) {}
    if (this.listeningTimeout) clearTimeout(this.listeningTimeout);
    this.onListening?.(false);
  }
}

function decode(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

function encode(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function createBlob(data) {
  return { data: encode(new Uint8Array(data)), mimeType: 'audio/pcm;rate=16000' };
}

let liveSession = null;
let audioScheduler = null;
let micCapture = null;
let liveTextBuffer = '';       // accumulates streamed model text until turnComplete (A2UI detection)
let userTranscriptBuffer = ''; // accumulates streamed input transcription into one user bubble

export async function initGeminiLive({
  micBtn,
  apiKeyBtn,
  getTools,
  executeTool,
  logPrompt,
  getFormattedDate,
  addToTrace,
}) {
  micBtn.onclick = async () => {
    if (!localStorage.apiKey) {
      apiKeyBtn.click();
      return;
    }
    if (liveSession) {
      stopLive(micBtn);
    } else {
      await startLive({ micBtn, getTools, executeTool, logPrompt, getFormattedDate, addToTrace });
    }
  };
}

async function startLive({
  micBtn,
  getTools,
  executeTool,
  logPrompt,
  getFormattedDate,
  addToTrace,
}) {
  // Fresh buffers for this session.
  liveTextBuffer = '';
  userTranscriptBuffer = '';
  // Resolve the target tab robustly. From a side panel (especially with DevTools focused),
  // { currentWindow: true } can return no tab, leaving `tab` undefined → tab.id crashes on every
  // message. Fall back to the last focused normal window, then any active tab.
  const tab = await resolveActiveTab();
  if (!tab?.id) {
    logPrompt('⚠️ Could not resolve the active tab; open the PDF tab and try voice again.');
    console.error('[Live] no active tab resolved — aborting voice start');
    stopLive(micBtn);
    return;
  }
  audioScheduler = new AudioScheduler();
  audioScheduler.onSpeaking = (speaking) => micBtn.classList.toggle('speaking', speaking);

  micCapture = new MicCapture(logPrompt);
  micCapture.onListening = (listening) => micBtn.classList.toggle('listening', listening);

  try {
    await micCapture.start();
  } catch (micErr) {
    console.error('Initial mic start failed:', micErr);
    return;
  }

  micBtn.classList.add('active');
  micBtn.querySelector('.mic-icon').style.display = 'none';
  micBtn.querySelector('.stop-icon').style.display = 'block';

  const config = getLiveConfig(getTools(), getFormattedDate);
  const liveGenAI = new GoogleGenAI({
    apiKey: localStorage.apiKey,
    httpOptions: { apiVersion: 'v1alpha' },
  });

  const liveConfig = {
    systemInstruction: { parts: [{ text: config.systemInstruction.join('\n') }] },
    responseModalities: ['AUDIO'],
    proactivity: { proactiveAudio: true },
    inputAudioTranscription: {},
    outputAudioTranscription: {},
    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } },
    realtimeInputConfig: { activityHandling: 'START_OF_ACTIVITY_INTERRUPTS' },
    tools: config.tools,
    toolConfig: { functionCallingConfig: { mode: 'VALIDATED' } },
  };

  try {
    liveSession = await liveGenAI.live.connect({
      model: localStorage.liveModel,
      config: liveConfig,
      callbacks: {
        onopen: () => {
          logPrompt(`Live session connected.`);
          micCapture.onAudioData = (data) => {
            if (liveSession) liveSession.sendRealtimeInput({ media: createBlob(data) });
          };
        },
        onclose: (e) => {
          // Log the full close event so a vague "Internal error occurred" reason is debuggable.
          console.error('[Live] session closed', { code: e.code, reason: e.reason, event: e });
          logPrompt(`Live session closed. Reason: "${e.reason || 'No reason provided'}"`);
          stopLive(micBtn);
        },
        onerror: (error) => {
          addToTrace({ error });
          console.error('[Live] session error (full)', error);
          logPrompt(`Live session error: ${error.message || JSON.stringify(error)}`);
          stopLive(micBtn);
        },
        onmessage: (message) => {
          addToTrace({ userPrompt: { message, config } });

          // The user's utterance is done once the model starts responding (tool call, text, or
          // audio). Flush the accumulated transcript as ONE bubble at that point — prompt, but not
          // word-by-word.
          const modelResponding =
            message.toolCall?.functionCalls ||
            message.serverContent?.modelTurn?.parts?.length ||
            message.serverContent?.turnComplete;
          if (modelResponding && userTranscriptBuffer.trim()) {
            appendChatEvent(`User prompt: "${userTranscriptBuffer.trim()}"`);
            userTranscriptBuffer = '';
          }

          if (message.toolCall?.functionCalls) {
            // A tool call means a choice was resolved (incl. a spoken answer) — clear any stale
            // on-screen A2UI picker so voice and click answers look consistent.
            dismissActivePicker();
            const fcs = message.toolCall.functionCalls;
            (async () => {
              const responses = [];
              for (const fc of fcs) {
                logPrompt(`AI calling tool "${fc.name}"`);
                try {
                  const result = toResultText(await executeTool(tab.id, fc.name, JSON.stringify(fc.args)));
                  const choice = parseNeedsChoice(result);
                  const review = parseNeedsReview(result);
                  if (choice || review) {
                    // Tool needs the user to choose or review — render the A2UI picker in chat. The
                    // user can click or speak; either way re-invokes a tool. Feed a short prompt back
                    // to the model so it doesn't stall waiting on this tool response.
                    const chatRoot = document.getElementById('chatThread');
                    const onClick = (agentMessage, displayLabel) => {
                      appendChatEvent(`User prompt: "${displayLabel}"`);
                      if (liveSession) liveSession.sendClientContent({
                        turns: [{ role: 'user', parts: [{ text: agentMessage }] }],
                      });
                    };
                    if (choice) renderChoice(choice, chatRoot, onClick);
                    else renderReview(review, chatRoot, onClick, (markIndex) => {
                      // Carousel Prev/Next: scroll the PDF directly — no chat bubble, no model turn.
                      // Pass the review's docKey so the dropin reads the marks' storage key.
                      executeTool(tab.id, review.gotoTool, JSON.stringify({ markIndex, docKey: review.docKey }))
                        .catch((e) => console.warn('[review] goto-mark failed', e));
                    }, async (markIndex) => {
                      // "Don't redact this" — remove only that mark; no chat bubble, no model turn.
                      if (!review.skipTool) return null;
                      try {
                        const raw = await executeTool(tab.id, review.skipTool, JSON.stringify({ markIndex, docKey: review.docKey }));
                        return JSON.parse(toResultText(raw));
                      } catch (e) {
                        console.warn('[review] skip-mark failed', e);
                        return null;
                      }
                    });
                    responses.push({
                      id: fc.id, name: fc.name,
                      response: { result: (choice || review).message || (review && review.prompt) || '' },
                    });
                  } else {
                    logPrompt(`Tool "${fc.name}" result: ${result}`);
                    responses.push({
                      id: fc.id,
                      name: fc.name,
                      response: { result: result === undefined ? null : result },
                    });
                  }
                } catch (e) {
                  logPrompt(`⚠️ Error executing tool "${fc.name}": ${e.message}`);
                  responses.push({ id: fc.id, name: fc.name, response: { error: e.message } });
                }
              }
              if (responses.length > 0 && liveSession) {
                addToTrace({ userPrompt: { message: responses, config } });
                liveSession.sendToolResponse({ functionResponses: responses });
              }
            })();
          }

          if (message.serverContent?.modelTurn?.parts) {
            for (const part of message.serverContent.modelTurn.parts) {
              if (part.inlineData?.data) {
                audioScheduler.play(decode(part.inlineData.data));
              }
              if (part.text) {
                // Buffer model text; show it as the reply when the turn completes. (The picker is
                // driven by the NeedsChoice tool signal, not by the audio model emitting A2UI.)
                liveTextBuffer += part.text;
              }
            }
          }
          if (message.serverContent?.turnComplete && liveTextBuffer.trim()) {
            logPrompt(`AI result: ${liveTextBuffer.trim()}`);
            liveTextBuffer = '';
          }
          // Input transcription streams word-by-word; accumulate silently and show ONE complete
          // bubble as soon as the user's utterance ends. We flush on the first model response
          // (tool call, model text, or audio) — that means the user finished speaking — so the
          // bubble appears promptly without rendering partial words.
          if (message.serverContent?.inputTranscription?.text) {
            userTranscriptBuffer += message.serverContent.inputTranscription.text;
          }
          if (message.serverContent?.interrupted) {
            audioScheduler.clear();
          }
        },
      },
    });
  } catch (error) {
    // Full connect-time failure detail (status, response body, stack) — this is where an invalid
    // config / model / tier rejection surfaces before the session ever opens.
    console.error('[Live] ❌ live.connect() threw', error);
    console.error('[Live] error keys:', error && Object.keys(error));
    if (error?.status) console.error('[Live] HTTP status:', error.status);
    if (error?.response) console.error('[Live] response body:', error.response);
    logPrompt(`⚠️ Error starting live: ${error.message || JSON.stringify(error)}`);
    stopLive(micBtn);
  }
}

function stopLive(micBtn) {
  if (liveSession) {
    try {
      liveSession.close();
    } catch {}
    liveSession = null;
  }
  if (micCapture) {
    micCapture.stop();
    micCapture = null;
  }
  if (audioScheduler) {
    audioScheduler.clear();
    audioScheduler = null;
  }
  micBtn.classList.remove('active', 'listening', 'speaking');
  micBtn.querySelector('.mic-icon').style.display = 'block';
  micBtn.querySelector('.stop-icon').style.display = 'none';
}

function getLiveConfig(currentTools, getFormattedDate) {
  const systemInstruction = [
    'You are embedded in a browser tab.',
    'User prompts refer to the current tab.',
    'CRITICAL: Use tools for page content or interaction immediately.',
    `Today's date is: ${getFormattedDate()}`,
    // When a tool needs the user to pick a value, call the tool WITHOUT that parameter — the app
    // shows a picker in the chat. If the user states the value (or says it aloud), pass it directly.
    'For tools with a required user choice (e.g. compression quality), if the user did not specify it, call the tool without that parameter so the app can prompt; if they did, include it.',
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

  return { systemInstruction, tools: [{ functionDeclarations }] };
}
