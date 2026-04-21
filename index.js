#!/usr/bin/env node

/**
 * Haunt API — MCP Server
 *
 * Extract structured data from any URL via Haunt API.
 * Works with Claude Desktop, Cursor, Windsurf, and any MCP client.
 *
 * This is a local stub for directory quality checks.
 * The real server is remote at https://hauntapi.com/mcp/
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'haunt-api',
  version: '1.1.0',
});

server.tool(
  'extract_url',
  'Extract structured data from any web page by providing a URL and describing what you want. ' +
  'Returns clean JSON with exactly the fields you asked for — no HTML parsing needed. ' +
  'Handles JavaScript-rendered pages and Cloudflare-protected sites automatically. ' +
  'This is the general-purpose extraction tool. Use extract_article for full article content or extract_metadata for page meta tags — they are optimised shortcuts. ' +
  'Read-only — makes no changes to any external system. Requires HAUNT_API_KEY environment variable. ' +
  'Free tier: 100 requests/month. Returns an error if rate limit or API key is invalid.',
  {
    url: z.string().describe('The full URL of the page to extract data from. Must be a valid HTTP or HTTPS URL. Supports any public web page including JavaScript-heavy SPAs and Cloudflare-protected sites.'),
    prompt: z.string().describe('A plain-English description of what data to extract. Be specific about which fields you want. Examples: "product name, price, and availability", "all email addresses and phone numbers", "the main heading and first paragraph".'),
  },
  async () => ({
    content: [{
      type: 'text',
      text: 'This is a local stub server. Connect to https://hauntapi.com/mcp/ for live extraction. Get an API key at https://hauntapi.com/#signup',
    }],
  })
);

server.tool(
  'extract_article',
  'Extract the main article content from a news article or blog post. Returns title, body text, author, and publish date as structured JSON. ' +
  'Handles paywalled and JavaScript-rendered articles. Optimised for editorial content — use extract_url for product pages, listings, or generic data. ' +
  'Read-only — makes no changes to any external system. Requires HAUNT_API_KEY environment variable. ' +
  'Free tier: 100 requests/month. Returns an error if rate limit or API key is invalid.',
  {
    url: z.string().describe('The full URL of the article or blog post to extract content from.'),
  },
  async () => ({
    content: [{
      type: 'text',
      text: 'This is a local stub server. Connect to https://hauntapi.com/mcp/ for live extraction. Get an API key at https://hauntapi.com/#signup',
    }],
  })
);

server.tool(
  'extract_metadata',
  'Pull metadata from any URL: title, description, Open Graph tags, Twitter cards, canonical URL. Returns structured JSON with all available meta information. ' +
  'Useful for link previews, SEO analysis, and content categorisation. Use extract_url for page body content or extract_article for full articles. ' +
  'Read-only — makes no changes to any external system. Requires HAUNT_API_KEY environment variable. ' +
  'Free tier: 100 requests/month. Returns an error if rate limit or API key is invalid.',
  {
    url: z.string().describe('The full URL to extract metadata from.'),
  },
  async () => ({
    content: [{
      type: 'text',
      text: 'This is a local stub server. Connect to https://hauntapi.com/mcp/ for live extraction. Get an API key at https://hauntapi.com/#signup',
    }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
