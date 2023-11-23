import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import TemaRouter from "./routes/TemaRouter.js";
import SubTemaRouter from "./routes/SubTemaRouter.js";
import TeoriaRouter from "./routes/TeoriaRouter.js";
import JuegoRouter from "./routes/JuegoRouter.js";
import AhorcadoRouter from "./routes/AhorcadoRouter.js";
import partidaRouter from "./routes/PartidaRouter.js";
import jugadorRouter from "./routes/JugadorRouter.js";
import docenteRouter from "./routes/DocenteRouter.js";

import db from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "public/logs/access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

dotenv.config();

try {
  await db.authenticate();
  db.sync();
  console.log("conexion correcta a la db");
} catch (error) {
  console.log(error);
}
// app.use(express.static("public"));

const dominiosPermitidos = [process.env.FRONTEND_URL, "https://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
    // if (dominiosPermitidos.indexOf(origin) !== -1) {

    //   callback(null, true);
    // } else {
    //   callback(new Error("No permitdo por CORS"));
    // }
  },
};

app.use(cors(corsOptions));

app.use("/temas", TemaRouter);
app.use("/sub-temas", SubTemaRouter);
app.use("/teoria", TeoriaRouter);
app.use("/juego", JuegoRouter);
app.use("/ahorcado", AhorcadoRouter);
app.use("/partidas", partidaRouter);
app.use("/jugadores", jugadorRouter);
app.use("/docentes", docenteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
