import { JugadorTema, SubTema, Tema, Teoria } from "../models/index.js";

const crearNuevaTeoria = async (req, res) => {
  try {
    const {
      body: { IdSubTema, NombreTeoria, contenido },
    } = req;

    const teoria = await Teoria.create({ IdSubTema, NombreTeoria, contenido });

    if (!teoria) {
      throw new Error("Error");
    }

    return res
      .status(201)
      .json({ status: 201, message: "Teoria creada", data: { teoria } });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error al crear la teoria",
      data: {},
    });
  }
};

const obtenerTeoria = async (req, res) => {
  try {
    const {
      params: { IdTeoria },
      body: {
        usuario: { IdJugador, IdDocente },
      },
    } = req;
    console.log("--------IdAlumno: " + IdJugador);
    console.log("--------IdDocente: " + IdDocente);

    if (IdDocente) {
      const {
        SubTema: { Tema: tema },
      } = await Teoria.findOne({
        where: {
          IdTeoria,
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
        throw new Error("Esta teoria no le pertenece a este docente");
      }
    }

    if (IdJugador) {
      const { IdSubTema } = await Teoria.findOne({
        where: { IdTeoria },
      });
      console.log("IdSubTema: " + IdSubTema);
      if (!IdSubTema) {
        throw new Error("Esta teoria no esta vinculado a este alumno");
      }

      const { IdTema } = await SubTema.findOne({
        where: {
          IdSubTema,
        },
      });
      console.log("IdTema: " + IdTema);
      if (!IdTema) {
        throw new Error("Este tema no esta vinculado a este alumno2");
      }

      const { IdJugadorTema } = await JugadorTema.findOne({
        where: { IdTema, IdJugador },
      });
      console.log("IdJugadorTema: " + IdJugadorTema);
      if (!IdJugadorTema) {
        throw new Error("Este tema no esta vinculado a este alumno3");
      }
    }

    const teoria = await Teoria.findByPk(IdTeoria);

    if (!teoria) {
      throw new Error("Error");
    }

    return res
      .status(200)
      .json({ status: 200, message: "Teoria obtenida", data: { teoria } });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: "Error al obtener la teoria",
      data: {},
    });
  }
};

const eliminarTeoria = async (req, res) => {
  try {
    const { IdTeoria } = req.params;
    const teoria = await Teoria.destroy({
      where: {
        IdTeoria,
      },
    });

    if (!teoria) {
      throw new Error("Error");
    }

    return res.status(200).json({
      status: 200,
      message: "Teoria eliminada correctamente",
      data: { teoria },
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Error al eliminar la teoria",
      data: {},
    });
  }
};

const obtenerTeoriaParaEditar = async (request, response) => {
  try {
    const {
      params: { IdTeoria },
      body: {
        docente: { IdDocente },
      },
    } = request;

    const {
      SubTema: { Tema: tema },
    } = await Teoria.findOne({
      where: {
        IdTeoria,
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

    if (!tema) {
      throw new Error("No existe la teoria");
    }

    const teoria = await Teoria.findByPk(IdTeoria);

    return response.status(200).json({
      status: 200,
      message: "Teoria para su ediccion",
      data: { IdTeoria, IdDocente, teoria },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al obtener la teoria para su ediccion",
      data: {},
    });
  }
};

const editarTeoria = async (request, response) => {
  try {
    const {
      params: { IdTeoria },
      body: {
        docente: { IdDocente },
        NombreTeoria,
        contenido,
      },
    } = request;

    const {
      SubTema: { Tema: tema },
    } = await Teoria.findOne({
      where: {
        IdTeoria,
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

    if (!tema) {
      throw new Error("No existe la teoria");
    }

    const teoria = await Teoria.update(
      { NombreTeoria, contenido },
      {
        where: {
          IdTeoria,
        },
      }
    );

    return response.status(200).json({
      status: 200,
      message: "Teoria editada",
      data: { IdTeoria, teoria },
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      status: 500,
      message: "Error al editar la teoria",
      data: {},
    });
  }
};

export {
  crearNuevaTeoria,
  obtenerTeoria,
  eliminarTeoria,
  obtenerTeoriaParaEditar,
  editarTeoria,
};
