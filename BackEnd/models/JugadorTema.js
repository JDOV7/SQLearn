import { DataTypes } from "sequelize";
import db from "../config/db.js";

const JugadorTema = db.define("JugadorTemas", {
  IdJugadorTema: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
});

export default JugadorTema;
