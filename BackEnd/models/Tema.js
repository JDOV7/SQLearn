import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Tema = db.define("Temas", {
  IdTema: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  NombreTema: { type: DataTypes.STRING },
  Codigo: { type: DataTypes.STRING },
});

export default Tema;
