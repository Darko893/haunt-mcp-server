#!/usr/bin/env node

/**
 * Haunt API — Local MCP Server Stub
 * 
 * Minimal stdio MCP server for directory quality checks.
 * The real server is remote at https://hauntapi.com/mcp/
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: 'haunt-api',
  version: '1.0.0',
});

server.tool(
  'web_extract',
  'Extract structured data from any URL. Provide a URL and a plain-English description of what you want extracted.',
  {
    url: { type: 'string', description: 'The URL to extract data from' },
    prompt: { type: 'string', description: 'Describe what data you want extracted in plain English' },
  },
  async () => ({
    content: [{
      type: 'text',
      text: 'This is a local stub server. Connect to https://hauntapi.com/mcp/ for live extraction. Get an API key at https://hauntapi.com/#signup',
    }],
  })
);

server.tool(
  'get_usage',
  'Check your current API usage and remaining credits.',
  {
    api_key: { type: 'string', description: 'Your Haunt API key' },
  },
  async () => ({
    content: [{
      type: 'text',
      text: 'This is a local stub. Visit https://hauntapi.com/dashboard for live usage stats.',
    }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
