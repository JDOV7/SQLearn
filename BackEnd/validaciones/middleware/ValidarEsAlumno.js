import json from "jsonwebtoken";
import { config } from "dotenv";
import { Jugador } from "../../models/index.js";
config();
const validarEsAlumno = async (request, response, next) => {
  try {
    const {
      headers: { authorization },
    } = request;

    const datos = json.verify(authorization, process.env.JSON_WEB_TOKEN);

    const { tipo, Correo } = datos;

    if (tipo !== "alumno") {
      throw new Error("No es de tipo valido");
    }

    const alumno = await Jugador.findOne({
      where: {
        Correo,
      },
    });

    if (!alumno) {
      throw new Error("Alumno invalido");
    }

    request.body.alumno = alumno;
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al validar el alumno",
      data: {},
    });
  }
};

export default validarEsAlumno;
