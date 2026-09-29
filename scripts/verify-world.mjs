import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true,args:['--no-sandbox','--enable-webgl','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']});
try {
 const page=await browser.newPage();
 const errors=[]; page.on('pageerror',e=>errors.push(e.message));
 await page.setViewport({width:1440,height:900});
 await page.goto('http://127.0.0.1:3000/',{waitUntil:'networkidle2'});
 await new Promise(r=>setTimeout(r,1200));
 assert.equal(await page.$eval('.opening-sequence',e=>getComputedStyle(e).opacity),'1');
 await page.screenshot({path:'../../gta-opening-desktop.png'});
 await page.click('.enter-district');
 await new Promise(r=>setTimeout(r,2200));
 await page.screenshot({path:'../../gta-road-desktop.png'});
 assert.equal(await page.$eval('.opening-sequence',e=>getComputedStyle(e).visibility),'hidden');
 for (const route of ['about','ventures','events','writing','contact','ventures/ziggers','ventures/loopmemory','missing']) {
  await page.goto('http://127.0.0.1:3000/'+route+'/',{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,600));
  const info=await page.evaluate(()=>({title:document.querySelector('h1')?.innerText,overflow:document.documentElement.scrollWidth>innerWidth,headers:document.querySelectorAll('.district-header').length}));
  assert(info.title);assert.equal(info.headers,1);assert.equal(info.overflow,false);
  console.log(route,JSON.stringify(info));
  if(['about','ventures','contact'].includes(route)) {
   await page.screenshot({path:'../../gta-'+route+'-desktop.png'});
   await page.evaluate(()=>document.getElementById('mission-content').scrollIntoView());
   await new Promise(r=>setTimeout(r,300));
   await page.screenshot({path:'../../gta-'+route+'-content.png'});
  }
 }
 await page.setViewport({width:390,height:844,isMobile:true,hasTouch:true});
 for(const route of ['','about','ventures','events','writing','contact','ventures/ziggers','ventures/loopmemory']) {
  await page.goto('http://127.0.0.1:3000/'+(route?route+'/':''),{waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,400));
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'Mobile overflow '+route);
  if(['','about','contact'].includes(route))await page.screenshot({path:'../../gta-'+(route||'opening')+'-mobile.png'});
  if(route==='') {await page.click('.enter-district');await new Promise(r=>setTimeout(r,1800));await page.screenshot({path:'../../gta-road-mobile.png'});}
  console.log('mobile',route||'home','OK');
 }
 console.log('Runtime errors',errors); assert.deepEqual(errors,[]);
} finally {await browser.close();}
