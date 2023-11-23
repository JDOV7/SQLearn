import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Docente = db.define("Docentes", {
  IdDocente: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  NombreDocente: { type: DataTypes.STRING },
  Correo: { type: DataTypes.STRING },
  Password: { type: DataTypes.STRING },
});

export default Docente;
