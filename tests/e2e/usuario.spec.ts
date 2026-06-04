import { test, expect } from '@playwright/test';

const CPF_VALIDO = '529.982.247-25';

test('cadastro com dados válidos exibe confirmação', async ({ page }) => {
  await page.goto('/cadastro');

  const emailUnico = `teste${Date.now()}@playwright.com`;

  await page.fill('#nome', 'Usuário Playwright');
  await page.fill('#email', emailUnico);
  await page.fill('#cpf', CPF_VALIDO);
  await page.fill('#senha', 'Senha@123');
  await page.fill('#confirmarSenha', 'Senha@123');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=Cadastro realizado!')).toBeVisible();
});

test('cadastro com e-mail inválido exibe erro de validação', async ({ page }) => {
  await page.goto('/cadastro');

  await page.fill('#nome', 'Teste');
  await page.fill('#email', 'emailinvalido');
  await page.fill('#cpf', CPF_VALIDO);
  await page.fill('#senha', 'Senha@123');
  await page.fill('#confirmarSenha', 'Senha@123');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=E-mail inválido')).toBeVisible();
  await expect(page).toHaveURL('/cadastro');
});

test('cadastro com senha fraca exibe erro de validação', async ({ page }) => {
  await page.goto('/cadastro');

  await page.fill('#nome', 'Teste');
  await page.fill('#email', `fraco${Date.now()}@playwright.com`);
  await page.fill('#cpf', CPF_VALIDO);
  await page.fill('#senha', '12345678');
  await page.fill('#confirmarSenha', '12345678');

  await page.click('button[type="submit"]');

  await expect(
    page.locator('.erro-msg').filter({ hasText: /senha/i }).first()
  ).toBeVisible();
  await expect(page).toHaveURL('/cadastro');
});

test('cadastro com CPF inválido exibe erro de validação', async ({ page }) => {
  await page.goto('/cadastro');

  await page.fill('#nome', 'Teste');
  await page.fill('#email', `cpf${Date.now()}@playwright.com`);
  await page.fill('#cpf', '111.111.111-11');
  await page.fill('#senha', 'Senha@123');
  await page.fill('#confirmarSenha', 'Senha@123');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=CPF inválido')).toBeVisible();
  await expect(page).toHaveURL('/cadastro');
});

test('cadastro com senhas diferentes exibe erro de confirmação', async ({ page }) => {
  await page.goto('/cadastro');

  await page.fill('#nome', 'Teste');
  await page.fill('#email', `conf${Date.now()}@playwright.com`);
  await page.fill('#cpf', CPF_VALIDO);
  await page.fill('#senha', 'Senha@123');
  await page.fill('#confirmarSenha', 'Diferente@456');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=As senhas não coincidem')).toBeVisible();
  await expect(page).toHaveURL('/cadastro');
});