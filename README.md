# Haunt API — Web Extraction for AI Agents

**[hauntapi.com](https://hauntapi.com)** · **[Docs](https://hauntapi.com/docs)** · **[Get API Key](https://hauntapi.com/#signup)**

A hosted MCP (Model Context Protocol) server that gives AI agents structured web extraction. Pass a URL and a plain-English prompt — get back clean JSON. No browser management, no parsing, no infrastructure.

## Install

```bash
claude plugin add github:Darko893/haunt-mcp-server
```

Or install manually via Claude Code's plugin discover: `/plugin > Discover`

## What it does

Two tools, zero setup:

| Tool | Description |
|------|-------------|
| `web_extract` | Extract structured data from any URL. Provide a URL and a description of what you want. |
| `get_usage` | Check your current API usage and remaining credits. |

Handles JavaScript rendering, Cloudflare protection, and complex page layouts automatically.

## Setup

1. Get a free API key at [hauntapi.com/#signup](https://hauntapi.com/#signup) (100 requests/month free)
2. Install the plugin: `claude plugin add github:Darko893/haunt-mcp-server`
3. Pass your API key as the `api_key` parameter on each tool call

No environment variables, no config files, no local server to run.

## Example usage

Ask Claude to extract data from any URL:

```
Extract the product name, price, and availability from https://example.com/product
```

Claude will call `web_extract` with:
- `url`: the target page
- `prompt`: "Extract the product name, price, and availability"
- `api_key`: your API key

You get back structured JSON with exactly the fields you asked for.

## Pricing

| Plan | Requests | Price |
|------|----------|-------|
| Basic | 100/mo | Free |
| Pro | Pay per request | $0.01/req |
| Business | 5,000/mo | $49/mo |
| Enterprise | 25,000/mo | $99/mo |

Details at [hauntapi.com](https://hauntapi.com).

## Manual MCP config (without plugin)

If you prefer to configure manually instead of using the plugin:

**Claude Desktop** (SSE transport):
```json
{
  "mcpServers": {
    "haunt": {
      "url": "https://hauntapi.com/sse"
    }
  }
}
```

**Cursor / VS Code / Windsurf** (Streamable HTTP):
```json
{
  "mcpServers": {
    "haunt": {
      "url": "https://hauntapi.com/mcp/"
    }
  }
}
```

## Plugin structure

```
haunt-mcp-server/
├── .claude-plugin/
│   └── plugin.json        # Plugin manifest
├── .mcp.json              # MCP server configuration
├── skills/
│   └── web-extraction/
│       └── SKILL.md       # Extraction best practices
├── README.md
├── METADATA.md
└── package.json           # Smithery/Glama metadata
```

## Links

- **Website**: [hauntapi.com](https://hauntapi.com)
- **Documentation**: [hauntapi.com/docs](https://hauntapi.com/docs)
- **API Status**: [hauntapi.com/health](https://hauntapi.com/health)
- **MCP Status**: [hauntapi.com/mcp-health](https://hauntapi.com/mcp-health)

## License

This is a hosted commercial service. The plugin configuration and documentation are provided for integration purposes. The extraction engine itself is proprietary. See [hauntapi.com](https://hauntapi.com) for terms of service.
# Haunt MCP Server
