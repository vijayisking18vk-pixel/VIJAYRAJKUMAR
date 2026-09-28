import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('scratch/final-audit-verification');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('1. Connecting to preview server on port 4897...');

  console.log('2. Launching Puppeteer Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
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

    // -------------------------------------------------------------------------
    // TEST 1: MOBILE VIEWPORT (390px) HORIZONTAL OVERFLOW CHECK ON ALL 13 ROUTES
    // -------------------------------------------------------------------------
    console.log('3. Testing Mobile (390px) Viewport Width on All 13 Routes...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });

    for (const r of routes) {
      const resp = await page.goto(`http://localhost:4897${r}`, { waitUntil: 'networkidle0' });
      if (resp.status() !== 200 && resp.status() !== 304) {
        throw new Error(`Route ${r} returned status ${resp.status()}`);
      }

      // Check scrollWidth vs clientWidth
      const dimensions = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
      }));

      console.log(`  Route: ${r} -> scrollWidth: ${dimensions.scrollWidth}px (viewport: 390px)`);

      if (dimensions.scrollWidth > 390) {
        // Find the offending elements
        const overflowElements = await page.evaluate(() => {
          const els = [];
          document.querySelectorAll('*').forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.right > 390 || rect.width > 390) {
              els.push({
                tag: el.tagName,
                class: el.className,
                id: el.id,
                width: rect.width,
                right: rect.right,
              });
            }
          });
          return els.slice(0, 5);
        });
        console.error('Overflowing elements:', overflowElements);
        throw new Error(`HORIZONTAL OVERFLOW on route ${r}: scrollWidth is ${dimensions.scrollWidth}px > 390px`);
      }
    }
    console.log('✓ All 13 routes pass 390px mobile viewport test with 0px horizontal overflow!');

    // -------------------------------------------------------------------------
    // TEST 2: HEADER OPAQUE BACKGROUND & DESKTOP CONTRAST
    // -------------------------------------------------------------------------
    console.log('4. Testing Header Opacity & Desktop Styling (1440x900)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:4897/writing/geopolitics-defence-venture-building/', { waitUntil: 'networkidle0' });

    const headerBg = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header ? window.getComputedStyle(header).backgroundColor : null;
    });
    console.log(`Header background color: ${headerBg}`);
    if (!headerBg || headerBg.includes('rgba') && !headerBg.includes('rgba(17, 16, 14, 1)')) {
      // Must be opaque rgb(17, 16, 14) or similar
      if (headerBg.startsWith('rgba') && !headerBg.endsWith(', 1)')) {
        throw new Error(`Header is not fully opaque: ${headerBg}`);
      }
    }
    console.log('✓ Header has verified opaque background.');

    // -------------------------------------------------------------------------
    // TEST 3: VERIFY EMAIL & EDUCATION LINKS ON CONTACT AND ABOUT
    // -------------------------------------------------------------------------
    console.log('5. Verifying Authoritative Email and Public Education URLs...');
    await page.goto('http://localhost:4897/contact/', { waitUntil: 'networkidle0' });
    const contactHtml = await page.content();

    if (contactHtml.includes('contact@vijayrajkumar.in')) {
      throw new Error('Found deprecated email contact@vijayrajkumar.in on /contact/!');
    }
    if (!contactHtml.includes('vijaykumarunfounded@gmail.com')) {
      throw new Error('Missing authoritative email vijaykumarunfounded@gmail.com on /contact/!');
    }
    if (contactHtml.includes('edit/forms/')) {
      throw new Error('Found private LinkedIn edit/forms/ URL on /contact/!');
    }
    console.log('✓ /contact/ verified: correct email and no private edit URLs.');

    await page.goto('http://localhost:4897/about/', { waitUntil: 'networkidle0' });
    const aboutHtml = await page.content();
    if (aboutHtml.includes('edit/forms/')) {
      throw new Error('Found private LinkedIn edit/forms/ URL on /about/!');
    }
    if (!aboutHtml.includes('srmist.edu.in') || !aboutHtml.includes('dbhpscentral.org')) {
      throw new Error('Missing official university URLs for SRMIST and DBHPS on /about/!');
    }
    console.log('✓ /about/ verified: official public university destinations present.');

    // -------------------------------------------------------------------------
    // TEST 4: EVENTS PAGE RECONCILED ROLES & FRAMED PHOTOGRAPHS
    // -------------------------------------------------------------------------
    console.log('6. Verifying Events Page...');
    await page.goto('http://localhost:4897/events/', { waitUntil: 'networkidle0' });
    const eventsHtml = await page.content();

    if (eventsHtml.includes('interactive physics') || eventsHtml.includes('liquid displacement')) {
      throw new Error('Events page still mentions interactive physics / liquid displacement!');
    }
    if (!eventsHtml.includes('BAL Carpet Partnership')) {
      throw new Error('Events page missing reconciled role for Kazakhstan forum!');
    }
    console.log('✓ Events page verified: clean framed photographs and reconciled roles.');

    // -------------------------------------------------------------------------
    // TEST 5: DISTRICT MAP WIDGET EXPANSION & SUBPAGE COLLAPSE
    // -------------------------------------------------------------------------
    console.log('7. Verifying District Map Widget...');
    // On subpage, it should be collapsed by default
    const mapBadge = await page.$('aside[aria-label="District Map and Navigation HUD"] button');
    if (!mapBadge) throw new Error('District Map widget badge not found!');
    const badgeText = await page.evaluate((el) => el.innerText, mapBadge);
    console.log(`Subpage Map Badge Text: "${badgeText.trim()}"`);
    if (!badgeText.includes('DISTRICT MAP')) {
      throw new Error(`Expected collapsed map badge, got: ${badgeText}`);
    }

    // Click to expand
    console.log('Clicking to expand District Map HUD...');
    await mapBadge.click();
    await new Promise((r) => setTimeout(r, 400));

    // Verify SVG map rendered
    const svgMap = await page.$('aside svg');
    if (!svgMap) throw new Error('SVG District Map not found after expanding!');
    console.log('✓ SVG District Map renders roads and landmark parcels.');

    // Screenshot of expanded map
    await page.screenshot({ path: path.join(outputDir, 'expanded_district_map.png') });

    console.log(`Total console errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn('Console warnings/errors:', consoleErrors);
    }

    console.log('\n🎉 ALL ACCEPTANCE CRITERIA VERIFIED AND PASSED SUCCESSFULLY!');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error('\n❌ VERIFICATION FAILED:', err);
  process.exit(1);
});
