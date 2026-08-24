const puppeteer = require('puppeteer');

async function diagnose() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--disable-features=site-per-process',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--ignore-certificate-errors'
    ],
    timeout: 60000
  });

  const widths = [320, 360, 375, 390, 414, 768, 1024, 1440];

  for (const width of widths) {
    const height = width <= 768 ? 2000 : 900;
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });

    process.stdout.write(`\n========== ${width}px x ${height}px ==========\n`);

    try {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 15000 });
    } catch(e) {
      process.stdout.write(`Navigation error: ${e.message}\n`);
    }

    // Take screenshot
    await page.screenshot({ path: `G:\\Projects\\art\\art\\screenshot-${width}.png`, fullPage: false });

    const diagnostics = await page.evaluate((vw) => {
      const win = window;

      const info = {
        innerWidth: win.innerWidth,
        documentElement_clientWidth: document.documentElement.clientWidth,
        documentElement_scrollWidth: document.documentElement.scrollWidth,
        documentElement_offsetWidth: document.documentElement.offsetWidth,
        body_clientWidth: document.body.clientWidth,
        body_scrollWidth: document.body.scrollWidth,
        body_offsetWidth: document.body.offsetWidth,
        body_computedWidth: getComputedStyle(document.body).width,
        body_overflowX: getComputedStyle(document.body).overflowX,
        next_clientWidth: document.getElementById('__next')?.clientWidth || 'N/A',
        next_scrollWidth: document.getElementById('__next')?.scrollWidth || 'N/A',
        main_clientWidth: document.querySelector('main')?.clientWidth || 'N/A',
        main_scrollWidth: document.querySelector('main')?.scrollWidth || 'N/A',
        main_computedWidth: getComputedStyle(document.querySelector('main') || document.body).width,
      };

      // Find ALL elements whose right edge exceeds the viewport
      const allEls = document.querySelectorAll('*');
      const overflowing = [];

      for (let i = 0; i < allEls.length; i++) {
        const el = allEls[i];
        const rect = el.getBoundingClientRect();
        const cs = getComputedStyle(el);

        const rightOverflow = rect.right > win.innerWidth + 1;
        const leftOverflow = rect.left < -1;

        if (rightOverflow || leftOverflow) {
          const tag = el.tagName.toLowerCase();
          const id = el.id || '';
          const className = (el.getAttribute('class') || '').split(' ').filter(c => c.length > 0).join(' ');

          overflowing.push({
            tag,
            id,
            className: className.substring(0, 300),
            rect: {
              top: Math.round(rect.top),
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              bottom: Math.round(rect.bottom),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            },
            computed: {
              width: cs.width,
              maxWidth: cs.maxWidth,
              right: cs.right,
              left: cs.left,
              position: cs.position,
              transform: cs.transform,
              display: cs.display,
            },
            overflowType: rightOverflow ? 'RIGHT' : 'LEFT',
          });
        }
      }

      // Also check main major sections
      const sections = document.querySelectorAll('section, footer, header, main');
      const sectionInfo = [];
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i];
        const rect = s.getBoundingClientRect();
        const cs = getComputedStyle(s);
        sectionInfo.push({
          tag: s.tagName.toLowerCase(),
          id: s.id || '',
          className: (s.className || '').substring(0, 200),
          rect: {
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          },
          computed: {
            width: cs.width,
            maxWidth: cs.maxWidth,
            position: cs.position,
            overflowX: cs.overflowX,
            paddingLeft: cs.paddingLeft,
            paddingRight: cs.paddingRight,
          },
        });
      }

      return { info, overflowing, sectionInfo };
    }, width);

    process.stdout.write(`\nViewport info:\n`);
    process.stdout.write(`  innerWidth:              ${diagnostics.info.innerWidth}\n`);
    process.stdout.write(`  documentElement_clientWidth: ${diagnostics.info.documentElement_clientWidth}\n`);
    process.stdout.write(`  documentElement_scrollWidth: ${diagnostics.info.documentElement_scrollWidth}\n`);
    process.stdout.write(`  body_clientWidth:       ${diagnostics.info.body_clientWidth}\n`);
    process.stdout.write(`  body_scrollWidth:       ${diagnostics.info.body_scrollWidth}\n`);
    process.stdout.write(`  body_computedWidth:     ${diagnostics.info.body_computedWidth}\n`);
    process.stdout.write(`  body_overflowX:         ${diagnostics.info.body_overflowX}\n`);
    process.stdout.write(`  #__next clientWidth:    ${diagnostics.info.next_clientWidth}\n`);
    process.stdout.write(`  #__next scrollWidth:    ${diagnostics.info.next_scrollWidth}\n`);
    process.stdout.write(`  main clientWidth:       ${diagnostics.info.main_clientWidth}\n`);
    process.stdout.write(`  main scrollWidth:       ${diagnostics.info.main_scrollWidth}\n`);
    process.stdout.write(`  main computedWidth:     ${diagnostics.info.main_computedWidth}\n`);

    process.stdout.write(`\nMajor sections (left/right/width):\n`);
    for (const s of diagnostics.sectionInfo) {
      process.stdout.write(`  <${s.tag}> id="${s.id}" class="${s.className.substring(0, 80)}"\n`);
      process.stdout.write(`    rect: left=${s.rect.left}, right=${s.rect.right}, width=${s.rect.width}\n`);
      process.stdout.write(`    computed: width=${s.computed.width}, max-width=${s.computed.maxWidth}, overflowX=${s.computed.overflowX}\n`);
      process.stdout.write(`    padding: left=${s.computed.paddingLeft}, right=${s.computed.paddingRight}\n`);
      if (s.rect.right > width + 1) {
        process.stdout.write(`    ** OVERFLOWS RIGHT by ${s.rect.right - width}px **\n`);
      }
      process.stdout.write(`\n`);
    }

    process.stdout.write(`\nElements overflowing (${diagnostics.overflowing.length} total):\n`);
    for (const el of diagnostics.overflowing) {
      const overflowAmount = el.overflowType === 'RIGHT' ? el.rect.right - width : Math.abs(el.rect.left);
      process.stdout.write(`  [${el.overflowType}] <${el.tag}> class="${el.className.substring(0, 100)}"\n`);
      process.stdout.write(`    rect: left=${el.rect.left}, right=${el.rect.right}, width=${el.rect.width}\n`);
      process.stdout.write(`    computed: width=${el.computed.width}, right=${el.computed.right}, left=${el.computed.left}\n`);
      process.stdout.write(`    position: ${el.computed.position}, transform: ${el.computed.transform}\n`);
      process.stdout.write(`    overflow amount: ${overflowAmount}px\n\n`);
    }

    await page.close();
  }

  await browser.close();
  process.stdout.write('\nDone.\n');
}

diagnose().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
