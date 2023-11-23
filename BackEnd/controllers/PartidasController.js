import { Partida } from "../models/index.js";
const guardarPartida = async (req, res) => {
  try {
    const {
      body: {
        IdAhorcado,
        tiempo,
        fecha,
        errores,
        alumno: { IdJugador },
      },
    } = req;
    const partida = await Partida.create({
      IdAhorcado,
      IdJugador,
      tiempo,
      fecha,
      errores,
    });

    if (!partida) {
      throw new Error();
    }
    return res.status(201).json({
      status: 201,
      message: "Partida creada correctamente",
      data: { partida },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Error al guardar la partida",
      data: {},
    });
  }
};

export { guardarPartida };
