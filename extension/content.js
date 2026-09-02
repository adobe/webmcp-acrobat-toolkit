/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 *
 * ADOBE POC NOTE: The upstream extension read tools from navigator.modelContextTesting (the
 * "WebMCP for testing" flag API). On current Chrome that API is often absent even with the flag on
 * — but the standard page API document.modelContext (getTools / executeTool / registerTool) IS
 * present. document.modelContext lives in the PAGE's main world, which a content script (isolated
 * world) can't touch directly, so we inject a tiny main-world bridge (mc-bridge.js) and talk to it
 * over window.postMessage. Falls back to navigator.modelContextTesting if that's what exists.
 */

console.debug('[WebMCP] Content script injected');

// --- inject the main-world bridge that can see document.modelContext -------------------------
(function injectBridge() {
  const s = document.createElement('script');
  s.src = chrome.runtime.getURL('mc-bridge.js');
  s.onload = () => s.remove();
  (document.head || document.documentElement).appendChild(s);
}());

// --- request/response plumbing to the bridge -------------------------------------------------
let reqId = 0;
const pending = new Map();
window.addEventListener('message', (event) => {
  if (event.source !== window || !event.data || event.data.__mcBridge !== 'response') return;
  const { id, ok, result, error } = event.data;
  const p = pending.get(id);
  if (!p) return;
  pending.delete(id);
  if (ok) p.resolve(result); else p.reject(new Error(error));
});
function callBridge(op, payload) {
  return new Promise((resolve, reject) => {
    const id = ++reqId;
    pending.set(id, { resolve, reject });
    window.postMessage({ __mcBridge: 'request', id, op, payload }, '*');
    setTimeout(() => {
      if (pending.has(id)) { pending.delete(id); reject(new Error('bridge timeout')); }
    }, 15000);
  });
}

// --- extension message handling --------------------------------------------------------------
chrome.runtime.onMessage.addListener(({ action, name, inputArgs }, _, reply) => {
  (async () => {
    try {
      if (action === 'LIST_TOOLS') {
        await listTools();
        // Re-list on tool changes (bridge forwards a 'toolchange' notification).
      } else if (action === 'EXECUTE_TOOL') {
        console.debug(`[WebMCP] Execute tool "${name}" with`, inputArgs);
        const result = await callBridge('executeTool', { name, inputArgs });
        reply(result);
      }
    } catch (e) {
      chrome.runtime.sendMessage({ message: e.message });
      if (action === 'EXECUTE_TOOL') reply(JSON.stringify(e.message));
    }
  })();
  return true; // async reply
});

async function listTools() {
  try {
    const tools = await callBridge('getTools', {});
    console.debug(`[WebMCP] Got ${(tools || []).length} tools`, tools);
    chrome.runtime.sendMessage({ tools: tools || [], url: location.href });
  } catch (e) {
    chrome.runtime.sendMessage({ message: e.message });
  }
}

// Re-list when the page reports a tool change (bridge posts this).
window.addEventListener('message', (event) => {
  if (event.source === window && event.data && event.data.__mcBridge === 'toolchange') listTools();
});
