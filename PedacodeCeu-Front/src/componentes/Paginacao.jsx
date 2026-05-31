export default function Paginacao({ pagina, totalPaginas, onMudar }) {
  if (totalPaginas <= 1) return null;

  return (
    <div className="paginacao">
      <button
        className="paginacao-btn"
        disabled={pagina === 1}
        onClick={() => onMudar(pagina - 1)}
      >
        ← Anterior
      </button>

      <span className="paginacao-info">
        Página {pagina} de {totalPaginas}
      </span>

      <button
        className="paginacao-btn"
        disabled={pagina === totalPaginas}
        onClick={() => onMudar(pagina + 1)}
      >
        Próxima →
      </button>
    </div>
  );
}
