import { DataTypes } from "sequelize";
import db from "../config/db.js";

const SubTema = db.define("SubTemas", {
  IdSubTema: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  NombreSubTema: { type: DataTypes.STRING },
});

export default SubTema;
