import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import CrearCuentaPage from "./Pages/CrearCuentaPage";
import PrincipalPage from "./Pages/PrincipalPage";
import PantallaTema from "./Pages/PantallaTemaPage";
import SubtemaPage from "./Pages/SubtemaPage";
import TeoriaPage from "./Pages/TeoriaFormPage";
import TeoriaContenido from "./Pages/TeoriaContenido";
import JuegosPage from "./Pages/JuegosPage";
import AhorcadoForm from "./Pages/AhorcadoForm";
import EjecutandoJuego from "./Pages/EjecutandoJuego";
import AhorcadoDocentePage from "./Pages/AhorcadoDocentePage";
import EditarTeoria from "./Pages/EditarTeoria";
import CrearCuentaDocente from "./Pages/CrearCuentaDocente";
import EditarAhorcadoPage from "./Pages/EditarAhorcadoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          //Area publica
          <Route path="/">
            <Route index element={<LandingPage></LandingPage>} />
            <Route path="login" element={<LoginPage></LoginPage>} />
            <Route
              path="crear-cuenta"
              element={<CrearCuentaPage></CrearCuentaPage>}
            />
          </Route>
          <Route path="/app">
            <Route index element={<PrincipalPage></PrincipalPage>} />
            <Route
              path="tema/:idTema"
              element={<PantallaTema></PantallaTema>}
            />
            <Route
              path="subtema/:idTema"
              element={<SubtemaPage></SubtemaPage>}
            />
            <Route
              path="teoria/:IdSubTema"
              element={<TeoriaPage></TeoriaPage>}
            />
            <Route
              path="teoria/editar/:IdTeoria"
              element={<EditarTeoria></EditarTeoria>}
            />
            <Route
              path="teoria/contenido/:IdTeoria"
              element={<TeoriaContenido></TeoriaContenido>}
            />
            <Route
              path="juegos/:IdSubTema"
              element={<JuegosPage></JuegosPage>}
            />
            <Route
              path="juegos/ahorcado/:IdSubTema/:IdJuego"
              element={<AhorcadoForm></AhorcadoForm>}
            />
            <Route
              path="juegos/ahorcado/ejecutando/:IdAhorcado"
              element={<EjecutandoJuego></EjecutandoJuego>}
            />
            <Route
              path="juegos/ahorcado/docente/:IdAhorcado"
              element={<AhorcadoDocentePage></AhorcadoDocentePage>}
            />{" "}
            <Route
              path="juegos/ahorcado/docente/editar/:IdAhorcado"
              element={<EditarAhorcadoPage></EditarAhorcadoPage>}
            />
            <Route
              path="docente"
              element={<CrearCuentaDocente></CrearCuentaDocente>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
