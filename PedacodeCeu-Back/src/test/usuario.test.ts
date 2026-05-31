import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';
import Usuario from '../models/Usuario';

beforeAll(async () => {
  await sequelize.sync({ alter: false });
  await Usuario.destroy({ where: { cpf: '529.982.247-25' } });
});

describe('Teste de integração - Usuarios', () => {

  test('Criar usuário com dados válidos', async () => {
    const result = await request(app)
      .post('/usuarios')
      .send({ nome: 'Teste', email: `teste${Date.now()}@test.com`, senha: 'Senha@123', cpf: '529.982.247-25' });

    expect(result.statusCode).toEqual(201);
  });

  test('Criar usuário com e-mail inválido', async () => {
    const result = await request(app)
      .post('/usuarios')
      .send({ nome: 'Teste', email: 'emailinvalido', senha: 'Senha@123', cpf: '275.484.389-40' });

    expect(result.statusCode).toEqual(400);
  });

  test('Criar usuário com senha fraca', async () => {
    const result = await request(app)
      .post('/usuarios')
      .send({ nome: 'Teste', email: 'fraco@test.com', senha: '12345678', cpf: '275.484.389-40' });

    expect(result.statusCode).toEqual(400);
  });

  test('Criar usuário com CPF inválido', async () => {
    const result = await request(app)
      .post('/usuarios')
      .send({ nome: 'Teste', email: 'cpf@test.com', senha: 'Senha@123', cpf: '111.111.111-11' });

    expect(result.statusCode).toEqual(400);
  });

  test('Listar usuários sem token', async () => {
    const result = await request(app).get('/usuarios');

    expect(result.statusCode).toEqual(401);
  });

  test('Buscar usuário por ID sem token', async () => {
    const result = await request(app).get('/usuarios/1');

    expect(result.statusCode).toEqual(401);
  });

});