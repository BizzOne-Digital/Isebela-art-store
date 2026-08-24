const puppeteer = require('puppeteer');

async function diagnose3() {
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
  await page.setViewport({ width: 375, height: 800, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });

  const diagnostics = await page.evaluate(() => {
    const nextDiv = document.getElementById('__next');
    
    let htmlPreview = '';
    if (document.documentElement instanceof HTMLElement) {
      htmlPreview = document.documentElement.innerHTML.substring(0, 2000);
    }
    
    return {
      nextExists: !!nextDiv,
      nextId: nextDiv ? nextDiv.id : 'N/A',
      nextClassName: nextDiv ? String(nextDiv.className).substring(0, 200) : 'N/A',
      nextInnerHTMLStart: nextDiv ? nextDiv.innerHTML.substring(0, 500) : 'N/A',
      nextComputedWidth: nextDiv ? getComputedStyle(nextDiv).width : 'N/A',
      nextComputedMaxWidth: nextDiv ? getComputedStyle(nextDiv).maxWidth : 'N/A',
      nextComputedStyleOverflowX: nextDiv ? getComputedStyle(nextDiv).overflowX : 'N/A',
      nextClientWidth: nextDiv ? nextDiv.clientWidth : 'N/A',
      nextScrollWidth: nextDiv ? nextDiv.scrollWidth : 'N/A',
      nextRect: nextDiv ? {
        left: Math.round(nextDiv.getBoundingClientRect().left),
        right: Math.round(nextDiv.getBoundingClientRect().right),
        width: Math.round(nextDiv.getBoundingClientRect().width),
      } : 'N/A',
    };
  });

  console.log('=== __next div info ===');
  console.log(JSON.stringify(diagnostics, null, 2));

  // Now check element at right edge
  const pixelCheck = await page.evaluate(() => {
    const checks = [];
    for (let y = 0; y < 800; y += 50) {
      const el = document.elementFromPoint(window.innerWidth - 2, y);
      if (el) {
        const cs = getComputedStyle(el);
        checks.push({
          y: y,
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: String(el.className || '').split(' ').filter(c => c.length > 0).slice(0, 5).join(' '),
          bgColor: cs.backgroundColor,
          right: Math.round(el.getBoundingClientRect().right),
          viewportWidth: window.innerWidth,
        });
      }
    }
    return checks;
  });
  console.log('\n=== Element at right edge (x=innerWidth-2) ===');
  console.log(JSON.stringify(pixelCheck, null, 2));

  // Scroll to custom-orders and take screenshot
  await page.evaluate(() => {
    const coSection = document.getElementById('custom-orders');
    if (coSection) {
      const rect = coSection.getBoundingClientRect();
      const scrollTop = window.scrollY + rect.top - 100;
      window.scrollTo(0, scrollTop);
    }
  });
  
  // Wait for scroll
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'G:\\Projects\\art\\art\\screenshot-375-custom-order.png' });

  // Check the CustomOrderSection's callout element specifically
  const coCallout = await page.evaluate(() => {
    // Find the element with -right-8 class
    const allEls = document.querySelectorAll('*');
    for (let i = 0; i < allEls.length; i++) {
      const el = allEls[i];
      const cs = getComputedStyle(el);
      if (cs.right === '-32px') {
        const rect = el.getBoundingClientRect();
        const parent = el.parentElement;
        let parentChain = [];
        let p = parent;
        for (let j = 0; j < 5 && p; j++) {
          parentChain.push({
            tag: p.tagName.toLowerCase(),
            id: p.id || '',
            className: String(p.className || '').split(' ').filter(c => c.length > 0).slice(0, 8).join(' '),
            computedWidth: getComputedStyle(p).width,
            computedMaxWidth: getComputedStyle(p).maxWidth,
            computedOverflowX: getComputedStyle(p).overflowX,
            rect: {
              left: Math.round(p.getBoundingClientRect().left),
              right: Math.round(p.getBoundingClientRect().right),
              width: Math.round(p.getBoundingClientRect().width),
            },
          });
          p = p.parentElement;
        }
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: String(el.className || '').split(' ').filter(c => c.length > 0).join(' '),
          rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
          computed: {
            width: cs.width,
            right: cs.right,
            position: cs.position,
            transform: cs.transform,
          },
          parentChain,
        };
      }
    }
    return null;
  });
  console.log('\n=== CustomOrderSection callout (right: -32px) ===');
  console.log(JSON.stringify(coCallout, null, 2));

  // Also check the HeroSection callout
  const heroCallout = await page.evaluate(() => {
    const allEls = document.querySelectorAll('*');
    for (let i = 0; i < allEls.length; i++) {
      const el = allEls[i];
      const cs = getComputedStyle(el);
      if (cs.right === '-32px' && cs.width === '256px') {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          className: String(el.className || '').split(' ').filter(c => c.length > 0).join(' '),
          rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
          computed: {
            width: cs.width,
            right: cs.right,
            position: cs.position,
            transform: cs.transform,
          },
          parentOverflowHidden: el.parentElement ? getComputedStyle(el.parentElement).overflowX : 'N/A',
          grandParentOverflowHidden: el.parentElement && el.parentElement.parentElement ? getComputedStyle(el.parentElement.parentElement).overflowX : 'N/A',
        };
      }
    }
    return null;
  });
  console.log('\n=== HeroSection callout (right: -32px, w-64) ===');
  console.log(JSON.stringify(heroCallout, null, 2));

  await browser.close();
  console.log('\nDone.');
}

diagnose3().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
