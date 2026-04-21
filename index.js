#!/usr/bin/env node

/**
 * Haunt API — Local MCP Server Stub
 * 
 * Minimal stdio MCP server for directory quality checks.
 * The real server is remote at https://hauntapi.com/mcp/
 */

const { readFileSync } = require('fs');

const SERVER_INFO = {
  name: 'haunt-api',
  version: '1.0.0',
};

const TOOLS = [
  {
    name: 'web_extract',
    description: 'Extract structured data from any URL. Provide a URL and a plain-English description of what you want extracted.',
    inputSchema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'The URL to extract data from' },
        prompt: { type: 'string', description: 'Describe what data you want extracted in plain English' },
        api_key: { type: 'string', description: 'Your Haunt API key' },
      },
      required: ['url', 'prompt'],
    },
  },
  {
    name: 'get_usage',
    description: 'Check your current API usage and remaining credits.',
    inputSchema: {
      type: 'object',
      properties: {
        api_key: { type: 'string', description: 'Your Haunt API key' },
      },
      required: ['api_key'],
    },
  },
];

let requestId = 0;

function sendResponse(id, result) {
  const msg = JSON.stringify({ jsonrpc: '2.0', id, result });
  process.stdout.write(`Content-Length: ${Buffer.byteLength(msg)}\r\n\r\n${msg}`);
}

function sendError(id, code, message) {
  const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } });
  process.stdout.write(`Content-Length: ${Buffer.byteLength(msg)}\r\n\r\n${msg}`);
}

function handleRequest(msg) {
  const { id, method, params } = msg;

  switch (method) {
    case 'initialize':
      sendResponse(id, {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
      });
      break;

    case 'notifications/initialized':
      // Client ack — no response needed
      break;

    case 'tools/list':
      sendResponse(id, { tools: TOOLS });
      break;

    case 'tools/call':
      sendResponse(id, {
        content: [
          {
            type: 'text',
            text: 'This is a local stub server. Connect to https://hauntapi.com/mcp/ for live extraction. Get an API key at https://hauntapi.com/#signup',
          },
        ],
      });
      break;

    case 'ping':
      sendResponse(id, {});
      break;

    default:
      sendError(id, -32601, `Method not found: ${method}`);
  }
}

// Read stdio with Content-Length header parsing (MCP spec)
let buffer = '';

process.stdin.on('data', (chunk) => {
  buffer += chunk.toString();

  while (true) {
    const headerEnd = buffer.indexOf('\r\n\r\n');
    if (headerEnd === -1) break;

    const header = buffer.slice(0, headerEnd);
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) break;

    const contentLength = parseInt(match[1], 10);
    const bodyStart = headerEnd + 4;
    const bodyEnd = bodyStart + contentLength;

    if (buffer.length < bodyEnd) break;

    const body = buffer.slice(bodyStart, bodyEnd);
    buffer = buffer.slice(bodyEnd);

    try {
      const msg = JSON.parse(body);
      if (msg.method) handleRequest(msg);
    } catch (e) {
      // Ignore malformed messages
    }
  }
});

process.stdin.on('end', () => process.exit(0));
