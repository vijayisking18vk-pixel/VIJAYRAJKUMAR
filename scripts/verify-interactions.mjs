import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']});
try{
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
 await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle2'});
 assert.equal(await page.$eval('.opening-sequence',e=>getComputedStyle(e).opacity),'1');
 await page.click('[aria-label="Explore mode"]');await new Promise(r=>setTimeout(r,1800));
 assert.equal(await page.$eval('.opening-sequence',e=>getComputedStyle(e).visibility),'hidden');
 const before=await page.evaluate(()=>scrollY);await page.evaluate(()=>document.activeElement.blur());
 await page.keyboard.down('ArrowUp');await new Promise(r=>setTimeout(r,500));await page.keyboard.up('ArrowUp');
 assert(await page.evaluate(y=>scrollY>y,before));
 await page.keyboard.press('Escape');assert(await page.$('.road-header'));
 console.log('PASS: full-screen intro, Explore entry, arrows, Escape');
 for(let i=0;i<6;i++){
  await page.click('.journey-map-toggle');await page.click('.journey-map-route button:nth-of-type('+(i+1)+')');await new Promise(r=>setTimeout(r,1500));
  assert(Math.abs(Number(await page.$eval('[role="progressbar"]',e=>e.getAttribute('aria-valuenow')))-i*20)<2);
 }
 console.log('PASS: all six route positions after intro offset');
 const client=await page.createCDPSession();
 const start=await page.evaluate(()=>scrollY);
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:190,y:250}]});
 for(let y=270;y<=650;y+=25){await client.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:190,y}]});await new Promise(r=>setTimeout(r,20));}
 await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 assert(await page.evaluate(y=>scrollY<y,start));console.log('PASS: native mobile swipe');
 await page.goto('http://127.0.0.1:3000/writing/',{waitUntil:'networkidle2'});
 await page.click('.mission-enter');await new Promise(r=>setTimeout(r,500));
 await page.$eval('a[href="/writing/startup-builder-venture-builder-india/"]',e=>e.click());
 await page.waitForSelector('article');
 assert(page.url().includes('startup-builder'));assert(await page.evaluate(()=>scrollY>400));
 console.log('PASS: article opens at reading area');
 await page.goto('http://127.0.0.1:3000/ventures/',{waitUntil:'networkidle2'});
 const card=await page.$('[role="group"][aria-label*="venture dossier"]');await card.focus();await page.keyboard.press('Enter');
 assert(await card.evaluate(e=>e.firstElementChild.style.transform.includes('180')));console.log('PASS: keyboard venture card');
 await page.goto('http://127.0.0.1:3000/contact/',{waitUntil:'networkidle2'});
 await page.$eval('form',el=>el.requestSubmit());assert(await page.$eval('form',e=>!e.checkValidity()));
 assert(await page.$('#contact-name'));assert(await page.$('a[href^="mailto:"]'));
 console.log('PASS: contact validation and direct email link');
 await page.setViewport({width:320,height:740,isMobile:true,hasTouch:true});await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle2'});
 await page.click('[aria-label="Open navigation"]');assert.equal(await page.$$eval('#district-mobile-nav a',e=>e.length),5);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await page.keyboard.press('Escape');
 console.log('PASS: 320px mobile navigation');
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.click('.enter-district');await new Promise(r=>setTimeout(r,500));assert.equal(await page.$eval('.opening-sequence',e=>getComputedStyle(e).visibility),'hidden');
 console.log('PASS: reduced-motion entry');
 assert.deepEqual(errors,[]);console.log('PASS: no runtime errors');
 await page.setViewport({width:1440,height:900,isMobile:false,hasTouch:false});await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle2'});await page.click('.enter-district');await new Promise(r=>setTimeout(r,1500));await page.screenshot({path:'../../gta-road-final.png'});
}finally{await browser.close();}
