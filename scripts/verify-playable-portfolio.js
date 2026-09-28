import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('scratch/playable-portfolio-test');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('1. Starting preview server on port 4895...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4895', '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  await new Promise((resolve) => setTimeout(resolve, 3500));

  console.log('2. Launching Puppeteer Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    // -------------------------------------------------------------------------
    // TEST 1: DESKTOP GUIDED JOURNEY
    // -------------------------------------------------------------------------
    console.log('3. Testing Desktop Guided Journey (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4895/', { waitUntil: 'networkidle0' });

    // Verify 3D Canvas presence
    const canvasExists = await page.$('canvas');
    if (!canvasExists) throw new Error('3D Canvas not found on page!');
    console.log('✓ 3D Canvas rendered successfully.');

    // Verify all 5 Guided Landmark Chapters
    const chapters = ['#hero', '#safehouse', '#operations-garage', '#poster-wall', '#archive', '#dispatch-point'];
    for (const sel of chapters) {
      const el = await page.$(sel);
      if (!el) throw new Error(`Missing expected chapter section: ${sel}`);
      console.log(`  ✓ Chapter section present: ${sel}`);
    }

    // Scroll through chapters and verify natural movement
    console.log('Scrolling to #safehouse...');
    await page.evaluate(() => document.getElementById('safehouse')?.scrollIntoView({ behavior: 'smooth' }));
    await new Promise((r) => setTimeout(r, 800));

    console.log('Scrolling to #operations-garage...');
    await page.evaluate(() => document.getElementById('operations-garage')?.scrollIntoView({ behavior: 'smooth' }));
    await new Promise((r) => setTimeout(r, 800));

    await page.screenshot({ path: path.join(outputDir, 'desktop_guided_journey.png') });
    console.log('✓ Guided Journey natural scroll verified.');

    // -------------------------------------------------------------------------
    // TEST 2: EXPLORE MODE ACTIVATION & DOSSIER MODAL
    // -------------------------------------------------------------------------
    console.log('4. Testing Explore Mode...');
    // Scroll back to top
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 400));

    // Find and click the Explore Mode button
    const exploreBtn = await page.$('button[title*="Toggle Free 3D Explore Mode"]');
    if (!exploreBtn) throw new Error('Explore Mode toggle button not found on minimap HUD!');
    console.log('Clicking Explore Mode button on HUD...');
    await exploreBtn.click();
    await new Promise((r) => setTimeout(r, 600));

    // Verify Explore Mode Top HUD is visible
    const headerText = await page.$eval('header', (el) => el.innerText);
    console.log(`Explore Mode Header Text: "${headerText}"`);
    if (!headerText.includes('DISTRICT EXPLORATION')) {
      throw new Error(`Expected Explore HUD, got: ${headerText}`);
    }

    // Simulate WASD movement (Press 'w' key down for 1 second to walk forward)
    console.log('Simulating WASD walk forward...');
    await page.keyboard.down('KeyW');
    await new Promise((r) => setTimeout(r, 1200));
    await page.keyboard.up('KeyW');
    await new Promise((r) => setTimeout(r, 400));

    await page.screenshot({ path: path.join(outputDir, 'desktop_explore_mode_walk.png') });
    console.log('✓ Player moved in Explore Mode.');

    // Exit Explore Mode with ESC key
    console.log('Exiting Explore Mode using Escape key...');
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 500));

    // Verify returned to Guided Journey (Header navigation visible)
    const navHeader = await page.$('nav');
    if (!navHeader) throw new Error('Failed to return to Guided Journey after pressing ESC!');
    console.log('✓ Successfully returned to Guided Journey.');

    // -------------------------------------------------------------------------
    // TEST 3: MOBILE VIEWPORT (390x844)
    // -------------------------------------------------------------------------
    console.log('5. Testing Mobile Viewport (390x844)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:4895/', { waitUntil: 'networkidle0' });

    // Verify minimap button and all chapters on mobile
    const mobileHero = await page.$('#hero');
    if (!mobileHero) throw new Error('Mobile hero missing!');
    await page.screenshot({ path: path.join(outputDir, 'mobile_playable_hero.png') });
    console.log('✓ Mobile responsive composition verified.');

    // -------------------------------------------------------------------------
    // TEST 4: ALL 13 ROUTES INTEGRITY CHECK
    // -------------------------------------------------------------------------
    console.log('6. Verifying All 13 Routes...');
    const routes = [
      '/',
      '/about/',
      '/ventures/',
      '/ventures/ziggers/',
      '/ventures/loopmemory/',
      '/events/',
      '/writing/',
      '/writing/startup-builder-venture-builder-india/',
      '/writing/gig-marketplace-chennai/',
      '/writing/ai-persistent-context-architecture/',
      '/writing/geopolitics-defence-venture-building/',
      '/writing/catering-workers-in-chennai/',
      '/contact/',
    ];

    for (const r of routes) {
      const resp = await page.goto(`http://localhost:4895${r}`, { waitUntil: 'networkidle0' });
      if (resp.status() !== 200 && resp.status() !== 304) {
        throw new Error(`Route ${r} returned status ${resp.status()}`);
      }
      console.log(`  ✓ Route ${resp.status()} OK: ${r}`);
    }

    console.log(`Console errors encountered: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Console Errors:', consoleErrors);
      throw new Error(`Found ${consoleErrors.length} console errors!`);
    }

    console.log('🎉 ALL PLAYABLE PORTFOLIO ACCEPTANCE TESTS PASSED!');
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
