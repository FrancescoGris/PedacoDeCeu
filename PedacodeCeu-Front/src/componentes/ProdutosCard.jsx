import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';
import './ProdutosCard.css';

function ProdutoCard({ produto, nomeProduto, precoProduto, descricao, foto }) {
  const navigate = useNavigate();
  const { adicionarItem } = useCarrinho();

  const nome = produto ? produto.nome : nomeProduto;
  const preco = produto ? produto.preco : precoProduto;
  const desc = produto ? produto.descricao : descricao;
  const imagem = produto ? produto.imagem : foto;
  const id = produto ? produto.id : null;

  function handleVerMais() {
    if (id) navigate(`/produtos/${id}`);
  }

  function handleAdicionarCarrinho() {
    adicionarItem({ id, nome, preco, descricao: desc, imagem });
  }

  return (
    <div className="card-doce">
      {imagem && (
        <img src={imagem} alt={nome} className="card-img" />
      )}
      <div className="card-info">
        <h2>{nome}</h2>
        <p className="preco">R$ {Number(preco).toFixed(2).replace('.', ',')}</p>
        <p className="descricao">{desc}</p>
        <div className="card-acoes">
          {id && (
            <button className="card-button card-button--secundario" onClick={handleVerMais}>
              Ver mais
            </button>
          )}
          <button className="card-button" onClick={handleAdicionarCarrinho}>
            🛒 Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdutoCard;