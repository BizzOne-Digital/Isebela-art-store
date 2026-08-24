const puppeteer = require('puppeteer');

async function diagnose2() {
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

  const widths = [320, 360, 375, 390, 414];

  for (const width of widths) {
    const height = 2000;
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });
    } catch(e) {
      process.stdout.write(`Navigation error: ${e.message}\n`);
    }

    process.stdout.write(`\n========== ${width}px ==========\n`);

    const diagnostics = await page.evaluate(() => {
      // Find #__next or root element
      const nextEl = document.getElementById('__next') || document.querySelector('#__next') || 
                     Array.from(document.body.children)[0] || document.body.firstElementChild;
      
      let nextInfo = { found: false };
      if (nextEl) {
        const rect = nextEl.getBoundingClientRect();
        const cs = getComputedStyle(nextEl);
        nextInfo = {
          found: true,
          tagName: nextEl.tagName.toLowerCase(),
          id: nextEl.id || '',
          className: (String(nextEl.className || '')).substring(0, 200),
          rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
          clientWidth: nextEl.clientWidth,
          scrollWidth: nextEl.scrollWidth,
          computedWidth: cs.width,
          computedOverflowX: cs.overflowX,
          computedMarginLeft: cs.marginLeft,
          computedMarginRight: cs.marginRight,
        };
      }

      // Check which elements specifically set right: -32px or right: -2rem
      const allEls = document.querySelectorAll('*');
      const negativeRightEls = [];
      
      for (let i = 0; i < allEls.length; i++) {
        const el = allEls[i];
        const cs = getComputedStyle(el);
        if (cs.right === '-32px' || cs.marginRight === '-32px' || cs.marginRight === '-2rem') {
          const rect = el.getBoundingClientRect();
          let parentChain = '';
          let p = el.parentElement;
          for (let j = 0; j < 3 && p; j++) {
            parentChain += `<${p.tagName.toLowerCase()}.${(p.className||'').split(' ').filter(c=>c.length>0).slice(0,5).join('.')}`;
            if (p.parentElement && p.parentElement !== document.body) {
              parentChain += ' < ';
              p = p.parentElement;
            } else {
              break;
            }
          }
          negativeRightEls.push({
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            className: String(el.className || '').substring(0, 200),
            rect: { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) },
            computed: {
              right: cs.right,
              marginRight: cs.marginRight,
              width: cs.width,
              position: cs.position,
              transform: cs.transform,
            },
            overflowRight: Math.round(rect.right - window.innerWidth),
          });
        }
      }

      // Check body/html backgrounds
      const bodyCS = getComputedStyle(document.body);
      const htmlCS = getComputedStyle(document.documentElement);
      
      // Sample pixel colors at the right edge of the viewport
      // We can't sample pixels in JS, but we can check element boundaries
      
      return {
        nextInfo,
        negativeRightEls,
        bodyBg: bodyCS.backgroundColor,
        bodyOverflowX: bodyCS.overflowX,
        bodyWidth: bodyCS.width,
        htmlWidth: htmlCS.width,
        htmlOverflowX: htmlCS.overflowX,
        viewport: { width: window.innerWidth, height: window.innerHeight },
        bodyRect: {
          left: Math.round(document.body.getBoundingClientRect().left),
          right: Math.round(document.body.getBoundingClientRect().right),
          width: Math.round(document.body.getBoundingClientRect().width),
        },
      };
    });

    process.stdout.write(`viewport: ${diagnostics.viewport.width}x${diagnostics.viewport.height}\n`);
    process.stdout.write(`body: rect.left=${diagnostics.bodyRect.left}, rect.right=${diagnostics.bodyRect.right}, rect.width=${diagnostics.bodyRect.width}\n`);
    process.stdout.write(`body: width=${diagnostics.bodyWidth}, overflowX=${diagnostics.bodyOverflowX}, bg=${diagnostics.bodyBg}\n`);
    process.stdout.write(`html: width=${diagnostics.htmlWidth}, overflowX=${diagnostics.htmlOverflowX}\n`);
    process.stdout.write(`__next: ${JSON.stringify(diagnostics.nextInfo)}\n`);
    process.stdout.write(`\nElements with negative right positioning:\n`);
    for (const el of diagnostics.negativeRightEls) {
      process.stdout.write(`  <${el.tag}> class="${el.className}"\n`);
      process.stdout.write(`    rect: left=${el.rect.left}, right=${el.rect.right}, width=${el.rect.width}\n`);
      process.stdout.write(`    computed: right=${el.computed.right}, marginRight=${el.computed.marginRight}, width=${el.computed.width}\n`);
      process.stdout.write(`    position: ${el.computed.position}, transform: ${el.computed.transform}\n`);
      process.stdout.write(`    overflow past viewport: ${el.overflowRight}px\n\n`);
    }

    await page.close();
  }

  await browser.close();
  process.stdout.write('\nDone.\n');
}

diagnose2().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
