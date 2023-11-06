import express from "express";
import { crearAhorcado } from "../controllers/AhorcadoController.js";

const AhorcadoRouter = express.Router();

AhorcadoRouter.post("/ahorcado", crearAhorcado);

export default AhorcadoRouter;
