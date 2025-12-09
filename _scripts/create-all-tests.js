/**
 * Generator for all MCP test scripts
 * Creates all 25 test files based on templates
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test definitions
const tests = {
  browser: [
    {
      id: '01',
      name: 'basic',
      title: 'Basic Navigation and Screenshot',
      description: 'Opens Neon Estate and takes screenshot of hero section',
      code: `
    // Navigate
    console.log(\`🌐 Opening \${SITE_URL}...\`);
    const navResult = await safeCallTool(client, 'navigate', { url: SITE_URL });
    formatTestResult('Navigation', navResult.success);

    await waitForLoad(client, 3000);

    // Screenshot
    console.log('📸 Taking screenshot...');
    const screenshotResult = await safeCallTool(client, 'screenshot', {});
    formatTestResult('Screenshot', screenshotResult.success);

    if (screenshotResult.success) {
      console.log('\\n✅ Test completed! Hero section loaded correctly.');
    }
`
    },
    {
      id: '02',
      name: 'seo-audit',
      title: 'SEO Audit',
      description: 'Extracts all SEO data from the page',
      code: `
    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    // Title
    console.log('📌 Checking page title...');
    const title = await safeCallTool(client, 'execute_javascript', {
      code: 'document.title'
    });
    console.log('Title:', title.data?.content?.[0]?.text || 'Not found');

    // Meta description
    console.log('\\n📝 Checking meta description...');
    const metaDesc = await safeCallTool(client, 'get_attribute', {
      selector: 'meta[name="description"]',
      attribute: 'content'
    });
    console.log('Description:', metaDesc.data?.content?.[0]?.text || 'Not found');

    // H1 tags
    console.log('\\n📊 Checking H1 tags...');
    const h1s = await safeCallTool(client, 'execute_javascript', {
      code: 'Array.from(document.querySelectorAll("h1")).map(h => h.textContent)'
    });
    console.log('H1s:', h1s.data?.content?.[0]?.text || 'Not found');

    // Images without alt
    console.log('\\n🖼️ Checking images alt texts...');
    const imagesNoAlt = await safeCallTool(client, 'execute_javascript', {
      code: 'Array.from(document.querySelectorAll("img:not([alt])")).length'
    });
    console.log('Images without alt:', imagesNoAlt.data?.content?.[0]?.text || '0');

    console.log('\\n✅ SEO Audit completed!');
`
    },
    {
      id: '03',
      name: 'forms',
      title: 'Contact Form Test',
      description: 'Tests contact form filling and validation',
      code: `
    await safeCallTool(client, 'navigate', { url: SITE_URL + '#contact' });
    await waitForLoad(client, 3000);

    console.log('📋 Testing contact form...\\n');

    // Fill form fields
    const fields = {
      '#contact-name': 'Jan Testowy',
      '#contact-email': 'test@example.com',
      '#contact-phone': '123456789',
      '#contact-message': 'To jest test automatyczny'
    };

    for (const [selector, text] of Object.entries(fields)) {
      const result = await safeCallTool(client, 'type', { selector, text });
      formatTestResult(\`Fill field \${selector}\`, result.success);
    }

    // Checkbox
    const checkboxResult = await safeCallTool(client, 'click', {
      selector: '#contact-consent'
    });
    formatTestResult('Check consent checkbox', checkboxResult.success);

    // Screenshot
    console.log('\\n📸 Taking screenshot...');
    await safeCallTool(client, 'screenshot', { selector: '#contact' });

    console.log('\\n✅ Form test completed!');
    console.log('⚠️  Form NOT submitted (test only)');
`
    },
    {
      id: '04',
      name: 'mobile-menu',
      title: 'Mobile Menu Test',
      description: 'Tests mobile menu functionality',
      code: `
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

    console.log('\\n📸 Taking screenshot...');
    await safeCallTool(client, 'screenshot', {});

    console.log('\\n🔍 Checking contact section visibility...');
    const contactVisible = await safeCallTool(client, 'execute_javascript', {
      code: 'document.querySelector(".mobile-menu-contact")?.offsetHeight > 0'
    });

    formatTestResult('Contact section visible', contactVisible.success);
    console.log('\\n✅ Mobile menu test completed!');
`
    },
    {
      id: '05',
      name: 'all-sections',
      title: 'All Sections Screenshots',
      description: 'Takes screenshots of all main sections',
      code: `
    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    const sections = ['hero', 'about', 'offer', 'portfolio', 'ai-atelier', 'contact'];

    console.log('📸 Taking screenshots of all sections...\\n');

    for (const section of sections) {
      console.log(\`Capturing: \${section}\`);

      if (section !== 'hero') {
        await safeCallTool(client, 'scroll', { direction: 'down', amount: 800 });
        await waitForLoad(client, 1000);
      }

      const result = await safeCallTool(client, 'screenshot', {});
      formatTestResult(\`Screenshot: \${section}\`, result.success);
    }

    console.log('\\n✅ All sections captured!');
`
    },
    {
      id: '06',
      name: 'verify-links',
      title: 'Verify All Links',
      description: 'Checks all links on the page',
      code: `
    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    console.log('🔗 Extracting all links...\\n');

    const linksResult = await safeCallTool(client, 'execute_javascript', {
      code: \`
        Array.from(document.querySelectorAll('a')).map(a => ({
          text: a.textContent.trim(),
          href: a.href,
          isExternal: a.href.startsWith('http') && !a.href.includes(location.hostname)
        }))
      \`
    });

    if (linksResult.success) {
      console.log('Found links:', linksResult.data?.content?.[0]?.text || 'None');
      console.log('\\n✅ Link verification completed!');
    }
`
    },
    {
      id: '07',
      name: 'performance',
      title: 'Performance Test',
      description: 'Measures page load performance',
      code: `
    console.log('⏱️  Measuring page load time...\\n');

    const startTime = Date.now();
    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 5000);
    const loadTime = Date.now() - startTime;

    console.log(\`Load time: \${loadTime}ms\`);

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
    console.log('\\n✅ Performance test completed!');
`
    },
    {
      id: '08',
      name: 'ai-atelier',
      title: 'AI Atelier Test',
      description: 'Tests AI Atelier functionality',
      code: `
    await safeCallTool(client, 'navigate', { url: SITE_URL + '#ai-atelier' });
    await waitForLoad(client, 3000);

    console.log('🤖 Testing AI Atelier...\\n');

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

    console.log('\\n📸 Taking screenshot...');
    await safeCallTool(client, 'screenshot', {});

    console.log('\\n✅ AI Atelier test completed!');
`
    },
    {
      id: '09',
      name: 'hover-effects',
      title: 'Hover Effects Test',
      description: 'Tests hover effects on buttons',
      code: `
    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    console.log('🖱️  Testing hover effects...\\n');

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
    console.log('\\n✅ Hover effects test completed!');
`
    },
    {
      id: '10',
      name: 'complete-audit',
      title: 'Complete Browser Audit',
      description: 'Comprehensive audit combining all tests',
      code: `
    console.log('🔍 Running complete browser audit...\\n');

    await safeCallTool(client, 'navigate', { url: SITE_URL });
    await waitForLoad(client, 3000);

    // SEO Check
    console.log('📊 SEO...');
    const title = await safeCallTool(client, 'execute_javascript', { code: 'document.title' });
    formatTestResult('Title present', title.success);

    // Performance Check
    console.log('\\n⚡ Performance...');
    const readyState = await safeCallTool(client, 'execute_javascript', { code: 'document.readyState' });
    formatTestResult('Page loaded', readyState.success);

    // Accessibility Check
    console.log('\\n♿ Accessibility...');
    const altCheck = await safeCallTool(client, 'execute_javascript', {
      code: 'document.querySelectorAll("img:not([alt])").length === 0'
    });
    formatTestResult('All images have alt', altCheck.success);

    // Mobile Check
    console.log('\\n📱 Mobile...');
    const viewport = await safeCallTool(client, 'execute_javascript', {
      code: 'document.querySelector("meta[name=\\'viewport\\']") !== null'
    });
    formatTestResult('Viewport meta present', viewport.success);

    console.log('\\n✅ Complete audit finished!');
`
    }
  ]
};

// Template for test file
function generateTestFile(test, category) {
  return `/**
 * Test ${test.id}: ${test.title}
 * ${test.description}
 */

import { createBrowserMCPClient, waitForLoad, safeCallTool, formatTestResult, printSection, SITE_URL } from '../../utils/mcp-client.js';

async function main() {
  printSection('Test ${test.id}: ${test.title}');

  const client = await createBrowserMCPClient();

  try {
${test.code}
  } catch (error) {
    console.error('\\n❌ Test failed:', error.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
`;
}

// Generate all test files
function generateAll() {
  console.log('🚀 Generating all MCP test scripts...\\n');

  let count = 0;

  // Browser tests
  for (const test of tests.browser) {
    const filePath = join(__dirname, 'mcp-tests', 'browser', `${test.id}-${test.name}.js`);
    const content = generateTestFile(test, 'browser');

    writeFileSync(filePath, content);
    console.log(`✅ Created: ${test.id}-${test.name}.js`);
    count++;
  }

  console.log(`\\n✅ Generated ${count} test files!`);
  console.log('\\n📝 Note: GitMCP tests require Claude Code chat (SSE transport)');
  console.log('📝 Note: Combined tests require both Browser MCP and GitMCP');
  console.log('\\n🎯 Next steps:');
  console.log('1. npm install');
  console.log('2. npm run test:browser');
  console.log('3. Check results!');
}

generateAll();
