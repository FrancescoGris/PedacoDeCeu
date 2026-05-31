export default function CampoTexto({ label, erro, id, ...rest }) {
  return (
    <div className="campo-grupo">
      <label htmlFor={id} className="campo-label">
        {label}
      </label>
      <input id={id} className={`campo-input${erro ? " campo-input--erro" : ""}`} {...rest} />
      {erro && <span className="campo-erro">{erro}</span>}
    </div>
  );
}
