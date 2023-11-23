import { useNavigate } from "react-router-dom";
import mensajeError from "../src/Helpers/MensajeError";
import clienteAxios from "./axios";

const validarSesionIniciada = async () => {
  const navigate = useNavigate();
  try {
    const url = "";
    const validarSesion = clienteAxios;
  } catch (error) {
    console.log(error);
    mensajeError("Error de autentificacion", "Necesitas iniciar sesion");
    navigate("/login");
  }
};
