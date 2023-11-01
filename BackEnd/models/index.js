import Tema from "./Tema.js";
import SubTema from "./SubTema.js";
import Teoria from "./Teoria.js";

SubTema.belongsTo(Tema, { foreignKey: "IdTema" });

Teoria.belongsTo(SubTema, { foreignKey: "IdSubTema" });

export { Tema, SubTema, Teoria };
