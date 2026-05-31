import React, { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);

  function adicionarItem(produto) {
    setItens((prev) => {
      const existente = prev.find((i) => i.id === produto.id);
      if (existente) {
        return prev.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function removerItem(id) {
    setItens((prev) => prev.filter((i) => i.id !== id));
  }

  function alterarQuantidade(id, quantidade) {
    if (quantidade <= 0) {
      removerItem(id);
      return;
    }
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantidade } : i))
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  const total = itens.reduce((acc, i) => acc + i.preco * i.quantidade, 0);
  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);

  return (
    <CarrinhoContext.Provider value={{ itens, total, totalItens, adicionarItem, removerItem, alterarQuantidade, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  return ctx;
}