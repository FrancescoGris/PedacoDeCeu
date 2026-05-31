import request from 'supertest';
import app from '../app';

describe('Teste de integração - Categorias', () => {

  test('Listar categorias sem token', async () => {
    const result = await request(app).get('/categorias');

    expect(result.statusCode).toEqual(401);
  });

  test('Buscar categoria por ID sem token', async () => {
    const result = await request(app).get('/categorias/1');

    expect(result.statusCode).toEqual(401);
  });

  test('Criar categoria sem token', async () => {
    const result = await request(app)
      .post('/categorias')
      .send({ nome: 'Bolos' });

    expect(result.statusCode).toEqual(401);
  });

  test('Criar categoria com nome vazio sem token', async () => {
    const result = await request(app)
      .post('/categorias')
      .send({ nome: '' });

    expect(result.statusCode).toEqual(401);
  });

});