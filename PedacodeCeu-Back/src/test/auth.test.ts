import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';
import Usuario from '../models/Usuario';
import bcrypt from 'bcrypt';

beforeAll(async () => {
  await sequelize.sync({ alter: false });
  await Usuario.destroy({ where: { email: 'teste@pedacodoceu.com' } });
  await Usuario.create({
    nome: 'Usuário Teste',
    email: 'teste@pedacodoceu.com',
    senha: await bcrypt.hash('Teste@123', 10),
    cpf: '356.449.671-59'
  });
});

describe('Teste de integração - Auth', () => {

  test('Login com credenciais válidas', async () => {
    const result = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@pedacodoceu.com', senha: 'Teste@123' });

    expect(result.statusCode).toEqual(200);
  });

  test('Login com senha incorreta', async () => {
    const result = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@pedacodoceu.com', senha: 'SenhaErrada@1' });

    expect(result.statusCode).toEqual(401);
  });

  test('Login com e-mail inválido', async () => {
    const result = await request(app)
      .post('/auth/login')
      .send({ email: 'emailinvalido', senha: 'Teste@123' });

    expect(result.statusCode).toEqual(400);
  });

  test('Login sem senha', async () => {
    const result = await request(app)
      .post('/auth/login')
      .send({ email: 'teste@pedacodoceu.com' });

    expect(result.statusCode).toEqual(400);
  });

});