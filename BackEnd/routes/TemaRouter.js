import express from "express";
import {
  agregarNuevoTema,
  obtenerTemas,
  obtenerTema,
  eliminarTema,
  agregarTemaAlJugador,
  editarTema,
  quitarTemaDeAlumno,
} from "../controllers/TemaController.js";
import validarCrearTema from "../validaciones/middleware/validarCrearTema.js";
import validarEsDocente from "../validaciones/middleware/ValidarEsDocente.js";
import validarEsAlumno from "../validaciones/middleware/ValidarEsAlumno.js";
import validarEsDocenteOrAlumno from "../validaciones/middleware/ValidarEsDocenteOrAlumno.js";

const TemaRouter = express.Router();

TemaRouter.post("/tema", validarEsDocente, validarCrearTema, agregarNuevoTema);

TemaRouter.get("/temas", validarEsDocenteOrAlumno, obtenerTemas);

TemaRouter.get("/tema/:IdTema",validarEsDocenteOrAlumno, obtenerTema);

TemaRouter.delete("/tema/:IdTema", validarEsDocente, eliminarTema);

TemaRouter.post("/tema/jugador", validarEsAlumno, agregarTemaAlJugador);

TemaRouter.put("/tema/:IdTema", validarEsDocente, editarTema);

TemaRouter.delete("/tema/alumno/:IdTema", validarEsAlumno, quitarTemaDeAlumno);

export default TemaRouter;
