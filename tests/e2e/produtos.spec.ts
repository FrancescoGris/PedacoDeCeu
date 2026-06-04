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

test('listar produtos exibe a tabela', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/produtos');

  await expect(page.locator('table.tabela')).toBeVisible();
  await expect(page.locator('h2:has-text("Produtos")')).toBeVisible();
});

test('criar produto com dados válidos e retornar para a lista', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/produtos/novo');

  const nomeProduto = `Bolo Teste ${Date.now()}`;

  await page.fill('#nome', nomeProduto);
  await page.fill('#descricao', 'Descrição de teste do Playwright');
  await page.fill('#preco', '29.90');
  await page.selectOption('#categoria', { index: 1 });

  await page.click('button:has-text("Criar produto")');

  await expect(page).toHaveURL('/admin/produtos');
  await expect(page.locator(`text=${nomeProduto}`)).toBeVisible();
});

test('criar produto sem preencher campos exibe erros de validação', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/produtos/novo');

  await page.click('button:has-text("Criar produto")');

  await expect(page.locator('text=Nome é obrigatório')).toBeVisible();
  await expect(page.locator('text=Descrição é obrigatória')).toBeVisible();
  await expect(page.locator('text=Preço é obrigatório')).toBeVisible();
  await expect(page.locator('text=Categoria é obrigatória')).toBeVisible();
  await expect(page).toHaveURL('/admin/produtos/novo');
});

test('criar produto com preço inválido exibe erro de validação', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/produtos/novo');

  await page.fill('#nome', 'Produto inválido');
  await page.fill('#descricao', 'Descrição');
  await page.fill('#preco', '-10');
  await page.selectOption('#categoria', { index: 1 });

  await page.click('button:has-text("Criar produto")');

  await expect(page.locator('text=Preço inválido')).toBeVisible();
  await expect(page).toHaveURL('/admin/produtos/novo');
});

test('editar produto altera o nome e retorna para a lista', async ({ page }) => {
  await loginComoAdmin(page);
  await page.goto('/admin/produtos');

  const primeiroEditar = page.locator('button.btn-sm--editar').first();
  await expect(primeiroEditar).toBeVisible();
  await primeiroEditar.click();

  await expect(page).toHaveURL(/\/admin\/produtos\/editar\//);

  const nomeAtualizado = `Produto Editado ${Date.now()}`;
  await page.fill('#nome', nomeAtualizado);

  await page.click('button:has-text("Salvar alterações")');

  await expect(page).toHaveURL('/admin/produtos');
  await expect(page.locator(`text=${nomeAtualizado}`)).toBeVisible();
});

test('excluir produto remove da lista', async ({ page }) => {
  await loginComoAdmin(page);

  await page.goto('/admin/produtos/novo');
  const nomeParaDeletar = `Deletar ${Date.now()}`;
  await page.fill('#nome', nomeParaDeletar);
  await page.fill('#descricao', 'Será excluído');
  await page.fill('#preco', '5.00');
  await page.selectOption('#categoria', { index: 1 });
  await page.click('button:has-text("Criar produto")');
  await expect(page).toHaveURL('/admin/produtos');

  const linha = page.locator('tr', { hasText: nomeParaDeletar });
  await expect(linha).toBeVisible();

  page.once('dialog', dialog => dialog.accept());
  await linha.locator('button.btn-sm--deletar').click();

  await expect(page.locator(`text=${nomeParaDeletar}`)).not.toBeVisible();
});