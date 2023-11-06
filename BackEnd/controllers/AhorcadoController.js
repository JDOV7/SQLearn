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

export { crearAhorcado };
