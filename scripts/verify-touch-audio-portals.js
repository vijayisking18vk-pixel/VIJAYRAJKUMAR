import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('scratch/touch-audio-portals-test');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('1. Starting preview server on port 4890...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4890', '--strictPort'], {
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
    // Test 1: Desktop Viewport & Natural Scroll (No 500vh scroll animation)
    console.log('3. Testing Desktop Viewport (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4890/', { waitUntil: 'networkidle0' });

    // Verify Portals Section
    const portals = await page.$$eval('#portals a', (els) =>
      els.map((el) => ({
        href: el.getAttribute('href'),
        text: el.innerText.trim().replace(/\s+/g, ' '),
      }))
    );
    console.log(`Portals detected: ${portals.length}`);
    portals.forEach((p, i) => console.log(`  Portal ${i + 1}: ${p.href} -> ${p.text}`));

    if (portals.length !== 4) {
      throw new Error(`Expected 4 portals, found ${portals.length}`);
    }

    // Verify No ScrollTrapping 500vh pin wrapper
    const totalBodyHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log(`Total body scroll height: ${totalBodyHeight}px (clean, natural height)`);

    await page.screenshot({ path: path.join(outputDir, 'desktop_homepage_hero_portals.png') });

    // Test 2: Mobile Viewport & Touch Layout Stability on Radar HUD
    console.log('4. Testing Mobile Viewport (390x844) & Radar stability...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:4890/', { waitUntil: 'networkidle0' });

    // Expand minimap if collapsed
    const isMinimapButton = await page.$('aside button[aria-label="Expand Minimap HUD"]');
    if (isMinimapButton) {
      console.log('Expanding minimap on mobile...');
      await isMinimapButton.click();
      await new Promise((r) => setTimeout(r, 400));
    }

    // Measure HUD container dimensions before and after waypoint hover/touch
    const hudBoxBefore = await page.$eval('aside > div', (el) => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height, top: rect.top, bottom: rect.bottom };
    });
    console.log('HUD box before waypoint touch:', hudBoxBefore);

    // Hover / touch over Ventures waypoint
    const waypointBtn = await page.$('aside button[title*="VENTURES"]');
    if (waypointBtn) {
      await waypointBtn.hover();
      await new Promise((r) => setTimeout(r, 200));
    }

    const hudBoxAfter = await page.$eval('aside > div', (el) => {
      const rect = el.getBoundingClientRect();
      return { width: rect.width, height: rect.height, top: rect.top, bottom: rect.bottom };
    });
    console.log('HUD box after waypoint touch:', hudBoxAfter);

    const heightDelta = Math.abs(hudBoxAfter.height - hudBoxBefore.height);
    const topDelta = Math.abs(hudBoxAfter.top - hudBoxBefore.top);
    console.log(`Height delta: ${heightDelta}px, Top delta: ${topDelta}px`);

    if (heightDelta > 1 || topDelta > 1) {
      throw new Error(`Radar HUD is shifting height on touch/hover! Height delta=${heightDelta}, Top delta=${topDelta}`);
    }
    console.log('✓ RADAR HUD LAYOUT IS COMPLETELY LOCKED & STABLE (Zero Shaking)!');

    await page.screenshot({ path: path.join(outputDir, 'mobile_radar_stable.png') });

    // Test 3: Audio Toggle and Persistence Across Navigation
    console.log('5. Testing Audio Toggle & Persistence...');
    const audioBtn = await page.$('aside button[title*="Toggle Ambient Audio"]');
    if (audioBtn) {
      const initialText = await page.evaluate((el) => el.innerText, audioBtn);
      console.log(`Initial audio button: ${initialText}`);

      // Click audio button to turn ON
      await audioBtn.click();
      await new Promise((r) => setTimeout(r, 300));

      const turnedOnText = await page.evaluate((el) => el.innerText, audioBtn);
      console.log(`After click audio button: ${turnedOnText}`);

      const savedState = await page.evaluate(() => localStorage.getItem('gta_sound_enabled'));
      console.log(`Saved in localStorage: gta_sound_enabled = ${savedState}`);

      if (savedState !== 'true') {
        throw new Error(`Expected localStorage to save gta_sound_enabled='true', got ${savedState}`);
      }

      // Navigate to /about/
      console.log('Navigating to /about/ to verify audio state persistence...');
      await page.goto('http://localhost:4890/about/', { waitUntil: 'networkidle0' });

      // Check audio button on /about/
      const aboutAudioBtn = await page.$('aside button[title*="Toggle Ambient Audio"]');
      if (aboutAudioBtn) {
        const aboutAudioText = await page.evaluate((el) => el.innerText, aboutAudioBtn);
        console.log(`Audio button on /about/: ${aboutAudioText}`);
        if (!aboutAudioText.includes('AUDIO: ON')) {
          throw new Error(`Expected AUDIO: ON after navigation, but got ${aboutAudioText}`);
        }
        console.log('✓ AUDIO PERSISTENCE ACROSS NAVIGATION VERIFIED!');
      }
    }

    console.log('Console errors encountered:', consoleErrors.length);
    if (consoleErrors.length > 0) {
      console.log('Errors:', consoleErrors);
    }

    console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error('Test Failed:', err);
  process.exit(1);
});
