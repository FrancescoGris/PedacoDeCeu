export default function Botao({ variante = "primario", carregando = false, children, ...rest }) {
  return (
    <button
      className={`botao botao--${variante}`}
      disabled={carregando || rest.disabled}
      {...rest}
    >
      {carregando ? "Carregando..." : children}
    </button>
  );
}
