import express from "express";
import {
  agregarNuevoSubTema,
  obtenerSubtemas,
  obtenerSubTema,
  eliminarSubtema,
  editarSubTema,
} from "../controllers/SubTemaController.js";
import validarCrearSubtema from "../validaciones/middleware/validarCrearSubtema.js";
import validarEsDocente from "../validaciones/middleware/ValidarEsDocente.js";
import validarEsDocenteOrAlumno from "../validaciones/middleware/ValidarEsDocenteOrAlumno.js";

const SubTemaRouter = express.Router();

SubTemaRouter.post(
  "/subtema",
  validarEsDocente,
  validarCrearSubtema,
  agregarNuevoSubTema
);

SubTemaRouter.get("/subtemas", obtenerSubtemas);

SubTemaRouter.get(
  "/subtema/:IdSubTema",
  validarEsDocenteOrAlumno,
  obtenerSubTema
);

SubTemaRouter.delete("/subtema/:IdSubTema", validarEsDocente, eliminarSubtema);

SubTemaRouter.put("/subtema/:IdSubTema", validarEsDocente, editarSubTema);

export default SubTemaRouter;
