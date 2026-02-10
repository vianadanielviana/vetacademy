import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Capture console logs
  page.on('console', msg => console.log('BROWSER:', msg.text()));

  // Capture errors
  page.on('pageerror', error => console.log('ERROR:', error.message));

  // Navigate to the app
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Wait a bit for any animations
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  console.log('Screenshot saved as screenshot.png');

  await browser.close();
})();
