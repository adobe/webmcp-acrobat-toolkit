/**
 * Main-world bridge for document.modelContext (Adobe POC).
 *
 * Runs in the PAGE's main world (injected by content.js) so it can access document.modelContext,
 * which the isolated content script cannot. Handles getTools / executeTool requests over
 * window.postMessage and normalizes the tool shape to what the extension's sidebar expects
 * ({ name, description, inputSchema }).
 */
(function mcBridge() {
  const mc = document.modelContext || navigator.modelContext || window.modelContext;

  // Normalize a tool object to { name, description, inputSchema } (inputSchema as a JSON STRING,
  // matching what the sidebar's parametersJsonSchema/JSON.parse path expects).
  function normalizeTool(t) {
    const schema = t.inputSchema ?? t.parametersJsonSchema ?? t.parameters ?? { type: 'object', properties: {} };
    return {
      name: t.name,
      description: t.description || '',
      inputSchema: typeof schema === 'string' ? schema : JSON.stringify(schema),
    };
  }

  async function getTools() {
    if (!mc || !mc.getTools) return [];
    const tools = await mc.getTools();
    return (tools || []).map(normalizeTool);
  }

  async function executeTool(name, inputArgs) {
    if (!mc || !mc.executeTool) throw new Error('document.modelContext.executeTool unavailable');
    // executeTool wants the RegisteredTool object, not the name string — find it by name.
    const tools = await mc.getTools();
    const tool = (tools || []).find((t) => t.name === name);
    if (!tool) throw new Error(`Tool not found: ${name}`);
    const argsObj = typeof inputArgs === 'string' ? JSON.parse(inputArgs || '{}') : (inputArgs || {});
    const argsStr = JSON.stringify(argsObj);

    // Chrome's document.modelContext.executeTool arg format varies by build. "Failed to parse input
    // arguments" means we passed the wrong shape — so try the known variants until one works.
    const attempts = [
      () => mc.executeTool(tool, argsObj), // (tool, objectArgs)
      () => mc.executeTool(tool, argsStr), // (tool, jsonStringArgs)
      () => mc.executeTool(tool.name, argsObj), // (name, objectArgs)
      () => mc.executeTool(tool.name, argsStr), // (name, jsonStringArgs)
      () => mc.executeTool({ name: tool.name, arguments: argsObj }), // ({name, arguments})
      () => mc.executeTool(tool, { arguments: argsObj }), // (tool, {arguments})
    ];
    let lastErr;
    for (const attempt of attempts) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const result = await attempt();
        console.debug('[WebMCP bridge] executeTool succeeded via variant');
        return result; // sidebar's toResultText() unwraps { content:[{text}] } or strings.
      } catch (e) {
        lastErr = e;
        // Only keep trying on the "bad arg shape" error; rethrow anything else immediately.
        if (!/parse input arguments|invalid|argument/i.test(e?.message || '')) throw e;
      }
    }
    throw lastErr || new Error('executeTool failed');
  }

  window.addEventListener('message', async (event) => {
    if (event.source !== window || !event.data || event.data.__mcBridge !== 'request') return;
    const { id, op, payload } = event.data;
    const respond = (ok, result, error) => window.postMessage(
      { __mcBridge: 'response', id, ok, result, error }, '*',
    );
    try {
      if (op === 'getTools') respond(true, await getTools());
      else if (op === 'executeTool') respond(true, await executeTool(payload.name, payload.inputArgs));
      else respond(false, null, `unknown op: ${op}`);
    } catch (e) {
      respond(false, null, e && e.message ? e.message : String(e));
    }
  });

  // Notify the content script of tool changes so it re-lists.
  if (mc && typeof mc.addEventListener === 'function') {
    try { mc.addEventListener('toolchange', () => window.postMessage({ __mcBridge: 'toolchange' }, '*')); } catch { /* optional */ }
  }

  console.debug('[WebMCP bridge] main-world bridge ready; modelContext present:', !!mc);
}());
