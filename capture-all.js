import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('📱 Capturando todas as páginas do VetAcademy...\n');

  // First, create account and login
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Switch to signup
  await page.click('text=Cadastro');
  await page.waitForTimeout(500);

  // Fill signup form
  const testEmail = `teste${Date.now()}@vetacademy.com`;
  const testPassword = 'teste123456';

  await page.fill('input[type="text"]', 'Usuário Teste');
  await page.fill('input[type="email"]', testEmail);
  await page.fill('input[type="password"]', testPassword);
  await page.waitForTimeout(500);

  // Click signup button
  await page.click('button:has-text("Criar Conta")');
  await page.waitForTimeout(3000);

  console.log(`✅ Conta criada: ${testEmail}\n`);

  // Now navigate to each page directly
  const pages = [
    { name: 'Home', url: 'http://localhost:3000/#/', file: '03-home.png' },
    { name: 'RCP/RECOVER', url: 'http://localhost:3000/#/cpr', file: '04-cpr.png' },
    { name: 'Emergência', url: 'http://localhost:3000/#/emergencia', file: '05-emergencia.png' },
    { name: 'Medicamentos', url: 'http://localhost:3000/#/medicamentos', file: '06-medicamentos.png' },
    { name: 'Calculadora', url: 'http://localhost:3000/#/calculadora', file: '07-calculadora.png' },
    { name: 'Conteúdo', url: 'http://localhost:3000/#/conteudo', file: '08-conteudo.png' },
  ];

  for (const pg of pages) {
    await page.goto(pg.url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: `screenshots/${pg.file}`, fullPage: true });
    console.log(`✅ Screenshot: ${pg.name}`);
  }

  // Special: Calculator with data
  await page.goto('http://localhost:3000/#/calculadora', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Select dog
  await page.click('button:has-text("Cães")');
  await page.waitForTimeout(300);

  // Fill calculator
  await page.fill('input[placeholder*="nome"]', 'Meloxicam');
  await page.fill('input[placeholder*="peso"]', '15');
  await page.fill('input[placeholder*="dose"]', '0.2');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/09-calculadora-preenchida.png', fullPage: true });
  console.log(`✅ Screenshot: Calculadora Preenchida`);

  // Emergency with weight
  await page.goto('http://localhost:3000/#/emergencia', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.fill('input[placeholder*="peso"]', '10');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/10-emergencia-10kg.png', fullPage: true });
  console.log(`✅ Screenshot: Emergência (10kg)`);

  console.log('\n🎉 Todas as screenshots foram capturadas com sucesso!');
  console.log('📁 Localização: screenshots/\n');

  await browser.close();
})();
