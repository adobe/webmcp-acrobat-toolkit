# WebMCP Acrobat Toolkit

A Chrome extension + a public, client-side PDF demo that let an AI agent drive Adobe Acrobat
PDF workflows (starting with redaction) via [WebMCP](https://github.com/webmachinelearning/webmcp)
(`document.modelContext`).

- **`docs/`** — a standalone, 100% public, client-side demo (Adobe [PDF Embed
  API](https://developer.adobe.com/document-services/apis/pdf-embed/) + [PDF.js](https://mozilla.github.io/pdf.js/))
  that registers `find_and_redact` / `redact_regions` / `goto_mark` / `apply_redactions` tools on
  `document.modelContext`, so any WebMCP-aware agent (or the page's own built-in keyword box) can
  drive it. No backend, no Adobe-internal dependencies.
- **`extension/`** — a Chrome side-panel extension that discovers those tools on the active tab and
  drives them from a chat interface, using either Google Gemini (bring your own API key) or any
  OpenAI-compatible gateway (bring your own endpoint + key).

## Running the demo locally

PDF Embed API credentials are locked to a specific **Application Domain**. This project's
credential is registered for `localhost`, so **always open the demo via `http://localhost:<port>`,
not `http://127.0.0.1:<port>`** — despite resolving to the same machine, Adobe treats those as
different domains and `127.0.0.1` will show a "File preview not available" error.

```bash
cd docs
python3 -m http.server 8080
# open http://localhost:8080/index.html  (NOT http://127.0.0.1:8080)
```

If you want to use your own PDF Embed API credential (e.g. for a different domain or GitHub Pages
host), get one free at https://www.adobe.com/go/dcsdks_credentials and add it to the `CLIENT_IDS`
map near the top of `docs/redact.js`.

## Loading the extension

1. `chrome://extensions` → enable Developer mode → **Load unpacked** → select the `extension/` folder.
2. Open the demo (see above) and open the extension's side panel on that tab.
3. Click **Set Gemini API key** and paste your own [Gemini API key](https://aistudio.google.com/apikey) —
   no other configuration is required. This is the path hackathon judges should use.

### Optional: OpenAI-compatible gateway

If you have your own OpenAI-compatible endpoint (an internal LLM gateway, OpenAI, OpenRouter, a
local LiteLLM proxy, etc.), copy `extension/.env.json.example` to `extension/.env.json` (gitignored)
and fill in `gatewayKey` / `gatewayBaseUrl` / `gatewayModel`, or set the equivalent `localStorage`
keys directly in the side panel's console. See the comment in `extension/sidebar.js`'s `initGenAI()`
for details. This is entirely optional and additive — it never affects the default Gemini path.

## License

Apache-2.0, see [LICENSE](LICENSE). See [CONTRIBUTING](.github/CONTRIBUTING.md) and
[CODE_OF_CONDUCT](CODE_OF_CONDUCT.md).
