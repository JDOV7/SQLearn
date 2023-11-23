import {
  SubTema,
  Teoria,
  Ahorcado,
  Tema,
  JugadorTema,
} from "../models/index.js";

const agregarNuevoSubTema = async (req, res) => {
  try {
    const { NombreSubTema, IdTema } = req.body;
    const {
      docente: { IdDocente },
    } = req.body;

    const tema = await Tema.findOne({
      where: {
        IdDocente,
        IdTema,
      },
    });

    if (!tema) {
      throw new Error("Error al crear el subtema");
    }

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
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      message: "Error al intentar crear el subtema",
      data: {},
    });
  }
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
      body: {
        usuario: { IdJugador, IdDocente },
      },
    } = req;
    console.log(IdJugador);
    console.log(IdDocente);
    if (IdDocente) {
      const tema = await SubTema.findOne({
        where: {
          IdSubTema,
        },
        include: [
          {
            model: Tema,
            where: {
              IdDocente,
            },
          },
        ],
      });

      if (!tema) {
        throw new Error("Este subtema no le pertenece a este docente");
      }
    }

    if (IdJugador) {
      const { IdTema } = await SubTema.findOne({
        where: { IdSubTema },
      });
      console.log("jugador: " + IdTema);
      if (!IdTema) {
        throw new Error("Este tema no esta vinculado a este alumno");
      }

      const tema = await JugadorTema.findOne({
        where: {
          IdTema,
          IdJugador,
        },
      });
      if (!tema) {
        throw new Error("Este tema no esta vinculado a este alumno2");
      }
    }

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
    console.log(error);
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

const editarSubTema = async (request, response) => {
  try {
    const {
      body: {
        docente: { IdDocente },
        NombreSubTema,
      },
      params: { IdSubTema },
    } = request;

    const subtema = await SubTema.findOne({
      where: {
        IdSubTema,
      },
      include: [{ model: Tema, where: { IdDocente } }],
    });

    if (!subtema) {
      throw new Error("Error: No existe el subtema");
    }

    const subtemaeditado = await SubTema.update(
      { NombreSubTema },
      {
        where: {
          IdSubTema,
        },
      }
    );

    return response.status(200).json({
      status: 200,
      mesage: "SubTema editado correctamente",
      data: { IdDocente, NombreSubTema, subtema },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      mesage: "Error al editar subtema",
      data: {},
    });
  }
};

export {
  agregarNuevoSubTema,
  obtenerSubtemas,
  obtenerSubTema,
  eliminarSubtema,
  editarSubTema,
};
