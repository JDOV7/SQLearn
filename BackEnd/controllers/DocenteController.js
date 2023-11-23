import bcrypt from "bcrypt";
import { Docente, Jugador } from "../models/index.js";

const crearDocente = async (request, response) => {
  try {
    const {
      body: { NombreDocente, Correo, Password },
    } = request;
    const [buscarDocentes, buscarAlumnos] = await Promise.all([
      Docente.findAll({ where: { Correo } }),
      Jugador.findAll({ where: { Correo } }),
    ]);

    if (
      (buscarDocentes && buscarDocentes.length >= 1) ||
      (buscarAlumnos && buscarAlumnos.length >= 1)
    ) {
      throw new Error("Correo ya en uso");
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(Password, salt);
    const docente = await Docente.create({
      NombreDocente,
      Correo,
      Password: hash,
    });

    return response.status(201).json({
      status: 201,
      message: "Docente creado correctamente",
      data: { docente },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al crear un nuevo docente",
      data: {},
    });
  }
};

export { crearDocente };
