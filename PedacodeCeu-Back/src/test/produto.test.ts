import request from 'supertest';
import app from '../app';

describe('Teste de integração - Produtos', () => {

  test('Listar produtos sem token', async () => {
    const result = await request(app).get('/produtos');

    expect(result.statusCode).toEqual(401);
  });

  test('Buscar produto por ID sem token', async () => {
    const result = await request(app).get('/produtos/1');

    expect(result.statusCode).toEqual(401);
  });

  test('Criar produto sem token', async () => {
    const result = await request(app)
      .post('/produtos')
      .send({ nome: 'Bolo', descricao: 'Desc', preco: 10, categoriaId: '1' });

    expect(result.statusCode).toEqual(401);
  });

  test('Criar produto com preço inválido sem token', async () => {
    const result = await request(app)
      .post('/produtos')
      .send({ nome: 'Bolo', descricao: 'Desc', preco: -5, categoriaId: '1' });

    expect(result.statusCode).toEqual(401);
  });

});