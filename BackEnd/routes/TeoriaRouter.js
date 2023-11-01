import express from "express";
const TeoriaRouter = express.Router();

import {
  crearNuevaTeoria,
  obtenerTeoria,
} from "../controllers/TeoriaController.js";
import validarCrearTeoria from "../validaciones/middleware/validarTeoria.js";

TeoriaRouter.post("/teoria", validarCrearTeoria, crearNuevaTeoria);

TeoriaRouter.get("/teoria/:IdTeoria", obtenerTeoria);

export default TeoriaRouter;
