import { SubTema, Tema } from "../models/index.js";

const agregarNuevoTema = async (req, res) => {
  const { NombreTema } = req.body;

  const crearTema = await Tema.create({ NombreTema });

  if (!crearTema) {
    return res.status(401).json({
      status: 401,
      message: "No se pudo crear el tema",
      data: {},
    });
  }

  return res.json({
    status: 201,
    message: "Tema creado correctamente",
    data: { crearTema },
  });
};

const obtenerTemas = async (req, res) => {
  const temas = await Tema.findAll({
    attributes: [
      ["IdTema", "url"],
      ["NombreTema", "titulo"],
    ],
  });

  if (!temas) {
    return res.status(400).json({
      status: 400,
      message: "No se pudo obtener los temas",
      data: {},
    });
  }

  return res.json({
    status: 200,
    message: "Temas obtenidos",
    data: { temas },
  });
};

const obtenerTema = async (req, res) => {
  try {
    const {
      params: { IdTema },
    } = req;
    const tema = await Tema.findByPk(IdTema);

    const subtemas = await SubTema.findAll({
      where: { IdTema },
      attributes: [
        ["IdSubTema", "url"],
        ["NombreSubTema", "titulo"],
      ],
    });

    if (!tema) {
      return res.status(400).json({
        status: 400,
        message: "No se pudo obtener los tema",
        data: {},
      });
    }

    return res.status(200).json({
      status: 200,
      message: "Temas obtenidos",
      data: { tema, subtemas },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: 400,
      message: "Error al obtener el tema",
      data: {},
    });
  }
};

export { agregarNuevoTema, obtenerTemas, obtenerTema };
