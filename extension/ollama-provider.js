/**
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIProvider, Chat } from './ai-provider.js';

/**
 * Pull tool calls out of a free-text Ollama reply. Local models often wrap the JSON in ```json
 * fences or add prose around it, so a greedy regex from the first `{` to the last `}` breaks on
 * any surrounding braces. Instead we scan for the first balanced `{...}` that parses and carries a
 * functionCalls array. Logs why nothing was found so the failure is visible in the console.
 */
function extractFunctionCalls(message) {
  if (!message) return [];
  // Scan every `{` and take the first balanced object that JSON.parses with a functionCalls array.
  for (let i = 0; i < message.length; i++) {
    if (message[i] !== '{') continue;
    let depth = 0;
    let inStr = false;
    let esc = false;
    for (let j = i; j < message.length; j++) {
      const ch = message[j];
      if (inStr) {
        if (esc) esc = false;
        else if (ch === '\\') esc = true;
        else if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') inStr = true;
      else if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) {
          const candidate = message.slice(i, j + 1);
          if (candidate.includes('functionCalls')) {
            try {
              const parsed = JSON.parse(candidate);
              if (Array.isArray(parsed.functionCalls)) return parsed.functionCalls;
            } catch (e) {
              console.warn('[Ollama] found a functionCalls-like block that failed to JSON.parse:', candidate, e.message);
            }
          }
          break; // this `{...}` is closed; resume scanning after it
        }
      }
    }
  }
  return [];
}

/**
 * Ollama provider implementation
 */
export class OllamaProvider extends AIProvider {
  constructor(config) {
    super();
    this.baseUrl = config.baseUrl || 'http://localhost:11434';
    this.defaultModel = config.model || 'llama2';
  }

  createChat(options) {
    return new OllamaChat(this.baseUrl, options.model || this.defaultModel);
  }

  async listModels() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }
      const data = await response.json();
      return (data.models || []).map(model => ({
        name: model.name,
        displayName: model.name
      }));
    } catch (error) {
      console.error('Failed to list Ollama models:', error);
      // Return empty array if Ollama is not available
      return [];
    }
  }

  async generateContent(params) {
    const model = params.model || this.defaultModel;
    const contents = Array.isArray(params.contents) ? params.contents : [params.contents];
    const prompt = contents.join('\n');

    const response = await fetch(`${this.baseUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        prompt,
        stream: false
      })
    });

    if (!response.ok) {
      let errorMessage = `Ollama API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage += ` - ${errorData.error}`;
        }
      } catch (e) {
        // Response body is not JSON, ignore
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return {
      text: data.response || ''
    };
  }

  getName() {
    return 'ollama';
  }
}

/**
 * Ollama chat session implementation
 */
class OllamaChat extends Chat {
  constructor(baseUrl, model) {
    super();
    this.baseUrl = baseUrl;
    this.model = model;
    this.messages = [];
  }

  async sendMessage(params) {
    const { message, config } = params;

    // Handle tool responses (array of function responses)
    if (Array.isArray(message)) {
      // Convert tool responses to text for Ollama
      const toolResponseText = message.map(item => {
        const fr = item.functionResponse;
        return `Tool "${fr.name}" result: ${JSON.stringify(fr.response)}`;
      }).join('\n');

      this.messages.push({
        role: 'user',
        content: toolResponseText
      });
    } else {
      // Regular user message
      this.messages.push({
        role: 'user',
        content: message
      });
    }

    // Build system prompt with tools information
    let systemPrompt = '';
    if (config?.systemInstruction) {
      systemPrompt = Array.isArray(config.systemInstruction)
        ? config.systemInstruction.join('\n')
        : config.systemInstruction;
    }

    // Add tools information to system prompt
    if (config?.tools?.[0]?.functionDeclarations) {
      const toolsInfo = config.tools[0].functionDeclarations.map(tool => {
        return `Tool: ${tool.name}\nDescription: ${tool.description}\nParameters: ${JSON.stringify(tool.parametersJsonSchema)}`;
      }).join('\n\n');

      systemPrompt += `\n\nAvailable tools:\n${toolsInfo}\n\n`;
      systemPrompt += 'To use a tool, your ENTIRE reply must be ONLY this JSON — no prose, no markdown, no code fences:\n';
      systemPrompt += '{"functionCalls": [{"name": "tool_name", "args": {...}}]}\n';
      systemPrompt += 'To use multiple tools, include them all in the functionCalls array.\n';
      // Local models tend to answer a confirmation ("yes", "go ahead", "apply") with prose instead
      // of re-emitting the call. Force the tool call whenever the user is asking for or confirming a
      // tool action; only answer in prose when NO tool applies at all.
      systemPrompt += 'When the user asks you to perform an action a tool covers — OR confirms one you proposed (e.g. replies "yes", "go ahead", "apply", "do it") — you MUST respond with the tool-call JSON, not a description of what you will do. Do not say you will do it; call the tool.\n';
      systemPrompt += 'Only respond in plain prose (no JSON) when no available tool applies to the request.';
    }

    // Prepare messages for Ollama
    const ollamaMessages = [];
    if (systemPrompt) {
      ollamaMessages.push({
        role: 'system',
        content: systemPrompt
      });
    }
    ollamaMessages.push(...this.messages);

    // Call Ollama chat API
    const response = await fetch(`${this.baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.model,
        messages: ollamaMessages,
        stream: false
      })
    });

    if (!response.ok) {
      let errorMessage = `Ollama API error: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage += ` - ${errorData.error}`;
        }
      } catch (e) {
        // Response body is not JSON, ignore
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    const assistantMessage = data.message?.content || '';

    // Store assistant response
    this.messages.push({
      role: 'assistant',
      content: assistantMessage
    });

    const functionCalls = extractFunctionCalls(assistantMessage);

    return {
      text: assistantMessage,
      functionCalls: functionCalls,
      candidates: [{ content: { parts: [{ text: assistantMessage }] } }]
    };
  }
}
