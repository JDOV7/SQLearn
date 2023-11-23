import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import ElementoTemario from "../Components/ElementoTemario";

import aniadirNuevoTemaIMG from "../../public/img/anadir.png";
import mensajeError from "../Helpers/MensajeError";
import mensajeCorrecto from "../Helpers/MensajeCorrecto";

function PantallaTema() {
  const navigate = useNavigate();
  //   se busca la info relacionada del tema
  const datos = [];
  const params = useParams();
  const { idTema } = params;
  const [opcionUsuario, opcionUsuarioSet] = useState(1);
  const [valor, setValor] = useState(0);
  const [subTemas, setSubTemas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [codigo, setCodigo] = useState("");

  const [tipoUsuario, setTipoUsuario] = useState("");

  useEffect(() => {
    const iniciarSesion = async () => {
      await verificarSesion();
    };
    iniciarSesion();
  }, []);

  useEffect(() => {
    const obtSubtemas = async () => {
      const subtemas = await obtenerSubtemas();
      setSubTemas(subtemas[1]);
      setTitulo(subtemas[0]["NombreTema"]);
      setCodigo(subtemas[0]["Codigo"]);
      // console.log(titulo);
    };
    obtSubtemas();
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

  const obtenerSubtemas = async () => {
    try {
      const url = `/temas/tema/${idTema}`;
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const respuesta = await clienteAxios.get(url, {
        headers: { Authorization: token },
      });
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
      return [respuesta?.data?.data?.tema, respuesta?.data?.data?.subtemas];
    } catch (error) {
      mensajeError("Inicia sesion", "Necesitas iniciar sesion primero");
      navigate("/login");
      console.log(error.message);
      return [];
    }
  };

  const crearNuevoSubTema = async (NombreSubTema) => {
    try {
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const url = `/sub-temas/subtema`;
      const respuesta = await clienteAxios.post(
        url,
        {
          NombreSubTema,
          IdTema: idTema,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      // console.log(respuesta?.data?.data?.subtema);
      // setDatos([]);
      // navigate(`/app/tema/${idTema}`);
      // window.location.href = `/app/tema/${idTema}`;
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const eliminarSubtema = async (dato) => {
    try {
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const url = `/sub-temas/subtema/${dato.url}`;
      const respuesta = await clienteAxios.delete(url, {
        headers: {
          Authorization: token,
        },
      });
      console.log(respuesta?.data?.data);
      Swal.fire("Subtema Eliminado Correctamente").then(() => {
        window.location.href = `/app/tema/${idTema}`;
      });

      // return [respuesta?.data?.data?.ahorcados];
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal al intentar borrar el subtema",
      });
    }
  };

  const editarSubTema = async (dato) => {
    try {
      await Swal.fire({
        title: "Editar Nombre SubTema",
        text: "Escribe el nuevo nombre para este subtema",
        input: "text",
      }).then(async (e) => {
        if (e.isConfirmed) {
          const token = window.localStorage.getItem("jwt_SQLearn_token");
          const url = `/sub-temas/subtema/${dato.url}`;
          const respuesta = await clienteAxios.put(
            url,
            { NombreSubTema: e.value },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log(respuesta?.data?.data);

          Swal.fire({
            title: "Editado correctamente",
            text: "El subtema se edito satisfactoriamente",
            icon: "success",
          }).then(() => {
            window.location.href = `/app/tema/${idTema}`;
          });
        }
      });

      // navigate(`/app/tema/${idTema}`);

      // console.log(dato);
    } catch (error) {
      mensajeError(
        "Error al editar el subtema",
        "No se pudo editar el subtema, intentalo mas tarde"
      );
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario
        datos={{ opcionUsuario: 1, tipoUsuario }}
      ></OpcionesUsuario>
      <div className="hidden">
        <h2>{valor}</h2>
      </div>

      {tipoUsuario == "docente" ? (
        <>
          <div className="p-5 grid grid-cols-4">
            <div className="col-span-1 bg-terciario rounded-xl shadow-2xl flex justify-center items-center">
              <div>
                <h2 className="text-xl text-left font-semibold ">
                  Codigo de acceso: {codigo}{" "}
                </h2>
              </div>
            </div>
            <div className=" col-span-3">
              <h2 className="text-6xl text-center"> {titulo} </h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2 className="text-6xl text-center"> {titulo} </h2>
          </div>
        </>
      )}

      <div className="p-6">
        <div className="grid grid-cols-6">
          {subTemas.length >= 1
            ? subTemas.map((dato, index) => {
                return (
                  <div className="col-span-1" key={index}>
                    <ElementoTemario
                      datos={dato}
                      iTipoTema={2}
                      iTipo={2}
                      key={new Date() + index}
                      funcionalidad={() => {
                        eliminarSubtema(dato);
                      }}
                      tipoUsuario={tipoUsuario}
                      funcionalidadEditar={() => {
                        editarSubTema(dato);
                      }}
                    ></ElementoTemario>
                  </div>
                );
              })
            : ""}

          {tipoUsuario == "docente" ? (
            <>
              <div className="px-14 ">
                <div
                  className="rounded-full bg-terciario py-4 flex items-center justify-center hover:cursor-pointer"
                  onClick={async () => {
                    console.log("agregando nuevo elemento");

                    const { value: sNombreTema } = await Swal.fire({
                      title: "Titulo Del Nuevo Sub Tema",
                      input: "text",
                      inputLabel: "Sub Tema",
                      showCancelButton: true,
                      inputValidator: (value) => {
                        if (!value) {
                          return "Algo salio mal";
                        }
                      },
                    });

                    const estaCreadoElSubTema = await crearNuevoSubTema(
                      sNombreTema
                    );

                    if (!estaCreadoElSubTema) {
                      return;
                    }

                    if (sNombreTema) {
                      Swal.fire(`Nombre del sub tema: ${sNombreTema}`).then(
                        () => {
                          window.location.href = `/app/tema/${idTema}`;
                        }
                      );
                      const datosLocal = subTemas;
                      datosLocal.push({
                        imagen: introduccionIMG,
                        titulo: sNombreTema,
                        haciaAbajo: true,
                      });
                      setSubTemas([]);
                      setValor(valor + 1);
                    }
                  }}
                >
                  <img src={aniadirNuevoTemaIMG} alt="" />
                </div>
                <h2 className="pb-5 text-center text-xl font-bold">
                  Nuevo Sub Tema
                </h2>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default PantallaTema;
