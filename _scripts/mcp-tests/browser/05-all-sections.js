/**
 * Test 05: All Sections Screenshots
 * Takes screenshots of all main sections
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 05: All Sections Screenshots');

  const client = await createBrowserMCPClient();

  try {

    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    const sections = ['hero', 'about', 'offer', 'portfolio', 'ai-atelier', 'contact'];

    console.log('📸 Taking screenshots of all sections...\n');

    for (const section of sections) {
      console.log(`Capturing: ${section}`);

      if (section !== 'hero') {
        await safeCallTool(client, 'scroll', { direction: 'down', amount: 800 });
        await waitForLoad(client, 1000);
      }

      const result = await safeCallTool(client, 'screenshot', {});
      formatTestResult(`Screenshot: ${section}`, result.success);
    }

    console.log('\n✅ All sections captured!');

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
