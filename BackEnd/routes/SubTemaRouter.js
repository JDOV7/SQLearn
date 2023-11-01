import express from "express";
import {
  agregarNuevoSubTema,
  obtenerSubtemas,
  obtenerSubTema,
} from "../controllers/SubTemaController.js";
import validarCrearSubtema from "../validaciones/middleware/validarCrearSubtema.js";

const SubTemaRouter = express.Router();

SubTemaRouter.post("/subtema", validarCrearSubtema, agregarNuevoSubTema);

SubTemaRouter.get("/subtemas", obtenerSubtemas);

SubTemaRouter.get("/subtema/:IdSubTema", obtenerSubTema);

export default SubTemaRouter;