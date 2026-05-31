/**
 * @typedef {Object} Usuario
 * @property {string} id
 * @property {string} nome
 * @property {string} email
 * @property {string} cpf
 * @property {string} role
 */

/**
 * @typedef {Object} Produto
 * @property {string} id
 * @property {string} nome
 * @property {string} descricao
 * @property {number} preco
 * @property {string|null} imagem
 * @property {boolean} destaque
 * @property {boolean} ativo
 * @property {string} categoriaId
 * @property {Categoria} categoria
 */

/**
 * @typedef {Object} Categoria
 * @property {string} id
 * @property {string} nome
 */

/**
 * @typedef {Object} Pedido
 * @property {string} id
 * @property {string} usuarioId
 * @property {string} status
 * @property {number} total
 * @property {PedidoItem[]} itens
 * @property {Usuario} usuario
 */

/**
 * @typedef {Object} PedidoItem
 * @property {string} id
 * @property {string} pedidoId
 * @property {string} produtoId
 * @property {number} quantidade
 * @property {number} precoUnitario
 * @property {Produto} produto
 */

/**
 * @typedef {Object} RespostaPaginada
 * @property {Array} dados
 * @property {{ total: number, pagina: number, limite: number, totalPaginas: number }} meta
 */