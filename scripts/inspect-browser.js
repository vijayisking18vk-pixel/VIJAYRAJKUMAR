import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve('scratch/browser-inspection');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function inspect(url, name) {
  console.log(`\n--- Inspecting ${url} (${name}) ---`);
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => consoleLogs.push(`[PAGE ERROR] ${err.toString()}`));

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  } catch (e) {
    console.log(`Navigation error: ${e.message}`);
    // Wait a little if timeout
    await new Promise(r => setTimeout(r, 3000));
  }

  // Scroll to FAQ section and screenshot
  const faqSection = await page.$('#aeo-knowledge-hub');
  if (faqSection) {
    await faqSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 1000));
    const faqScreenshotPath = path.join(outputDir, `${name}_faq.png`);
    await faqSection.screenshot({ path: faqScreenshotPath });
    console.log(`FAQ Screenshot saved: ${faqScreenshotPath}`);
  }

  // Inspect headings and text styles
  const inspection = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, p, a')).slice(0, 30).map(el => {
      const style = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        text: el.innerText.trim().slice(0, 50),
        color: style.color,
        fontFamily: style.fontFamily.split(',')[0],
        fontSize: style.fontSize,
        textStroke: style.webkitTextStroke,
        visible: rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0'
      };
    });

    return {
      title: document.title,
      headings: headings.filter(h => h.text.length > 0)
    };
  });

  console.log(`Title: ${inspection.title}`);
  console.log('Sample text elements:');
  inspection.headings.slice(0, 15).forEach((h, i) => {
    console.log(` [${h.tag}] "${h.text}" | color: ${h.color} | font: ${h.fontFamily} | stroke: ${h.textStroke} | visible: ${h.visible}`);
  });

  if (consoleLogs.length > 0) {
    console.log('Console logs:', consoleLogs.slice(0, 5));
  }

  await browser.close();
}

async function run() {
  await inspect('https://www.vijayrajkumar.in/', 'live_deployed_faq_fixed');
}

run().catch(console.error);
