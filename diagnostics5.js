const puppeteer = require('puppeteer');

async function diagnose5() {
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

  // Take a screenshot and analyze right-edge pixels using canvas
  await page.evaluate(() => {
    // Create a hidden canvas to capture the page
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = 800;
    canvas.style.display = 'none';
    document.body.appendChild(canvas);
    
    // We can't easily draw the page onto a canvas due to CORS
    // Instead, let's check what the rendered background looks like at the right edge
    
    // Sample the body's computed background at different positions
    const results = [];
    for (let y = 0; y <= 750; y += 50) {
      const el = document.elementFromPoint(window.innerWidth - 1, y);
      if (el) {
        const cs = getComputedStyle(el);
        results.push({
          y,
          tag: el.tagName.toLowerCase(),
          id: el.id || '',
          className: String(el.className || '').split(' ').filter(c => c.length > 0).slice(0, 6).join(' '),
          bgColor: cs.backgroundColor,
          elRight: Math.round(el.getBoundingClientRect().right),
          viewportWidth: window.innerWidth,
          isInViewport: el.getBoundingClientRect().right >= window.innerWidth - 5,
        });
      }
    }
    
    document.body.removeChild(canvas);
    return results;
  });

  // Use page.screenshot with clip to check right edge pixels
  const screenshot = await page.screenshot({
    clip: { x: 370, y: 0, width: 5, height: 800 },
    encoding: 'binary'
  });
  
  // The screenshot is a PNG buffer. Let's check if we can get pixel info
  // by using the browser to draw it on canvas
  const pixelData = await page.evaluate(() => {
    // Use a 1x1 canvas approach - check if the right edge pixel is white or some other color
    // We'll create a tiny screenshot of just the right edge
    
    const canvas = document.createElement('canvas');
    canvas.width = 3;
    canvas.height = 3;
    const ctx = canvas.getContext('2d');
    
    // Check specific y positions
    const checks = [];
    const yPositions = [0, 50, 100, 200, 300, 400, 500, 600, 700, 750];
    
    for (const y of yPositions) {
      try {
        // Check if there's a horizontal scrollbar
        const el = document.elementFromPoint(window.innerWidth - 1, y);
        if (el) {
          checks.push({
            y,
            tag: el.tagName.toLowerCase(),
            id: el.id || '',
            className: String(el.className || '').split(' ').filter(c => c.length > 0).slice(0, 8).join(' '),
            bgColor: getComputedStyle(el).backgroundColor,
            right: Math.round(el.getBoundingClientRect().right),
            viewportWidth: window.innerWidth,
          });
        }
      } catch(e) {
        checks.push({ y, error: e.message });
      }
    }
    
    return checks;
  });
  
  console.log('=== Elements at right edge (x=innerWidth-1) ===');
  for (const c of pixelData) {
    const gap = c.right - c.viewportWidth;
    console.log(`y=${c.y}: <${c.tag}> id="${c.id}" class="${c.className}" bgColor="${c.bgColor}" right=${c.right} viewport=${c.viewportWidth} gap=${gap}px`);
  }

  // Now test: Add overflow-hidden to CustomOrderSection AND fix ProcessSection transforms
  await page.addStyleTag({
    content: `
      #custom-orders { overflow: hidden !important; }
      @media (max-width: 1023px) {
        [class*="flex-col"] { /* mobile process steps */ }
      }
    `
  });
  
  // Also, let's check what the actual overflow elements are
  const overflowElements = await page.evaluate(() => {
    const allEls = document.querySelectorAll('*');
    const result = [];
    for (let i = 0; i < allEls.length; i++) {
      const el = allEls[i];
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      // Only check for right overflow > 5px
      if (rect.right > window.innerWidth + 5) {
        result.push({
          tag: el.tagName.toLowerCase(),
          className: String(el.className || '').split(' ').filter(c => c.length > 0).join(' ').substring(0, 150),
          right: Math.round(rect.right),
          viewportWidth: window.innerWidth,
          overflow: Math.round(rect.right - window.innerWidth),
          transform: cs.transform,
          position: cs.position,
          rightCS: cs.right,
          width: cs.width,
        });
      }
    }
    return result;
  });
  
  console.log('\n=== Elements with >5px right overflow (before changes) ===');
  for (const el of overflowElements) {
    console.log(`<${el.tag}> class="${el.className}" right=${el.right} overflow=${el.overflow}px transform="${el.transform}" position=${el.position} rightCS=${el.rightCS} width=${el.width}`);
  }

  await browser.close();
  console.log('\nDone.');
}

diagnose5().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
