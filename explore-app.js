import { chromium } from 'playwright';
import { readFileSync } from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  console.log('📱 Explorando VetAcademy...\n');

  // Navigate to the app
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Take screenshot of login page
  await page.screenshot({ path: 'screenshots/01-login.png', fullPage: true });
  console.log('✅ Screenshot 1: Tela de Login');

  // Try to sign up
  await page.click('text=Cadastro');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/02-cadastro.png', fullPage: true });
  console.log('✅ Screenshot 2: Tela de Cadastro');

  // Fill signup form
  const testEmail = `teste${Date.now()}@vetacademy.com`;
  const testPassword = 'teste123456';

  await page.fill('input[type="text"]', 'Usuário Teste');
  await page.fill('input[type="email"]', testEmail);
  await page.fill('input[type="password"]', testPassword);
  await page.waitForTimeout(500);

  console.log(`📧 Criando conta: ${testEmail}`);

  // Click signup button
  await page.click('button:has-text("Criar Conta")');
  await page.waitForTimeout(3000);

  // Check if we're logged in (should be redirected to home)
  const currentUrl = page.url();

  if (currentUrl.includes('#/')) {
    console.log('✅ Login bem-sucedido!\n');

    // Home page
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/03-home.png', fullPage: true });
    console.log('✅ Screenshot 3: Página Inicial (Home)');

    // Navigate to CPR page
    await page.click('text=RCP/Recover');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/04-cpr.png', fullPage: true });
    console.log('✅ Screenshot 4: Timer RCP/RECOVER');

    // Navigate to Emergency Calculator
    await page.click('text=Emergência');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/05-emergencia.png', fullPage: true });
    console.log('✅ Screenshot 5: Calculadora de Emergência');

    // Enter weight to see calculations
    await page.fill('input[placeholder*="peso"]', '10');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/06-emergencia-calculada.png', fullPage: true });
    console.log('✅ Screenshot 6: Cálculos de Emergência (10kg)');

    // Navigate to Medications
    await page.click('text=Medicamentos');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshots/07-medicamentos.png', fullPage: true });
    console.log('✅ Screenshot 7: Biblioteca de Medicamentos');

    // Navigate to General Calculator
    await page.goto('http://localhost:3000/#/calculadora', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/08-calculadora.png', fullPage: true });
    console.log('✅ Screenshot 8: Calculadora Geral');

    // Navigate to Content
    await page.goto('http://localhost:3000/#/conteudo', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/09-conteudo.png', fullPage: true });
    console.log('✅ Screenshot 9: Conteúdo Educacional');

    // Click on Videos tab
    await page.click('text=Vídeos');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/10-videos.png', fullPage: true });
    console.log('✅ Screenshot 10: Aba de Vídeos');

    // Click on Articles tab
    await page.click('text=Artigos');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'screenshots/11-artigos.png', fullPage: true });
    console.log('✅ Screenshot 11: Aba de Artigos');

    console.log('\n🎉 Exploração completa! Screenshots salvos em screenshots/');
  } else {
    console.log('❌ Não conseguiu fazer login automaticamente');
    console.log('URL atual:', currentUrl);
  }

  await browser.close();
})();
