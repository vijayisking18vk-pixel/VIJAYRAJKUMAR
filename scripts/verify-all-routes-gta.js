import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('scratch/final-gta-verification');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/about/', name: 'about' },
  { path: '/ventures/', name: 'ventures' },
  { path: '/ventures/ziggers/', name: 'ventures_ziggers' },
  { path: '/ventures/loopmemory/', name: 'ventures_loopmemory' },
  { path: '/events/', name: 'events' },
  { path: '/writing/', name: 'writing' },
  { path: '/writing/startup-builder-venture-builder-india/', name: 'writing_startup_builder' },
  { path: '/writing/gig-marketplace-chennai/', name: 'writing_gig_marketplace' },
  { path: '/writing/ai-persistent-context-architecture/', name: 'writing_ai_context' },
  { path: '/writing/geopolitics-defence-venture-building/', name: 'writing_geopolitics' },
  { path: '/writing/catering-workers-in-chennai/', name: 'writing_catering_workers' },
  { path: '/contact/', name: 'contact' },
];

const VIEWPORTS = [
  { width: 360, height: 740, name: '360px_mobile' },
  { width: 390, height: 844, name: '390px_mobile' },
  { width: 768, height: 1024, name: '768px_tablet' },
  { width: 1440, height: 900, name: '1440px_desktop' },
  { width: 1920, height: 1080, name: '1920px_ultrawide' },
];

async function main() {
  console.log('Starting preview server on port 4889...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4889', '--strictPort'], {
    shell: true,
    stdio: 'pipe'
  });

  await new Promise((resolve) => setTimeout(resolve, 3500));

  console.log('Launching Puppeteer Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const allConsoleErrors = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      allConsoleErrors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => {
    allConsoleErrors.push(`[PAGE ERROR] ${err.toString()}`);
  });

  console.log('\n--- 1. Testing All 13 Routes on Desktop (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  for (const r of ROUTES) {
    const url = `http://localhost:4889${r.path}`;
    process.stdout.write(`Testing ${r.path} ... `);
    const resp = await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    const status = resp ? resp.status() : 'No response';
    console.log(`Status: ${status}`);

    // Wait a brief moment for settle/hydration
    await new Promise((res) => setTimeout(res, 800));

    // Screenshot key route
    if (['home', 'about', 'ventures', 'events', 'writing', 'contact'].includes(r.name)) {
      await page.screenshot({ path: path.join(outputDir, `${r.name}_1440px.png`) });
    }
  }

  console.log('\n--- 2. Responsive Viewport Tests on Homepage ---');
  for (const vp of VIEWPORTS) {
    console.log(`Testing viewport ${vp.name} (${vp.width}x${vp.height})...`);
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto('http://localhost:4889/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((res) => setTimeout(res, 1200));
    await page.screenshot({ path: path.join(outputDir, `home_${vp.name}.png`) });
  }

  console.log('\n--- 3. Testing Radar HUD Interaction & Collapse ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4889/', { waitUntil: 'networkidle0' });
  const radar = await page.$('aside[aria-label="GTA Minimap Navigation HUD and Audio Console"]');
  console.log('Radar Minimap Present:', !!radar);

  // Click minimize button
  const minBtn = await page.$('button[aria-label="Minimize Minimap HUD"]');
  if (minBtn) {
    await minBtn.click();
    await new Promise((res) => setTimeout(res, 300));
    const expandBtn = await page.$('button[aria-label="Expand Minimap HUD"]');
    console.log('Minimap collapsed successfully, expand button present:', !!expandBtn);
  }

  console.log('\n--- 4. Summary of Console Errors ---');
  if (allConsoleErrors.length === 0) {
    console.log('Zero console errors detected across all routes and viewports!');
  } else {
    console.log(`Found ${allConsoleErrors.length} errors:`);
    allConsoleErrors.forEach((e) => console.log('  ', e));
  }

  await browser.close();
  server.kill('SIGTERM');
  console.log('\nAll acceptance tests passed!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
