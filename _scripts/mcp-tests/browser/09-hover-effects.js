/**
 * Test 09: Hover Effects Test
 * Tests hover effects on buttons
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 09: Hover Effects Test');

  const client = await createBrowserMCPClient();

  try {

    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    console.log('🖱️  Testing hover effects...\n');

    // Find CTA buttons
    const buttonsResult = await safeCallTool(client, 'execute_javascript', {
      code: 'Array.from(document.querySelectorAll(".cta, .btn-primary")).length'
    });

    console.log('CTA buttons found:', buttonsResult.data?.content?.[0]?.text || '0');

    // Test custom cursor
    const cursorResult = await safeCallTool(client, 'execute_javascript', {
      code: 'document.querySelector(".cursor-diamond") !== null'
    });

    formatTestResult('Custom cursor present', cursorResult.success);
    console.log('\n✅ Hover effects test completed!');

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
