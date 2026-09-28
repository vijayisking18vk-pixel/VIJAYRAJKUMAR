import puppeteer from 'puppeteer-core';
import { spawn } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function run() {
  console.log('1. Starting preview server on port 4899...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4899', '--strictPort'], {
    shell: true,
    stdio: 'pipe',
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log('2. Launching Puppeteer Chrome with autoplay allowed...');
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
    console.log('3. Navigating to http://localhost:4899/ ...');
    await page.goto('http://localhost:4899/', { waitUntil: 'networkidle2' });
    await new Promise((r) => setTimeout(r, 1000));

    // Check audio state on entry
    const audioStatus = await page.evaluate(async () => {
      const soundSys = window.__GTA_SOUND_SYSTEM__;
      // Also inspect audio elements
      const audios = Array.from(document.querySelectorAll('audio'));
      return {
        audioTagsCount: audios.length,
        hasAudioElement: Boolean(window.Audio),
      };
    });
    console.log('Audio DOM status:', audioStatus);

    // Simulate entry interaction (user clicking or touching anywhere on page)
    console.log('4. Performing user interaction click to trigger gesture handlers...');
    await page.click('body');
    await new Promise((r) => setTimeout(r, 1000));

    // Check header audio button status
    const headerAudioButtonText = await page.evaluate(() => {
      const btn = document.querySelector('header button[title*="Theme"]');
      return btn ? btn.innerText.trim() : 'NOT_FOUND';
    });
    console.log('Header audio button label:', headerAudioButtonText);

    // Verify audio file HTTP fetch
    const audioFetchRes = await page.evaluate(async () => {
      const resp = await fetch('/audio/gta_theme.mp3', { method: 'HEAD' });
      return {
        status: resp.status,
        contentType: resp.headers.get('content-type'),
        contentLength: resp.headers.get('content-length'),
      };
    });
    console.log('Audio file head response:', audioFetchRes);

    if (audioFetchRes.status !== 200) {
      throw new Error(`Expected HTTP 200 for /audio/gta_theme.mp3, got ${audioFetchRes.status}`);
    }

    // Toggle audio off via header button
    console.log('5. Clicking audio button in header...');
    await page.click('header button[title*="Theme"]');
    await new Promise((r) => setTimeout(r, 500));

    const headerAfterClick = await page.evaluate(() => {
      const btn = document.querySelector('header button[title*="Theme"]');
      return btn ? btn.innerText.trim() : 'NOT_FOUND';
    });
    console.log('Header audio button label after click:', headerAfterClick);

    // Toggle audio back on
    console.log('6. Clicking audio button again to resume...');
    await page.click('header button[title*="Theme"]');
    await new Promise((r) => setTimeout(r, 500));

    const headerAfterResume = await page.evaluate(() => {
      const btn = document.querySelector('header button[title*="Theme"]');
      return btn ? btn.innerText.trim() : 'NOT_FOUND';
    });
    console.log('Header audio button label after resume:', headerAfterResume);

    console.log('Console errors during test:', consoleErrors);
    if (consoleErrors.length > 0) {
      throw new Error('Console errors encountered: ' + consoleErrors.join(', '));
    }

    console.log('\n>>> ALL GTA THEME AUDIO VERIFICATIONS PASSED SUCCESSFULLY! <<<\n');
  } finally {
    await browser.close();
    server.kill();
  }
}

run().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
