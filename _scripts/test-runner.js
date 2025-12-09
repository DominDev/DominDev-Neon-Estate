/**
 * MCP Test Runner
 * Runs all or selected MCP tests
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Test categories
const categories = {
  browser: 'mcp-tests/browser',
  gitmcp: 'mcp-tests/gitmcp',
  combined: 'mcp-tests/combined'
};

/**
 * Run a single test file
 */
async function runTest(testFile) {
  return new Promise((resolve, reject) => {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`🧪 Running: ${testFile}`);
    console.log('='.repeat(70));

    const child = spawn('node', [testFile], {
      stdio: 'inherit',
      cwd: dirname(__dirname)
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`\n✅ ${testFile} PASSED\n`);
        resolve();
      } else {
        console.log(`\n❌ ${testFile} FAILED (exit code: ${code})\n`);
        reject(new Error(`Test failed: ${testFile}`));
      }
    });

    child.on('error', (error) => {
      console.error(`\n❌ Failed to start test: ${error.message}\n`);
      reject(error);
    });
  });
}

/**
 * Get all test files in a category
 */
function getTestFiles(category) {
  const categoryPath = join(__dirname, categories[category]);

  try {
    const files = readdirSync(categoryPath);
    return files
      .filter(f => f.endsWith('.js'))
      .sort()
      .map(f => join(categoryPath, f));
  } catch (error) {
    return [];
  }
}

/**
 * Main test runner
 */
async function main() {
  const args = process.argv.slice(2);
  const selectedCategory = args[0];

  console.log('\n🚀 MCP Test Runner\n');

  let testsToRun = [];
  let passed = 0;
  let failed = 0;

  // Determine which tests to run
  if (selectedCategory && categories[selectedCategory]) {
    console.log(`📋 Running ${selectedCategory} tests only\n`);
    testsToRun = getTestFiles(selectedCategory);
  } else {
    console.log('📋 Running all Browser MCP tests\n');
    console.log('⚠️  Note: GitMCP and Combined tests require Claude Code chat (SSE transport)\n');
    testsToRun = getTestFiles('browser');
  }

  if (testsToRun.length === 0) {
    console.log('❌ No test files found!');
    console.log('\n💡 Generate tests first:');
    console.log('   node _scripts/create-all-tests.js\n');
    process.exit(1);
  }

  console.log(`Found ${testsToRun.length} test(s)\n`);

  // Run tests sequentially
  for (const test of testsToRun) {
    try {
      await runTest(test);
      passed++;
    } catch (error) {
      failed++;
      // Continue with next test
    }
  }

  // Summary
  console.log('\n' + '='.repeat(70));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(70));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📝 Total:  ${testsToRun.length}`);
  console.log('='.repeat(70) + '\n');

  if (failed > 0) {
    console.log('⚠️  Some tests failed. Check output above for details.\n');
    process.exit(1);
  } else {
    console.log('🎉 All tests passed!\n');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
