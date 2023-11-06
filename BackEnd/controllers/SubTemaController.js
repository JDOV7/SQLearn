import { SubTema, Teoria, Ahorcado } from "../models/index.js";

const agregarNuevoSubTema = async (req, res) => {
  const { NombreSubTema, IdTema } = req.body;

  const subtema = await SubTema.create({
    IdTema,
    NombreSubTema,
  });

  if (!subtema) {
    return res.status(401).json({
      status: 401,
      message: "No se pudo crear el subtema",
      data: {},
    });
  }

  return res.json({
    status: 201,
    message: "SubTema creado correctamente",
    data: { subtema },
  });
};

const obtenerSubtemas = async (req, res) => {
  try {
    const subtemas = await SubTema.findAll();

    return res.json({
      status: 201,
      message: "SubTemas",
      data: { subtemas },
    });
  } catch (error) {
    return res.json({
      status: 400,
      message: "Error al obtener los subtemas",
      data: {},
    });
  }
};

const obtenerSubTema = async (req, res) => {
  try {
    const {
      params: { IdSubTema },
    } = req;
    const subtema = await SubTema.findByPk(IdSubTema);

    const teorias = await Teoria.findAll({
      where: { IdSubTema },
      attributes: [
        ["IdTeoria", "url"],
        ["NombreTeoria", "titulo"],
      ],
    });

    if (!subtema) {
      return res.status(400).json({
        status: 400,
        message: "No se pudo obtener el subtema",
        data: {},
      });
    }

    return res.status(200).json({
      status: 200,
      message: "SubTema obtenido",
      data: { subtema, teorias },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: 400,
      message: "Error al obtener el subtema",
      data: {},
    });
  }
};

const eliminarSubtema = async (req, res) => {
  try {
    const { IdSubTema } = req.params;

    const teorias = await Teoria.findAll({
      where: {
        IdSubTema,
      },
    });

    teorias.forEach(async (teoria) => {
      console.log(teoria.dataValues.IdTeoria);
      const { IdTeoria } = teoria.dataValues;
      const teoria_ = await Teoria.destroy({
        where: {
          IdTeoria,
        },
      });
    });

    const ahorcados = await Ahorcado.findAll({
      where: {
        IdSubTema,
      },
    });

    ahorcados.forEach(async (ahorcado) => {
      console.log(ahorcado.dataValues.IdAhorcado);
      const { IdAhorcado } = ahorcado.dataValues;
      const ahorcado_ = await Ahorcado.destroy({
        where: {
          IdAhorcado,
        },
      });
    });

    const subtema = await SubTema.destroy({
      where: {
        IdSubTema,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Subtema eliminado correctamente",
      data: { IdSubTema },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      status: 400,
      message: "Error al eliminar el subtema",
      data: {},
    });
  }
};

export {
  agregarNuevoSubTema,
  obtenerSubtemas,
  obtenerSubTema,
  eliminarSubtema,
};
