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
 * WebMCP Form-Fill Demo — 100% public, client-side, no backend.
 *
 * Building blocks (all public, sibling to redact.js):
 *   - Adobe PDF Embed API  → render the PDF live (source, and again after each fill so the user
 *                            SEES the form populate), gotoLocation() to a field, download the result.
 *   - pdf-lib (MPL/MIT)    → extract AcroForm fields, write values back into them, flatten. This is
 *                            the public stand-in for the internal AcroForm/editAcroFormField APIs.
 *   - PDF.js (Mozilla)     → page sizes + text, used to (a) place a "goto field" scroll and
 *                            (b) auto-label cryptic field names from nearby text for the agent.
 *   - WebMCP               → registers get_form_fields / fill_form / goto_field / apply_form /
 *                            clear_form on document.modelContext so a browser AI agent can drive it.
 *                            A built-in "fill with sample data" button calls the SAME functions.
 *
 * Field NAME is the join key: the agent fills {fieldName: value}, and pdf-lib writes to the AcroForm
 * field of that exact name — 1:1, no fuzzy mapping. The agent must fill ONLY values the user gave
 * (anti-fabrication is baked into the tool descriptions + the extension's system prompt).
 */

// --- config -----------------------------------------------------------------
// Same public, domain-locked PDF Embed client IDs as the redact demo (see redact.js for the note on
// why localhost needs its own credential). Keyed on hostname.
const CLIENT_IDS = {
  'nitinmendiratta.github.io': '2780a56d9afe4f13b296376b7dbea070',
  localhost: 'db47fb56205a404b8a62e0c3d6c9b626',
  '127.0.0.1': 'db47fb56205a404b8a62e0c3d6c9b626',
  'git.corp.adobe.com': '161ce6779fb24b019f0872b360c1a653',
  'adobe.github.io': 'cba597bb5c9549d2a977a0d328d25216',
};
const CLIENT_ID = CLIENT_IDS[location.hostname] || CLIENT_IDS['nitinmendiratta.github.io'];

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

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
let viewerApis = null;      // PDF Embed viewer APIs (gotoLocation, ...)
let sourceBytes = null;     // original PDF bytes (Uint8Array) — the blank form
let filledBytes = null;     // latest filled PDF bytes (Uint8Array), NOT flattened (values live in fields)
let fields = [];            // [{ name, type, options?, label, page, rect:[l,b,r,t] }]
let answers = {};           // accumulated { fieldName: value } the agent/user has provided
let pageSizes = [];         // [{ width, height }] per page from PDF.js
let currentName = 'form.pdf';

// The side panel is hidden by default (the extension drives everything). Show it with ?panel=1.
if (new URLSearchParams(location.search).get('panel') === '1') {
  const sp = document.getElementById('sidePanel');
  if (sp) sp.style.display = '';
}

// ============================================================================
// 1. PDF Embed render + PDF.js/pdf-lib load
// ============================================================================
// The viewer SDK fires adobe_dc_view_sdk.ready once. This module is deferred, so the event may have
// ALREADY fired by the time we run — in that case window.AdobeDC is set, so call initEmbed directly.
if (window.AdobeDC) initEmbed();
else document.addEventListener('adobe_dc_view_sdk.ready', initEmbed);

async function initEmbed() {
  // No public sample fillable form exists on the Embed CDN, so we GENERATE a realistic loan
  // application (pdf-lib) at startup — fully self-contained, nothing to host, and it guarantees clean
  // field names the agent can map. Users can still Upload their own fillable PDF.
  const bytes = await buildSampleForm();
  await loadPdf(bytes, 'Personal Loan Application (sample).pdf');
}

/**
 * Render `bytes` into the viewer. Preferred path is Adobe PDF Embed (the polished viewer). The Embed
 * SDK, however, does not reliably resolve a SECOND previewFile() on some Chromium builds (the promise
 * just never settles), and this demo re-renders on every fill — so we race Embed against a timeout and
 * fall back to a PDF.js canvas render of the SAME filled bytes. That guarantees the user always SEES
 * the filled form (never a blank viewer), while getting the nicer Embed viewer wherever it works.
 */
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
      preview,
      new Promise((_, rej) => setTimeout(() => rej(new Error('embed-timeout')), 6000)),
    ]);
    viewerApis = await adobeViewer.getAPIs();
  } catch (e) {
    viewerApis = null; // Embed didn't render — use the reliable PDF.js canvas fallback.
    await renderWithPdfJs(bytes, container);
  }
}

/** Fallback viewer: render every page of `bytes` to a canvas via PDF.js (always works, no SDK). */
async function renderWithPdfJs(bytes, container) {
  container.replaceChildren();
  container.style.overflow = 'auto';
  container.style.textAlign = 'center';
  const doc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
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

/** Load a blank form: render it, extract fields (pdf-lib), read page sizes/labels (PDF.js). */
async function loadPdf(bytes, name) {
  sourceBytes = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  filledBytes = null;
  answers = {};
  currentName = name;
  await renderInEmbed(sourceBytes, name);
  log(`PDF Embed viewer ready: ${name}`);
  try {
    await readPageSizes(sourceBytes);
    fields = await extractFields(sourceBytes);
    await autoLabel(sourceBytes); // enrich field labels from nearby page text
    log(`Extracted ${fields.length} form field(s): ${fields.map((f) => f.name).join(', ')}`);
  } catch (e) {
    log(`Field extraction failed: ${e.message}`);
    fields = [];
  }
}

async function readPageSizes(bytes) {
  const doc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
  pageSizes = [];
  for (let p = 1; p <= doc.numPages; p += 1) {
    const page = await doc.getPage(p); // eslint-disable-line no-await-in-loop
    const vp = page.getViewport({ scale: 1 });
    pageSizes[p - 1] = { width: vp.width, height: vp.height };
  }
}

// File upload → load the chosen PDF.
function wireUpload() {
  const input = $('fileInput');
  if (!input) return;
  input.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      log('Please choose a PDF file.'); return;
    }
    log(`Loading uploaded file: ${file.name}`);
    await loadPdf(new Uint8Array(await file.arrayBuffer()), file.name);
  });
}

// ============================================================================
// 2. pdf-lib — field extraction, fill, flatten
// ============================================================================
function fieldType(f) {
  if (f instanceof PDFTextField) return 'text';
  if (f instanceof PDFCheckBox) return 'checkbox';
  if (f instanceof PDFRadioGroup) return 'radio';
  if (f instanceof PDFDropdown) return 'dropdown';
  if (f instanceof PDFOptionList) return 'optionlist';
  return 'unknown';
}

/** Turn a raw field name into a human label ("annual_income" → "Annual income"). */
function humanize(name) {
  return String(name)
    .replace(/[._\-\[\]]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

async function extractFields(bytes) {
  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm();
  return form.getFields().map((f) => {
    const type = fieldType(f);
    const name = f.getName();
    const entry = { name, type, label: humanize(name), page: 1, rect: null };
    if (['radio', 'dropdown', 'optionlist'].includes(type)) entry.options = f.getOptions();
    // widget rect + page for goto_field (best-effort).
    try {
      const w = f.acroField.getWidgets()[0];
      const r = w.getRectangle();
      entry.rect = [r.x, r.y, r.x + r.width, r.y + r.height];
      const pages = doc.getPages();
      const pRef = w.dict.get(PDFLib.PDFName.of('P'));
      const idx = pages.findIndex((pg) => pg.ref === pRef);
      if (idx >= 0) entry.page = idx + 1;
    } catch { /* leave defaults */ }
    return entry;
  });
}

/**
 * Improve labels: for each field, find the nearest PDF.js text to the LEFT or ABOVE its widget rect
 * on the same page and use it as the label. Cryptic names ("f1_01[0]") become the printed caption the
 * agent actually sees — so it maps user data to the right field. Best-effort; failures keep humanize().
 */
async function autoLabel(bytes) {
  const doc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
  const byPage = new Map();
  for (let p = 1; p <= doc.numPages; p += 1) {
    const page = await doc.getPage(p); // eslint-disable-line no-await-in-loop
    const content = await page.getTextContent(); // eslint-disable-line no-await-in-loop
    byPage.set(p, content.items.map((it) => ({
      text: (it.str || '').trim(), x: it.transform[4], y: it.transform[5],
    })).filter((t) => t.text));
  }
  fields.forEach((f) => {
    if (!f.rect) return;
    const texts = byPage.get(f.page) || [];
    const [l, b, , t] = f.rect;
    let best = null; let bestD = Infinity;
    texts.forEach((tx) => {
      const leftOf = tx.x < l && Math.abs(tx.y - (b + t) / 2) < 14;      // label to the left, same row
      const above = Math.abs(tx.x - l) < 60 && tx.y > t && tx.y - t < 26; // label just above
      if (!leftOf && !above) return;
      const d = Math.hypot(l - tx.x, (b + t) / 2 - tx.y);
      if (d < bestD) { bestD = d; best = tx.text; }
    });
    if (best) f.label = best.replace(/[:*]\s*$/, '').trim() || f.label;
  });
}

/** Write `vals` (name→value) into the form, keeping fields interactive (not flattened). */
async function fillPdf(bytes, vals) {
  const doc = await PDFDocument.load(bytes);
  const form = doc.getForm();
  const applied = []; const skipped = [];
  for (const [name, value] of Object.entries(vals)) {
    let f; try { f = form.getField(name); } catch { skipped.push(name); continue; }
    const type = fieldType(f);
    try {
      if (type === 'text') form.getTextField(name).setText(String(value ?? ''));
      else if (type === 'checkbox') (value === true || /^(true|yes|checked|on|1)$/i.test(String(value)))
        ? form.getCheckBox(name).check() : form.getCheckBox(name).uncheck();
      else if (type === 'radio' && value) form.getRadioGroup(name).select(String(value));
      else if (type === 'dropdown' && value) form.getDropdown(name).select(String(value));
      else if (type === 'optionlist' && value) form.getOptionList(name).select(String(value));
      applied.push(name);
    } catch { skipped.push(name); }
  }
  form.updateFieldAppearances(); // so PDF Embed shows the values
  return { bytes: await doc.save(), applied, skipped };
}

// ============================================================================
// 3. fill_form — apply answers, RE-RENDER the filled PDF live, ask for review
// ============================================================================
let drivenByAgent = false; // suppress the standalone panel's echo when an agent drives a tool

/** Merge new answers, fill, re-render in PDF Embed (live), return the review signal. */
async function fillForm(newAnswers, { replace = false } = {}) {
  if (replace) answers = {};
  // Only accept values for fields that actually exist — silently ignore hallucinated names.
  const names = new Set(fields.map((f) => f.name));
  const accepted = {};
  for (const [k, v] of Object.entries(newAnswers || {})) {
    if (names.has(k) && v !== '' && v != null) { answers[k] = v; accepted[k] = v; }
  }
  if (!Object.keys(accepted).length && !Object.keys(answers).length) {
    return { filled: 0, message: 'No matching fields to fill. Call get_form_fields to see valid field names.' };
  }
  const { bytes, applied, skipped } = await fillPdf(sourceBytes, answers);
  filledBytes = bytes;
  await renderInEmbed(filledBytes, currentName); // the "wow" — the viewer shows the filled form
  log(`fill_form → filled ${applied.length} field(s)${skipped.length ? ', skipped ' + skipped.join(',') : ''}`, 'agent');
  return reviewSignal();
}

/** The A2UI review signal the extension turns into an Apply/Cancel carousel (shared with redact). */
function reviewSignal() {
  const filledNames = Object.keys(answers);
  const items = filledNames.map((name) => {
    const f = fields.find((x) => x.name === name) || { label: humanize(name), page: 1 };
    return { text: `${f.label}: ${answers[name]}`, pages: [f.page || 1] };
  });
  return {
    __webmcp_needs_review__: true,
    markCount: items.length,
    items,
    applyTool: 'apply_form',
    cancelTool: 'clear_form',
    gotoTool: 'goto_field',
    // Tool-agnostic labels so the shared carousel reads as form-fill, not redaction.
    labels: {
      intro: `Filled ${items.length} field(s). Review, then apply to download — or clear.`,
      apply: `Apply & download`,
      cancel: 'Clear',
      skip: null, // no per-item skip for form fill
    },
    prompt: items.length
      ? `Filled ${items.length} field(s). Review the form, then apply to download the filled PDF.`
      : 'No fields filled yet.',
  };
}

// ============================================================================
// 4. goto_field / clear_form / apply_form
// ============================================================================
async function gotoField(index) {
  // The review carousel's index is into the FILLED items (Object.keys(answers)), in the same order as
  // reviewSignal() builds them — so resolve through that, falling back to the raw field order.
  const filledNames = Object.keys(answers);
  const name = filledNames[Number(index)];
  const f = (name && fields.find((x) => x.name === name)) || fields[Number(index)] || null;
  if (!f || !f.rect || !viewerApis) return;
  const size = pageSizes[(f.page || 1) - 1] || { width: 612, height: 792 };
  const left = Math.max(0, Math.min(Math.round(f.rect[0]), Math.floor(size.width) - 1));
  const top = Math.max(0, Math.min(Math.round(size.height - f.rect[3]), Math.floor(size.height) - 1));
  try { await viewerApis.gotoLocation(f.page || 1, left, top); }
  catch { try { await viewerApis.gotoLocation(f.page || 1); } catch { /* give up */ } }
}

async function clearForm() {
  log('clear_form — resetting the form.', 'agent');
  answers = {};
  filledBytes = null;
  await renderInEmbed(sourceBytes, currentName);
  return { cleared: true };
}

/** Flatten the filled values into static content and download. */
async function applyForm() {
  if (!filledBytes) return { applied: 0, message: 'Nothing filled yet.' };
  log('apply_form — flattening + downloading.', 'agent');
  try {
    const doc = await PDFDocument.load(filledBytes);
    doc.getForm().flatten();
    const out = await doc.save();
    const blob = new Blob([out], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'filled_form.pdf'; a.click();
    URL.revokeObjectURL(url);
    log(`Applied ${Object.keys(answers).length} field(s) → filled_form.pdf downloaded.`, 'agent');
    return { applied: Object.keys(answers).length };
  } catch (e) {
    log(`Apply failed: ${e.message}`);
    return { applied: 0, error: e.message };
  }
}

// ============================================================================
// 5. WebMCP — expose the tools to a browser AI agent
// ============================================================================
function registerWebMcp() {
  const mcp = document.modelContext || navigator.modelContext || window.modelContext;
  if (!mcp || !mcp.registerTool) {
    $('mcpStatus').textContent = 'WebMCP: not available (Chrome 149+ + origin trial)';
    return;
  }
  const ANTI_FAB = 'CRITICAL: fill ONLY fields the user explicitly provided. Do NOT invent, guess, '
    + 'or default any value (name, income, address, SSN, dates, citizenship, employment). Leave every '
    + 'field the user did not mention BLANK/unchecked, and ask the user for anything else before applying.';
  try {
    mcp.registerTool({
      name: 'get_form_fields',
      description: 'Return the fillable fields of the open PDF form as [{name,type,label,options?}]. '
        + 'Call this FIRST to learn the exact field names + printed labels, then map the user-provided '
        + 'values to the matching field NAMES and call fill_form. ' + ANTI_FAB,
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        const out = fields.map((f) => ({ name: f.name, type: f.type, label: f.label, ...(f.options ? { options: f.options } : {}) }));
        const instruction = 'These are the fillable fields. Map ONLY the values the user actually '
          + 'gave to the matching field "name" and call fill_form({answers:{name:value}}). ' + ANTI_FAB;
        return { content: [{ type: 'text', text: `${instruction}\n\nFIELDS:\n${JSON.stringify(out)}` }] };
      },
    });
    mcp.registerTool({
      name: 'fill_form',
      description: 'Fill the open PDF form. Pass answers as an object of {exactFieldName: value} using '
        + 'names from get_form_fields (checkbox value true/false; radio/dropdown value must be one of '
        + 'its options). The viewer updates live to show the filled form. ' + ANTI_FAB,
      inputSchema: {
        type: 'object',
        properties: {
          answers: { type: 'object', description: 'Map of exact field name → value. Only include fields the user provided.' },
        },
        required: ['answers'],
      },
      async execute(args = {}) {
        drivenByAgent = true;
        const r = await fillForm(args.answers || {});
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
    mcp.registerTool({
      name: 'goto_field',
      description: 'Scroll the viewer to a field by 0-based index (order from get_form_fields).',
      inputSchema: { type: 'object', properties: { markIndex: { type: 'integer' }, index: { type: 'integer' } } },
      async execute(args = {}) {
        await gotoField(args.markIndex ?? args.index ?? 0);
        return { content: [{ type: 'text', text: 'ok' }] };
      },
    });
    mcp.registerTool({
      name: 'apply_form',
      description: 'Flatten the filled values into the PDF and download filled_form.pdf.',
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        const r = await applyForm();
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
    mcp.registerTool({
      name: 'clear_form',
      description: 'Clear all filled values and reset the form to blank.',
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        const r = await clearForm();
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
    $('mcpStatus').textContent = 'WebMCP: 5 tools registered';
    log('WebMCP tools: get_form_fields, fill_form, goto_field, apply_form, clear_form.');
  } catch (e) {
    $('mcpStatus').textContent = 'WebMCP: registration failed';
    log(`WebMCP registration error: ${e.message}`);
  }
}

// ============================================================================
// 6. Standalone panel (no-agent path) — a "fill with sample data" convenience
// ============================================================================
const SAMPLE_ANSWERS = {
  full_name: 'Puneet Bajaj', email: 'pbajaj0023@gmail.com', phone: '408-555-0199',
  employment_status: 'Employed', annual_income: '145000', loan_amount: '25000',
  loan_type: 'Personal', us_citizen: true,
};
function wirePanel() {
  const btn = $('sampleBtn');
  if (btn) btn.onclick = async () => { drivenByAgent = false; log('Filling with sample data…', 'you'); await fillForm(SAMPLE_ANSWERS); };
  const dl = $('applyBtn2');
  if (dl) dl.onclick = () => applyForm();
  const cl = $('clearBtn2');
  if (cl) cl.onclick = () => clearForm();
}

// ============================================================================
// 7. Sample fillable form (pdf-lib) — a realistic Personal Loan Application
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
    const tf = form.createTextField(name);
    tf.addToPage(page, { x: 190, y, width: opts.w || 360, height: 18, borderWidth: 1, borderColor: muted });
    y -= 30;
  };
  const rowDropdown = (label, name, options) => {
    page.drawText(label, { x: 48, y: y + 3, size: 10, font: helv, color: ink });
    const dd = form.createDropdown(name);
    dd.addOptions(options); dd.addToPage(page, { x: 190, y, width: 200, height: 18, borderWidth: 1, borderColor: muted });
    y -= 30;
  };
  const rowRadio = (label, name, options) => {
    page.drawText(label, { x: 48, y: y + 3, size: 10, font: helv, color: ink });
    const rg = form.createRadioGroup(name);
    let x = 190;
    options.forEach((opt) => {
      rg.addOptionToPage(opt, page, { x, y, width: 12, height: 12, borderWidth: 1, borderColor: muted });
      page.drawText(opt, { x: x + 16, y: y + 1, size: 9, font: helv, color: ink });
      x += 26 + opt.length * 5.2;
    });
    y -= 30;
  };
  const rowCheck = (label, name) => {
    const cb = form.createCheckBox(name);
    cb.addToPage(page, { x: 48, y, width: 12, height: 12, borderWidth: 1, borderColor: muted });
    page.drawText(label, { x: 66, y: y + 1, size: 10, font: helv, color: ink });
    y -= 24;
  };

  H('Applicant');
  rowText('Full name', 'full_name');
  rowText('Email', 'email');
  rowText('Phone', 'phone');
  rowText('Date of birth', 'date_of_birth', { w: 160 });

  H('Address');
  rowText('Street address', 'street_address');
  rowText('City', 'city', { w: 220 });
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

// --- boot -------------------------------------------------------------------
registerWebMcp();
wireUpload();
wirePanel();
