import { chromium } from 'playwright';

const urls = Array.from({ length: 10 }, (_, i) => `https://sanand0.github.io/tdsdata/js_table/?seed=${i}`);

(async () => {
  let total = 0;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const url of urls) {
    await page.goto(url);
    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.innerText.replace(/[^0-9.-]+/g, ''))).filter(n => !isNaN(n))
    );
    total += numbers.reduce((acc, val) => acc + val, 0);
  }

  console.log("✅ Final Total Sum:", total);
  await browser.close();
})();
