import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import ElementoTemario from "../Components/ElementoTemario";

import aniadirNuevoTemaIMG from "../../public/img/anadir.png";

function PantallaTema() {
  //   se busca la info relacionada del tema
  const datos = [];
  const params = useParams();
  const { idTema } = params;
  const [opcionUsuario, opcionUsuarioSet] = useState(1);
  const [valor, setValor] = useState(0);
  const [subTemas, setSubTemas] = useState([]);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    const obtSubtemas = async () => {
      const subtemas = await obtenerSubtemas();
      setSubTemas(subtemas[1]);
      setTitulo(subtemas[0]["NombreTema"]);
      // console.log(titulo);
    };
    obtSubtemas();
  }, [subTemas]);

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
      const respuesta = await clienteAxios.get(url);
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
      return [respuesta?.data?.data?.tema, respuesta?.data?.data?.subtemas];
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const crearNuevoSubTema = async (NombreSubTema) => {
    try {
      const url = `/sub-temas/subtema`;
      const respuesta = await clienteAxios.post(url, {
        NombreSubTema,
        IdTema: idTema,
      });
      // console.log(respuesta?.data?.data?.subtema);
      setDatos([]);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const eliminarSubtema = async (dato) => {
    try {
      const url = `/sub-temas/subtema/${dato.url}`;
      const respuesta = await clienteAxios.delete(url);
      console.log(respuesta?.data?.data);
      Swal.fire("Subtema Eliminado Correctamente");

      // return [respuesta?.data?.data?.ahorcados];
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo salio mal al intentar borrar el subtema",
      });
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario datos={{ opcionUsuario: 1 }}></OpcionesUsuario>
      <div className="hidden">
        <h2>{valor}</h2>
      </div>
      <div className="py-4">
        <h2 className="text-6xl text-center"> {titulo} </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-6">
          {subTemas.length >= 1
            ? subTemas.map((dato, index) => {
                return (
                  <div className="col-span-1">
                    <ElementoTemario
                      datos={dato}
                      iTipoTema={2}
                      iTipo={2}
                      key={new Date() + index}
                      funcionalidad={() => {
                        eliminarSubtema(dato);
                      }}
                    ></ElementoTemario>
                  </div>
                );
              })
            : ""}

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
                  Swal.fire(`Nombre del sub tema: ${sNombreTema}`);
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
        </div>
      </div>
    </>
  );
}

export default PantallaTema;
