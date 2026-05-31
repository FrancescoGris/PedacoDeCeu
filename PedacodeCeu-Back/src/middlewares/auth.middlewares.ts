import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";
import { UsuarioPayload } from "../types";

export interface AuthRequest extends Request {
  usuario?: UsuarioPayload;
}

async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const parts = token.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(
      parts[1],
      process.env.JWT_SECRET! as string
    ) as UsuarioPayload;

    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    req.usuario = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

export async function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const parts = token.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token inválido" });
  }

  try {
    const decoded = jwt.verify(
      parts[1],
      process.env.JWT_SECRET! as string
    ) as UsuarioPayload;

    const usuario = await Usuario.findByPk(decoded.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (usuario.role !== "admin") {
      return res.status(403).json({ message: "Acesso restrito a administradores" });
    }

    req.usuario = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
}

export default authMiddleware;