import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { Request } from "express";

const PASTA_UPLOADS = path.join(__dirname, "..", "..", "uploads", "produtos");

if (!fs.existsSync(PASTA_UPLOADS)) {
  fs.mkdirSync(PASTA_UPLOADS, { recursive: true });
}

const EXTENSOES_PERMITIDAS = [".jpg", ".jpeg", ".png", ".webp"];
const TAMANHO_MAXIMO = 5 * 1024 * 1024; // 5MB

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, PASTA_UPLOADS);
  },
  filename: (_req, file, cb) => {
    const extensao = path.extname(file.originalname).toLowerCase();
    const nomeUnico = `${crypto.randomUUID()}${extensao}`;
    cb(null, nomeUnico);
  },
});

function filtroDeArquivo(_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const extensao = path.extname(file.originalname).toLowerCase();

  if (!EXTENSOES_PERMITIDAS.includes(extensao)) {
    return cb(new Error("Extensão de arquivo não permitida. Use jpg, jpeg, png ou webp."));
  }

  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("O arquivo enviado não é uma imagem."));
  }

  cb(null, true);
}

const upload = multer({
  storage,
  fileFilter: filtroDeArquivo,
  limits: { fileSize: TAMANHO_MAXIMO },
});

export default upload;
export { PASTA_UPLOADS };
