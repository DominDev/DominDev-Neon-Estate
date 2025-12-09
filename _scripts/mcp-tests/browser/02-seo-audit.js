/**
 * Test 02: SEO Audit
 * Extracts all SEO data from the page
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 02: SEO Audit');

  const client = await createBrowserMCPClient();

  try {

    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    // Title
    console.log('📌 Checking page title...');
    const title = await safeCallTool(client, 'execute_javascript', {
      code: 'document.title'
    });
    console.log('Title:', title.data?.content?.[0]?.text || 'Not found');

    // Meta description
    console.log('\n📝 Checking meta description...');
    const metaDesc = await safeCallTool(client, 'get_attribute', {
      selector: 'meta[name="description"]',
      attribute: 'content'
    });
    console.log('Description:', metaDesc.data?.content?.[0]?.text || 'Not found');

    // H1 tags
    console.log('\n📊 Checking H1 tags...');
    const h1s = await safeCallTool(client, 'execute_javascript', {
      code: 'Array.from(document.querySelectorAll("h1")).map(h => h.textContent)'
    });
    console.log('H1s:', h1s.data?.content?.[0]?.text || 'Not found');

    // Images without alt
    console.log('\n🖼️ Checking images alt texts...');
    const imagesNoAlt = await safeCallTool(client, 'execute_javascript', {
      code: 'Array.from(document.querySelectorAll("img:not([alt])")).length'
    });
    console.log('Images without alt:', imagesNoAlt.data?.content?.[0]?.text || '0');

    console.log('\n✅ SEO Audit completed!');

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
