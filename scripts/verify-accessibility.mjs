import puppeteer from 'puppeteer-core';import assert from 'node:assert/strict';
const executablePath='C:/Program Files/Google/Chrome/Application/chrome.exe';
const browser=await puppeteer.launch({executablePath,headless:true,args:['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']});
try{const p=await browser.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.setViewport({width:320,height:740,isMobile:true,hasTouch:true});
await p.goto('http://127.0.0.1:3000/contact/',{waitUntil:'networkidle2'});await p.$eval('form',e=>e.requestSubmit());assert(await p.$eval('form',e=>!e.checkValidity()));assert(await p.$('a[href^="mailto:"]'));console.log('PASS: native contact validation and email link');
await p.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle2'});await p.click('[aria-label="Open navigation"]');assert.equal(await p.$$eval('#district-mobile-nav a',e=>e.length),5);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.keyboard.press('Escape');console.log('PASS: 320px navigation');
await p.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await p.click('.enter-district');await new Promise(r=>setTimeout(r,800));assert.equal(await p.$eval('.opening-sequence',e=>getComputedStyle(e).visibility),'hidden');console.log('PASS: reduced-motion entry');assert.deepEqual(errors,[]);
await p.setViewport({width:1440,height:900,isMobile:false,hasTouch:false});await p.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle2'});await p.click('.enter-district');await new Promise(r=>setTimeout(r,1600));await p.screenshot({path:'../../gta-road-final.png'});
await p.goto('http://127.0.0.1:3000/ventures/',{waitUntil:'networkidle2'});await p.click('.mission-enter');await new Promise(r=>setTimeout(r,600));await p.screenshot({path:'../../gta-ventures-final.png'});
}finally{await browser.close();}
const fallback=await puppeteer.launch({executablePath,headless:true,args:['--no-sandbox','--disable-webgl']});
try{const p=await fallback.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto('http://127.0.0.1:3000/about/',{waitUntil:'networkidle2'});assert(await p.$('button[aria-label="Open About"]'));assert.deepEqual(errors,[]);console.log('PASS: WebGL-free illustrated fallback');}finally{await fallback.close();}
