import { Teoria } from "../models/index.js";

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
    } = req;

    const teoria = await Teoria.findByPk(IdTeoria);

    if (!teoria) {
      throw new Error("Error");
    }

    return res
      .status(200)
      .json({ status: 200, message: "Teoria obtenida", data: { teoria } });
  } catch (error) {
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

export { crearNuevaTeoria, obtenerTeoria, eliminarTeoria };
