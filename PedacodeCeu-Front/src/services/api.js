const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function getToken() {
  return localStorage.getItem("token");
}

function headersAutenticados() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

async function tratarResposta(res) {
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Erro inesperado");
  }
  return data;
}

export async function loginApi(payload) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return tratarResposta(res);
}

export async function loginAdminApi(payload) {
  const res = await fetch(`${BASE_URL}/auth/login/admin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return tratarResposta(res);
}

export async function cadastrarUsuario(payload) {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return tratarResposta(res);
}

export async function editarUsuario(id, payload) {
  const res = await fetch(`${BASE_URL}/usuarios/${id}`, {
    method: "PUT",
    headers: headersAutenticados(),
    body: JSON.stringify(payload),
  });
  return tratarResposta(res);
}

export async function listarCategorias(pagina = 1, limite = 100) {
  const token = getToken();
  const headers = token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };

  const res = await fetch(`${BASE_URL}/categorias?pagina=${pagina}&limite=${limite}`, {
    headers,
  });
  return tratarResposta(res);
}

export async function criarCategoria(dados) {
  const res = await fetch(`${BASE_URL}/categorias`, {
    method: "POST",
    headers: headersAutenticados(),
    body: JSON.stringify({ nome: dados.nome }),
  });
  return tratarResposta(res);
}

export async function editarCategoria(id, dados) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "PUT",
    headers: headersAutenticados(),
    body: JSON.stringify({ nome: dados.nome }),
  });
  return tratarResposta(res);
}

export async function deletarCategoria(id) {
  const res = await fetch(`${BASE_URL}/categorias/${id}`, {
    method: "DELETE",
    headers: headersAutenticados(),
  });
  return tratarResposta(res);
}

export async function listarProdutos(pagina = 1, limite = 10) {
  const res = await fetch(`${BASE_URL}/produtos?pagina=${pagina}&limite=${limite}`, {
    headers: headersAutenticados(),
  });
  return tratarResposta(res);
}

export async function buscarProduto(id) {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    headers: headersAutenticados(),
  });
  return tratarResposta(res);
}

export async function criarProduto(dados) {
  const res = await fetch(`${BASE_URL}/produtos`, {
    method: "POST",
    headers: headersAutenticados(),
    body: JSON.stringify({
      nome: dados.nome,
      descricao: dados.descricao,
      preco: Number(dados.preco),
      imagem: dados.imagem || null,
      destaque: dados.destaque ?? false,
      categoriaId: dados.categoriaId,
    }),
  });
  return tratarResposta(res);
}

export async function editarProduto(id, dados) {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "PUT",
    headers: headersAutenticados(),
    body: JSON.stringify({
      nome: dados.nome,
      descricao: dados.descricao,
      preco: Number(dados.preco),
      imagem: dados.imagem || null,
      destaque: dados.destaque ?? false,
      ativo: dados.ativo ?? true,
      categoriaId: dados.categoriaId,
    }),
  });
  return tratarResposta(res);
}

export async function deletarProduto(id) {
  const res = await fetch(`${BASE_URL}/produtos/${id}`, {
    method: "DELETE",
    headers: headersAutenticados(),
  });
  return tratarResposta(res);
}

export async function listarPedidos(pagina = 1, limite = 10) {
  const res = await fetch(`${BASE_URL}/pedidos?pagina=${pagina}&limite=${limite}`, {
    headers: headersAutenticados(),
  });
  return tratarResposta(res);
}

export async function criarPedido(dados) {
  const res = await fetch(`${BASE_URL}/pedidos`, {
    method: "POST",
    headers: headersAutenticados(),
    body: JSON.stringify({
      status: dados.status || "pendente",
      itens: dados.itens,
    }),
  });
  return tratarResposta(res);
}

export async function editarPedido(id, dados) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`, {
    method: "PUT",
    headers: headersAutenticados(),
    body: JSON.stringify({
      status: dados.status,
      itens: dados.itens,
    }),
  });
  return tratarResposta(res);
}

export async function deletarPedido(id) {
  const res = await fetch(`${BASE_URL}/pedidos/${id}`, {
    method: "DELETE",
    headers: headersAutenticados(),
  });
  return tratarResposta(res);
}