import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Teoria = db.define("Teorias", {
  IdTeoria: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  NombreTeoria: { type: DataTypes.STRING },
  contenido: { type: DataTypes.TEXT },
});

export default Teoria;
