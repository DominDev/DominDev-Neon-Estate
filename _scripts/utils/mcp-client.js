/**
 * MCP Client Utilities
 * Helper functions for connecting to and using MCP servers
 */

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

/**
 * Create Browser MCP client
 */
export async function createBrowserMCPClient() {
  const transport = new StdioClientTransport({
    command: 'npx',
    args: ['@browsermcp/mcp@latest'],
    env: process.env
  });

  const client = new Client({
    name: 'neon-estate-test',
    version: '1.0.0'
  }, {
    capabilities: {}
  });

  await client.connect(transport);
  return client;
}

/**
 * Create GitMCP client (SSE transport)
 * Note: This requires HTTP/SSE support which may not work with stdio transport
 */
export async function createGitMCPClient() {
  // GitMCP uses SSE (Server-Sent Events) transport
  // For now, we'll note that this needs special handling
  throw new Error('GitMCP requires SSE transport - use Claude Code chat or MCP Inspector for GitMCP tests');
}

/**
 * Wait for page to load
 */
export async function waitForLoad(client, timeout = 5000) {
  await new Promise(resolve => setTimeout(resolve, timeout));
}

/**
 * Safe tool call with error handling
 */
export async function safeCallTool(client, toolName, args = {}) {
  try {
    const result = await client.callTool({
      name: toolName,
      arguments: args
    });
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Test result formatter
 */
export function formatTestResult(testName, passed, details = '') {
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${testName}`);
  if (details) {
    console.log(`   ${details}`);
  }
}

/**
 * Section header
 */
export function printSection(title) {
  console.log('\n' + '='.repeat(60));
  console.log(`  ${title}`);
  console.log('='.repeat(60) + '\n');
}

export const SITE_URL = 'https://domindev.github.io/DominDev-Neon-Estate/';
