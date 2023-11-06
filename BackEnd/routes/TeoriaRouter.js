import express from "express";
const TeoriaRouter = express.Router();

import {
  crearNuevaTeoria,
  obtenerTeoria,
  eliminarTeoria,
} from "../controllers/TeoriaController.js";
import validarCrearTeoria from "../validaciones/middleware/validarTeoria.js";

TeoriaRouter.post("/teoria", validarCrearTeoria, crearNuevaTeoria);

TeoriaRouter.get("/teoria/:IdTeoria", obtenerTeoria);

TeoriaRouter.delete("/teoria/:IdTeoria", eliminarTeoria);

export default TeoriaRouter;
