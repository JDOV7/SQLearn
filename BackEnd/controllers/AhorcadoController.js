import { Op, Sequelize } from "sequelize";
import pdfKit from "pdfkit";
import fs from "fs";
import {
  Ahorcado,
  Jugador,
  JugadorTema,
  Partida,
  SubTema,
  Tema,
} from "../models/index.js";

const crearAhorcado = async (req, res) => {
  try {
    const {
      body: { IdJuego, IdSubTema, titulo, descripcion, palabras, reglas },
    } = req;
    const ahorcado = await Ahorcado.create({
      IdJuego,
      IdSubTema,
      titulo,
      descripcion,
      palabras,
      reglas,
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

const obtenerAhorcado = async (req, res) => {
  try {
    const {
      params: { IdAhorcado },
      body: {
        usuario: { IdJugador, IdDocente },
      },
    } = req;

    console.log("--------IdAlumno: " + IdJugador);
    console.log("--------IdDocente: " + IdDocente);

    if (IdDocente) {
      const {
        SubTema: { Tema: tema },
      } = await Ahorcado.findOne({
        where: {
          IdAhorcado,
        },
        include: [
          {
            model: SubTema,
            include: [{ model: Tema, where: { IdDocente } }],
          },
        ],
      });
      console.log(tema);
      if (!tema) {
        throw new Error("Este ahorcado no le pertenece a este docente");
      }
    }

    if (IdJugador) {
      const { IdSubTema } = await Ahorcado.findOne({
        where: { IdAhorcado },
      });
      console.log("IdSubTema: " + IdSubTema);
      if (!IdSubTema) {
        throw new Error("Este ahorcado no esta vinculado a este alumno");
      }

      const { IdTema } = await SubTema.findOne({
        where: {
          IdSubTema,
        },
      });
      console.log("IdTema: " + IdTema);
      if (!IdTema) {
        throw new Error("Este ahorcado no esta vinculado a este alumno2");
      }

      const { IdJugadorTema } = await JugadorTema.findOne({
        where: { IdTema, IdJugador },
      });
      console.log("IdJugadorTema: " + IdJugadorTema);
      if (!IdJugadorTema) {
        throw new Error("Este ahorcado no esta vinculado a este alumno3");
      }
    }

    const ahorcado = await Ahorcado.findByPk(IdAhorcado);

    if (!ahorcado) {
      throw new Error();
    }

    const infoAhorcado = await Partida.findAll({
      where: { IdAhorcado },
      attributes: [
        // specify an array where the first element is the SQL function and the second is the alias
        [Sequelize.fn("DISTINCT", Sequelize.col("IdJugador")), "IdJugador"],

        // specify any additional columns, e.g. country_code
        // 'country_code'
      ],
    });

    const infoJugadores = [];

    for (let i = 0; i < infoAhorcado.length; i++) {
      const IdJugador = infoAhorcado[i].IdJugador;
      const { dataValues } = await Jugador.findOne({
        where: { IdJugador },
        attributes: [
          ["NombreJugador", "NombreJugador"],
          ["IdJugador", "IdJugador"],
        ],
      });
      // console.log(alumno.dataValues);
      infoJugadores.push(dataValues);
    }

    return res.status(200).json({
      status: 200,
      message: "Ahorcado",
      data: { ahorcado, infoJugadores },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Error al obtener el ahorcado",
      data: {},
    });
  }
};

const crearPDF = async (request, response) => {
  try {
    const {
      params: { IdAhorcado },
    } = request;

    const ahorcado = await Ahorcado.findByPk(IdAhorcado);

    if (!ahorcado) {
      throw new Error("No existe este juego");
    }

    const doc = new pdfKit();

    const fecha = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    doc.pipe(fs.createWriteStream(`./public/pdf/${IdAhorcado}.pdf`));

    doc.fillColor("black").fontSize(13).text(fecha, 390, 10, { fill: true });

    doc.rect(30, 30, 550, 60).fill("#A0BFE0");
    doc
      .fillColor("black")
      .fontSize(25)
      .text(`SQLearn: ${ahorcado.titulo}`, 200, 50, { fill: true });

    const partidas = await Partida.findAll({
      where: { IdAhorcado },
      include: [
        {
          model: Jugador,
          // as: "Jugador",
        },
      ],
      order: [["fecha", "DESC"]],
    });
    let inicioY = 170;
    doc
      .fillColor("black")
      .fontSize(14)
      .text("Nombre completo del alumno", 30, 120, { fill: true })
      .text("Tiempo", 250, 120, { fill: true })
      .text("Errores", 305, 120, { fill: true })
      .text("Completado", 360, 120, { fill: true })
      .text("Fecha", 470, 120, { fill: true });

    partidas.map((partida) => {
      const fechaPartida =
        new Date(partida.fecha).toLocaleDateString("es-ES") +
        " " +
        new Date(partida.fecha).toLocaleTimeString("es-ES");
      doc
        .fillColor("black")
        .fontSize(11)
        .text(partida.Jugadore.NombreJugador, 30, inicioY, { fill: true })
        .text(partida.tiempo, 265, inicioY, { fill: true })
        .text(partida.errores, 325, inicioY, { fill: true })
        .fillColor(partida.errores == 6 ? "red" : "green")
        .text(partida.errores == 6 ? "NO" : "SI", 390, inicioY, { fill: true })
        .fillColor("black")
        .text(fechaPartida, 435, inicioY, { fill: true, align: "right" });
      doc.rect(30, inicioY + 15, 550, 5).fill("#4A55A2");
      inicioY += 30;
    });

    doc.end();

    const rutaPDF = `./public/pdf/${IdAhorcado}.pdf`; // Ruta real de tu archivo PDF

    // Verificar si el archivo existe
    if (fs.existsSync(rutaPDF)) {
      // Configurar encabezados de respuesta para indicar que es un archivo PDF
      // response.setHeader("Content-Type", "application/pdf");
      // response.setHeader(
      //   "Content-Disposition",
      //   "attachment; filename=archivo.pdf"
      // );
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader("Content-Disposition", "inline; filename=archivo.pdf");
      // Crear un flujo de lectura y enviar el contenido del archivo como respuesta
      const stream = fs.createReadStream(rutaPDF);
      stream.pipe(response);
    } else {
      response.status(404).json({ mensaje: "Archivo no encontrado" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "No se pudo crear el pdf",
      data: {},
    });
  }
};

const crearPDFAlumno = async (request, response) => {
  try {
    const {
      params: { IdJugador, IdAhorcado },
    } = request;

    const ahorcado = await Ahorcado.findByPk(IdAhorcado);

    if (!ahorcado) {
      throw new Error("No existe este juego");
    }

    const doc = new pdfKit();

    const fecha = new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    doc.pipe(
      fs.createWriteStream(`./public/pdf/${IdAhorcado}${IdJugador}.pdf`)
    );

    doc.fillColor("black").fontSize(13).text(fecha, 390, 10, { fill: true });

    doc.rect(30, 30, 550, 60).fill("#A0BFE0");
    doc
      .fillColor("black")
      .fontSize(25)
      .text(`SQLearn: ${ahorcado.titulo}`, 200, 50, { fill: true });

    const partidas = await Partida.findAll({
      where: {
        IdAhorcado,
        IdJugador,
        errores: {
          [Op.lt]: 6,
        },
      },
      include: [
        {
          model: Jugador,
          // as: "Jugador",
        },
      ],
      order: [["fecha", "DESC"]],
    });

    doc
      .fillColor("black")
      .fontSize(20)
      .text("Aprobado:", 30, 120, { fill: true });

    let inicioY = 190,
      iColumnasY = 160;
    doc
      .fillColor("black")
      .fontSize(14)
      .text("Nombre completo del alumno", 30, iColumnasY, { fill: true })
      .text("Tiempo", 250, iColumnasY, { fill: true })
      .text("Errores", 305, iColumnasY, { fill: true })
      .text("Completado", 360, iColumnasY, { fill: true })
      .text("Fecha", 470, iColumnasY, { fill: true });

    partidas.map((partida) => {
      const fechaPartida =
        new Date(partida.fecha).toLocaleDateString("es-ES") +
        " " +
        new Date(partida.fecha).toLocaleTimeString("es-ES");
      doc
        .fillColor("black")
        .fontSize(11)
        .text(partida.Jugadore.NombreJugador, 30, inicioY, { fill: true })
        .text(partida.tiempo, 265, inicioY, { fill: true })
        .text(partida.errores, 325, inicioY, { fill: true })
        .fillColor(partida.errores == 6 ? "red" : "green")
        .text(partida.errores == 6 ? "NO" : "SI", 390, inicioY, { fill: true })
        .fillColor("black")
        .text(fechaPartida, 435, inicioY, { fill: true, align: "right" });
      doc.rect(30, inicioY + 15, 550, 5).fill("#4A55A2");
      inicioY += 30;
    });

    doc
      .addPage()
      .fillColor("black")
      .fontSize(20)
      .text("No Aprobado:", 30, 120, { fill: true });

    const partidasNoAprovadas = await Partida.findAll({
      where: {
        IdAhorcado,
        IdJugador,
        errores: {
          [Op.eq]: 6,
        },
      },
      include: [
        {
          model: Jugador,
          // as: "Jugador",
        },
      ],
      order: [["fecha", "DESC"]],
    });

    inicioY = 190;
    iColumnasY = 160;
    doc
      .fillColor("black")
      .fontSize(14)
      .text("Nombre completo del alumno", 30, iColumnasY, { fill: true })
      .text("Tiempo", 250, iColumnasY, { fill: true })
      .text("Errores", 305, iColumnasY, { fill: true })
      .text("Completado", 360, iColumnasY, { fill: true })
      .text("Fecha", 470, iColumnasY, { fill: true });

    partidasNoAprovadas.map((partida) => {
      const fechaPartida =
        new Date(partida.fecha).toLocaleDateString("es-ES") +
        " " +
        new Date(partida.fecha).toLocaleTimeString("es-ES");
      doc
        .fillColor("black")
        .fontSize(11)
        .text(partida.Jugadore.NombreJugador, 30, inicioY, { fill: true })
        .text(partida.tiempo, 265, inicioY, { fill: true })
        .text(partida.errores, 325, inicioY, { fill: true })
        .fillColor(partida.errores == 6 ? "red" : "green")
        .text(partida.errores == 6 ? "NO" : "SI", 390, inicioY, { fill: true })
        .fillColor("black")
        .text(fechaPartida, 435, inicioY, { fill: true, align: "right" });
      doc.rect(30, inicioY + 15, 550, 5).fill("#4A55A2");
      inicioY += 30;
    });

    doc.end();

    const rutaPDF = `./public/pdf/${IdAhorcado}${IdJugador}.pdf`; // Ruta real de tu archivo PDF

    // Verificar si el archivo existe
    if (fs.existsSync(rutaPDF)) {
      // Configurar encabezados de respuesta para indicar que es un archivo PDF
      // response.setHeader("Content-Type", "application/pdf");
      // response.setHeader(
      //   "Content-Disposition",
      //   "attachment; filename=archivo.pdf"
      // );
      response.setHeader("Content-Type", "application/pdf");
      response.setHeader("Content-Disposition", "inline; filename=archivo.pdf");
      // Crear un flujo de lectura y enviar el contenido del archivo como respuesta
      const stream = fs.createReadStream(rutaPDF);
      stream.pipe(response);
    } else {
      response.status(404).json({ mensaje: "Archivo no encontrado" });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "No se pudo crear el pdf",
      data: {},
    });
  }
};

const actualizarAhorcado = async (request, response) => {
  try {
    const {
      body: {
        docente: { IdDocente },
        titulo,
        descripcion,
        palabras,
        reglas,
      },
      params: { IdAhorcado },
    } = request;

    const {
      SubTema: { Tema: tema },
    } = await Ahorcado.findOne({
      where: {
        IdAhorcado,
      },
      include: [
        {
          model: SubTema,
          include: [
            {
              model: Tema,
              where: {
                IdDocente,
              },
            },
          ],
        },
      ],
    });

    const ahorcadoUpd = await Ahorcado.update(
      { titulo, descripcion, palabras, reglas },
      {
        where: {
          IdAhorcado,
        },
      }
    );

    return response.status(200).json({
      status: 200,
      message: "Ahorcado actualizado correctamente",
      data: { tema },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al actualizar el ahorcado",
      data: {},
    });
  }
};

export {
  crearAhorcado,
  eliminarAhorcado,
  obtenerAhorcado,
  crearPDF,
  crearPDFAlumno,
  actualizarAhorcado,
};
