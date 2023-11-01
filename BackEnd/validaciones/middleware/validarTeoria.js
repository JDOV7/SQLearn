import { TeoriaJoi } from "../joi/index.js";

const validarCrearTeoria = async (req, res, next) => {
  try {
    const {
      body: { IdSubTema, NombreTeoria, contenido },
    } = req;
    const value = await TeoriaJoi.validateAsync({
      IdSubTema,
      NombreTeoria,
      contenido,
    });

    return next();
  } catch (err) {
    return res.status(400).json({
      status: 400,
      message: err.message,
      data: {},
    });
  }
};

export default validarCrearTeoria;
