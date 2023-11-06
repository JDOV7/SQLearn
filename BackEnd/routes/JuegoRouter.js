import express from "express";
import {
  obtenerJuegos,
  obtenerJuegosCreados,
} from "../controllers/JuegoController.js";

const JuegoRouter = express.Router();

JuegoRouter.get("/juegos", obtenerJuegos);

JuegoRouter.get("/juegos/creados/:IdSubTema", obtenerJuegosCreados);

export default JuegoRouter;
