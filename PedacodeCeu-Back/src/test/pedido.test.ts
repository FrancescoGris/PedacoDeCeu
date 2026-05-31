import request from 'supertest';
import app from '../app';

describe('Teste de integração - Pedidos', () => {

  // ── Sem token ────────────────────────────────────────────────────────────────

  test('Listar pedidos sem token', async () => {
    const result = await request(app).get('/pedidos');

    expect(result.statusCode).toEqual(401);
  });

  test('Buscar pedido por ID sem token', async () => {
    const result = await request(app).get('/pedidos/qualquer-id');

    expect(result.statusCode).toEqual(401);
  });

  test('Criar pedido sem token', async () => {
    const result = await request(app)
      .post('/pedidos')
      .send({
        usuarioId: 'qualquer-id',
        itens: [{ produtoId: 'qualquer-id', quantidade: 1 }],
      });

    expect(result.statusCode).toEqual(401);
  });

  test('Atualizar pedido sem token', async () => {
    const result = await request(app)
      .put('/pedidos/qualquer-id')
      .send({ status: 'confirmado' });

    expect(result.statusCode).toEqual(401);
  });

  test('Deletar pedido sem token', async () => {
    const result = await request(app).delete('/pedidos/qualquer-id');

    expect(result.statusCode).toEqual(401);
  });

  // ── Validações de body (sem token, chega no 401 antes de validar o body) ────
  // ── Para testar validações de body seria necessário um token válido,     ────
  // ── o que exigiria banco de dados rodando. Os testes abaixo cobrem       ────
  // ── os cenários de autenticação, igual ao padrão de categoria e produto. ────

  test('Criar pedido sem usuarioId sem token', async () => {
    const result = await request(app)
      .post('/pedidos')
      .send({ itens: [{ produtoId: 'qualquer-id', quantidade: 1 }] });

    expect(result.statusCode).toEqual(401);
  });

  test('Criar pedido sem itens sem token', async () => {
    const result = await request(app)
      .post('/pedidos')
      .send({ usuarioId: 'qualquer-id', itens: [] });

    expect(result.statusCode).toEqual(401);
  });

  test('Criar pedido com itens vazios sem token', async () => {
    const result = await request(app)
      .post('/pedidos')
      .send({ usuarioId: 'qualquer-id' });

    expect(result.statusCode).toEqual(401);
  });

});