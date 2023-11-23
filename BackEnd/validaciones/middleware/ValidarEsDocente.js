import json from "jsonwebtoken";
import { config } from "dotenv";
import { Docente } from "../../models/index.js";
config();
const validarEsDocente = async (request, response, next) => {
  try {
    const {
      headers: { authorization },
    } = request;

    const datos = json.verify(authorization, process.env.JSON_WEB_TOKEN);

    const { tipo, Correo } = datos;

    if (tipo !== "docente") {
      throw new Error("No es de tipo valido");
    }

    const docente = await Docente.findOne({
      where: {
        Correo,
      },
    });

    if (!docente) {
      throw new Error("Docente invalido");
    }

    request.body.docente = docente;
    next();
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al validar el docente",
      data: {},
    });
  }
};

export default validarEsDocente;
