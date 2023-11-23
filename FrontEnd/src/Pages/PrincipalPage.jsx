import React from "react";
import { useState, useEffect } from "react";
import Nav from "../Components/Nav";

import AprenderPage from "./AprenderPage";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import mensajeError from "../Helpers/MensajeError";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";

function PrincipalPage() {
  const navigate = useNavigate();

  const [opcionUsuario, opcionUsuarioSet] = useState(1);
  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    const iniciarSesion = async () => {
      await verificarSesion();
    };
    iniciarSesion();
  }, []);

  const verificarSesion = async () => {
    try {
      const url = "jugadores/validar-sesion";
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const { data } = await clienteAxios.post(
        url,
        {},
        { headers: { Authorization: token } }
      );
      console.log(data.data.tipo);
      setTipoUsuario(data.data.tipo);
    } catch (error) {
      mensajeError("Inicia sesion", "Necesitas iniciar sesion primero");
      navigate("/login");
    }
  };

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
      <OpcionesUsuario
        datos={{ opcionUsuario: 1, tipoUsuario }}
        key={3254}
      ></OpcionesUsuario>

      <AprenderPage key={new Date()} tipoUsuario={tipoUsuario}></AprenderPage>
    </>
  );
}

export default PrincipalPage;
