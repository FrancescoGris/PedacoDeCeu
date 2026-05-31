export default function Modal({ titulo, aberto, onFechar, children }) {
  if (!aberto) return null;

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-caixa" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button className="modal-fechar" onClick={onFechar}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
