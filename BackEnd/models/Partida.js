import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Partida = db.define("Partidas", {
  IdPartida: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  tiempo: { type: DataTypes.STRING },
  fecha: { type: DataTypes.DATE },
  errores: { type: DataTypes.INTEGER },
});

export default Partida;
