import { Juego, Ahorcado } from "../models/index.js";

const obtenerJuegos = async (req, res) => {
  const { NombreSubTema, IdTema } = req.body;

  const juegos = await Juego.findAll();

  if (!juegos) {
    return res.status(500).json({
      status: 500,
      message: "No se pudo obtener los juegos",
      data: {},
    });
  }

  return res.status(200).json({
    status: 200,
    message: "Juegos",
    data: { juegos },
  });
};

const obtenerJuegosCreados = async (req, res) => {
  try {
    const { IdSubTema } = req.params;
    const ahorcados = await Ahorcado.findAll({
      where: { IdSubTema },
      attributes: [
        ["IdAhorcado", "url"],
        ["titulo", "titulo"],
      ],
    });

    return res.status(200).json({
      status: 200,
      message: "Juegos obtenidos",
      data: { ahorcados },
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "No se pudo obtener los juegos",
      data: {},
    });
  }
};

export { obtenerJuegos, obtenerJuegosCreados };
