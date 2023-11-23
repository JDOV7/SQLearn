import express from "express";
import { crearDocente } from "../controllers/DocenteController.js";
import validarEsDocente from "../validaciones/middleware/ValidarEsDocente.js";
const docenteRouter = express.Router();

docenteRouter.post("/docente", validarEsDocente, crearDocente);

export default docenteRouter;
