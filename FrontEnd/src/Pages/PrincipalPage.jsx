import React from "react";
import { useState, useEffect } from "react";
import Nav from "../Components/Nav";

import AprenderPage from "./AprenderPage";
import OpcionesUsuario from "../Components/OpcionesUsuario";

function PrincipalPage() {
  const [opcionUsuario, opcionUsuarioSet] = useState(1);

  useEffect(() => {
    const cambioDeOpcion = () => {};
    cambioDeOpcion();
  }, [opcionUsuario]);

  const handlerEscogerOpcion = (opcion) => {
    opcionUsuarioSet(opcion);
  };
  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario datos={{ opcionUsuario: 1 }}></OpcionesUsuario>

      <AprenderPage></AprenderPage>
    </>
  );
}

export default PrincipalPage;
