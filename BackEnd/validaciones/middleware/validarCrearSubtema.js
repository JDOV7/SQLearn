import { SubtemaJoi } from "../joi/index.js";

const validarCrearSubtema = async (req, res, next) => {
  try {
    const {
      body: { IdTema, NombreSubTema },
    } = req;
    console.log(`${IdTema}, ${NombreSubTema} `);
    const value = await SubtemaJoi.validateAsync({
      IdTema,
      NombreSubTema,
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

export default validarCrearSubtema;
