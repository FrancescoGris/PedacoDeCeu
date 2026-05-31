export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarCPF(cpf) {
  const limpo = cpf.replace(/\D/g, "");
  if (limpo.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(limpo)) return false;
  return true;
}

export function validarSenha(senha) {
  if (senha.length < 8) return { valida: false, mensagem: "Senha deve ter ao menos 8 caracteres" };
  if (!/[A-Z]/.test(senha)) return { valida: false, mensagem: "Senha deve ter ao menos uma letra maiúscula" };
  if (!/[0-9]/.test(senha)) return { valida: false, mensagem: "Senha deve ter ao menos um número" };
  if (!/[!@#$%^&*]/.test(senha)) return { valida: false, mensagem: "Senha deve ter ao menos um caractere especial (!@#$%^&*)" };
  return { valida: true, mensagem: "" };
}

export function formatarCPF(cpf) {
  const nums = cpf.replace(/\D/g, "").slice(0, 11);
  return nums
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}