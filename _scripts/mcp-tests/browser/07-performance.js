/**
 * Test 07: Performance Test
 * Measures page load performance
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 07: Performance Test');

  const client = await createBrowserMCPClient();

  try {

    console.log('⏱️  Measuring page load time...\n');

    const startTime = Date.now();
    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 5000);
    const loadTime = Date.now() - startTime;

    console.log(`Load time: ${loadTime}ms`);

    // Check if all resources loaded
    const resourcesResult = await safeCallTool(client, 'execute_javascript', {
      code: 'document.readyState'
    });

    console.log('Document state:', resourcesResult.data?.content?.[0]?.text || 'Unknown');

    // Check images
    const imagesResult = await safeCallTool(client, 'execute_javascript', {
      code: 'Array.from(document.images).every(img => img.complete)'
    });

    formatTestResult('All images loaded', imagesResult.success);
    console.log('\n✅ Performance test completed!');

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
