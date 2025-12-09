/**
 * Test 01: Basic Navigation and Screenshot
 * Opens Neon Estate and takes screenshot of hero section
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 01: Basic Navigation and Screenshot');

  const client = await createBrowserMCPClient();

  try {

    // Navigate
    console.log(`🌐 Opening ${SITE_URL}...`);
    const navResult = await safeCallTool(client, 'navigate', { url: SITE_URL });
    formatTestResult('Navigation', navResult.success);

    await waitForLoad(client, 3000);

    // Screenshot
    console.log('📸 Taking screenshot...');
    const screenshotResult = await safeCallTool(client, 'screenshot', {});
    formatTestResult('Screenshot', screenshotResult.success);

    if (screenshotResult.success) {
      console.log('\n✅ Test completed! Hero section loaded correctly.');
    }

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
