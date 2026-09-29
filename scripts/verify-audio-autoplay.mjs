import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import { spawn } from 'node:child_process';

const origin = 'http://127.0.0.1:4901';
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--host', '127.0.0.1', '--port', '4901', '--strictPort'], { stdio: 'ignore' });
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  for (let i = 0; i < 50; i++) {
    if (await fetch(origin).then(r => r.ok).catch(() => false)) break;
    await wait(200);
  }
  for (const scenario of [
    { name: 'autoplay on entry', policy: 'no-user-gesture-required' },
    { name: 'blocked autoplay starts on click', gesture: 'click' },
    { name: 'mobile starts on tap', gesture: 'tap', mobile: true },
    { name: 'keyboard starts audio', gesture: 'key' },
    { name: 'saved mute remains muted until enabled', savedMute: true },
    { name: 'storage unavailable', policy: 'no-user-gesture-required', noStorage: true },
    { name: 'direct subpage autoplay', policy: 'no-user-gesture-required', path: '/about/' },
  ]) {
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',
      headless: true,
      args: ['--no-sandbox', '--enable-unsafe-swiftshader', `--autoplay-policy=${scenario.policy || 'document-user-activation-required'}`],
    });
    try {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewport({ width: scenario.mobile ? 320 : 1280, height: 844, isMobile: !!scenario.mobile, hasTouch: !!scenario.mobile });
      await page.evaluateOnNewDocument(({ savedMute, noStorage }) => {
        // Observe the real native media instance without replacing playback behavior.
        const NativeAudio = window.Audio;
        window.Audio = function (...args) {
          const audio = new NativeAudio(...args);
          window.testTheme = audio;
          return audio;
        };
        if (savedMute) localStorage.setItem('gta_sound_enabled', 'false');
        if (noStorage) {
          Storage.prototype.getItem = Storage.prototype.setItem = () => { throw new DOMException('Storage disabled', 'SecurityError'); };
        }
      }, scenario);
      await page.goto(origin + (scenario.path || '/'), { waitUntil: 'networkidle2' });
      await page.waitForFunction(() => window.testTheme?.readyState >= 2);
      assert.equal(await page.evaluate(() => testTheme.currentSrc.endsWith('/audio/gta_theme.mp3')), true);
      assert.equal(await page.evaluate(() => testTheme.loop && testTheme.volume > 0 && !testTheme.muted), true);
      if (scenario.gesture || scenario.savedMute) {
        assert.equal(await page.evaluate(() => testTheme.paused), true, 'A fresh restricted browser must block audible autoplay');
        if (scenario.gesture === 'click') await page.click('.enter-district');
        if (scenario.gesture === 'tap') await page.tap('.enter-district');
        if (scenario.gesture === 'key') await page.keyboard.press('ArrowDown');
        if (scenario.savedMute) {
          await page.click('.enter-district');
          await wait(250);
          assert.equal(await page.evaluate(() => testTheme.paused), true);
          await page.click('[aria-label="Play music"]');
        }
      }
      await page.waitForFunction(() => !testTheme.paused && testTheme.currentTime > 0);
      await page.waitForSelector('[aria-label="Mute music"]');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      if (scenario.name === 'autoplay on entry') {
        const before = await page.evaluate(() => testTheme.currentTime);
        await page.click('.enter-district');
        await page.waitForSelector('.road-revealed');
        await page.click('.mission-enter');
        await page.waitForFunction(() => location.pathname.includes('/about'));
        assert.equal(await page.evaluate(previous => !testTheme.paused && testTheme.currentTime >= previous, before), true, 'Navigation must preserve music');
        const otherTab = await browser.newPage();
        await otherTab.bringToFront();
        await page.waitForFunction(() => document.hidden && testTheme.paused);
        await page.bringToFront();
        await page.waitForFunction(() => !testTheme.paused);
        await otherTab.close();
      }
      await page.click('[aria-label="Mute music"]');
      await page.waitForFunction(() => testTheme.paused);
      await page.keyboard.press('Tab');
      assert.equal(await page.evaluate(() => testTheme.paused), true, 'Gestures must respect mute');
      if (!scenario.noStorage) assert.equal(await page.evaluate(() => localStorage.getItem('gta_sound_enabled')), 'false');
      await page.click('[aria-label="Play music"]');
      await page.waitForFunction(() => !testTheme.paused);
      assert.deepEqual(errors, []);
      console.log(`PASS ${scenario.name}`);
    } finally { await browser.close(); }
  }
} finally { server.kill(); }
