import Tema from "./Tema.js";
import SubTema from "./SubTema.js";
import Teoria from "./Teoria.js";
import Juego from "./Juego.js";
import Ahorcado from "./Ahorcado.js";
import Jugador from "./Jugador.js";
import JugadorTema from "./JugadorTema.js";
import Partida from "./Partida.js";
import Docente from "./Docente.js";

Tema.belongsTo(Docente, { foreignKey: "IdDocente", onDelete: "CASCADE" });

SubTema.belongsTo(Tema, { foreignKey: "IdTema", onDelete: "CASCADE" });

Teoria.belongsTo(SubTema, { foreignKey: "IdSubTema", onDelete: "CASCADE" });

Ahorcado.belongsTo(Juego, { foreignKey: "IdJuego", onDelete: "CASCADE" });

Ahorcado.belongsTo(SubTema, { foreignKey: "IdSubTema", onDelete: "CASCADE" });

JugadorTema.belongsTo(Jugador, {
  foreignKey: "IdJugador",
  onDelete: "CASCADE",
});

JugadorTema.belongsTo(Tema, { foreignKey: "IdTema", onDelete: "CASCADE" });

Partida.belongsTo(Jugador, {
  foreignKey: "IdJugador",
  onDelete: "CASCADE",
});

Partida.belongsTo(Ahorcado, { foreignKey: "IdAhorcado", onDelete: "CASCADE" });

export {
  Tema,
  SubTema,
  Teoria,
  Juego,
  Ahorcado,
  Jugador,
  JugadorTema,
  Partida,
  Docente,
};
