import React, { createContext, useContext, useState, useEffect } from "react";
import { loginApi, loginAdminApi } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");
    if (tokenSalvo && usuarioSalvo) {
      setToken(tokenSalvo);
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  async function login(email, senha) {
    const resposta = await loginApi({ email, senha });
    setToken(resposta.token);
    setUsuario(resposta.usuario);
    localStorage.setItem("token", resposta.token);
    localStorage.setItem("usuario", JSON.stringify(resposta.usuario));
  }

  async function loginAdmin(email, senha) {
    const resposta = await loginAdminApi({ email, senha });
    setToken(resposta.token);
    setUsuario(resposta.usuario);
    localStorage.setItem("token", resposta.token);
    localStorage.setItem("usuario", JSON.stringify(resposta.usuario));
  }

  function logout() {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  function atualizarUsuario(novoUsuario) {
    setUsuario(novoUsuario);
    localStorage.setItem("usuario", JSON.stringify(novoUsuario));
  }

  const isAdmin = usuario?.role === "admin";

  return (
    <AuthContext.Provider value={{ usuario, token, isAdmin, login, loginAdmin, logout, atualizarUsuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}