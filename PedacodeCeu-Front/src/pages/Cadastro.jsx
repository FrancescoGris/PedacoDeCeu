import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../services/api';
import { validarEmail, validarCPF, validarSenha, formatarCPF } from '../services/validacoes';
import MensagemErro from '../componentes/MensagemErro';
import './Cadastro.css';

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  });

  const [erros, setErros] = useState({});
  const [erroApi, setErroApi] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === 'cpf') {
      setForm(prev => ({ ...prev, cpf: formatarCPF(value) }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    setErros(prev => ({ ...prev, [name]: '' }));
  }

  function validar() {
    const novosErros = {};

    if (!form.nome.trim()) novosErros.nome = 'Nome é obrigatório.';

    if (!form.email.trim()) {
      novosErros.email = 'E-mail é obrigatório.';
    } else if (!validarEmail(form.email)) {
      novosErros.email = 'E-mail inválido.';
    }

    if (!form.cpf.trim()) {
      novosErros.cpf = 'CPF é obrigatório.';
    } else if (!validarCPF(form.cpf)) {
      novosErros.cpf = 'CPF inválido.';
    }

    if (!form.senha) {
      novosErros.senha = 'Senha é obrigatória.';
    } else {
      const { valida, mensagem } = validarSenha(form.senha);
      if (!valida) novosErros.senha = mensagem;
    }

    if (!form.confirmarSenha) {
      novosErros.confirmarSenha = 'Confirme sua senha.';
    } else if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.';
    }

    return novosErros;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErroApi('');
    const novosErros = validar();

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    setCarregando(true);
    try {
      await cadastrarUsuario({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
        cpf: form.cpf.replace(/\D/g, ''),
      });
      setEnviado(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErroApi(err instanceof Error ? err.message : 'Erro ao cadastrar');
    } finally {
      setCarregando(false);
    }
  }

  if (enviado) {
    return (
      <div className="cadastro-sucesso">
        <div className="sucesso-icone">✓</div>
        <h2>Cadastro realizado!</h2>
        <p>Redirecionando para o login…</p>
      </div>
    );
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <div className="cadastro-topo">
          <h1>Criar conta</h1>
          <p>Preencha os dados abaixo para se cadastrar</p>
        </div>

        <MensagemErro mensagem={erroApi} />

        <form className="cadastro-form" onSubmit={handleSubmit} noValidate>

          {/* Nome */}
          <div className={`campo-grupo ${erros.nome ? 'campo-erro' : ''}`}>
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              name="nome"
              type="text"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
            />
            {erros.nome && <span className="erro-msg">{erros.nome}</span>}
          </div>

          {/* E-mail */}
          <div className={`campo-grupo ${erros.email ? 'campo-erro' : ''}`}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
            />
            {erros.email && <span className="erro-msg">{erros.email}</span>}
          </div>

          {/* CPF */}
          <div className={`campo-grupo ${erros.cpf ? 'campo-erro' : ''}`}>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={handleChange}
              inputMode="numeric"
              maxLength={14}
            />
            {erros.cpf && <span className="erro-msg">{erros.cpf}</span>}
          </div>

          {/* Senha */}
          <div className={`campo-grupo ${erros.senha ? 'campo-erro' : ''}`}>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Mín. 8 caracteres, maiúscula, número e especial"
              value={form.senha}
              onChange={handleChange}
            />
            {erros.senha && <span className="erro-msg">{erros.senha}</span>}
          </div>

          {/* Confirmar senha */}
          <div className={`campo-grupo ${erros.confirmarSenha ? 'campo-erro' : ''}`}>
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              placeholder="Repita a senha"
              value={form.confirmarSenha}
              onChange={handleChange}
            />
            {erros.confirmarSenha && <span className="erro-msg">{erros.confirmarSenha}</span>}
          </div>

          <button type="submit" className="btn-cadastrar" disabled={carregando}>
            {carregando ? 'Cadastrando...' : 'Criar conta'}
          </button>
        </form>

        <p className="cadastro-login-link">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
