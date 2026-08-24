const puppeteer = require('puppeteer');

async function testOverflowHidden() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    args: [
      '--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security',
      '--disable-features=site-per-process', '--disable-gpu',
      '--disable-dev-shm-usage', '--ignore-certificate-errors'
    ],
    timeout: 60000
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 2000, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });

  // BEFORE: Check original scrollWidth
  const before = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
      bodyOverflowX: getComputedStyle(document.body).overflowX,
      mainScrollWidth: document.querySelector('main')?.scrollWidth || 'N/A',
      mainClientWidth: document.querySelector('main')?.clientWidth || 'N/A',
      mainOverflowX: getComputedStyle(document.querySelector('main') || document.body).overflowX,
      customOrdersSection: (() => {
        const s = document.getElementById('custom-orders');
        if (!s) return 'not found';
        return {
          scrollWidth: s.scrollWidth,
          clientWidth: s.clientWidth,
          overflowX: getComputedStyle(s).overflowX,
          rect: { left: Math.round(s.getBoundingClientRect().left), right: Math.round(s.getBoundingClientRect().right), width: Math.round(s.getBoundingClientRect().width) },
        };
      })(),
      processSection: (() => {
        const s = document.getElementById('process');
        if (!s) return 'not found';
        return {
          scrollWidth: s.scrollWidth,
          clientWidth: s.clientWidth,
          overflowX: getComputedStyle(s).overflowX,
          rect: { left: Math.round(s.getBoundingClientRect().left), right: Math.round(s.getBoundingClientRect().right), width: Math.round(s.getBoundingClientRect().width) },
        };
      })(),
    };
  });
  
  console.log('=== BEFORE any changes ===');
  console.log(JSON.stringify(before, null, 2));

  // Test 1: Add overflow-hidden to CustomOrderSection
  await page.addStyleTag({
    content: `
      #custom-orders { overflow: hidden !important; }
    `
  });
  
  await page.evaluate(() => {
    // Force reflow
    document.body.offsetHeight;
  });
  
  const test1 = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
    };
  });
  console.log('\n=== AFTER: overflow-hidden on #custom-orders ===');
  console.log(`body.scrollWidth: ${test1.bodyScrollWidth}, body.clientWidth: ${test1.bodyClientWidth}`);
  console.log(`Overflow: ${test1.bodyScrollWidth - test1.bodyClientWidth}px`);

  // Test 2: Also add overflow-hidden to ProcessSection
  await page.addStyleTag({
    content: `
      #process { overflow: hidden !important; }
    `
  });
  
  await page.evaluate(() => {
    document.body.offsetHeight;
  });
  
  const test2 = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
    };
  });
  console.log('\n=== AFTER: overflow-hidden on #custom-orders AND #process ===');
  console.log(`body.scrollWidth: ${test2.bodyScrollWidth}, body.clientWidth: ${test2.bodyClientWidth}`);
  console.log(`Overflow: ${test2.bodyScrollWidth - test2.bodyClientWidth}px`);

  // Test 3: Remove the callout elements entirely (simulating proper fix)
  await page.evaluate(() => {
    // Remove the absolute callout divs
    const callouts = document.querySelectorAll('div[style*="background"]');
    // Actually, let's just remove elements with right: -32px
    const allEls = document.querySelectorAll('*');
    for (let i = 0; i < allEls.length; i++) {
      const el = allEls[i];
      const cs = getComputedStyle(el);
      if (cs.right === '-32px' && cs.position === 'absolute' && cs.width === '288px') {
        // This is the CustomOrderSection callout
        const parent = el.parentElement;
        // Also remove the parent's transform
        if (parent) {
          parent.style.transform = 'none';
        }
        el.remove();
      }
    }
    // Also remove HeroSection callout (for completeness)
    const allEls2 = document.querySelectorAll('*');
    for (let i = 0; i < allEls2.length; i++) {
      const el = allEls2[i];
      const cs = getComputedStyle(el);
      if (cs.right === '-32px' && cs.position === 'absolute' && cs.width === '256px') {
        el.remove();
      }
    }
  });
  
  await page.evaluate(() => {
    document.body.offsetHeight;
  });
  
  const test3 = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
    };
  });
  console.log('\n=== AFTER: removed callout elements + removed parent transforms ===');
  console.log(`body.scrollWidth: ${test3.bodyScrollWidth}, body.clientWidth: ${test3.bodyClientWidth}`);
  console.log(`Overflow: ${test3.bodyScrollWidth - test3.bodyClientWidth}px`);

  // Let's also check what's the actual max right edge after removing callouts
  const test3detail = await page.evaluate(() => {
    const allEls = document.querySelectorAll('*');
    let maxRight = 0;
    let maxRightEl = null;
    for (let i = 0; i < allEls.length; i++) {
      const el = allEls[i];
      const rect = el.getBoundingClientRect();
      if (rect.right > maxRight) {
        maxRight = rect.right;
        maxRightEl = { tag: el.tagName.toLowerCase(), className: String(el.className || '').split(' ').filter(c=>c.length>0).slice(0,5).join(' ') };
      }
    }
    return {
      maxRight,
      viewportWidth: window.innerWidth,
      maxRightEl,
    };
  });
  console.log(JSON.stringify(test3detail, null, 2));

  await browser.close();
  console.log('\nDone.');
}

testOverflowHidden().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
