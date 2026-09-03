/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Generic OpenAI-COMPATIBLE gateway provider — works with ANY endpoint exposing an OpenAI-style
 * /v1/chat/completions API (Adobe's internal LLM Gateway, OpenAI itself, OpenRouter, a local
 * LiteLLM proxy, etc.). Uses NATIVE function-calling (tools + tool_calls), which is far more
 * reliable than the prompt-based JSON tool-calling the Ollama provider does. Returns the same
 * { text, functionCalls } shape the sidebar's promptAI loop expects.
 *
 * apiKey/baseUrl/model are ALWAYS supplied by the caller (see sidebar.js, seeded from
 * localStorage / the gitignored .env.json) — this file has no default endpoint or embedded secret,
 * so it's safe in a public repo and works with whatever gateway the person running it configures.
 */

import { AIProvider, Chat } from './ai-provider.js';

export class GatewayProvider extends AIProvider {
  constructor(config) {
    super();
    if (!config?.baseUrl) throw new Error('GatewayProvider requires a baseUrl (e.g. your OpenAI-compatible gateway URL).');
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.defaultModel = config.model || 'gpt-4o';
  }

  createChat(options) {
    return new GatewayChat(this.apiKey, this.baseUrl, options.model || this.defaultModel);
  }

  getProviderName() { return 'gateway'; }
}

class GatewayChat extends Chat {
  constructor(apiKey, baseUrl, model) {
    super();
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.model = model;
    this.messages = []; // OpenAI-style message history
  }

  /** Convert the sidebar's tool config (Gemini-shaped functionDeclarations) to OpenAI tools. */
  static toOpenAiTools(config) {
    const decls = config?.tools?.[0]?.functionDeclarations;
    if (!Array.isArray(decls) || !decls.length) return undefined;
    return decls.map((d) => ({
      type: 'function',
      function: {
        name: d.name,
        description: d.description || '',
        parameters: d.parametersJsonSchema || { type: 'object', properties: {} },
      },
    }));
  }

  async sendMessage(params) {
    const { message, config } = params;

    // 1) Seed the system prompt once.
    if (!this.messages.some((m) => m.role === 'system') && config?.systemInstruction) {
      const sys = Array.isArray(config.systemInstruction)
        ? config.systemInstruction.join('\n') : config.systemInstruction;
      this.messages.push({ role: 'system', content: sys });
    }

    // 2) Append this turn — either tool results (array of functionResponse) or a user message.
    // OpenAI requires that EVERY tool_call in the last assistant message is answered by a `tool`
    // message with the matching tool_call_id, BEFORE any other message. The carousel/HITL flow can
    // leave a tool_call unanswered (the extension shows the picker instead of feeding a result back),
    // so on the next turn — whether it's tool results OR a plain user message (Apply/Cancel click) —
    // we first satisfy any pending tool_calls, then append the actual turn.
    // Only tool_calls that have NOT already been answered by an existing `tool` message are pending.
    // Without this, a later plain-user turn re-derives the last assistant's tool_calls and pushes a
    // SECOND `tool` reply for an already-answered call — a stray `tool` message with no preceding
    // `tool_calls`, which the gateway rejects ("messages with role 'tool' must be a response to a
    // preceding message with 'tool_calls'"). Common in the HITL/review flow (fill → card → user types).
    const answeredIds = new Set(this.messages.filter((m) => m.role === 'tool' && m.tool_call_id).map((m) => m.tool_call_id));
    const lastAssistant = [...this.messages].reverse().find((m) => m.role === 'assistant' && m.tool_calls);
    const pending = (lastAssistant?.tool_calls || []).filter((tc) => !answeredIds.has(tc.id));

    if (Array.isArray(message)) {
      message.forEach((item) => {
        const fr = item.functionResponse;
        const idx = pending.findIndex((tc) => tc.function?.name === fr.name);
        const matched = idx >= 0 ? pending.splice(idx, 1)[0] : null;
        this.messages.push({
          role: 'tool',
          tool_call_id: fr.id || matched?.id || fr.name,
          content: typeof fr.response?.result === 'string'
            ? fr.response.result : JSON.stringify(fr.response),
        });
      });
    }
    // Fill any still-unanswered tool_calls (e.g. the carousel consumed the result client-side).
    pending.forEach((tc) => this.messages.push({
      role: 'tool', tool_call_id: tc.id, content: 'ok',
    }));
    // A plain user turn goes after the tool replies.
    if (!Array.isArray(message)) {
      this.messages.push({ role: 'user', content: message });
    }

    // 3) Call the gateway. Only include tools/tool_choice when tools are actually present — OpenAI
    // rejects tool_choice on turns without tools (e.g. the follow-up after a tool result).
    const tools = GatewayChat.toOpenAiTools(config);
    const body = {
      model: this.model,
      messages: this.messages,
      ...(tools ? { tools, tool_choice: 'auto' } : {}),
    };
    const res = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`LLM Gateway error: ${res.status} ${res.statusText} ${errText.slice(0, 300)}`);
    }
    const data = await res.json();
    const choice = data.choices?.[0];
    const msg = choice?.message || {};

    // 4) Record the assistant turn so the next tool-response turn links back to its tool_calls.
    this.messages.push({
      role: 'assistant',
      content: msg.content || '',
      tool_calls: msg.tool_calls,
    });

    // 5) Normalize to the { text, functionCalls } shape the sidebar expects.
    const functionCalls = (msg.tool_calls || [])
      .filter((tc) => tc.type === 'function')
      .map((tc) => {
        let args = {};
        try { args = JSON.parse(tc.function.arguments || '{}'); } catch { /* leave {} */ }
        return { id: tc.id, name: tc.function.name, args };
      });

    return {
      text: msg.content || '',
      functionCalls,
      candidates: [{ content: { parts: [{ text: msg.content || '' }] } }],
    };
  }
}
