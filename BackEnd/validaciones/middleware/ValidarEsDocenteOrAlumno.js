import json from "jsonwebtoken";
import { config } from "dotenv";
import { Docente, Jugador } from "../../models/index.js";
config();
const validarEsDocenteOrAlumno = async (request, response, next) => {
  try {
    const {
      headers: { authorization },
    } = request;

    const datos = json.verify(authorization, process.env.JSON_WEB_TOKEN);

    const { tipo, Correo } = datos;

    if (!tipo) {
      throw new Error("No existe el usuario");
    }

    let usuario;

    if (tipo == "docente") {
      usuario = await Docente.findOne({
        where: {
          Correo,
        },
      });
    }

    if (tipo == "alumno") {
      usuario = await Jugador.findOne({
        where: {
          Correo,
        },
      });
    }

    if (!usuario) {
      throw new Error("No existe el usuario");
    }

    request.body.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al validar el usuario",
      data: {},
    });
  }
};

export default validarEsDocenteOrAlumno;
