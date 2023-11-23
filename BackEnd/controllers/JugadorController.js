import { Jugador, Docente } from "../models/index.js";
import bcrypt from "bcrypt";
import json from "jsonwebtoken";
import { config } from "dotenv";
config();
const crearJugador = async (req, res) => {
  try {
    const { NombreJugador, Correo, Password } = req.body;

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

    // const jugadorBuscar = await Jugador.findOne({
    //   where: {
    //     Correo,
    //   },
    // });

    // if (jugadorBuscar) {
    //   throw new Error("Usuario ya existente");
    // }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(Password, salt);

    const jugador = await Jugador.create({
      NombreJugador,
      Correo,
      Password: hash,
    });
    return res.status(201).json({
      status: 201,
      message: "jugador creado",
      data: { jugador },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Error en el servidor",
      data: {},
    });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { Correo, Password } = req.body;

    const [buscarDocente, buscarAlumno] = await Promise.all([
      Docente.findOne({ where: { Correo } }),
      Jugador.findOne({ where: { Correo } }),
    ]);
    let password, tipo;
    if (buscarDocente) {
      password = buscarDocente.Password;
      tipo = "docente";
    }

    if (buscarAlumno) {
      password = buscarAlumno.Password;
      tipo = "alumno";
    }

    if (!tipo) {
      throw new Error("Error: El usuario no existe");
    }

    const compararPassword = bcrypt.compareSync(Password, password);

    if (!compararPassword) {
      throw new Error("Password incorrecta");
    }

    const infoToken = {
      Correo,
      tipo,
    };

    const jsonWebToken = json.sign(infoToken, process.env.JSON_WEB_TOKEN, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      status: 200,
      message: "Inicio de sesion correcto",
      data: { jsonWebToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Error en el servidor",
      data: {},
    });
  }
};

const validarSesion = async (req, res) => {
  try {
    const { authorization } = req.headers;

    const datos = json.verify(authorization, process.env.JSON_WEB_TOKEN);

    const { tipo, Correo } = datos;

    if (tipo !== "alumno" && tipo !== "docente") {
      throw new Error("No es de tipo valido");
    }

    return res.status(200).json({
      status: 200,
      message: "validar sesion",
      data: { tipo },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Error al validar", data: {} });
  }
};

export { crearJugador, iniciarSesion, validarSesion };
