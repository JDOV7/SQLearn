import express from "express";
import {
  agregarNuevoTema,
  obtenerTemas,
  obtenerTema,
} from "../controllers/TemaController.js";
import validarCrearTema from "../validaciones/middleware/validarCrearTema.js";

const TemaRouter = express.Router();

TemaRouter.post("/tema", validarCrearTema, agregarNuevoTema);

TemaRouter.get("/temas", obtenerTemas);

TemaRouter.get("/tema/:IdTema", obtenerTema);

export default TemaRouter;
