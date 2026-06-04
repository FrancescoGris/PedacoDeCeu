import { test, expect, Page } from '@playwright/test';

const ADMIN_EMAIL = 'admin@testepedacodoceu.com';
const ADMIN_SENHA = 'Admin@123';

async function loginComoAdmin(page: Page): Promise<void> {
  await page.goto('/adm/login');
  await page.fill('#email', ADMIN_EMAIL);
  await page.fill('#senha', ADMIN_SENHA);
  await page.click('button:has-text("Entrar como Administrador")');
  await expect(page).toHaveURL('/');
  await page.waitForFunction(() => localStorage.getItem('token') !== null);
  await page.waitForTimeout(500);
}

test('listar categorias exibe a tabela', async ({ page }) => {
  await loginComoAdmin(page);
  await page.goto('/admin/categorias');
  await page.waitForURL('/admin/categorias'); 
  await expect(page.locator('h2:has-text("📂 Categorias")')).toBeVisible();
  await expect(page.locator('table.tabela')).toBeVisible();
});

test('criar categoria com nome válido e retornar para a lista', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/categorias/nova');

  const nomeCategoria = `Categoria Teste ${Date.now()}`;
  await page.fill('#nome', nomeCategoria);

  await page.click('button:has-text("Criar categoria")');

  await expect(page).toHaveURL('/admin/categorias');
  await expect(page.locator(`text=${nomeCategoria}`)).toBeVisible();
});

test('criar categoria sem nome exibe erro de validação', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/categorias/nova');

  await page.click('button:has-text("Criar categoria")');

  await expect(page.locator('text=Nome é obrigatório')).toBeVisible();
  await expect(page).toHaveURL('/admin/categorias/nova');
});

test('criar categoria com nome só de espaços exibe erro de validação', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/categorias/nova');

  await page.fill('#nome', '   ');
  await page.click('button:has-text("Criar categoria")');

  await expect(page.locator('text=Nome é obrigatório')).toBeVisible();
  await expect(page).toHaveURL('/admin/categorias/nova');
});

test('editar categoria altera o nome e retorna para a lista', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/categorias/nova');
  const nomeOriginal = `Editar Depois ${Date.now()}`;
  await page.fill('#nome', nomeOriginal);
  await page.click('button:has-text("Criar categoria")');
  await expect(page).toHaveURL('/admin/categorias');

  const linha = page.locator('tr', { hasText: nomeOriginal });
  await linha.locator('button.btn-sm--editar').click();

  await expect(page).toHaveURL(/\/admin\/categorias\/editar\//);

  const nomeAtualizado = `Categoria Editada ${Date.now()}`;
  await page.fill('#nome', nomeAtualizado);
  await page.click('button:has-text("Salvar alterações")');

  await expect(page).toHaveURL('/admin/categorias');
  await expect(page.locator(`text=${nomeAtualizado}`)).toBeVisible();
});

test('excluir categoria remove da lista', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/categorias/nova');
  const nomeParaDeletar = `Deletar Cat ${Date.now()}`;
  await page.fill('#nome', nomeParaDeletar);
  await page.click('button:has-text("Criar categoria")');
  await expect(page).toHaveURL('/admin/categorias');

  const linha = page.locator('tr', { hasText: nomeParaDeletar });
  await expect(linha).toBeVisible();

  page.once('dialog', dialog => dialog.accept());
  await linha.locator('button.btn-sm--deletar').click();

  await expect(page.locator(`text=${nomeParaDeletar}`)).not.toBeVisible();
});