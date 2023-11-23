import express from "express";
import {
  crearAhorcado,
  eliminarAhorcado,
  obtenerAhorcado,
  crearPDF,
  crearPDFAlumno,
  actualizarAhorcado,
} from "../controllers/AhorcadoController.js";
import validarEsDocente from "../validaciones/middleware/ValidarEsDocente.js";
import validarEsDocenteOrAlumno from "../validaciones/middleware/ValidarEsDocenteOrAlumno.js";

const AhorcadoRouter = express.Router();

AhorcadoRouter.post("/ahorcado", crearAhorcado);

AhorcadoRouter.delete("/ahorcado/:IdAhorcado", eliminarAhorcado);

AhorcadoRouter.get(
  "/ahorcado/:IdAhorcado",
  validarEsDocenteOrAlumno,
  obtenerAhorcado
);

AhorcadoRouter.get("/ahorcado/pdf/:IdAhorcado", validarEsDocente, crearPDF);

AhorcadoRouter.get(
  "/ahorcado/pdf/alumno/:IdAhorcado/:IdJugador",
  validarEsDocente,
  crearPDFAlumno
);

AhorcadoRouter.put(
  "/ahorcado/:IdAhorcado",
  validarEsDocente,
  actualizarAhorcado
);

export default AhorcadoRouter;
