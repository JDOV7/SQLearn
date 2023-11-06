import Tema from "./Tema.js";
import SubTema from "./SubTema.js";
import Teoria from "./Teoria.js";
import Juego from "./Juego.js";
import Ahorcado from "./Ahorcado.js";

SubTema.belongsTo(Tema, { foreignKey: "IdTema" });

Teoria.belongsTo(SubTema, { foreignKey: "IdSubTema" });

Ahorcado.belongsTo(Juego, { foreignKey: "IdJuego" });

Ahorcado.belongsTo(SubTema, { foreignKey: "IdSubTema" });

export { Tema, SubTema, Teoria, Juego, Ahorcado };
