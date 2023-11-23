import {
  Ahorcado,
  JugadorTema,
  SubTema,
  Tema,
  Teoria,
} from "../models/index.js";
import { customAlphabet } from "nanoid";

const agregarNuevoTema = async (req, res) => {
  const {
    NombreTema,
    docente: { IdDocente },
  } = req.body;

  const nanoid = customAlphabet("1234567890abcdef", 10);

  const Codigo = nanoid();

  const crearTema = await Tema.create({ NombreTema, Codigo, IdDocente });

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
  try {
    const { usuario } = req.body;
    const { IdDocente, IdJugador } = usuario;

    let temas;

    if (IdDocente) {
      temas = await Tema.findAll({
        attributes: [
          ["IdTema", "url"],
          ["NombreTema", "titulo"],
        ],
        where: {
          IdDocente,
        },
      });
    }

    if (IdJugador) {
      temas = await JugadorTema.findAll({
        // attributes: [
        //   ["IdTema", "url"],
        //   ["NombreTema", "titulo"],
        // ],
        attributes: { exclude: ["IdJugador", "IdTema", "IdJugadorTema"] },
        include: {
          model: Tema,
          attributes: [
            ["IdTema", "url"],
            ["NombreTema", "titulo"],
          ],
        },
        where: {
          IdJugador,
        },
      });

      const temasAux = [];
      console.log(temas);
      temas.map((tema) => {
        temasAux.push(tema.Tema);
      });
      temas = temasAux;
    }

    return res.status(200).json({
      status: 200,
      message: "Temas obtenidos",
      data: { temas },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "No se pudo obtener el tema",
      data: {},
    });
  }
};

const obtenerTema = async (req, res) => {
  try {
    const {
      params: { IdTema },
      body: {
        usuario: { IdJugador, IdDocente },
      },
    } = req;
    console.log(IdJugador);
    console.log(IdDocente);
    console.log("--------------------------");
    if (IdDocente) {
      const tema = await Tema.findOne({
        where: {
          IdTema,
          IdDocente,
        },
      });

      if (!tema) {
        throw new Error("Este tema no le pertenece a este docente");
      }
    }

    if (IdJugador) {
      const tema = await JugadorTema.findOne({
        where: { IdTema, IdJugador },
      });
      if (!tema) {
        throw new Error("Este tema no esta vinculado a este alumno");
      }
    }

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
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Error al obtener el tema",
      data: {},
    });
  }
};

const eliminarTema = async (req, res) => {
  try {
    const { IdTema } = req.params;

    const {
      docente: { IdDocente },
    } = req.body;

    const temaValidar = await Tema.findOne({
      where: { IdTema, IdDocente },
    });

    if (!temaValidar) {
      throw new Error("No existe el tema");
    }

    const ids = [];
    const subtemas = await SubTema.findAll({
      where: { IdTema },
      attributes: [["IdSubTema", "IdSubTema"]],
    });

    for (let index = 0; index < subtemas.length; index++) {
      const subtema = subtemas[index];
      const { IdSubTema } = subtema.dataValues;

      const teorias = await Teoria.findAll({
        where: {
          IdSubTema,
        },
      });

      for (let j = 0; j < teorias.length; j++) {
        const teoria = teorias[j];
        const { IdTeoria } = teoria.dataValues;
        const teoria_ = await Teoria.destroy({
          where: {
            IdTeoria,
          },
        });
      }

      const ahorcados = await Ahorcado.findAll({
        where: {
          IdSubTema,
        },
      });

      for (let j = 0; j < ahorcados.length; j++) {
        const ahorcado = ahorcados[j];
        const { IdAhorcado } = ahorcado.dataValues;
        const ahorcado_ = await Ahorcado.destroy({
          where: {
            IdAhorcado,
          },
        });
      }
    }

    for (let index = 0; index < subtemas.length; index++) {
      const subtema = subtemas[index];
      const { IdSubTema } = subtema.dataValues;
      const subtemaE = await SubTema.destroy({
        where: {
          IdSubTema,
        },
      });
    }

    const tema = await Tema.destroy({
      where: { IdTema },
    });

    return res.status(200).json({
      status: 200,
      message: "Tema eliminado correctamente",
      data: { IdTema },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: {},
    });
  }
};

const agregarTemaAlJugador = async (req, res) => {
  try {
    const {
      body: {
        alumno: { IdJugador },
        Codigo,
      },
    } = req;

    const { IdTema } = await Tema.findOne({
      where: {
        Codigo,
      },
    });

    if (!IdTema) {
      throw new Error("Error: el tema no existe");
    }

    const buscarTemaAsociado = await JugadorTema.findAll({
      where: {
        IdTema,
        IdJugador,
      },
    });

    if (buscarTemaAsociado && buscarTemaAsociado.length >= 1) {
      throw new Error("Error: ya tienes este tema asociado");
    }

    const temaAlumno = await JugadorTema.create({
      IdJugador,
      IdTema,
    });

    return res.status(200).json({
      status: 200,
      mesage: "Agregado correctamente",
      data: { body: req.body.alumno, IdTema },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      mesage: "Error no se pudo agregar el tema al usuario",
      data: {},
    });
  }
};

const editarTema = async (request, response) => {
  try {
    const {
      body: {
        docente: { IdDocente },
        NombreTema,
      },
      params: { IdTema },
    } = request;

    const tema = await Tema.findOne({
      where: {
        IdTema,
        IdDocente,
      },
    });

    if (!tema) {
      throw new Error("Error: No existe el tema");
    }

    const editarTema = await Tema.update(
      { NombreTema },
      {
        where: {
          IdTema,
          IdDocente,
        },
      }
    );

    return response.status(200).json({
      status: 200,
      mesage: "Tema editado correctamente",
      data: { IdDocente, NombreTema, IdTema, tema },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      mesage: "Error al editar tema",
      data: {},
    });
  }
};

const quitarTemaDeAlumno = async (request, response) => {
  try {
    const {
      body: {
        alumno: { IdJugador },
      },
      params: { IdTema },
    } = request;

    const tema = await JugadorTema.findOne({
      where: {
        IdJugador,
        IdTema,
      },
    });

    if (!tema) {
      throw new Error("No existe este tema");
    }

    const eliminarTema = await JugadorTema.destroy({
      where: {
        IdJugador,
        IdTema,
      },
    });

    return response.status(200).json({
      status: 200,
      message: "Tema quitado al alumno",
      data: { IdTema, IdJugador, tema },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "No se pudo quitar el tema al alumno",
      data: {},
    });
  }
};

export {
  agregarNuevoTema,
  obtenerTemas,
  obtenerTema,
  eliminarTema,
  agregarTemaAlJugador,
  editarTema,
  quitarTemaDeAlumno,
};
