# Haunt API — Web Extraction for AI Agents

**[hauntapi.com](https://hauntapi.com)** · **[Docs](https://hauntapi.com/docs)** · **[Get API Key](https://hauntapi.com/#signup)**

A hosted MCP (Model Context Protocol) server that gives AI agents structured web extraction. Pass a URL and a plain-English prompt — get back clean JSON. No browser management, no parsing, no infrastructure.

## Features

- **Structured extraction** — describe what you want in plain English, get clean JSON back
- **Hosted MCP server** — no local install, connects directly from your AI client
- **Two transports** — SSE (Claude Desktop) and Streamable HTTP (Cursor, Windsurf, VS Code)
- **AI-powered** — handles JavaScript rendering, Cloudflare, complex layouts automatically
- **Simple auth** — pass your API key as a tool argument, no headers needed

## MCP Tools

| Tool | Description |
|------|-------------|
| `web_extract` | Extract structured data from any URL. Provide a URL and a description of what you want. |
| `get_usage` | Check your current API usage and remaining credits. |

## Setup

### Claude Desktop (SSE)

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "haunt": {
      "url": "https://hauntapi.com/sse"
    }
  }
}
```

### Cursor / Windsurf / VS Code (Streamable HTTP)

```json
{
  "mcpServers": {
    "haunt": {
      "url": "https://hauntapi.com/mcp/"
    }
  }
}
```

When you first use a tool, pass your API key as the `api_key` argument. The server authenticates per-request — no separate login step.

## Pricing

| Plan | Requests | Price |
|------|----------|-------|
| Basic | 100/mo | Free |
| Pro | Pay per request | $0.01/req |
| Scale | Volume | From $49/mo |

Start free, scale when you need to. [Get your API key →](https://hauntapi.com/#signup)

## REST API

Not using MCP? The REST API works the same way:

```bash
curl -X POST https://hauntapi.com/v1/extract \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "prompt": "Extract the page title and main heading",
    "api_key": "your_api_key"
  }'
```

Full API reference at [hauntapi.com/docs](https://hauntapi.com/docs).

## Why Haunt?

- **MCP-native** — built for the Model Context Protocol, not retrofitted
- **No infrastructure** — fully hosted, no Docker, no local processes
- **Handles the hard stuff** — JS rendering, anti-bot, complex pages
- **Fair pricing** — free tier to start, pay only for what you use

## Links

- **Website:** [hauntapi.com](https://hauntapi.com)
- **Documentation:** [hauntapi.com/docs](https://hauntapi.com/docs)
- **Support:** [support@hauntapi.com](mailto:support@hauntapi.com)

---

*Haunt API is a product of Haunt API Ltd. This repo provides MCP integration details and connection configuration.*
