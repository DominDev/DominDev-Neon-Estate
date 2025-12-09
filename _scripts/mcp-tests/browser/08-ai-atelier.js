/**
 * Test 08: AI Atelier Test
 * Tests AI Atelier functionality
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 08: AI Atelier Test');

  const client = await createBrowserMCPClient();

  try {

    await safeCallTool(client, 'navigate', { url: SITE_URL + '#ai-atelier' });
    await waitForLoad(client, 3000);

    console.log('🤖 Testing AI Atelier...\n');

    // Fill AI form
    await safeCallTool(client, 'click', { selector: '#project-type' });
    await safeCallTool(client, 'type', { selector: '#location', text: 'Wrocław' });

    console.log('✏️  Form filled');

    // Click generate button
    const generateResult = await safeCallTool(client, 'click', {
      selector: 'button[type="submit"]'
    });

    formatTestResult('Generate button clicked', generateResult.success);

    await waitForLoad(client, 2000);

    console.log('\n📸 Taking screenshot...');
    await safeCallTool(client, 'screenshot', {});

    console.log('\n✅ AI Atelier test completed!');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
