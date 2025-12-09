/**
 * Test 03: Contact Form Test
 * Tests contact form filling and validation
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test 03: Contact Form Test');

  const client = await createBrowserMCPClient();

  try {

    await safeCallTool(client, 'navigate', { url: SITE_URL + '#contact' });
    await waitForLoad(client, 3000);

    console.log('📋 Testing contact form...\n');

    // Fill form fields
    const fields = {
      '#contact-name': 'Jan Testowy',
      '#contact-email': 'test@example.com',
      '#contact-phone': '123456789',
      '#contact-message': 'To jest test automatyczny'
    };

    for (const [selector, text] of Object.entries(fields)) {
      const result = await safeCallTool(client, 'type', { selector, text });
      formatTestResult(`Fill field ${selector}`, result.success);
    }

    // Checkbox
    const checkboxResult = await safeCallTool(client, 'click', {
      selector: '#contact-consent'
    });
    formatTestResult('Check consent checkbox', checkboxResult.success);

    // Screenshot
    console.log('\n📸 Taking screenshot...');
    await safeCallTool(client, 'screenshot', { selector: '#contact' });

    console.log('\n✅ Form test completed!');
    console.log('⚠️  Form NOT submitted (test only)');

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
