import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import mensajeError from "../Helpers/MensajeError";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

function AhorcadoDocentePage() {
  const params = useParams();
  const navigate = useNavigate();
  const { IdAhorcado } = params;
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [juego, setjuego] = useState({});
  const [infojuego, setinfojuego] = useState([]);

  useEffect(() => {
    const iniciarSesion = async () => {
      await verificarSesion();
    };
    iniciarSesion();
  }, []);

  useEffect(() => {
    const obtJuego = async () => {
      console.log("ejecutando juego..........");
      await obtenerJuego();
    };
    obtJuego();
  }, []);

  const obtenerJuego = async () => {
    try {
      // throw new Error();
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const url = `/ahorcado/ahorcado/${IdAhorcado}`;
      const respuesta = await clienteAxios.get(url, {
        headers: { Authorization: token },
      });
      setjuego(respuesta?.data?.data?.ahorcado);
      setinfojuego(respuesta?.data?.data?.infoJugadores);
      // console.log(respuesta?.data?.data?.infoJugadores);
      // juego.palabras = juego.palabras.split("*|*");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo abrir el juego",
      });
      navigate(`/app`);
    }
  };

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
      if (data.data.tipo != "docente") {
        throw new Error("Inicia sesion");
      }
      setTipoUsuario(data.data.tipo);
    } catch (error) {
      mensajeError("Inicia sesion", "Necesitas iniciar sesion primero");
      navigate("/login");
    }
  };

  const abrirPDF = async (url) => {
    try {
      // const url = `/ahorcado/ahorcado/pdf/${IdAhorcado}`;
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const response = await clienteAxios.get(url, {
        responseType: "blob",
        headers: { Authorization: token },
      });
      const blob = await response.data;

      const urlPDF = URL.createObjectURL(blob);
      window.open(urlPDF, "_blank");
    } catch (error) {
      console.log(error);
      Swal.fire("Error, no se pudo cargar el pdf");
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario
        datos={{ opcionUsuario: 1, tipoUsuario }}
      ></OpcionesUsuario>
      <div className="py-4">
        <h1 className="text-center text-5xl">Informacion Ahorcado</h1>
      </div>
      <div>
        <h1 className="text-center text-4xl font-bold">{juego.titulo}</h1>
      </div>
      <div className="p-10">
        <p className="text-justify text-xl font-bold">{juego.descripcion}</p>
      </div>
      <div className="p-5">
        <div className="p-5">
          <h1 className="text-center font-bold text-3xl">
            Respuestas y Reglas Del Ahorcado
          </h1>
        </div>
        <div className="grid grid-cols-2">
          <div className="col-span-1 p-5 bg-green rounded-3xl">
            <p className="text-center text-2xl font-extrabold">Palabra</p>
          </div>
          <div className="col-span-1 p-5 bg-green rounded-3xl">
            <p className="text-center text-2xl font-extrabold">Regla</p>
          </div>
          {juego.palabras && juego.palabras.split("*|*").length >= 1 ? (
            <>
              {juego.palabras.split("*|*").map((pal, index) => {
                return (
                  <>
                    <div key={index} className="col-span-1 p-5">
                      <p className="text-justify text-lg font-bold">{pal}</p>
                    </div>
                    <div key={index} className="col-span-1 p-5">
                      <p className="text-justify text-lg font-bold">
                        {juego.reglas.split("*|*")[index]}
                      </p>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <h1>Mal</h1>
            </>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-4xl text-center font-extrabold">
          Alumnos Que Han Jugado
        </h1>
      </div>
      <div className="text-center p-4">
        <button
          className="bg-secundario p-2 rounded-lg text-black font-extrabold text-center"
          onClick={async (e) => {
            e.preventDefault();
            await abrirPDF(`/ahorcado/ahorcado/pdf/${IdAhorcado}`);
          }}
        >
          Historial Global
        </button>
      </div>
      <div className="p-10">
        <table>
          <thead>
            <tr>
              <th className="text-xl font-extrabold">Nombre Alumno</th>
              <th className="text-xl font-extrabold">Historial</th>
            </tr>
          </thead>
          <tbody>
            {infojuego && infojuego.length >= 1 ? (
              <>
                {infojuego.map((jugador, index) => {
                  return (
                    <>
                      {/* <div key={index}>
                        <h1 className="text-xl font-semibold">
                          {jugador.NombreJugador}
                        </h1>
                      </div> */}
                      <tr>
                        <td className="text-lg font-semibold p-4">
                          {jugador.NombreJugador}
                        </td>
                        <td>
                          <button
                            className="bg-secundario p-2 rounded-lg text-black font-extrabold text-center"
                            onClick={async (e) => {
                              e.preventDefault();
                              await abrirPDF(
                                `/ahorcado/ahorcado/pdf/alumno/${IdAhorcado}/${jugador.IdJugador}`
                              );
                            }}
                          >
                            Historial
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </>
            ) : (
              // {infojuego[0].NombreJugador}
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AhorcadoDocentePage;
