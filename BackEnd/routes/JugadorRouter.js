import express from "express";
import {
  crearJugador,
  iniciarSesion,
  validarSesion,
} from "../controllers/JugadorController.js";
const jugadorRouter = express.Router();

jugadorRouter.post("/jugador", crearJugador);

jugadorRouter.post("/iniciar-sesion", iniciarSesion);

jugadorRouter.post("/validar-sesion", validarSesion);

export default jugadorRouter;
