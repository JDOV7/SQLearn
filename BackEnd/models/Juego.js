import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Juego = db.define("Juegos", {
  IdJuego: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  NombreJuego: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.TEXT },
});

export default Juego;
