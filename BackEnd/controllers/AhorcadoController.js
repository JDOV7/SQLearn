import { Ahorcado } from "../models/index.js";

const crearAhorcado = async (req, res) => {
  try {
    const {
      body: { IdJuego, IdSubTema, titulo, descripcion, palabras },
    } = req;
    const ahorcado = await Ahorcado.create({
      IdJuego,
      IdSubTema,
      titulo,
      descripcion,
      palabras,
    });

    if (!ahorcado) {
      throw new Error("Error");
    }

    return res.status(201).json({
      status: 201,
      message: "Juego del ahorcado creado correctamente",
      data: { ahorcado },
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "No se pudo crear el juego del ahorcado",
      data: {},
    });
  }
};

const eliminarAhorcado = async (req, res) => {
  try {
    const { IdAhorcado } = req.params;
    const ahorcado = await Ahorcado.destroy({
      where: {
        IdAhorcado,
      },
    });

    if (!ahorcado) {
      throw new Error("Error");
    }

    return res.status(200).json({
      status: 200,
      message: "Ahorcado eliminado correctamente",
      data: { ahorcado },
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error al eliminar el ahorcado",
      data: {},
    });
  }
};

export { crearAhorcado, eliminarAhorcado };
