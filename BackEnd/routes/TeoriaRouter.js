import express from "express";
const TeoriaRouter = express.Router();

import {
  crearNuevaTeoria,
  obtenerTeoria,
  eliminarTeoria,
  obtenerTeoriaParaEditar,
  editarTeoria,
} from "../controllers/TeoriaController.js";
import validarCrearTeoria from "../validaciones/middleware/validarTeoria.js";
import validarEsDocente from "../validaciones/middleware/ValidarEsDocente.js";
import validarEsDocenteOrAlumno from "../validaciones/middleware/ValidarEsDocenteOrAlumno.js";
TeoriaRouter.post(
  "/teoria",
  validarEsDocente,
  validarCrearTeoria,
  crearNuevaTeoria
);

TeoriaRouter.get("/teoria/:IdTeoria", validarEsDocenteOrAlumno, obtenerTeoria);

TeoriaRouter.delete("/teoria/:IdTeoria", validarEsDocente, eliminarTeoria);

TeoriaRouter.get(
  "/teoria/editar/:IdTeoria",
  validarEsDocente,
  obtenerTeoriaParaEditar
);

TeoriaRouter.put("/teoria/editar/:IdTeoria", validarEsDocente, editarTeoria);

export default TeoriaRouter;
