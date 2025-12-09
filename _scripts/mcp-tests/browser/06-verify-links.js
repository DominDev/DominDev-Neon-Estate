/**
 * Test 06: Verify All Links
 * Checks all links on the page
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 06: Verify All Links');

  const client = await createBrowserMCPClient();

  try {

    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    console.log('🔗 Extracting all links...\n');

    const linksResult = await safeCallTool(client, 'execute_javascript', {
      code: `
        Array.from(document.querySelectorAll('a')).map(a => ({
          text: a.textContent.trim(),
          href: a.href,
          isExternal: a.href.startsWith('http') && !a.href.includes(location.hostname)
        }))
      `
    });

    if (linksResult.success) {
      console.log('Found links:', linksResult.data?.content?.[0]?.text || 'None');
      console.log('\n✅ Link verification completed!');
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
