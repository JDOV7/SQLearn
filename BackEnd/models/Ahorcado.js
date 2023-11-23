import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Ahorcado = db.define("Ahorcados", {
  IdAhorcado: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  titulo: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.TEXT },
  palabras: { type: DataTypes.TEXT },
  reglas: { type: DataTypes.TEXT },
});

export default Ahorcado;
