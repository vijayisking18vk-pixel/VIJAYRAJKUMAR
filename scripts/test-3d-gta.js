import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('scratch/gta-3d-inspection');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function main() {
  console.log('Starting vite preview server on port 4889...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4889', '--strictPort'], {
    shell: true,
    stdio: 'pipe'
  });

  // Wait for server to boot
  await new Promise((resolve) => setTimeout(resolve, 3500));

  console.log('Launching Puppeteer Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const logs = [];
  page.on('console', (msg) => logs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', (err) => logs.push(`[PAGE ERROR] ${err.toString()}`));

  // 1. Desktop Test (1440x900)
  console.log('Testing Desktop 1440x900...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto('http://localhost:4889/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000)); // Allow Three.js textures and camera settle

  await page.screenshot({ path: path.join(outputDir, 'desktop_hero_3d.png') });
  console.log('Desktop 3D Hero screenshot saved.');

  // Check Radar HUD
  const radar = await page.$('aside[aria-label="GTA Minimap Navigation HUD and Audio Console"]');
  console.log('Radar Minimap HUD found:', !!radar);

  // 2. Mobile Test (390x844 - iPhone 14 style)
  console.log('Testing Mobile 390x844...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:4889/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outputDir, 'mobile_hero_3d.png') });
  console.log('Mobile 3D Hero screenshot saved.');

  // 3. Test Subpage (/about/)
  console.log('Testing Subpage /about/...');
  await page.goto('http://localhost:4889/about/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outputDir, 'about_subpage.png') });
  console.log('About subpage screenshot saved.');

  // 4. Test Subpage (/ventures/)
  console.log('Testing Subpage /ventures/...');
  await page.goto('http://localhost:4889/ventures/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outputDir, 'ventures_subpage.png') });
  console.log('Ventures subpage screenshot saved.');

  console.log('\n--- Console Logs ---');
  logs.forEach((l) => console.log(l));

  await browser.close();
  server.kill('SIGTERM');
  console.log('Done!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error during test:', err);
  process.exit(1);
});
