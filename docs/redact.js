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
 * WebMCP Redact Demo — 100% public, client-side, no backend.
 *
 * Building blocks (all public):
 *   - Adobe PDF Embed API  → render the PDF, gotoLocation(), draw shape annotations, flatten.
 *   - PDF.js (Mozilla)     → getTextContent() gives each word's coordinates (the piece PDF Embed
 *                            search doesn't expose). This is the public stand-in for the internal
 *                            getActiveResultInfo()/window.AJS text extraction.
 *   - WebMCP               → registers find_and_redact / goto_mark / apply_redactions on
 *                            document.modelContext so a browser AI agent can drive it. A built-in
 *                            keyword box calls the SAME functions so the page works without an agent.
 *
 * Coordinate note: PDF.js text is in top-left-origin viewport space; PDF Embed annotation
 * boundingBox is PDF user space (bottom-left origin). We convert with y -> (pageHeight - y).
 */

// --- config -----------------------------------------------------------------
// PDF Embed client IDs are public + domain-locked (safe to commit). The domain check includes the
// PORT, so localhost:<port> needs its OWN credential separate from the github.io one. Pick by host.
// Create a second credential with Application Domain "localhost" and paste its id below.
const CLIENT_IDS = {
  'nitinmendiratta.github.io': '2780a56d9afe4f13b296376b7dbea070',
  localhost: 'db47fb56205a404b8a62e0c3d6c9b626',
  '127.0.0.1': 'db47fb56205a404b8a62e0c3d6c9b626',
  // git.corp.adobe.com Pages (internal-only hosting for Adobe-enterprise testing).
  'git.corp.adobe.com': '161ce6779fb24b019f0872b360c1a653',
  // adobe.github.io Pages — the future public home once this project moves to github.com/adobe
  // per the Open Source Advisory Board process (repo path served at adobe.github.io/<repo-name>/,
  // but the CREDENTIAL is keyed on the hostname alone, so this covers any repo under that org).
  'adobe.github.io': 'cba597bb5c9549d2a977a0d328d25216',
};
const CLIENT_ID = CLIENT_IDS[location.hostname] || CLIENT_IDS['nitinmendiratta.github.io'];
// Absolute URL (resolved against the page) — PDF Embed needs a full URL, not a relative path.
const SAMPLE_PDF = new URL('./sample_mortgage_statement.pdf', location.href).href;
const SAMPLE_NAME = 'sample_mortgage_statement.pdf';
let FILE_ID = 'webmcp-redact-demo-doc'; // reassigned per loaded document

pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

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
let viewerApis = null;          // PDF Embed viewer APIs (gotoLocation, ...)
let annotationManager = null;   // PDF Embed annotation manager
let pageSizes = [];             // [{ width, height }] per page, from PDF.js (PDF points)
let pdfDoc = null;              // PDF.js document
let marks = [];                 // current redaction marks: [{ text, page(1-based), bbox:[l,b,r,t] }]
let carouselIndex = 0;

// The side panel is hidden by default (the extension's A2UI carousel drives everything). Show it
// with ?panel=1 for standalone use without the extension.
if (new URLSearchParams(location.search).get('panel') === '1') {
  const sp = document.getElementById('sidePanel');
  if (sp) sp.style.display = '';
}

// ============================================================================
// 1. Load PDF Embed viewer + PDF.js (both on the same sample PDF)
// ============================================================================
// This module is deferred, so the SDK's ready event may have ALREADY fired — if so window.AdobeDC is
// set and we call initEmbed directly; otherwise wait for the event.
if (window.AdobeDC) initEmbed();
else document.addEventListener('adobe_dc_view_sdk.ready', initEmbed);

function initEmbed() {
  loadPdf({ url: SAMPLE_PDF, name: SAMPLE_NAME }); // start with the bundled sample
}

/**
 * Load a PDF into BOTH PDF Embed (viewer + annotations) and PDF.js (coordinates) from the SAME
 * source. `src` is either { url, name } (bundled sample) or { bytes, name } (uploaded file).
 */
async function loadPdf(src) {
  // Clear any state from a previous document.
  marks = [];
  hideCarousel();
  const fileId = `doc-${Date.now()}`;
  FILE_ID = fileId;

  // --- PDF Embed viewer ---
  // A FRESH AdobeDC.View per load: reusing one instance for a second previewFile() throws a mobx
  // "changing observed observable outside actions" error (the SDK's store isn't reset between
  // previews). Clearing the container div + new View avoids it.
  const container = document.getElementById('adobe-dc-view');
  if (container) container.replaceChildren();
  const dcView = new AdobeDC.View({ clientId: CLIENT_ID, divId: 'adobe-dc-view' });
  const content = src.bytes
    ? { promise: Promise.resolve(src.bytes) } // uploaded: pass the ArrayBuffer
    : { location: { url: src.url } };         // sample: pass the URL
  const preview = dcView.previewFile(
    { content, metaData: { fileName: src.name, id: fileId } },
    { enableAnnotationAPIs: true, includePDFAnnotations: true, showDownloadPDF: true },
  );
  preview.then(async (adobeViewer) => {
    viewerApis = await adobeViewer.getAPIs();
    annotationManager = await adobeViewer.getAnnotationManager();
    log(`PDF Embed viewer ready: ${src.name}`);
  });

  // --- PDF.js (same bytes/url) for text coordinates ---
  try {
    const docSrc = src.bytes ? { data: src.bytes.slice(0) } : { url: src.url };
    pdfDoc = await pdfjsLib.getDocument(docSrc).promise;
    pageSizes = [];
    for (let p = 1; p <= pdfDoc.numPages; p += 1) {
      // eslint-disable-next-line no-await-in-loop
      const page = await pdfDoc.getPage(p);
      const vp = page.getViewport({ scale: 1 });
      pageSizes[p - 1] = { width: vp.width, height: vp.height };
    }
    log(`PDF.js loaded ${pdfDoc.numPages} pages (for coordinates).`);
  } catch (e) {
    log(`PDF.js load failed: ${e.message}`);
  }
}

// File upload → load the chosen PDF into both viewers.
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
    const bytes = await file.arrayBuffer();
    await loadPdf({ bytes, name: file.name });
  });
}

// ============================================================================
// 2. find_and_redact — locate keyword coordinates via PDF.js, place marks
// ============================================================================
/** Lowercase + strip diacritics so "Bodea" matches "Bodéa". */
const COMBINING_MARKS = /[̀-ͯ]/g;
const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(COMBINING_MARKS, '');

// One positioned glyph/run from PDF.js, in PDF user space (bottom-left origin).
// { text, l, b, r, t } where l/b/r/t are the left/bottom/right/top of the item's box.
function itemBox(item) {
  const x = item.transform[4];
  const yBottom = item.transform[5];
  const w = item.width;
  const h = item.height || item.transform[3] || 10;
  return { text: item.str || '', l: x, b: yBottom, r: x + w, t: yBottom + h };
}

/**
 * PDF.js often splits a word into per-glyph items ('Leg','a','c','y'). Merge items that sit on the
 * same text line (close baseline y) into line runs, each carrying the joined text plus the array of
 * its glyph boxes — so we can search whole words AND compute a box spanning the matched span.
 * Returns [{ text, glyphs:[{text,l,b,r,t}] }] per line.
 */
function buildLines(items) {
  const positioned = (items || []).map(itemBox).filter((g) => g.text.length);
  positioned.sort((a, b) => (Math.abs(a.b - b.b) > 2 ? b.b - a.b : a.l - b.l)); // top-to-bottom, left-to-right
  const lines = [];
  positioned.forEach((g) => {
    const line = lines[lines.length - 1];
    if (line && Math.abs(line.baseline - g.b) <= 3) {
      line.glyphs.push(g);
      line.text += g.text;
    } else {
      lines.push({ baseline: g.b, text: g.text, glyphs: [g] });
    }
  });
  return lines;
}

/** Box [l,b,r,t] spanning a contiguous slice of a line's glyphs. */
function spanBox(glyphs, startIdx, endIdx) {
  let l = Infinity; let b = Infinity; let r = -Infinity; let t = -Infinity;
  for (let i = startIdx; i <= endIdx && i < glyphs.length; i += 1) {
    const g = glyphs[i];
    l = Math.min(l, g.l); b = Math.min(b, g.b); r = Math.max(r, g.r); t = Math.max(t, g.t);
  }
  return [l, b, r, t];
}

/**
 * Tight box for a keyword MATCH that may fall inside a single wide text item. PDF.js often returns a
 * whole phrase ("...planning your legacy. We have...") as one item, so a per-item box would cover the
 * entire line. We instead locate the match within the item's characters and interpolate its
 * horizontal extent proportionally across the item's width (monospace-ish approximation — good
 * enough for a visible mark). `charStart`/`charEnd` are indices into the item's own text.
 */
function subBox(g, charStart, charEnd) {
  const len = (g.text || '').length || 1;
  const width = g.r - g.l;
  const l = g.l + (width * charStart) / len;
  const r = g.l + (width * (charEnd + 1)) / len;
  return [l, g.b, r, g.t];
}

/**
 * Every WORD-TIGHT box for `needle` (already normalized) within one merged line. Two cases:
 *   1. the needle lives inside a single text item → interpolate a sub-box across that item's width;
 *   2. it's split across adjacent items ('Leg','a','c','y') → span the involved glyph boxes.
 * Returns an array of [l,b,r,t] boxes.
 */
function matchInLine(line, needle) {
  if (!needle) return [];
  const boxes = [];
  line.glyphs.forEach((g) => {
    const hay = norm(g.text);
    let from = hay.indexOf(needle);
    while (from !== -1) {
      const bb = subBox(g, from, from + needle.length - 1);
      if (bb[2] > bb[0] && bb[3] > bb[1]) boxes.push(bb);
      from = hay.indexOf(needle, from + needle.length);
    }
  });
  // Only fall back to the cross-item span when no single item contained the needle (avoid dupes).
  if (!line.glyphs.some((g) => norm(g.text).includes(needle))) {
    const offsets = [];
    let acc = '';
    line.glyphs.forEach((g, gi) => { offsets.push({ start: acc.length, gi }); acc += norm(g.text); });
    let idx = acc.indexOf(needle);
    while (idx !== -1) {
      const endPos = idx + needle.length - 1;
      const startGi = offsets.filter((o) => o.start <= idx).pop()?.gi ?? 0;
      const endGi = offsets.filter((o) => o.start <= endPos).pop()?.gi ?? line.glyphs.length - 1;
      const bb = spanBox(line.glyphs, startGi, endGi);
      if (bb[2] > bb[0] && bb[3] > bb[1]) boxes.push(bb);
      idx = acc.indexOf(needle, idx + needle.length);
    }
  }
  return boxes;
}

/** Locate every occurrence of `keyword` and return marks [{text,page,bbox}]. */
async function locateKeyword(keyword) {
  if (!pdfDoc) { log('PDF.js not ready yet.'); return []; }
  const needle = norm(keyword);
  if (!needle) return [];
  const found = [];
  for (let p = 1; p <= pdfDoc.numPages; p += 1) {
    // eslint-disable-next-line no-await-in-loop
    const page = await pdfDoc.getPage(p);
    // eslint-disable-next-line no-await-in-loop
    const content = await page.getTextContent();
    buildLines(content.items).forEach((line) => {
      matchInLine(line, needle).forEach((bbox) => found.push({ text: keyword, page: p, bbox }));
    });
  }
  return found;
}

// Author tag on our annotations so we can find/replace/remove only ours.
const MARK_AUTHOR = 'Redact Agent';

/**
 * Build one highlight-subtype annotation for a mark. Shared by the two states:
 *   - review MARK: translucent red (a pending redaction)
 *   - applied REDACTION: solid opaque black (the actual black-out)
 * motivation must be 'commenting'; bodyValue is required by this SDK (empty keeps the note blank).
 * quadPoints corners are UL, UR, LL, LR in PDF user space (bottom-left origin) — no Y-flip.
 */
function buildAnnotation(m, { color, opacity }) {
  const [l, b, r, t] = m.bbox;
  return {
    '@context': ['https://www.w3.org/ns/anno.jsonld', 'https://comments.acrobat.com/ns/anno.jsonld'],
    type: 'Annotation',
    id: (crypto.randomUUID ? crypto.randomUUID() : `redact-${Date.now()}-${Math.random()}`),
    bodyValue: '',
    motivation: 'commenting',
    target: {
      source: FILE_ID,
      selector: {
        type: 'AdobeAnnoSelector',
        subtype: 'highlight',
        node: { index: m.page - 1 }, // Embed page index is 0-based
        boundingBox: m.bbox,
        quadPoints: [l, t, r, t, l, b, r, b],
        strokeColor: color,
        opacity,
      },
    },
    creator: { type: 'Person', name: MARK_AUTHOR },
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  };
}

/** REVIEW state: draw translucent RED marks over each occurrence (pending redactions). */
async function drawMarks() {
  if (!annotationManager) { log('Annotation manager not ready.'); return; }
  const annots = marks.map((m) => buildAnnotation(m, { color: '#E34850', opacity: 0.4 }));
  try {
    await annotationManager.addAnnotations(annots);
  } catch (e) {
    log(`drawMarks failed: ${e.message || JSON.stringify(e)}`);
  }
}

/** Remove every annotation we authored from the viewer. */
async function clearOurMarks() {
  const existing = await annotationManager.getAnnotations();
  const ours = (existing || []).filter((a) => a?.creator?.name === MARK_AUTHOR);
  await Promise.all(ours.map((a) => annotationManager.deleteAnnotations({ annotationIds: [a.id] })));
}

/**
 * The structured review signal a host UI (e.g. the Model Context Tool Inspector extension) detects
 * to render an interactive A2UI carousel IN THE CHAT — Mark N of M, Prev/Next, Apply/Cancel — instead
 * of showing raw JSON. Shape matches the extension's parseNeedsReview contract:
 *   { __webmcp_needs_review__, items:[{text,pages:[...]}], applyTool, cancelTool, gotoTool, prompt }
 * The demo page's own sidebar carousel is the standalone fallback; the extension uses THIS.
 */
function reviewSignal() {
  // ONE carousel item per mark (per occurrence), in the SAME order as `marks` — so the carousel's
  // index maps 1:1 to goto_mark(index) and Prev/Next steps through every individual placement (even
  // repeats of the same text on different pages), navigating the PDF to each.
  const items = marks.map((m) => ({ text: m.text, pages: [m.page] }));
  return {
    __webmcp_needs_review__: true,
    markCount: marks.length,
    items,
    applyTool: 'apply_redactions',
    cancelTool: 'cancel_redactions',
    gotoTool: 'goto_mark',
    skipTool: 'skip_mark', // remove ONE mark (the carousel's "Don't redact this") — see skipMark()
    prompt: marks.length
      ? `Marked ${marks.length} region(s) for redaction. Step through them, then apply or cancel.`
      : 'No matching text was found to redact.',
  };
}

/**
 * skip_mark — remove ONE mark (by 0-based index) from the pending review, leaving the rest. Redraws
 * the on-screen red marks and returns a fresh review signal so the carousel updates its count/items
 * in place. Returns { removed:boolean, ...reviewSignal() }.
 */
async function skipMark(markIndex) {
  const idx = Math.max(0, Math.min(marks.length - 1, Number(markIndex) || 0));
  if (!marks.length) return { removed: false, ...reviewSignal() };
  marks.splice(idx, 1);
  await clearOurMarks();
  await drawMarks();
  if (marks.length) await gotoMark(Math.min(idx, marks.length - 1));
  else hideCarousel();
  return { removed: true, ...reviewSignal() };
}

// Category-like phrases that are NOT literal document text — if the agent passes one of these to
// find_and_redact, it should have used the semantic get_document_text flow instead.
const CATEGORY_HINTS = /\b(name|names|address|addresses|email|emails|phone|phones|number|numbers|pii|sensitive|personal|account|customer|ssn|dob|birth|confidential)\b/i;

/** The tool an AI agent (or the keyword box) calls. Returns the A2UI review signal. */
async function findAndRedact(keyword) {
  log(`find_and_redact("${keyword}")`, 'agent');
  marks = await locateKeyword(keyword);
  if (!marks.length) {
    hideCarousel();
    // If the "keyword" was actually a CATEGORY (e.g. "customer names", "bank address"), the agent
    // used the wrong tool. Steer it to the semantic flow instead of a dead "not found".
    if (CATEGORY_HINTS.test(keyword)) {
      log(`"${keyword}" looks like a category, not literal text — steering to get_document_text.`, 'agent');
      return {
        redirect: true,
        message: `"${keyword}" is a category, not exact text in the document. To redact it, call `
          + 'get_document_text to read the document, then call redact_regions with the specific '
          + 'matching items. Do NOT call find_and_redact for categories.',
      };
    }
    log(`No matches for "${keyword}".`);
    return reviewSignal();
  }
  await drawMarks();
  carouselIndex = 0;
  showCarousel();
  await gotoMark(0);
  log(`Marked ${marks.length} occurrence(s) of "${keyword}". Review, then Apply.`, 'agent');
  return reviewSignal();
}

// ============================================================================
// 2b. get_document_text — hand the agent the full extracted text + coordinates.
//
// This is the key to open-ended requests ("redact all sensitive info / PII / names") that keyword
// search CANNOT do: the AGENT reads the document and decides WHAT to redact. PDF.js already gives us
// text + per-item bounds client-side, so we expose it as JSON — no backend, no proprietary API. The
// agent then calls redact_regions() with the specific items it chose.
//
// Each item carries a stable `id` so the agent can reference exactly which spans to redact without
// re-sending coordinates. Returns { pages: [{ page, width, height, items: [{id,text,bbox}] }] }.
// ============================================================================
let textIndex = new Map(); // id -> { text, page, bbox }

async function getDocumentText() {
  if (!pdfDoc) { log('PDF.js not ready yet.'); return { pages: [] }; }
  log('get_document_text() — sending extracted text + coords to the agent', 'agent');
  textIndex = new Map();
  const pages = [];
  for (let p = 1; p <= pdfDoc.numPages; p += 1) {
    // eslint-disable-next-line no-await-in-loop
    const page = await pdfDoc.getPage(p);
    // eslint-disable-next-line no-await-in-loop
    const content = await page.getTextContent();
    const size = pageSizes[p - 1] || { width: 612, height: 792 };
    // Merge per-glyph items into line runs so the agent sees whole words, each with a full box.
    const lines = buildLines(content.items);
    const items = [];
    lines.forEach((line, i) => {
      const text = line.text.trim();
      if (!text) return;
      const bbox = spanBox(line.glyphs, 0, line.glyphs.length - 1); // [l,b,r,t] for the whole line
      const id = `p${p}-${i}`;
      // Keep glyphs + full line text so redact_regions can compute a WORD-TIGHT sub-box when the
      // agent supplies a `match` substring (e.g. just the email within a line).
      textIndex.set(id, { text: line.text, page: p, bbox, glyphs: line.glyphs });
      items.push({ id, text, bbox });
    });
    pages.push({ page: p, width: size.width, height: size.height, items });
  }
  return { pages };
}

// Category matchers: given a line's text, return the substrings in it that match the category.
// This lets a WEAK model that calls redact_regions({category:"names"}) still work — the tool finds
// the PII itself instead of relying on the model to enumerate exact spans (which qwen2.5 won't do).
const PII_PATTERNS = {
  email: [/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g],
  phone: [/\b(?:\+?1[-.\s]?)?(?:\(?\d{3}\)?[-.\s]?)\d{3}[-.\s]?\d{4}\b/g, /\b\d{3}[.\s]\d{3}[.\s]\d{4}\b/g],
  ssn: [/\b\d{3}-\d{2}-\d{4}\b/g],
  account: [/\bAccount(?:\s*number)?\s*:?\s*(\d[\d-]{5,})\b/gi, /\bAcct(?:\s*ending\s*in)?\s*:?\s*(\d{4,})\b/gi],
  card: [/\b(?:\d[ -]?){13,16}\b/g],
  date: [/\b\d{2}\/\d{2}\/\d{4}\b/g],
};
// "name" / "address" are structural, not regex-friendly. We match them by heuristic below.
const NAME_LINE = /^[A-Z][A-Z'.-]+(?:\s+[A-Z][A-Z'.-]+){1,3}$/; // e.g. "NITIN MENDIRATTA"
// Full street-address / city-state-ZIP LINE forms. Unlike NAME_LINE (matches the trimmed whole
// line), this is a global regex over the raw text so on a merged multi-field line — e.g.
// "Mailing addressExample Home Lending, N.A.P.O. Box 12345Austin, TX 78701" (buildLines can merge
// several table-cell items into one line) — we extract ONLY the city/ZIP portion as the match, not
// the whole merged line. That keeps the mark tight and its page/box correct (a whole-line match can
// span glyphs whose merged box lands on the wrong visual location when the line spans a wide table).
const ADDRESS_PATTERNS = [
  /\d+\s+[A-Za-z0-9.'\s]{2,40}\b(?:St|Street|Ave|Avenue|Rd|Road|Blvd|Dr|Drive|Ln|Lane|Ct|Way)\b\.?/gi,
  /P\.?O\.?\s*Box\s*\d+/gi,
  /[A-Za-z][A-Za-z\s]{1,25},\s*[A-Z]{2}\s?\d{5}(?:-\d{4})?/g, // "Austin, TX 78701"
];

/** Return the substrings in `text` that match `category`. Empty array if none / unknown category. */
function matchCategory(text, category) {
  const cat = (category || '').toLowerCase();
  const out = [];
  const pick = (key) => (PII_PATTERNS[key] || []).forEach((re) => {
    const m = text.match(re);
    if (m) out.push(...m);
  });
  const pickAddress = () => ADDRESS_PATTERNS.forEach((re) => {
    const m = text.match(re);
    if (m) out.push(...m);
  });
  if (/email/.test(cat)) pick('email');
  if (/phone|tel|number/.test(cat)) pick('phone');
  if (/ssn|social/.test(cat)) pick('ssn');
  if (/account|acct|policy/.test(cat)) pick('account');
  if (/card|credit/.test(cat)) pick('card');
  if (/date|dob|birth/.test(cat)) pick('date');
  if (/name/.test(cat) && NAME_LINE.test(text.trim())) out.push(text.trim());
  if (/address/.test(cat)) pickAddress();
  // Broad "sensitive / pii" → try the strong patterns + names + addresses.
  if (/sensitive|pii|personal|confidential/.test(cat)) {
    ['email', 'phone', 'ssn', 'account', 'card'].forEach(pick);
    if (NAME_LINE.test(text.trim())) out.push(text.trim());
    pickAddress();
  }
  return out;
}

/** Scan the whole document (via textIndex) for a category and return marks. */
function locateByCategory(category) {
  const found = [];
  textIndex.forEach((line) => {
    matchCategory(line.text, category).forEach((sub) => {
      const boxes = matchInLine({ glyphs: line.glyphs }, norm(sub));
      boxes.forEach((bbox) => found.push({ text: sub, page: line.page, bbox }));
    });
  });
  return found;
}

/**
 * redact_regions — the agent picks spans to redact. Each region is one of:
 *   { id }                → redact that whole line item from get_document_text
 *   { id, match }         → redact only the substring `match` WITHIN that line (WORD-TIGHT box)
 *   { page, bbox, text }  → explicit coordinates
 * Also accepts a top-level { category } (e.g. "names", "emails", "bank address") — the tool finds
 * the matching PII itself, so a weak model that calls redact_regions({category}) in ONE shot works.
 */
async function redactRegions(regions, category) {
  // Does the agent have USABLE structured regions (id/match or page+bbox)? Weak models often send
  // junk like {text:"get_document_text()"} — that's NOT usable, so we fall to the category path.
  const usableRegions = (regions || []).filter(
    (r) => (r && r.id && textIndex.has(r.id)) || (r && typeof r.page === 'number' && Array.isArray(r.bbox)),
  );

  // Category path: whenever we don't have usable regions. If no category was extractable either
  // (garbage args), DEFAULT to "sensitive info" — a redact_regions call clearly means "redact PII",
  // so do the useful thing rather than nothing. This is what makes it work on a weak model.
  if (!usableRegions.length) {
    const cat = category && category.trim() ? category : 'sensitive info';
    if (textIndex.size === 0) await getDocumentText(); // ensure the text index is built
    marks = locateByCategory(cat);
    // If the "category" wasn't a recognized PII type (0 matches), it's probably a literal KEYWORD
    // the model mis-routed here (e.g. redact_regions({category:"legacy"})). Fall back to a keyword
    // search so "redact legacy" works no matter which tool the model picked.
    if (!marks.length && cat !== 'sensitive info') {
      return findAndRedact(cat);
    }
    if (!marks.length) { hideCarousel(); return { done: true, markCount: 0, message: `No ${cat} found to redact.` }; }
    await clearOurMarks();
    await drawMarks();
    carouselIndex = 0;
    showCarousel();
    await gotoMark(0);
    return { ...reviewSignal(), done: true };
  }
  const chosen = (regions || []).flatMap((r) => {
    if (r.id && textIndex.has(r.id)) {
      const line = textIndex.get(r.id);
      if (r.match) {
        // Tight box(es) around just the sensitive substring within the line.
        const boxes = matchInLine({ glyphs: line.glyphs }, norm(r.match));
        if (boxes.length) return boxes.map((bbox) => ({ text: r.match, page: line.page, bbox }));
      }
      return [{ text: line.text, page: line.page, bbox: line.bbox }]; // whole line fallback
    }
    if (typeof r.page === 'number' && Array.isArray(r.bbox)) {
      return [{ text: r.text || '', page: r.page, bbox: r.bbox }];
    }
    return [];
  });
  log(`redact_regions() — agent chose ${chosen.length} region(s)`, 'agent');
  if (!chosen.length) {
    // Nothing new — tell the agent it's finished so it stops re-calling (weak models loop otherwise).
    return { done: true, markCount: marks.length, message: 'No new regions. Redaction is complete — do NOT call redact_regions again. Tell the user to review and Apply.' };
  }
  // ACCUMULATE across calls (dedupe by page+coords) so many one-region calls build up rather than
  // overwrite. Redraw all marks together.
  const key = (m) => `${m.page}:${m.bbox.map((n) => Math.round(n)).join(',')}`;
  const seen = new Set(marks.map(key));
  chosen.forEach((m) => { if (!seen.has(key(m))) { seen.add(key(m)); marks.push(m); } });
  await clearOurMarks();
  await drawMarks();
  carouselIndex = 0;
  showCarousel();
  await gotoMark(0);
  // Return the A2UI review signal (carousel) PLUS a done:true stop hint so weak models don't loop.
  return { ...reviewSignal(), done: true };
}

// ============================================================================
// 3. goto_mark — scroll the viewer to a mark (carousel Prev/Next)
// ============================================================================
async function gotoMark(index) {
  const m = marks[index];
  if (!m || !viewerApis) return;
  // gotoLocation(pageNumber, left, top) — pageNumber is 1-BASED (this SDK rejects page 0 as
  // INVALID_INPUT). left/top are INTEGER points, but in TOP-LEFT-origin "distance from the page's
  // top edge" (screen/CSS convention) — NOT raw PDF-space y (bottom-left origin, y up). m.bbox is
  // PDF-space, so a mark near the BOTTOM of the page has a small bbox[3] (top-Y); passed straight
  // through, that small number reads as "near the TOP of the viewport", scrolling so the page's
  // bottom content sits at the top of the screen and the NEXT page spills into view below it —
  // exactly the "page 1 shows the end of page 1 + start of page 2" symptom. Convert by flipping:
  // distanceFromTop = pageHeight - pdfSpaceTopY.
  const size = pageSizes[m.page - 1] || { width: 612, height: 792 };
  const left = Math.max(0, Math.min(Math.round(m.bbox[0]), Math.floor(size.width) - 1));
  const distanceFromTop = size.height - m.bbox[3];
  const top = Math.max(0, Math.min(Math.round(distanceFromTop), Math.floor(size.height) - 1));
  try {
    await viewerApis.gotoLocation(m.page, left, top);
  } catch (e) {
    console.error('[goto] gotoLocation failed:', e, { page: m.page, left, top, size });
    try { await viewerApis.gotoLocation(m.page); } catch { /* give up */ }
  }
}

// ============================================================================
// 4. apply_redactions — flatten annotations into a downloaded PDF
// ============================================================================
async function applyRedactions() {
  if (!annotationManager || !marks.length) return { applied: 0 };
  log('apply_redactions()', 'agent');
  const applied = marks.length;
  const toApply = marks.slice();
  try {
    // addAnnotationsInPDF(list) returns a PDF buffer with those annotations BAKED IN. It also adds
    // them to the live viewer, so afterwards we delete the black ones by id — leaving only the red
    // review marks on screen while the DOWNLOAD keeps the black boxes.
    const blackAnnots = toApply.map((m) => buildAnnotation(m, { color: '#000000', opacity: 1 }));
    const result = await annotationManager.addAnnotationsInPDF(blackAnnots);
    const buffer = result?.buffer || result?.pdfBuffer || result?.arrayBuffer;
    if (buffer) {
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'redacted.pdf'; a.click();
      URL.revokeObjectURL(url);
      log(`Applied ${applied} redaction(s) → redacted.pdf downloaded (black boxes baked in).`, 'agent');
    } else {
      log(`Apply: no buffer returned. keys=${result ? Object.keys(result).join(',') : 'null'}`);
    }
    // Remove the black boxes from the LIVE viewer (they were only for the download); red marks stay.
    await Promise.all(blackAnnots.map((a) =>
      annotationManager.deleteAnnotations({ annotationIds: [a.id] }).catch(() => {})));
  } catch (e) {
    log(`Apply failed: ${e.message || JSON.stringify(e)}`);
    return { applied: 0 };
  }
  return { applied };
}

async function cancelRedactions() {
  log('cancel — removing marks.', 'agent');
  try { await clearOurMarks(); } catch { /* best effort */ }
  marks = [];
  hideCarousel();
}

// ============================================================================
// 5. Carousel UI (mirrors the extension's A2UI carousel, plain DOM here)
// ============================================================================
// When a WebMCP AGENT (the extension) drives a tool, the extension renders its OWN A2UI carousel
// from the review signal — so we suppress this page's built-in carousel to avoid showing two. The
// page carousel is only for STANDALONE use (the Find box, no extension). drivenByAgent flips true
// inside the WebMCP execute() handlers for the duration of that call.
let drivenByAgent = false;
function showCarousel() {
  if (drivenByAgent) return; // the extension shows the A2UI carousel instead
  $('carousel').classList.remove('hidden');
  renderCarousel();
}
function hideCarousel() { $('carousel').classList.add('hidden'); }
function renderCarousel() {
  const total = marks.length;
  const m = marks[carouselIndex];
  $('cHdr').textContent = `Mark ${carouselIndex + 1} of ${total}`;
  $('cDetail').textContent = m ? `"${m.text}" — page ${m.page}` : '';
  $('prevBtn').disabled = carouselIndex === 0;
  $('nextBtn').disabled = carouselIndex >= total - 1;
  $('applyBtn').textContent = `Apply ${total} redaction${total === 1 ? '' : 's'}`;
}
$('prevBtn').onclick = async () => { carouselIndex = Math.max(0, carouselIndex - 1); renderCarousel(); await gotoMark(carouselIndex); };
$('nextBtn').onclick = async () => { carouselIndex = Math.min(marks.length - 1, carouselIndex + 1); renderCarousel(); await gotoMark(carouselIndex); };
$('applyBtn').onclick = () => applyRedactions();
$('cancelBtn').onclick = () => cancelRedactions();

/**
 * Route a natural-language redaction query to the right tool — no LLM needed. This is the local
 * "agent brain": it recognizes PII CATEGORIES ("redact all PII", "redact names / emails / phone /
 * addresses / account numbers") and routes them to the category redactor; anything else is treated
 * as an EXACT keyword ("redact legacy" → find_and_redact("legacy")).
 */
async function handleQuery(query) {
  const q = query.toLowerCase();
  // Strip filler verbs so "redact all the emails please" → "emails".
  const stripped = q.replace(/\b(please|redact|remove|hide|black out|all|the|any|every|mentions? of|occurrences? of|from (the )?document|in (the )?document|pii|sensitive info(rmation)?)\b/g, '').trim();

  // Category intent — does the query mention a PII category?
  const CATEGORY_WORDS = /\b(name|names|email|emails|phone|phones|address|addresses|account|accounts|ssn|social security|card|cards|date of birth|dob|pii|sensitive|personal|confidential)\b/;
  if (CATEGORY_WORDS.test(q) || /\b(pii|sensitive|personal|confidential)\b/.test(q)) {
    // Use the matched category words (or "sensitive info" if it was a broad "redact all PII").
    const catMatch = q.match(CATEGORY_WORDS);
    const category = /\b(pii|sensitive|personal|confidential)\b/.test(q) && !catMatch
      ? 'sensitive info'
      : (catMatch ? catMatch[0] : 'sensitive info');
    log(`Redacting ${category}…`, 'you');
    return redactRegions(null, category);
  }

  // Otherwise treat the remaining text as an exact keyword to find.
  const keyword = stripped || query.trim();
  log(`Redacting "${keyword}"…`, 'you');
  return findAndRedact(keyword);
}

// Built-in query box (standalone / no-agent path) → routes to the same tools an AI agent calls.
$('findBtn').onclick = () => {
  const query = $('kw').value.trim();
  if (query) { drivenByAgent = false; $('kw').value = ''; handleQuery(query); }
};
$('kw').addEventListener('keydown', (e) => { if (e.key === 'Enter') $('findBtn').click(); });

// ============================================================================
// 6. WebMCP — expose the same tools to a browser AI agent
// ============================================================================
function registerWebMcp() {
  // Register on document.modelContext — this is the canonical WebMCP surface that the extension's
  // navigator.modelContextTesting.listTools() observes. (navigator.modelContext / window.modelContext
  // may be a DIFFERENT object the testing bridge doesn't mirror, which is why the extension saw 0
  // tools.) Prefer document.modelContext; fall back only if it's absent.
  const mcp = document.modelContext || navigator.modelContext || window.modelContext;
  if (!mcp || !mcp.registerTool) {
    $('mcpStatus').textContent = 'WebMCP: not available (Chrome 149+ + origin trial)';
    return;
  }
  try {
    mcp.registerTool({
      name: 'find_and_redact',
      description: 'Redact a LITERAL exact word/phrase that appears verbatim in the PDF (e.g. '
        + '"NITIN MENDIRATTA", "acme@x.com"). The keyword is matched literally — do NOT pass a '
        + 'CATEGORY like "customer name", "bank address", "sensitive info", "PII", "emails". For any '
        + 'category or descriptive request, call get_document_text first and then redact_regions.',
      inputSchema: { type: 'object', properties: { keyword: { type: 'string' } }, required: ['keyword'] },
      async execute({ keyword }) {
        drivenByAgent = true; // extension renders its own A2UI carousel; suppress the page one
        const r = await findAndRedact(keyword);
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
    mcp.registerTool({
      name: 'get_document_text',
      description: 'Return the full extracted text of the open PDF as line items with ids + coords. '
        + 'Use this for open-ended requests ("redact all sensitive info / PII / names / emails / '
        + 'phone numbers"): read the items, decide which contain sensitive text, then call '
        + 'redact_regions. For each, pass {id, match:"<the exact sensitive substring>"} so only the '
        + 'sensitive text is boxed, not the whole line (e.g. {id:"p2-5", match:"jane@acme.com"}).',
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        const r = await getDocumentText();
        // Prepend an explicit NEXT-STEP instruction so the agent doesn't stop and dump this JSON as
        // its answer — it must now decide what's sensitive and CALL redact_regions. (LLMs often
        // treat a tool result as the final answer without this nudge.)
        const instruction = 'This is the document text — it is NOT the final answer. Identify ONLY '
          + 'genuine personal/sensitive information and call redact_regions with it.\n'
          + 'REDACT ONLY: person names, email addresses, phone numbers, street addresses, SSNs, '
          + 'account/policy/card numbers, dates of birth.\n'
          + 'DO NOT redact: prices, dollar amounts, plan/product names, headings, questions, generic '
          + 'marketing copy, page labels, durations like "10 Years". When unsure, do NOT redact.\n'
          + 'Call redact_regions once with all matches as [{ id, match:"<exact sensitive substring>" }]. '
          + 'Do not reply with this text.';
        return { content: [{ type: 'text', text: `${instruction}\n\nDOCUMENT:\n${JSON.stringify(r)}` }] };
      },
    });
    mcp.registerTool({
      name: 'redact_regions',
      description: 'Redact text in the open PDF. EASIEST: pass a category and the tool finds the PII '
        + 'itself — {category:"names"} or "emails", "phone numbers", "addresses", "account numbers", '
        + '"ssn", "sensitive info". For precise control, instead pass regions from get_document_text: '
        + '[{id, match:"exact substring"}].',
      inputSchema: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            description: 'A PII category to auto-find and redact: names | emails | phone numbers | '
              + 'addresses | account numbers | ssn | dates | sensitive info.',
          },
          regions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                match: { type: 'string', description: 'Exact substring within the line to box tightly.' },
                page: { type: 'integer' },
                bbox: { type: 'array', items: { type: 'number' } },
                text: { type: 'string' },
              },
            },
          },
        },
      },
      async execute(args = {}) {
        drivenByAgent = true; // extension renders its own A2UI carousel; suppress the page one
        // Weak models invent arg-name variants (category / categories / search_terms / keywords...).
        // Accept them all: gather any category-ish strings into one space-joined category string.
        const cats = []
          .concat(args.category, args.categories, args.search_terms, args.searchTerms,
            args.keywords, args.terms, args.type, args.types)
          .flat()
          .filter((s) => typeof s === 'string' && s.trim());
        const category = cats.join(' ');
        const r = await redactRegions(args.regions, category);
        log(`redact_regions → ${r.markCount ?? 0} mark(s) placed`, 'agent');
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
    mcp.registerTool({
      name: 'goto_mark',
      description: 'Scroll the viewer to a placed redaction mark by 0-based index.',
      inputSchema: { type: 'object', properties: { markIndex: { type: 'integer' } }, required: ['markIndex'] },
      async execute({ markIndex }) {
        carouselIndex = Math.max(0, Math.min(marks.length - 1, markIndex));
        renderCarousel();
        await gotoMark(carouselIndex);
        return { content: [{ type: 'text', text: `Showing mark ${carouselIndex + 1}` }] };
      },
    });
    mcp.registerTool({
      name: 'skip_mark',
      description: "Remove ONE placed mark (the carousel's Don't-redact-this) by 0-based index, "
        + 'leaving the other marks pending. Use when the user says this specific mark should not be '
        + 'redacted, as opposed to cancelling everything.',
      inputSchema: { type: 'object', properties: { markIndex: { type: 'integer' } }, required: ['markIndex'] },
      async execute({ markIndex }) {
        drivenByAgent = true;
        const r = await skipMark(markIndex);
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
    mcp.registerTool({
      name: 'apply_redactions',
      description: 'Apply the placed redaction marks and download the redacted PDF.',
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        const r = await applyRedactions();
        return { content: [{ type: 'text', text: JSON.stringify(r) }] };
      },
    });
    mcp.registerTool({
      name: 'cancel_redactions',
      description: 'Cancel the pending redaction — remove all placed marks without applying.',
      inputSchema: { type: 'object', properties: {} },
      async execute() {
        await cancelRedactions();
        return { content: [{ type: 'text', text: JSON.stringify({ cancelled: true }) }] };
      },
    });
    $('mcpStatus').textContent = 'WebMCP: 7 tools registered';
    log('WebMCP tools: find_and_redact, get_document_text, redact_regions, goto_mark, skip_mark, apply_redactions, cancel_redactions.');
  } catch (e) {
    $('mcpStatus').textContent = 'WebMCP: registration failed';
    log(`WebMCP registration error: ${e.message}`);
  }
}
registerWebMcp();
wireUpload();
