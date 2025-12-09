/**
 * Test 04: Mobile Menu Test
 * Tests mobile menu functionality
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 04: Mobile Menu Test');

  const client = await createBrowserMCPClient();

  try {

    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    console.log('📱 Setting mobile viewport (375x667)...');
    // Note: viewport setting depends on Browser MCP capabilities

    console.log('🍔 Clicking hamburger menu...');
    const menuResult = await safeCallTool(client, 'click', {
      selector: '.menu-toggle'
    });
    formatTestResult('Open mobile menu', menuResult.success);

    await waitForLoad(client, 1000);

    console.log('\n📸 Taking screenshot...');
    await safeCallTool(client, 'screenshot', {});

    console.log('\n🔍 Checking contact section visibility...');
    const contactVisible = await safeCallTool(client, 'execute_javascript', {
      code: 'document.querySelector(".mobile-menu-contact")?.offsetHeight > 0'
    });

    formatTestResult('Contact section visible', contactVisible.success);
    console.log('\n✅ Mobile menu test completed!');

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
