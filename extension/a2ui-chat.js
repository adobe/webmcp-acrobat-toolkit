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
 * A2UI rendering for the chat panel.
 *
 * Gemini is instructed (system prompt) to emit interactive UI as an A2UI message array wrapped in
 * <a2ui-json>...</a2ui-json> tags. This module:
 *   1. detects/extracts that block from the model's text,
 *   2. renders it in the chat thread via the bundled <a2ui-surface> custom element,
 *   3. forwards user interactions (button clicks) back to the agent as a normal user turn, so the
 *      agent re-invokes the tool and the whole flow stays in chat.
 *
 * The A2UI runtime (MessageProcessor, basicCatalog, <a2ui-surface>) comes from js-a2ui.js — an
 * esbuild bundle of @a2ui/lit + @a2ui/web_core (v0.9), produced like js-genai.js.
 */

import { MessageProcessor, basicCatalog } from './js-a2ui.js';

const OPEN_TAG = '<a2ui-json>';
const CLOSE_TAG = '</a2ui-json>';

/**
 * The currently-shown A2UI picker host, if any. Tracked so it can be dismissed when the user
 * answers by VOICE instead of clicking — the spoken answer re-invokes the tool, and we clear the
 * now-stale picker so both answer paths (click / speak) look consistent.
 */
let activePickerHost = null;

/** Remove the on-screen A2UI picker (e.g. after a spoken answer supersedes it). No-op if none. */
export function dismissActivePicker() {
  if (activePickerHost) {
    activePickerHost.remove();
    activePickerHost = null;
  }
}

/**
 * System-prompt instruction shared by the text and voice paths: render a fixed choice as an A2UI
 * message array (wrapped in <a2ui-json> tags) instead of asking in plain text. Per the A2UI v0.9
 * basic catalog, a Button has no text prop — its label is a Text child referenced by `child` — and
 * carries the `action`; the chosen value goes in each option Button's action.event.context.
 */
export const A2UI_INSTRUCTION = [
  'INTERACTIVE CHOICES (A2UI): When you need the user to pick one option from a fixed set',
  '(e.g. compression quality high/medium/low, or an export format), do NOT ask in plain text.',
  'Instead emit an A2UI message array wrapped in <a2ui-json> and </a2ui-json> tags.',
  'Rules: the JSON is a single raw array; the "root" component is first; parents precede children;',
  'a Button has no text property — its label is a Text child referenced by "child" — and the Button',
  'carries the "action". Put the chosen value directly in each option Button\'s action.event.context',
  'so one click submits that choice (do not require a separate ChoicePicker+submit for a single pick).',
  'Use action.event.name = the tool to run, and include the chosen parameter in context.',
  'EXAMPLE for a redaction category:',
  '<a2ui-json>[' +
    '{"version":"v0.9","createSurface":{"surfaceId":"pick","catalogId":"https://a2ui.org/specification/v0_9/catalogs/basic/catalog.json"}},' +
    '{"version":"v0.9","updateComponents":{"surfaceId":"pick","components":[' +
      '{"id":"root","component":"Column","children":["q","b-names","b-emails","b-all"]},' +
      '{"id":"q","component":"Text","variant":"body","text":"What should I redact?"},' +
      '{"id":"b-names","component":"Button","child":"t-names","variant":"primary","action":{"event":{"name":"redact_regions","context":{"category":"names"}}}},' +
      '{"id":"t-names","component":"Text","text":"Names"},' +
      '{"id":"b-emails","component":"Button","child":"t-emails","action":{"event":{"name":"redact_regions","context":{"category":"emails"}}}},' +
      '{"id":"t-emails","component":"Text","text":"Emails"},' +
      '{"id":"b-all","component":"Button","child":"t-all","action":{"event":{"name":"redact_regions","context":{"category":"sensitive info"}}}},' +
      '{"id":"t-all","component":"Text","text":"Everything sensitive"}' +
    ']}}' +
  ']</a2ui-json>',
  'After the user picks, you will receive their selection; then call the tool with that value.',
].join('\n');

function capitalize(v) {
  return v.length ? v[0].toUpperCase() + v.slice(1) : v;
}

/**
 * Lock the picker after a choice so it can't be clicked again, and return the clicked button's
 * visible label text (so we can echo exactly what the user picked, e.g. "Medium — balanced").
 * Buttons render in the surface's shadow DOM; we find the one matching the clicked component id.
 */
function lockPicker(host, sourceComponentId) {
  host.classList.add('a2ui-locked');
  const surfaceEl = host.querySelector('a2ui-surface');
  const root = surfaceEl?.shadowRoot ?? host;
  let clickedLabel = '';
  root.querySelectorAll('button').forEach((b) => {
    const id = b.dataset.componentId || b.getAttribute('data-id') || b.id;
    if (id && id === sourceComponentId) clickedLabel = b.textContent.trim();
    b.disabled = true;
  });
  return clickedLabel;
}

/** True when the model's text contains an A2UI block. */
export function hasA2ui(text) {
  return typeof text === 'string' && text.includes(OPEN_TAG) && text.includes(CLOSE_TAG);
}

/** Any conversational text outside the A2UI block (shown as a normal assistant bubble). */
export function stripA2ui(text) {
  const start = text.indexOf(OPEN_TAG);
  const end = text.indexOf(CLOSE_TAG);
  if (start === -1 || end === -1) return text;
  return (text.slice(0, start) + text.slice(end + CLOSE_TAG.length)).trim();
}

/** Extract + parse the A2UI message array from the tagged block. Returns null on parse failure. */
function extractMessages(text) {
  const start = text.indexOf(OPEN_TAG);
  const end = text.indexOf(CLOSE_TAG);
  if (start === -1 || end === -1) return null;
  const json = text.slice(start + OPEN_TAG.length, end).trim();
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    console.error('[A2UI] Failed to parse A2UI JSON', err, json);
    return null;
  }
}

/**
 * Normalize a WebMCP tool result to its text string. A tool may return a plain string (our internal
 * transport) or the standard MCP shape { content: [{ type:'text', text }] } (e.g. the public redact
 * demo). parseNeedsChoice/Review expect a string, so callers normalize with this first.
 */
export function toResultText(result) {
  if (result == null) return '';
  // Unwrap the standard MCP shape { content: [{ type:'text', text }] } to its concatenated text.
  const unwrap = (obj) => obj.content
    .filter((c) => c && (c.type === 'text' || typeof c.text === 'string'))
    .map((c) => c.text)
    .join('\n');
  if (typeof result === 'object' && Array.isArray(result.content)) return unwrap(result);
  if (typeof result === 'string') {
    // The content-script bridge JSON-stringifies the whole result, so a { content:[...] } object
    // arrives here as a STRING. Parse it and unwrap so the inner text (which may carry the
    // __webmcp_needs_review__ signal) is exposed. Non-JSON strings pass through unchanged.
    try {
      const parsed = JSON.parse(result);
      if (parsed && Array.isArray(parsed.content)) return unwrap(parsed);
    } catch { /* plain string — use as-is */ }
    return result;
  }
  try { return JSON.stringify(result); } catch { return String(result); }
}

/**
 * Detect the transport's structured "needs choice" signal (a JSON tool result with
 * __webmcp_needs_choice__). Returns the parsed NeedsChoice or null. This is how the picker fires
 * reliably in BOTH text and voice — we don't depend on the model emitting A2UI itself.
 */
export function parseNeedsChoice(toolResultText) {
  if (typeof toolResultText !== 'string' || !toolResultText.includes('__webmcp_needs_choice__')) {
    return null;
  }
  try {
    const obj = JSON.parse(toolResultText);
    return obj && obj.__webmcp_needs_choice__ ? obj : null;
  } catch {
    return null;
  }
}

/**
 * Build an A2UI message array (one Button per option, value in action.event.context) from a
 * NeedsChoice signal, so the same renderA2ui path draws it. Mirrors the schema in A2UI_INSTRUCTION.
 */
function buildA2uiFromChoice(choice) {
  const buttonIds = choice.options.map((_, i) => `b${i}`);
  const components = [
    { id: 'root', component: 'Column', children: ['q', ...buttonIds] },
    { id: 'q', component: 'Text', variant: 'body', text: choice.title || choice.message },
  ];
  choice.options.forEach((opt, i) => {
    components.push({
      id: buttonIds[i],
      component: 'Button',
      child: `t${i}`,
      variant: i === 0 ? 'primary' : 'default',
      action: { event: { name: choice.toolName, context: { [choice.param]: opt.value } } },
    });
    components.push({ id: `t${i}`, component: 'Text', text: opt.label });
  });
  return [
    { version: 'v0.9', createSurface: { surfaceId: 'pick', catalogId: basicCatalog.id } },
    { version: 'v0.9', updateComponents: { surfaceId: 'pick', components } },
  ];
}

/**
 * Render a picker directly from a NeedsChoice signal (used for both text and voice). onAction is
 * called with (agentMessage, displayLabel) when the user clicks — same contract as renderA2ui.
 */
export function renderChoice(choice, chatRoot, onAction) {
  return renderA2uiMessages(buildA2uiFromChoice(choice), chatRoot, onAction);
}

/**
 * Detect the redact review signal (__webmcp_needs_review__): the tool placed marks and is asking
 * the user to Apply or Cancel. Returns the parsed review descriptor or null.
 */
export function parseNeedsReview(toolResultText) {
  if (typeof toolResultText !== 'string' || !toolResultText.includes('__webmcp_needs_review__')) {
    return null;
  }
  try {
    const obj = JSON.parse(toolResultText);
    return obj && obj.__webmcp_needs_review__ ? obj : null;
  } catch {
    return null;
  }
}

/**
 * Build the A2UI carousel surface for one mark at position `index`: a "Mark N of M — text (page P)"
 * line, Prev/Next navigation, and Apply/Cancel. Prev/Next carry __review__:'prev'/'next'; Apply and
 * Cancel carry 'apply'/'cancel'. Buttons that would go out of range are omitted.
 */
function buildA2uiFromReview(review, index) {
  const items = Array.isArray(review.items) ? review.items : [];
  const total = items.length;
  const it = items[index] || {};

  // Intro line — ALWAYS derived from the current (live) total, never the stale review.prompt set at
  // creation time: skip_mark shrinks review.items in place, and the intro must track that shrink
  // ("Marked 6..." must become "Marked 5..." after a skip), not freeze at the original count.
  const intro = total
    ? `Marked ${total} item(s) for redaction. Review, then redact all — or cancel.`
    : 'No marks to review.';
  const term = it.text ? `“${it.text}”` : '';

  // Inline pager row:  Prev   N of M   Next  — flank a centered "index of total". No page-number
  // indicator here (removed — the mark's own text/position already carries that context).
  const pagerChildren = [];
  const pagerComponents = [];
  if (index > 0) {
    pagerChildren.push('b-prev');
    pagerComponents.push(
      { id: 'b-prev', component: 'Button', child: 't-prev',
        action: { event: { name: review.gotoTool, context: { __review__: 'prev' } } } },
      { id: 't-prev', component: 'Text', text: 'Prev' },
    );
  }
  pagerChildren.push('pg-count');
  pagerComponents.push({ id: 'pg-count', component: 'Text', variant: 'body', text: `${index + 1} of ${total || 1}` });
  if (index < total - 1) {
    pagerChildren.push('b-next');
    pagerComponents.push(
      { id: 'b-next', component: 'Button', child: 't-next',
        action: { event: { name: review.gotoTool, context: { __review__: 'next' } } } },
      { id: 't-next', component: 'Text', text: 'Next' },
    );
  }

  // Action row: primary "Redact all" + secondary "Cancel", SIDE BY SIDE.
  const rootChildren = [
    'intro',
    ...(term ? ['term'] : []),
    'pager',
    'actions',
  ];
  const components = [
    { id: 'root', component: 'Column', children: rootChildren },
    { id: 'intro', component: 'Text', variant: 'body', text: intro },
    // NOTE: neither heading variants (render as literal "####") nor markdown bold (renders as
    // literal "**...**") work in this A2UI build — this catalog doesn't run the markdown directive
    // on Text. Plain body text; the quoted term still reads clearly without it.
    ...(term ? [{ id: 'term', component: 'Text', variant: 'body', text: term }] : []),
    // Explicit justify/align: the catalog's Row defaults to align:'stretch' (not 'center'), and
    // without an explicit justify it doesn't reliably keep mixed Button+Text children on one line —
    // relying only on our own ::part(row) CSS override wasn't enough (Prev/count/Next were wrapping).
    { id: 'pager', component: 'Row', children: pagerChildren, justify: 'center', align: 'center' },
    ...pagerComponents,
    // Three distinct actions: Apply (redact all), "Don't redact this" (skipTool — drop ONLY the mark
    // on screen, no chat bubble, carousel stays open), and Cancel (cancelTool — drop the WHOLE review,
    // no marks redacted). Skip falls back to acting like Cancel only if the host truly has no skipTool.
    { id: 'actions', component: 'Row', children: ['b-apply', 'b-skip', 'b-cancel'], justify: 'start', align: 'center' },
    { id: 'b-apply', component: 'Button', child: 't-apply', variant: 'primary',
      action: { event: { name: review.applyTool, context: { __review__: 'apply' } } } },
    { id: 't-apply', component: 'Text', text: `Redact ${total || 'all'}` },
    { id: 'b-skip', component: 'Button', child: 't-skip',
      action: { event: { name: review.skipTool || review.cancelTool, context: { __review__: review.skipTool ? 'skip' : 'cancel' } } } },
    { id: 't-skip', component: 'Text', text: "Don't redact this" },
    { id: 'b-cancel', component: 'Button', child: 't-cancel',
      action: { event: { name: review.cancelTool, context: { __review__: 'cancel' } } } },
    { id: 't-cancel', component: 'Text', text: 'Cancel' },
  ];
  return [
    { version: 'v0.9', createSurface: { surfaceId: 'review', catalogId: basicCatalog.id } },
    { version: 'v0.9', updateComponents: { surfaceId: 'review', components } },
  ];
}

/**
 * Render the redact review as a carousel — one mark at a time with Prev/Next (side by side) plus
 * Apply / "Don't redact this" / Cancel-all. Prev/Next are pure navigation: they scroll the PDF via
 * onNavigate(markIndex) — a direct, silent tool call — and re-render in place, no chat/agent turn.
 * "Don't redact this" removes ONLY the currently-shown mark via onSkip(markIndex) and refreshes the
 * carousel's item list/count in place (still no chat bubble — it's an edit, not a decision to log).
 * Apply/Cancel-all DO record to chat and drive the agent, via onAction.
 *
 * A2UI surfaces are fully mutable at runtime: replacing the host and re-processing the message array
 * is how every update here happens (Prev/Next, skip, and the initial render all go through the same
 * `render()`), so shrinking the item list and updating "N of M" live is the same mechanism already in
 * use, not a special case.
 *
 * @param onNavigate  (markIndex) => void — scroll the PDF to that mark silently (no chat/agent).
 * @param onSkip      (markIndex) => Promise<{items, ...}> — remove that one mark; resolves with the
 *                    UPDATED review data (fresh items array) so the carousel can refresh in place.
 */
export function renderReview(review, chatRoot, onAction, onNavigate, onSkip) {
  // `review` and its item count are mutable — skip shrinks review.items in place, so subsequent
  // renders reflect the smaller set and updated "N of M" without a fresh renderReview() call.
  const state = { index: 0, busy: false };
  let host = null;

  const total = () => (Array.isArray(review.items) ? review.items.length : 0);

  const render = () => {
    // Replace the previous carousel host so Prev/Next/skip update in place rather than stacking.
    if (host) host.remove();
    if (!total()) { hideNoMoreMarks(); return; } // nothing left to review — collapse the carousel
    host = renderA2uiHost(buildA2uiFromReview(review, state.index), chatRoot, async (agentMessage, displayLabel, action) => {
      const kind = action?.context?.__review__;
      // Guard against overlapping clicks while an async skip is in flight: the OLD surface (with
      // stale review.items/state.index closed over its own click handler) stays clickable until the
      // new render() replaces it, so a fast double-click can act on the pre-skip data. Ignore clicks
      // until the in-flight one settles.
      if (state.busy) return;
      if (kind === 'next' || kind === 'prev') {
        // Navigation only: advance the index, scroll the PDF silently, re-render. No chat, no agent.
        state.index = Math.max(0, Math.min(total() - 1, state.index + (kind === 'next' ? 1 : -1)));
        onNavigate?.(state.index);
        render();
        return;
      }
      if (kind === 'skip') {
        // Remove just this mark, refresh the item list/count in place. No chat bubble — this is an
        // in-review edit, not an apply/cancel decision worth logging.
        state.busy = true;
        try {
          const updated = await onSkip?.(state.index);
          if (updated && Array.isArray(updated.items)) review.items = updated.items;
          state.index = Math.min(state.index, Math.max(0, total() - 1));
        } finally {
          state.busy = false;
        }
        render();
        return;
      }
      const isApply = kind === 'apply';
      const instruction = isApply
        ? `Apply the redactions by calling ${action.name}.`
        : `Cancel the redaction by calling ${action.name}.`;
      // Apply/Cancel are terminal for this review card — remove it now rather than leaving a locked,
      // disabled carousel sitting in the chat once the decision's been made and handed to the agent.
      if (host) { host.remove(); host = null; }
      onAction(instruction, isApply ? 'Apply Redactions' : 'Cancel');
    });
  };

  const hideNoMoreMarks = () => { /* host already removed above; nothing further to render */ };

  render();
  return !!host;
}

/**
 * Render the A2UI block from `text` into `chatRoot`. `onAction(actionText)` is called with a
 * human-readable description of the user's interaction, to be sent to the agent as the next turn.
 * Returns true if an A2UI surface was rendered.
 */
export function renderA2ui(text, chatRoot, onAction) {
  const messages = extractMessages(text);
  if (!messages) return false;
  return renderA2uiMessages(messages, chatRoot, onAction);
}

/** Core renderer: takes a parsed A2UI message array and draws it, wiring click → onAction. */
function renderA2uiMessages(messages, chatRoot, onAction) {
  return !!renderA2uiHost(messages, chatRoot, onAction);
}

/**
 * Like renderA2uiMessages but returns the host DOM element (or null on failure) instead of a
 * boolean. Callers that re-render in place — e.g. the redact carousel stepping Prev/Next — use the
 * returned host to remove the previous surface before drawing the next.
 */
function renderA2uiHost(messages, chatRoot, onAction) {
  if (!messages) return null;

  // Host element created up front so the click callback (below) can reference it.
  const host = document.createElement('div');
  host.className = 'a2ui-host';

  // One processor per rendered surface; the action callback fires on button clicks.
  const processor = new MessageProcessor([basicCatalog], async (action) => {
    // action: { name, surfaceId, sourceComponentId, context }. context bindings are already
    // resolved to concrete values by the renderer.
    const ctx = action.context || {};
    const values = Object.values(ctx).filter((v) => v != null && v !== '');

    // Lock the picker and grab the exact label the user clicked (e.g. "Medium — balanced").
    const clickedLabel = lockPicker(host, action.sourceComponentId);
    activePickerHost = null; // answered by click; no longer the pending picker

    // What the agent receives: a natural instruction it can act on (re-invoke the tool).
    const agentMessage = values.length
      ? `I choose ${values.join(', ')}. Please proceed by calling ${action.name} with ${JSON.stringify(ctx)}.`
      : `I choose ${action.name}.`;
    // What the user sees in chat: the button label they clicked, verbatim (falls back to the value).
    const displayLabel = clickedLabel || capitalize(String(values[0] ?? action.name));

    // Third arg (raw action) lets specialized callers (e.g. redact review) branch on which button
    // was clicked; the choice/A2UI callers ignore it.
    onAction(agentMessage, displayLabel, action);
  });

  let rendered = null;
  processor.onSurfaceCreated((surface) => { rendered = surface; });
  processor.processMessages(messages);

  if (!rendered) {
    console.warn('[A2UI] No surface created from messages', messages);
    return null;
  }

  const surfaceEl = document.createElement('a2ui-surface');
  // The custom element takes the surface object as a property.
  surfaceEl.surface = rendered;
  host.appendChild(surfaceEl);
  // A newly shown picker supersedes any previous one; track it so a spoken answer can dismiss it.
  dismissActivePicker();
  activePickerHost = host;
  chatRoot.appendChild(host);
  chatRoot.scrollTop = chatRoot.scrollHeight;
  return host;
}
