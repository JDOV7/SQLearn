import { TemaJoi } from "../joi/index.js";

const validarCrearTema = async (req, res, next) => {
  try {
    const {
      body: { NombreTema },
    } = req;
    const value = await TemaJoi.validateAsync({
      NombreTema,
    });

    return next();
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: "Error con los datos para crear tema",
      data: {},
    });
  }
};

export default validarCrearTema;
