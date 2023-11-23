import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Jugador = db.define("Jugadores", {
  IdJugador: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  NombreJugador: { type: DataTypes.STRING },
  Correo: { type: DataTypes.STRING },
  Password: { type: DataTypes.STRING },
});

export default Jugador;
