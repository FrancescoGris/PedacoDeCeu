export default function MensagemErro({ mensagem }) {
  if (!mensagem) return null;
  return (
    <div className="mensagem-erro" role="alert">
      <span>⚠️ {mensagem}</span>
    </div>
  );
}
