import express from "express";
import {
  crearAhorcado,
  eliminarAhorcado,
} from "../controllers/AhorcadoController.js";

const AhorcadoRouter = express.Router();

AhorcadoRouter.post("/ahorcado", crearAhorcado);

AhorcadoRouter.delete("/ahorcado/:IdAhorcado", eliminarAhorcado);

export default AhorcadoRouter;
