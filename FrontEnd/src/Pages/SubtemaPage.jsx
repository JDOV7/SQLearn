import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import ElementoTemario from "../Components/ElementoTemario";

import aniadirNuevoTemaIMG from "../../public/img/anadir.png";
import juegosIMG from "../../public/img/rompecabezas.png";
import mensajeError from "../Helpers/MensajeError";

function Subtema() {
  const navigate = useNavigate();
  const params = useParams();
  const { idTema } = params;
  const [opcionUsuario, opcionUsuarioSet] = useState(1);
  const [valor, setValor] = useState(0);
  const [teorias, setTeorias] = useState([]);
  const [juegos, setjuegos] = useState([]);
  const [titulo, setTitulo] = useState("");

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
    const obtTeorias = async () => {
      const teorias = await obtenerTeorias();
      setTeorias(teorias[1]);
      setTitulo(teorias[0]["NombreSubTema"]);
      // console.log(titulo);
    };
    obtTeorias();
  }, []);

  useEffect(() => {
    const obtJuegos = async () => {
      const juegos = await obtenerJuegos();
      setjuegos(juegos[0]);
    };
    obtJuegos();
  }, []);

  const obtenerTeorias = async () => {
    try {
      const url = `/sub-temas/subtema/${idTema}`;
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const respuesta = await clienteAxios.get(url, {
        headers: { Authorization: token },
      });
      // console.log(respuesta);
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
      return [respuesta?.data?.data?.subtema, respuesta?.data?.data?.teorias];
    } catch (error) {
      mensajeError("Inicia sesion", "Necesitas iniciar sesion primero");
      navigate("/login");
      console.log(error.message);
      return [];
    }
  };

  const obtenerJuegos = async () => {
    try {
      const url = `/juego/juegos/creados/${idTema}`;
      const respuesta = await clienteAxios.get(url);
      return [respuesta?.data?.data?.ahorcados];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  useEffect(() => {
    const cambioDeOpcion = () => {};
    cambioDeOpcion();
  }, [opcionUsuario]);

  const handlerEscogerOpcion = (opcion) => {
    opcionUsuarioSet(opcion);
  };

  const eliminarTeoria = async (dato) => {
    try {
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const url = `/teoria/teoria/${dato.url}`;
      const respuesta = await clienteAxios.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log(respuesta?.data?.data);
      Swal.fire("Teoria Eliminada Correctamente");

      // return [respuesta?.data?.data?.ahorcados];
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal al intentar borrar esta teoria",
      });
    }
  };

  const eliminarAhorcado = async (dato) => {
    try {
      const url = `/ahorcado/ahorcado/${dato.url}`;
      const respuesta = await clienteAxios.delete(url);
      console.log(respuesta?.data?.data);
      Swal.fire("Juego Eliminado Correctamente");

      // Swal.fire(dato.url);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal al intentar borrar este juego",
      });
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario
        datos={{ opcionUsuario: 1, tipoUsuario }}
      ></OpcionesUsuario>
      <div className="py-4">
        <h2 className="text-6xl text-center"> {titulo} </h2>
      </div>
      <div className="px-10">
        <h2 className="text-4xl text-left font-bold"> Teoria </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-6">
          {teorias.length >= 1
            ? teorias.map((dato, index) => {
                return (
                  <div className="col-span-1">
                    <ElementoTemario
                      datos={dato}
                      iTipoTema={3}
                      iTipo={3}
                      key={index}
                      funcionalidad={() => {
                        eliminarTeoria(dato);
                      }}
                      funcionalidadEditar={() => {
                        navigate(`/app/teoria/editar/${dato.url}`);
                      }}
                      tipoUsuario={tipoUsuario}
                    ></ElementoTemario>
                  </div>
                );
              })
            : ""}

          {tipoUsuario == "docente" ? (
            <>
              <Link className="px-14 " to={`/app/teoria/${idTema}`}>
                <div className="rounded-full bg-terciario py-4 flex items-center justify-center hover:cursor-pointer">
                  <img src={aniadirNuevoTemaIMG} alt="" />
                </div>
                <h2 className="pb-5 text-center text-xl font-bold">
                  Nueva Teoria
                </h2>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="px-10">
        <h2 className="text-4xl text-left font-bold"> Juegos </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-6">
          {juegos.length >= 1
            ? juegos.map((dato, index) => {
                return (
                  <div className="col-span-1">
                    <ElementoTemario
                      datos={dato}
                      iTipoTema={tipoUsuario == "docente" ? 6 : 5}
                      iTipo={tipoUsuario == "docente" ? 6 : 5}
                      key={index}
                      funcionalidad={() => {
                        eliminarAhorcado(dato);
                      }}
                      funcionalidadEditar={() => {
                        navigate(
                          `/app/juegos/ahorcado/docente/editar/${dato.url}`
                        );
                      }}
                      tipoUsuario={tipoUsuario}
                    ></ElementoTemario>
                  </div>
                );
              })
            : ""}

          {tipoUsuario == "docente" ? (
            <>
              <Link className="px-14 " to={`/app/juegos/${idTema}`}>
                <div className="rounded-full bg-terciario py-4 flex items-center justify-center hover:cursor-pointer">
                  <img src={juegosIMG} alt="" />
                </div>
                <h2 className="pb-5 text-center text-xl font-bold">
                  Nuevo Juego
                </h2>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Subtema;
