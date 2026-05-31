import express, { Router } from "express";
import "dotenv/config";
import cors from "cors";
import authMiddleware, { adminMiddleware } from "./middlewares/auth.middlewares";
import AuthController from "./controllers/auth.controller";
import CategoriaController from "./controllers/categoria.controller";
import ProdutoController from "./controllers/produto.controller";
import UsuarioController from "./controllers/usuario.controller";
import PedidoController from "./controllers/pedido.controller";

const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"], credentials: true }));

const router: Router = Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/login/admin", AuthController.loginAdmin);

router.post("/usuarios", UsuarioController.create);
router.get("/usuarios", authMiddleware, UsuarioController.findAll);
router.get("/usuarios/:id", authMiddleware, UsuarioController.getById);
router.put("/usuarios/:id", authMiddleware, UsuarioController.update);
router.delete("/usuarios/:id", adminMiddleware, UsuarioController.remove);
router.patch("/usuarios/:id/role", adminMiddleware, UsuarioController.updateRole);

router.get("/categorias", CategoriaController.findAll);
router.post("/categorias", adminMiddleware, CategoriaController.create);
router.get("/categorias/:id", CategoriaController.getById);
router.put("/categorias/:id", adminMiddleware, CategoriaController.update);
router.delete("/categorias/:id", adminMiddleware, CategoriaController.remove);

router.get("/produtos", authMiddleware, ProdutoController.findAll);
router.post("/produtos", adminMiddleware, ProdutoController.create);
router.get("/produtos/:id", authMiddleware, ProdutoController.getById);
router.put("/produtos/:id", adminMiddleware, ProdutoController.update);
router.delete("/produtos/:id", adminMiddleware, ProdutoController.remove);

router.get("/pedidos", authMiddleware, PedidoController.findAll);
router.post("/pedidos", authMiddleware, PedidoController.create);
router.get("/pedidos/:id", authMiddleware, PedidoController.getById);
router.put("/pedidos/:id", authMiddleware, PedidoController.update);
router.delete("/pedidos/:id", authMiddleware, PedidoController.remove);

app.use(router);

export default app;