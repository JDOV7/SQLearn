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
              path="teoria/contenido/:IdTeoria"
              element={<TeoriaContenido></TeoriaContenido>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
