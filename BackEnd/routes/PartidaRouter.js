import express from "express";
import { guardarPartida } from "../controllers/PartidasController.js";
import ValidarEsAlumno from "../validaciones/middleware/ValidarEsAlumno.js";
const partidaRouter = express.Router();

partidaRouter.post("/partida", ValidarEsAlumno, guardarPartida);

export default partidaRouter;
