/*
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
 * WebMCP Form-Fill Demo — DECLARATIVE variant. 100% public, client-side, no backend.
 *
 * Difference from formfill.js (imperative): instead of registerTool('fill_form'), we build an
 * annotated <form toolname="fill_form" ...> and INJECT it into the DOM. Chrome's declarative WebMCP
 * then exposes the form's controls AS the tool's parameters — the agent fills the HTML form directly
 * and the values mirror into the real PDF (pdf-lib) so the viewer updates live.
 *
 *   T0    load PDF → PDF Embed render + pdf-lib extractFields (exact names/types/options)
 *   T0.5  detectForm() → the annotated <form> HTML.  If a gateway/Gemini key is set it is generated
 *         by the LLM (rich labels/grouping); otherwise a deterministic builder uses pdf-lib's fields.
 *   T0.6  inject the <form> into the top document → declarative WebMCP surfaces fill_form
 *   chat  agent fills the form → (toolautosubmit) submit → pdf-lib fills the PDF by name → re-render
 *         → apply_form (imperative tool / button) flattens + downloads.
 *
 * apply_form / clear_form stay imperative (a declarative form can't express "flatten & download").
 */

// --- config -----------------------------------------------------------------
const CLIENT_IDS = {
  'nitinmendiratta.github.io': '2780a56d9afe4f13b296376b7dbea070',
  localhost: 'db47fb56205a404b8a62e0c3d6c9b626',
  '127.0.0.1': 'db47fb56205a404b8a62e0c3d6c9b626',
  'git.corp.adobe.com': '161ce6779fb24b019f0872b360c1a653',
  'adobe.github.io': 'cba597bb5c9549d2a977a0d328d25216',
  // opensource.adobe.com — the actual domain github.com/adobe Pages sites are served from (the
  // org has a custom domain, so it's opensource.adobe.com/<repo-name>/, not adobe.github.io/...).
  'opensource.adobe.com': 'e2de3676f66247d1b7b3e844e5db7423',
};
const CLIENT_ID = CLIENT_IDS[location.hostname] || CLIENT_IDS['nitinmendiratta.github.io'];

const PDFJS_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174';
pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.js`;

// Real-world PDFs use CID/standard fonts that PDF.js renders BLANK unless it can fetch its CMap and
// standard-font data. (The generated sample used plain Helvetica, so it worked without these.) Point
// PDF.js at the CDN's data dirs so uploaded PDFs render text/content, not a blank page.
const pdfjsDoc = (bytes) => pdfjsLib.getDocument({
  data: bytes.slice(0),
  cMapUrl: `${PDFJS_CDN}/cmaps/`,
  cMapPacked: true,
  standardFontDataUrl: `${PDFJS_CDN}/standard_fonts/`,
}).promise;

const { PDFDocument, PDFTextField, PDFCheckBox, PDFRadioGroup, PDFDropdown, PDFOptionList, StandardFonts, rgb } = PDFLib;

// --- tiny DOM/log helpers ---------------------------------------------------
const $ = (id) => document.getElementById(id);
const logEl = $('log');
function log(msg, cls = '') {
  const d = document.createElement('div');
  d.className = `line ${cls}`;
  d.textContent = msg;
  logEl.appendChild(d);
  logEl.scrollTop = logEl.scrollHeight;
}

// --- state ------------------------------------------------------------------
let viewerApis = null;
let sourceBytes = null;
let filledBytes = null;
let fields = [];
let pageSizes = [];
let currentName = 'form.pdf';
let injectedForm = null;

// ============================================================================
// 1. Load + render (Embed, PDF.js fallback) — same building blocks as formfill.js
// ============================================================================
if (window.AdobeDC) initEmbed();
else document.addEventListener('adobe_dc_view_sdk.ready', initEmbed);

async function initEmbed() {
  const bytes = await buildSampleForm();
  await loadPdf(bytes, 'Personal Loan Application (sample).pdf');
}

async function renderInEmbed(bytes, name) {
  const container = $('adobe-dc-view');
  if (!container) return;
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  container.replaceChildren();
  container.style.overflow = 'hidden';
  const inner = document.createElement('div');
  inner.id = `dcv-${Date.now()}`;
  inner.style.height = '100%';
  container.appendChild(inner);
  try {
    const dcView = new AdobeDC.View({ clientId: CLIENT_ID, divId: inner.id });
    const preview = dcView.previewFile(
      { content: { promise: Promise.resolve(ab) }, metaData: { fileName: name, id: inner.id } },
      { showAnnotationTools: false, showDownloadPDF: true },
    );
    const adobeViewer = await Promise.race([
      preview, new Promise((_, rej) => setTimeout(() => rej(new Error('embed-timeout')), 6000)),
    ]);
    viewerApis = await adobeViewer.getAPIs();
  } catch {
    viewerApis = null;
    await renderWithPdfJs(bytes, container);
  }
}

/**
 * Render an UPDATED (filled/cleared) PDF into the viewer. We deliberately use PDF.js here rather than
 * a second PDF Embed previewFile(): Embed's multi-preview is unreliable — in some Chromium it hangs,
 * in others the 2nd preview resolves but renders BLANK (so a timeout-based fallback never fires).
 * PDF.js renders pdf-lib's filled field values consistently, so live updates always show.
 */
async function renderPreview(bytes) {
  const container = $('adobe-dc-view');
  if (container) await renderWithPdfJs(bytes, container);
}

async function renderWithPdfJs(bytes, container) {
  container.replaceChildren();
  container.style.overflow = 'auto';
  container.style.textAlign = 'center';
  const doc = await pdfjsDoc(bytes);
  for (let p = 1; p <= doc.numPages; p += 1) {
    const page = await doc.getPage(p); // eslint-disable-line no-await-in-loop
    const viewport = page.getViewport({ scale: 1.4 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width; canvas.height = viewport.height;
    canvas.style.cssText = 'max-width:96%;margin:12px auto;display:block;box-shadow:0 2px 12px rgba(0,0,0,.5);border-radius:4px';
    container.appendChild(canvas);
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise; // eslint-disable-line no-await-in-loop
  }
}

/** Render page `pageNum` to a PNG data URL (for the multimodal detect call). */
async function renderPageImage(bytes, pageNum = 1, scale = 1.3) {
  const doc = await pdfjsDoc(bytes);
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = viewport.width; canvas.height = viewport.height;
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
  return canvas.toDataURL('image/png');
}

async function loadPdf(bytes, name) {
  sourceBytes = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  filledBytes = null;
  currentName = name;
  injectedForm = null;
  await renderInEmbed(sourceBytes, name);
  log(`PDF Embed viewer ready: ${name}`);
  try {
    await readPageSizes(sourceBytes);
    fields = await extractFields(sourceBytes);
    await autoLabel(sourceBytes);
    log(`Extracted ${fields.length} field(s): ${fields.map((f) => f.name).join(', ')}`);
  } catch (e) { log(`Field extraction failed: ${e.message}`); fields = []; }
  await buildAndInjectForm(); // T0.5 + T0.6
}

async function readPageSizes(bytes) {
  const doc = await pdfjsDoc(bytes);
  pageSizes = [];
  for (let p = 1; p <= doc.numPages; p += 1) {
    const page = await doc.getPage(p); // eslint-disable-line no-await-in-loop
    const vp = page.getViewport({ scale: 1 });
    pageSizes[p - 1] = { width: vp.width, height: vp.height };
  }
}

function wireUpload() {
  const input = $('fileInput');
  if (!input) return;
  input.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) { log('Please choose a PDF file.'); return; }
    log(`Loading uploaded file: ${file.name}`);
    await loadPdf(new Uint8Array(await file.arrayBuffer()), file.name);
  });
}

// ============================================================================
// 2. pdf-lib — extract, fill, flatten (same as formfill.js)
// ============================================================================
function fieldType(f) {
  if (f instanceof PDFTextField) return 'text';
  if (f instanceof PDFCheckBox) return 'checkbox';
  if (f instanceof PDFRadioGroup) return 'radio';
  if (f instanceof PDFDropdown) return 'dropdown';
  if (f instanceof PDFOptionList) return 'optionlist';
  return 'unknown';
}
function humanize(name) {
  return String(name).replace(/[._\-\[\]]+/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ').trim().replace(/^./, (c) => c.toUpperCase());
}
async function extractFields(bytes) {
  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm();
  return form.getFields().map((f) => {
    const type = fieldType(f); const name = f.getName();
    const entry = { name, type, label: humanize(name), page: 1, rect: null };
    if (['radio', 'dropdown', 'optionlist'].includes(type)) entry.options = f.getOptions();
    try {
      const w = f.acroField.getWidgets()[0]; const r = w.getRectangle();
      entry.rect = [r.x, r.y, r.x + r.width, r.y + r.height];
      const pages = doc.getPages(); const pRef = w.dict.get(PDFLib.PDFName.of('P'));
      const idx = pages.findIndex((pg) => pg.ref === pRef); if (idx >= 0) entry.page = idx + 1;
    } catch { /* defaults */ }
    return entry;
  });
}
async function autoLabel(bytes) {
  const doc = await pdfjsDoc(bytes);
  const byPage = new Map();
  for (let p = 1; p <= doc.numPages; p += 1) {
    const page = await doc.getPage(p); // eslint-disable-line no-await-in-loop
    const content = await page.getTextContent(); // eslint-disable-line no-await-in-loop
    byPage.set(p, content.items.map((it) => ({ text: (it.str || '').trim(), x: it.transform[4], y: it.transform[5] })).filter((t) => t.text));
  }
  fields.forEach((f) => {
    if (!f.rect) return;
    const texts = byPage.get(f.page) || []; const [l, b, , t] = f.rect;
    let best = null; let bestD = Infinity;
    texts.forEach((tx) => {
      const leftOf = tx.x < l && Math.abs(tx.y - (b + t) / 2) < 14;
      const above = Math.abs(tx.x - l) < 60 && tx.y > t && tx.y - t < 26;
      if (!leftOf && !above) return;
      const d = Math.hypot(l - tx.x, (b + t) / 2 - tx.y);
      if (d < bestD) { bestD = d; best = tx.text; }
    });
    if (best) f.label = best.replace(/[:*]\s*$/, '').trim() || f.label;
  });
}
async function fillPdf(bytes, vals) {
  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm(); const applied = []; const skipped = [];
  for (const [name, value] of Object.entries(vals)) {
    let f; try { f = form.getField(name); } catch { skipped.push(name); continue; }
    const type = fieldType(f);
    try {
      if (type === 'text') form.getTextField(name).setText(String(value ?? ''));
      else if (type === 'checkbox') (value === true || /^(true|yes|checked|on|1)$/i.test(String(value))) ? form.getCheckBox(name).check() : form.getCheckBox(name).uncheck();
      else if (type === 'radio' && value) form.getRadioGroup(name).select(String(value));
      else if (type === 'dropdown' && value) form.getDropdown(name).select(String(value));
      else if (type === 'optionlist' && value) form.getOptionList(name).select(String(value));
      applied.push(name);
    } catch { skipped.push(name); }
  }
  form.updateFieldAppearances();
  return { bytes: await doc.save(), applied, skipped };
}

// ============================================================================
// 3. detectForm — T0.5: the annotated <form>. LLM Gateway if a key is set, else deterministic.
// ============================================================================
const ANTI_FAB_FORM = ' Only fill fields the user explicitly provided; do NOT invent, guess, or '
  + 'default any value (name, income, address, SSN, dates, citizenship, employment). Leave unknown '
  + 'fields blank/unchecked and ask the user for anything else before submitting.';
const ANTI_FAB_FIELD = ' Leave blank unless the user explicitly provides this value.';

const DETECT_PROMPT = `You convert a fillable PDF form into ONE self-contained HTML <form> that a browser AI agent fills via WebMCP (Chrome's declarative document.modelContext).

You are given the form's fields (each with an exact name, a type, and for choice fields the allowed options) and a rendered page image for visual context.

Output rules:
1. Return ONLY the HTML: a single <form> element. No markdown fences, no commentary, no <html>/<head>/<body>.
2. On the <form> set: toolname="fill_form" and tooldescription="<one concise sentence describing the form>".
3. Emit exactly one control per provided field. Each control's name attribute MUST equal the field's exact name from the input — never rename, prefix, or alter it. Do not invent, drop, split, or merge fields.
4. Map type: text->input[type=text]; checkbox->input[type=checkbox]; radio-> a group of input[type=radio] sharing the name, one per option (value=option); dropdown-><select> with one <option value=option> per option; optionlist-><select multiple>.
5. Give each control a human-readable <label> and add toolparamdescription="<how to fill it>" to every control. Add autocomplete where it clearly applies.
6. ANTI-FABRICATION (critical): append to tooldescription:"${ANTI_FAB_FORM}"; append to EVERY control's toolparamdescription:"${ANTI_FAB_FIELD}".
7. End with a <button type="submit">.

Fields (JSON):
`;

function gatewayConfig() {
  // Both the key AND the endpoint must be supplied by the user (localStorage or the extension). No
  // endpoint is hardcoded, so nothing internal ships in this public repo; without both, the page
  // builds the form deterministically (no LLM call).
  const key = localStorage.gatewayKey || localStorage.llmGatewayKey || '';
  const rawBase = localStorage.gatewayBaseUrl || '';
  if (!key || !rawBase) return null;
  let base = rawBase.replace(/\/$/, '');
  if (!/\/v1$/.test(base)) base += '/v1';
  return { key, base, model: localStorage.gatewayModel || 'gpt-4o' };
}

/** LLM path: OpenAI-compatible multimodal chat/completions → annotated <form> HTML. */
async function detectFormViaGateway(cfg, flds, imageDataUrl) {
  const content = [{ type: 'text', text: DETECT_PROMPT + JSON.stringify(flds, null, 2) }];
  if (imageDataUrl) content.push({ type: 'image_url', image_url: { url: imageDataUrl } });
  const res = await fetch(`${cfg.base}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cfg.key}` },
    body: JSON.stringify({ model: cfg.model, messages: [{ role: 'user', content }] }),
  });
  if (!res.ok) throw new Error(`Gateway ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const html = (data.choices?.[0]?.message?.content || '').trim();
  return html.replace(/^```(?:html)?\s*/i, '').replace(/\s*```$/i, '').trim();
}

/** Deterministic fallback: build the annotated <form> directly from pdf-lib fields (no LLM). */
function buildAnnotatedFormDeterministic(flds) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const ctrl = (f) => {
    const pd = esc(`Value for "${f.label}"${f.options ? ` — one of: ${f.options.join(', ')}` : ''}.${ANTI_FAB_FIELD}`);
    const common = `name="${esc(f.name)}" toolparamdescription="${pd}"`;
    if (f.type === 'checkbox') return `<label><input type="checkbox" ${common} /> ${esc(f.label)}</label>`;
    if (f.type === 'radio') {
      const opts = (f.options || []).map((o) => `<label><input type="radio" name="${esc(f.name)}" value="${esc(o)}" toolparamdescription="${pd}" /> ${esc(o)}</label>`).join(' ');
      return `<fieldset><legend>${esc(f.label)}</legend>${opts}</fieldset>`;
    }
    if (f.type === 'dropdown' || f.type === 'optionlist') {
      const multi = f.type === 'optionlist' ? ' multiple' : '';
      const opts = (f.options || []).map((o) => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
      return `<label>${esc(f.label)}<select ${common}${multi}><option value=""></option>${opts}</select></label>`;
    }
    return `<label>${esc(f.label)}<input type="text" ${common} /></label>`;
  };
  const body = flds.map((f) => `<div class="fld">${ctrl(f)}</div>`).join('\n');
  return `<form toolname="fill_form" tooldescription="Fill this ${flds.length}-field form.${ANTI_FAB_FORM}">\n${body}\n<button type="submit">Fill</button>\n</form>`;
}

/** Ensure the LLM/deterministic HTML is a proper declarative fill_form (toolname + autosubmit). */
function processFormHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  const form = tmp.querySelector('form');
  if (!form) return null;
  form.setAttribute('toolname', 'fill_form');
  // toolautosubmit → after the agent sets the values, the form submits, firing our handler so the
  // PDF re-renders (declarative results don't return our review signal, so submit is how we react).
  form.setAttribute('toolautosubmit', 'true');
  return form;
}

async function buildAndInjectForm() {
  const host = $('formHost');
  if (host) host.innerHTML = '<em style="color:#9aa4b2">building form…</em>';
  let html;
  const cfg = gatewayConfig();
  try {
    if (cfg) {
      log('detectForm() via LLM Gateway…', 'agent');
      const img = await renderPageImage(sourceBytes, 1).catch(() => null);
      html = await detectFormViaGateway(cfg, fields, img);
      log('✅ LLM generated the annotated form.', 'agent');
    } else {
      log('No gateway key set — building the form deterministically from pdf-lib fields.');
      html = buildAnnotatedFormDeterministic(fields);
    }
  } catch (e) {
    log(`Gateway detect failed (${e.message}); falling back to deterministic builder.`);
    html = buildAnnotatedFormDeterministic(fields);
  }
  const form = processFormHtml(html) || processFormHtml(buildAnnotatedFormDeterministic(fields));
  host.innerHTML = '';
  host.appendChild(form);
  // The form host is hidden off-screen by default (keeps the user focused on the PDF); ?showform=1
  // reveals it inline for debugging. The form stays in the DOM either way so declarative WebMCP sees it.
  if (new URLSearchParams(location.search).get('showform') === '1') host.classList.add('visible');
  injectedForm = form;
  // Live preview: manual typing fires input/change; agent fills fire submit (toolautosubmit).
  form.addEventListener('input', livePreview);
  form.addEventListener('change', livePreview);
  // Declarative WebMCP contract: when the agent calls fill_form, Chrome fills the controls and fires
  // 'submit'. If we preventDefault (to stop navigation) we MUST call event.respondWith(result) to
  // hand a tool result back — otherwise Chrome reports "called preventDefault() without respondWith()"
  // and the agent's call fails. We fill the PDF and respond with the review signal (so the extension
  // renders the Apply/Clear card even in declarative mode).
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Chrome has ALREADY set the control values before firing submit, so read them synchronously and
    // respondWith the result IMMEDIATELY — respondWith must be given the tool result during the event,
    // and this build rejects a still-pending promise (our PDF render is slow). Render in the background.
    let result;
    try {
      result = { content: [{ type: 'text', text: JSON.stringify(reviewSignalFor(readFormAnswers(form))) }] };
    } catch (err) {
      result = { content: [{ type: 'text', text: JSON.stringify({ error: String(err && err.message || err) }) }] };
    }
    if (typeof e.respondWith === 'function') { try { e.respondWith(result); } catch { /* older event shape */ } }
    fillFromForm({ download: false }); // fill + re-render the PDF in the background (not awaited)
  });
  log(`Injected <form toolname="fill_form"> with ${fields.length} control(s).`);
  await ensureFillFormDiscoverable();
}

/**
 * A purely declarative annotated <form> is only callable if the browser surfaces it in
 * document.modelContext.getTools() — which not every Chrome build does, and which the extension's
 * discovery (mc-bridge getTools) depends on. So after injecting, we CHECK whether fill_form actually
 * shows up; if not, we register an imperative fill_form with the same per-field parameters (derived
 * from pdf-lib fields + the generated form's descriptions) as a fallback. Declarative when supported,
 * imperative when not — the agent always sees fill_form either way.
 */
async function ensureFillFormDiscoverable() {
  const mc = document.modelContext || navigator.modelContext || window.modelContext;
  const status = $('mcpStatus');
  if (!mc || !mc.registerTool) { if (status) status.textContent = 'WebMCP: not available (Chrome 149+)'; return; }
  // Chrome registers a declarative annotated <form> as a tool ASYNCHRONOUSLY (a tick or two after the
  // form is added to the DOM), so a single synchronous getTools() right after injection misses it and
  // falls back too eagerly. Poll briefly first; only fall back to imperative if fill_form never shows.
  const hasFillForm = async () => {
    try { return ((await mc.getTools?.()) || []).some((t) => t.name === 'fill_form'); } catch { return false; }
  };
  for (let i = 0; i < 12; i += 1) {
    if (await hasFillForm()) { // eslint-disable-line no-await-in-loop
      if (status) status.textContent = 'WebMCP: declarative fill_form exposed ✓';
      log('Declarative fill_form is exposed by the browser ✓', 'agent');
      return;
    }
    await new Promise((r) => setTimeout(r, 150)); // eslint-disable-line no-await-in-loop
  }
  registerImperativeFillForm(mc);
  if (status) status.textContent = 'WebMCP: fill_form (imperative fallback)';
  log('Browser did not expose the declarative form as a tool — registered fill_form imperatively (same fields).', 'agent');
}

/** Build a per-field inputSchema from pdf-lib fields (+ the generated form's toolparamdescriptions). */
function fillFormSchema() {
  const props = {};
  const form = injectedForm;
  fields.forEach((f) => {
    const ctl = form && (form.elements[f.name]);
    const el = ctl && (ctl.length ? ctl[0] : ctl);
    const desc = (el && el.getAttribute && el.getAttribute('toolparamdescription')) || `${f.label}.${ANTI_FAB_FIELD}`;
    if (f.type === 'checkbox') props[f.name] = { type: 'boolean', description: desc };
    else if (f.options) props[f.name] = { type: 'string', enum: f.options, description: desc };
    else props[f.name] = { type: 'string', description: desc };
  });
  return { type: 'object', properties: props };
}

function registerImperativeFillForm(mc) {
  try {
    mc.registerTool({
      name: 'fill_form',
      description: `Fill this form. Provide only the fields the user gave, as {fieldName: value}.${ANTI_FAB_FORM}`,
      inputSchema: fillFormSchema(),
      async execute(args = {}) {
        const r = await fillFormFromAnswers(args && args.answers ? args.answers : args);
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
  } catch (e) { log(`register fill_form failed: ${e.message}`); }
}

/** Build the __webmcp_needs_review__ signal (shared by declarative submit + imperative fallback). */
function reviewSignalFor(answersObj) {
  const items = Object.keys(answersObj || {}).map((n) => {
    const f = fields.find((x) => x.name === n) || { label: n };
    return { text: `${f.label}: ${answersObj[n]}`, pages: [1] };
  });
  return {
    __webmcp_needs_review__: true, markCount: items.length, items,
    applyTool: 'apply_form', downloadTool: 'download_form', cancelTool: 'clear_form', gotoTool: 'goto_field',
    labels: { intro: `Filled ${items.length} field(s). Apply to keep editing, or apply & download — or clear.`, apply: 'Apply', download: 'Apply & download', cancel: 'Clear', skip: null },
    prompt: `Filled ${items.length} field(s). Review the form, then apply (keep editing) or apply & download.`,
  };
}

/** Imperative fill: write answers into the injected form (visual), fill the PDF, return review signal. */
async function fillFormFromAnswers(answers) {
  const names = new Set(fields.map((f) => f.name));
  const accepted = {};
  for (const [k, v] of Object.entries(answers || {})) {
    if (!names.has(k) || v === '' || v == null) continue;
    accepted[k] = v;
    const ctl = injectedForm.elements[k]; if (!ctl) continue;
    const el = ctl.length ? [...ctl] : [ctl];
    if (el[0].type === 'radio') el.forEach((r) => { r.checked = (r.value === String(v)); });
    else if (el[0].type === 'checkbox') el[0].checked = (v === true || /^(true|yes|on|1)$/i.test(String(v)));
    else el[0].value = v;
  }
  await fillFromForm({ download: false });
  return reviewSignalFor(accepted);
}

// ============================================================================
// 4. Apply the injected form's values into the real PDF (pdf-lib) + render
// ============================================================================
function readFormAnswers(formEl) {
  const out = {};
  const names = new Set(fields.map((f) => f.name));
  for (const el of formEl.elements) {
    if (!el.name || !names.has(el.name)) continue;
    // Only report what was actually set: checked boxes, selected radios, non-empty inputs. An
    // UNCHECKED box isn't a "filled" value — including false clutters the review with fields the
    // user never touched (and reads as fabrication).
    if (el.type === 'checkbox') { if (el.checked) out[el.name] = true; }
    else if (el.type === 'radio') { if (el.checked) out[el.name] = el.value; }
    else if (el.value !== '') out[el.name] = el.value;
  }
  return out;
}

let fillBusy = false; let fillQueued = false;
async function fillFromForm({ download }) {
  if (fillBusy) { fillQueued = true; return; }
  fillBusy = true;
  try {
    const form = injectedForm || $('formHost').querySelector('form');
    if (!form || !sourceBytes) return;
    const answers = readFormAnswers(form);
    const { bytes, applied, skipped } = await fillPdf(sourceBytes, answers);
    // Preview the FLATTENED bytes: some real PDFs' non-flattened field-appearance overlays render
    // blank in PDF.js (the download worked because it flattens). Flattening bakes the values into the
    // page content with a font PDF.js draws, so the preview matches the download. We keep the flattened
    // bytes as filledBytes so apply just downloads them (re-fill always starts from sourceBytes).
    const fdoc = await PDFDocument.load(bytes);
    fdoc.getForm().flatten();
    filledBytes = await fdoc.save();
    await renderPreview(filledBytes); // PDF.js — reliable for live fill updates (Embed 2nd-preview is not)
    log(`Filled ${applied.length} field(s)${skipped.length ? ', skipped ' + skipped.join(',') : ''}${download ? '' : ' (live)'}.`, 'agent');
    if (download) {
      const url = URL.createObjectURL(new Blob([filledBytes], { type: 'application/pdf' }));
      const a = document.createElement('a'); a.href = url; a.download = 'filled_form.pdf'; a.click();
      URL.revokeObjectURL(url);
      log('✅ Flattened + downloaded filled_form.pdf.', 'agent');
    }
  } catch (e) { log(`fill error: ${e.message}`); }
  finally { fillBusy = false; if (fillQueued) { fillQueued = false; fillFromForm({ download: false }); } }
}
const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };
const livePreview = debounce(() => fillFromForm({ download: false }), 400);

// Apply = commit the current values to the PDF WITHOUT downloading, so the user can keep adding more.
async function applyForm() {
  if (!injectedForm) return { applied: 0, message: 'No form yet.' };
  await fillFromForm({ download: false });
  return { applied: Object.keys(readFormAnswers(injectedForm)).length, downloaded: false };
}
// Apply & download = finalize: flatten the values and download the PDF.
async function downloadForm() {
  if (!injectedForm) return { applied: 0, message: 'No form yet.' };
  await fillFromForm({ download: true });
  return { applied: Object.keys(readFormAnswers(injectedForm)).length, downloaded: true };
}
async function clearForm() {
  log('clear_form — resetting.', 'agent');
  if (injectedForm) injectedForm.reset();
  filledBytes = null;
  await renderPreview(sourceBytes); // PDF.js — reliable (avoids Embed 2nd-preview blank/hang)
  return { cleared: true };
}

// ============================================================================
// 5. Imperative helpers a declarative form can't express: apply_form / clear_form
// ============================================================================
function registerWebMcp() {
  const mcp = document.modelContext || navigator.modelContext || window.modelContext;
  if (!mcp || !mcp.registerTool) return; // status set in buildAndInjectForm
  try {
    // Registered even in declarative mode: the system prompt tells the agent to call get_form_fields
    // first, and the declarative <form> alone doesn't provide a "list the fields" tool.
    mcp.registerTool({
      name: 'get_form_fields',
      description: `Return the fillable fields of the open form as [{name,type,label,options?}]. Call `
        + `this first, then map ONLY the values the user gave to the matching field names.${ANTI_FAB_FORM}`,
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        const out = fields.map((f) => ({ name: f.name, type: f.type, label: f.label, ...(f.options ? { options: f.options } : {}) }));
        return { content: [{ type: 'text', text: `Map only user-provided values to these field names, then call fill_form.${ANTI_FAB_FORM}\n\nFIELDS:\n${JSON.stringify(out)}` }] };
      },
    });
    mcp.registerTool({
      name: 'apply_form',
      description: 'Apply the filled values to the PDF WITHOUT downloading, so the user can keep adding '
        + 'more fields. Use when the user confirms but is not done yet.',
      inputSchema: { type: 'object', properties: {} },
      async execute() { const r = await applyForm(); return { content: [{ type: 'text', text: JSON.stringify(r) }] }; },
    });
    mcp.registerTool({
      name: 'download_form',
      description: 'Finalize: flatten the filled values into the PDF and download filled_form.pdf. Use '
        + 'when the user is done and wants the completed file.',
      inputSchema: { type: 'object', properties: {} },
      async execute() { const r = await downloadForm(); return { content: [{ type: 'text', text: JSON.stringify(r) }] }; },
    });
    mcp.registerTool({
      name: 'clear_form',
      description: 'Clear all values and reset the form to blank.',
      inputSchema: { type: 'object', properties: {} },
      async execute() { const r = await clearForm(); return { content: [{ type: 'text', text: JSON.stringify(r) }] }; },
    });
    mcp.registerTool({
      name: 'goto_field',
      description: 'Scroll to a filled field by 0-based index (drives the review carousel Prev/Next).',
      inputSchema: { type: 'object', properties: { markIndex: { type: 'integer' }, index: { type: 'integer' } } },
      async execute(args = {}) {
        const i = args.markIndex ?? args.index ?? 0; const f = fields[i];
        try { if (f) injectedForm?.elements[f.name]?.scrollIntoView?.({ block: 'center' }); } catch { /* best effort */ }
        return { content: [{ type: 'text', text: `field ${i}` }] };
      },
    });
  } catch (e) { log(`WebMCP register error: ${e.message}`); }
}

// ============================================================================
// 6. Standalone panel buttons
// ============================================================================
const SAMPLE_ANSWERS = { full_name: 'Jane Doe', email: 'jane.doe@example.com', phone: '408-555-0199', employment_status: 'Employed', annual_income: '145000', loan_amount: '25000', loan_type: 'Personal', us_citizen: true };
function wirePanel() {
  // The control panel is hidden by default (the demo is just the PDF; drive it from the extension).
  // ?panel=1 shows it for standalone/no-extension use.
  if (new URLSearchParams(location.search).get('panel') === '1') {
    const sp = $('sidePanel'); if (sp) sp.style.display = '';
  }
  const s = $('sampleBtn');
  if (s) s.onclick = () => {
    if (!injectedForm) return;
    for (const [k, v] of Object.entries(SAMPLE_ANSWERS)) {
      const els = injectedForm.elements[k]; if (!els) continue;
      const el = els.length ? els : [els];
      if (el[0].type === 'radio') { [...el].forEach((r) => { r.checked = (r.value === v); }); }
      else if (el[0].type === 'checkbox') { el[0].checked = !!v; }
      else { el[0].value = v; }
    }
    fillFromForm({ download: false });
  };
  const a = $('applyBtn2'); if (a) a.onclick = () => applyForm();
  const d = $('downloadBtn2'); if (d) d.onclick = () => downloadForm();
  const c = $('clearBtn2'); if (c) c.onclick = () => clearForm();
}

// ============================================================================
// 7. Sample fillable form (pdf-lib) — same Personal Loan Application as formfill.js
// ============================================================================
async function buildSampleForm() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([612, 792]);
  const form = doc.getForm();
  const helv = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.09, 0.1, 0.13); const muted = rgb(0.4, 0.44, 0.5);
  page.drawText('Personal Loan Application', { x: 48, y: 740, size: 20, font: bold, color: ink });
  page.drawText('Fillable AcroForm — WebMCP demo', { x: 48, y: 722, size: 10, font: helv, color: muted });
  let y = 690;
  const H = (t) => { page.drawText(t, { x: 48, y, size: 12, font: bold, color: ink }); y -= 22; };
  const rowText = (label, name, opts = {}) => {
    page.drawText(label, { x: 48, y: y + 3, size: 10, font: helv, color: ink });
    form.createTextField(name).addToPage(page, { x: 190, y, width: opts.w || 360, height: 18, borderWidth: 1, borderColor: muted });
    y -= 30;
  };
  const rowDropdown = (label, name, options) => {
    page.drawText(label, { x: 48, y: y + 3, size: 10, font: helv, color: ink });
    const dd = form.createDropdown(name); dd.addOptions(options);
    dd.addToPage(page, { x: 190, y, width: 200, height: 18, borderWidth: 1, borderColor: muted });
    y -= 30;
  };
  const rowRadio = (label, name, options) => {
    page.drawText(label, { x: 48, y: y + 3, size: 10, font: helv, color: ink });
    const rg = form.createRadioGroup(name); let x = 190;
    options.forEach((opt) => {
      rg.addOptionToPage(opt, page, { x, y, width: 12, height: 12, borderWidth: 1, borderColor: muted });
      page.drawText(opt, { x: x + 16, y: y + 1, size: 9, font: helv, color: ink });
      x += 26 + opt.length * 5.2;
    });
    y -= 30;
  };
  const rowCheck = (label, name) => {
    form.createCheckBox(name).addToPage(page, { x: 48, y, width: 12, height: 12, borderWidth: 1, borderColor: muted });
    page.drawText(label, { x: 66, y: y + 1, size: 10, font: helv, color: ink });
    y -= 24;
  };
  H('Applicant');
  rowText('Full name', 'full_name'); rowText('Email', 'email'); rowText('Phone', 'phone');
  rowText('Date of birth', 'date_of_birth', { w: 160 });
  H('Address');
  rowText('Street address', 'street_address'); rowText('City', 'city', { w: 220 });
  rowDropdown('State', 'state', ['CA', 'NY', 'TX', 'WA', 'FL', 'IL', 'MA', 'Other']);
  rowText('ZIP code', 'zip', { w: 120 });
  H('Employment & Loan');
  rowDropdown('Employment status', 'employment_status', ['Employed', 'Self-employed', 'Unemployed', 'Retired', 'Student']);
  rowText('Annual income (USD)', 'annual_income', { w: 160 });
  rowText('Loan amount (USD)', 'loan_amount', { w: 160 });
  rowRadio('Loan type', 'loan_type', ['Personal', 'Auto', 'Home', 'Student']);
  y -= 6;
  rowCheck('I am a U.S. citizen', 'us_citizen');
  rowCheck('I agree to the terms and conditions', 'agree_terms');
  return doc.save();
}

registerWebMcp();
wireUpload();
wirePanel();
