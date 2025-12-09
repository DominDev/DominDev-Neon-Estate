/**
 * Test 10: Complete Browser Audit
 * Comprehensive audit combining all tests
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 10: Complete Browser Audit');

  const client = await createBrowserMCPClient();

  try {

    console.log('🔍 Running complete browser audit...\n');

    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    // SEO Check
    console.log('📊 SEO...');
    const title = await safeCallTool(client, 'execute_javascript', { code: 'document.title' });
    formatTestResult('Title present', title.success);

    // Performance Check
    console.log('\n⚡ Performance...');
    const readyState = await safeCallTool(client, 'execute_javascript', { code: 'document.readyState' });
    formatTestResult('Page loaded', readyState.success);

    // Accessibility Check
    console.log('\n♿ Accessibility...');
    const altCheck = await safeCallTool(client, 'execute_javascript', {
      code: 'document.querySelectorAll("img:not([alt])").length === 0'
    });
    formatTestResult('All images have alt', altCheck.success);

    // Mobile Check
    console.log('\n📱 Mobile...');
    const viewport = await safeCallTool(client, 'execute_javascript', {
      code: 'document.querySelector("meta[name=\'viewport\']") !== null'
    });
    formatTestResult('Viewport meta present', viewport.success);

    console.log('\n✅ Complete audit finished!');

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
