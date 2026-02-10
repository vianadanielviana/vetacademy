import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('🌐 Abrindo navegador...\n');
  console.log('📍 Acesse: http://localhost:3000/\n');
  console.log('Por favor:');
  console.log('1. Faça login ou crie uma conta');
  console.log('2. Navegue pelas páginas');
  console.log('3. O navegador ficará aberto por 5 minutos\n');

  await page.goto('http://localhost:3000/');

  // Keep browser open for 5 minutes
  await page.waitForTimeout(300000);

  await browser.close();
})();
