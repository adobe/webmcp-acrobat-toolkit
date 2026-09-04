# WebMCP Acrobat Toolkit

**Let an AI agent drive real Adobe Acrobat PDF workflows — redacting and form-filling — right inside your browser, 100% client-side.**

It's built on [WebMCP](https://github.com/webmachinelearning/webmcp) (`document.modelContext`): a web page publishes its capabilities as **tools**, and any WebMCP‑aware agent can call them. Here, a Chrome extension is the *brain* (an LLM in a chat side‑panel) and the page is the *hands* (Adobe [PDF Embed API](https://developer.adobe.com/document-services/apis/pdf-embed/) + [pdf‑lib](https://pdf-lib.js.org/) + [PDF.js](https://mozilla.github.io/pdf.js/)). No backend, no uploads — **your PDF never leaves the tab.**

<!-- 📸 HERO: a short GIF of the side-panel chat driving a redaction or form-fill end to end.
     Drop the file at assets/hero.gif and it'll render here. -->
![Agent redacting and filling a PDF from a chat prompt](assets/hero.gif)

---

## What's inside

Two demos, one extension:

| | What you say | What happens |
|---|---|---|
| 🔒 **Redact** | *"redact all names and account numbers"* | The agent finds them, marks them in red, you step through and **Apply** → a flattened PDF downloads with the boxes baked in. |
| ✍️ **Form fill** | *"I'm Jane Doe, jane.doe@example.com, I'd like a $25k personal loan"* | The agent fills the PDF form field‑by‑field — and **only** with what you actually said — then you **Apply & download**. |

The magic: the same tools an AI agent calls are also wired to plain buttons, so every demo works with **or** without the extension.

### 🔒 Redact
<!-- 📸 Screenshot: the redact page with red review marks + the chat panel. → assets/redact.png -->
![Redact demo](assets/redact.png)

Ask in plain language. The page uses PDF.js to locate the text, PDF Embed to draw the marks, and — on **Apply** — flattens the black boxes into a downloadable PDF. Nothing is sent anywhere.

### ✍️ Form fill
<!-- 📸 Screenshot: a form filling live in the viewer as the agent chats. → assets/formfill.png -->
![Form-fill demo](assets/formfill.png)

Describe yourself and watch the PDF populate live. pdf‑lib reads the form's fields and writes your answers back **by field name**, so there's no fuzzy guessing — and the agent is told, firmly, **never to invent a value you didn't provide**.

---

## Quick start

> **Requirements:** Google Chrome **149+** with `chrome://flags/#enable-webmcp-testing` enabled (for the WebMCP agent path). The demos also render fine on their own without it.

### 1. Run a demo
PDF Embed credentials are locked to a domain, and this project's is registered for `localhost` — so open it via **`localhost`, never `127.0.0.1`** (Chrome treats them as different domains).

```bash
cd docs
python3 -m http.server 8080
# Redact:     http://localhost:8080/index.html
# Form fill:  http://localhost:8080/formfill-declarative.html
```

Prefer the buttons over the chat? Add `?panel=1` to either URL to drive it without the extension.

### 2. Load the extension
<!-- 📸 Screenshot: chrome://extensions "Load unpacked" + the side panel open. → assets/extension.png -->
1. Go to `chrome://extensions` → turn on **Developer mode** → **Load unpacked** → pick the `extension/` folder.
2. Open a demo page (above) and open the extension's **side panel** on that tab.
3. Click **Set Gemini API key**, paste your own [Gemini key](https://aistudio.google.com/apikey) — that's the whole setup.

### 3. Talk to it
Type a request like the examples above and watch the agent work through the PDF. That's it. 🎉

---

## How it works

```
┌─────────────────────┐      document.modelContext      ┌──────────────────────────┐
│  Extension (brain)  │  ───  getTools / executeTool  ─▶ │  Demo page (hands)       │
│  LLM chat sidepanel │                                  │  PDF Embed · pdf-lib ·   │
│  Gemini or gateway  │  ◀───  tool results / review  ── │  PDF.js  → real PDF ops  │
└─────────────────────┘                                  └──────────────────────────┘
```

The extension discovers whatever tools the page registers on `document.modelContext` and calls them from the chat — it never needs to know *how* a PDF gets redacted or filled, only that the tools exist. Two flavors of WebMCP are on display:

- **Imperative** — the page calls `registerTool(...)` directly (redact, and `formfill.html`).
- **Declarative** — the page injects an annotated `<form toolname="fill_form" …>` and the browser turns its fields into a tool automatically (`formfill-declarative.html`).

<details>
<summary><b>The tools each page exposes</b></summary>

| Demo | Tools on `document.modelContext` |
|---|---|
| Redact | `find_and_redact` · `get_document_text` · `redact_regions` · `goto_mark` · `skip_mark` · `apply_redactions` · `cancel_redactions` |
| Form fill | `get_form_fields` · `fill_form` · `goto_field` · `apply_form` · `download_form` · `clear_form` |

Human‑in‑the‑loop is built in: tools return a review card so you confirm before anything is written or downloaded.
</details>

---

## Configuration

**Gemini (default):** click **Set Gemini API key** in the side panel — bring your own [key](https://aistudio.google.com/apikey). Nothing else required.

**Any OpenAI‑compatible gateway (optional):** OpenAI, OpenRouter, a local LiteLLM proxy, your own endpoint — open the side panel's **⋮ → Gateway**, enter the base URL, key, and model, and **Save**. No endpoint or key is ever hard‑coded; you can also drop them in `extension/.env.json` (see `.env.json.example`, gitignored).

**Your own PDF Embed credential:** get a free one at <https://www.adobe.com/go/dcsdks_credentials> and add it to the `CLIENT_IDS` map at the top of `docs/redact.js` (and the form‑fill files).

---

## Good to know

- 🔐 **Fully client‑side.** The page talks to no backend; the only network call is the extension → your chosen LLM. Your document stays in the browser.
- 🌐 **`localhost`, not `127.0.0.1`** — the PDF Embed credential is domain‑locked.
- 🧪 **It's a demo/toolkit**, not a production redaction guarantee — always eyeball the output before sharing a "redacted" file.

## License

Apache‑2.0 — see [LICENSE](LICENSE), [CONTRIBUTING](.github/CONTRIBUTING.md), and [CODE_OF_CONDUCT](CODE_OF_CONDUCT.md).
