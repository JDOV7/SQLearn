import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import JuegoCard from "../Components/JuegoCard";
import soga from "../../public/img/soga.png";
import mensajeError from "../Helpers/MensajeError";

function JuegosPage() {
  const navigate = useNavigate();
  const [juegos, setJuegos] = useState([]);
  const params = useParams();
  const { IdSubTema } = params;

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
    const obtJuegos = async () => {
      const juegosRes = await obtenerJuegos();
      setJuegos(juegosRes);
      // console.log(titulo);
    };
    obtJuegos();
  }, [juegos]);

  const obtenerJuegos = async () => {
    try {
      const url = `/juego/juegos`;
      const respuesta = await clienteAxios.get(url);
      // console.log(respuesta);
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
      return respuesta?.data?.data?.juegos;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario
        datos={{ opcionUsuario: 1, tipoUsuario }}
      ></OpcionesUsuario>
      <div className="py-4">
        <h1 className="text-center text-6xl">Escoge un Juego</h1>
      </div>
      <div className="p-10">
        <div className="grid grid-cols-3 gap-20 ">
          {juegos.length >= 1 ? (
            <>
              {juegos.map((juego, index) => {
                return (
                  <JuegoCard
                    datos={{
                      titulo: juego.NombreJuego,
                      img: soga,
                      IdJuego: juego.IdJuego,
                      IdSubTema,
                    }}
                    key={index}
                  ></JuegoCard>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default JuegosPage;
