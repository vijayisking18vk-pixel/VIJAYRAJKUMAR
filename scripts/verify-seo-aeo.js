import fs from 'fs';

const routesScript = fs.readFileSync('scripts/generate-static-routes.js', 'utf8');
const regex = /description:\s*'([^']+)'/g;
let match;
let allGood = true;

console.log('--- Checking Route Descriptions ---');
while ((match = regex.exec(routesScript)) !== null) {
  const len = match[1].length;
  const status = (len >= 50 && len <= 160) ? 'PASS' : 'FAIL';
  if (status === 'FAIL') allGood = false;
  console.log(`[${status}] (${len} chars): ${match[1]}`);
}

console.log('\n--- Checking index.html ---');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const descMatch = indexHtml.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
if (descMatch) {
  const len = descMatch[1].length;
  const status = (len >= 50 && len <= 160) ? 'PASS' : 'FAIL';
  if (status === 'FAIL') allGood = false;
  console.log(`[${status}] meta description (${len} chars): ${descMatch[1]}`);
} else {
  console.log('[FAIL] meta description not found in index.html');
  allGood = false;
}

// Check date tags
const hasPubTime = indexHtml.includes('article:published_time');
const hasModTime = indexHtml.includes('article:modified_time');
const hasOgTime = indexHtml.includes('og:updated_time');
console.log(`[${hasPubTime ? 'PASS' : 'FAIL'}] article:published_time`);
console.log(`[${hasModTime ? 'PASS' : 'FAIL'}] article:modified_time`);
console.log(`[${hasOgTime ? 'PASS' : 'FAIL'}] og:updated_time`);

// Check FAQPage schema
const hasFaqPage = indexHtml.includes('"@type": "FAQPage"') || indexHtml.includes('"@type":"FAQPage"');
console.log(`[${hasFaqPage ? 'PASS' : 'FAIL'}] FAQPage JSON-LD`);

// Check llms.txt and llms-full.txt
const hasLlms = fs.existsSync('public/llms.txt');
const hasLlmsFull = fs.existsSync('public/llms-full.txt');
console.log(`[${hasLlms ? 'PASS' : 'FAIL'}] public/llms.txt exists (${hasLlms ? fs.statSync('public/llms.txt').size : 0} bytes)`);
console.log(`[${hasLlmsFull ? 'PASS' : 'FAIL'}] public/llms-full.txt exists (${hasLlmsFull ? fs.statSync('public/llms-full.txt').size : 0} bytes)`);

// Check multiple H2s and question headings
const h2Matches = indexHtml.match(/<h2[^>]*>.*?<\/h2>/gi) || [];
console.log(`[${h2Matches.length >= 2 ? 'PASS' : 'FAIL'}] H2 headings found: ${h2Matches.length}`);
h2Matches.forEach(h2 => console.log('  -> ' + h2));

const questionH3Matches = (indexHtml.match(/<h3[^>]*>.*?\?<\/h3>/gi) || []);
console.log(`[${questionH3Matches.length >= 1 ? 'PASS' : 'FAIL'}] Question-style H3 headings found: ${questionH3Matches.length}`);
questionH3Matches.forEach(h3 => console.log('  -> ' + h3));

const hasTimeTag = indexHtml.includes('<time');
console.log(`[${hasTimeTag ? 'PASS' : 'FAIL'}] <time> tag present in body`);

console.log('\n==============================');
console.log('OVERALL AUDIT CHECK RESULT:', allGood ? 'ALL PASS ✅' : 'FAILURES DETECTED ❌');
console.log('==============================');
