import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ElementoTemario from "../Components/ElementoTemario";
import datosT from "../../Datos/Temas";
import clienteAxios from "../../config/axios";
import aniadirNuevoTemaIMG from "../../public/img/anadir.png";
// import EstructuraDeUnaBDIMG from "../../public/img/organizado.png";

function AprenderPage() {
  const [valor, setValor] = useState(0);
  const [datos, setDatos] = useState([]);
  // const esTema = true;
  useEffect(() => {
    const obtDatos = async () => {
      const temas = await obtenerTemas();
      setDatos(temas);
    };
    obtDatos();
  }, [datos]);

  // useEffect(async () => {
  //   const temas = await obtenerTemas();
  //   setDatos(temas);
  // }, []);

  const obtenerTemas = async () => {
    try {
      const url = `/temas/temas`;
      const respuesta = await clienteAxios.get(url);
      // console.log(respuesta?.data?.data?.temas);
      // setDatos(respuesta.data.data.temas);
      return respuesta?.data?.data?.temas;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  };

  const crearNuevoTema = async (NombreTema) => {
    try {
      const url = `/temas/tema`;
      const respuesta = await clienteAxios.post(url, { NombreTema });
      console.log(respuesta?.data?.data?.crearTema);
      setDatos(respuesta.data.data.crearTema);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <>
      <div className="py-4">
        <h2 className="text-6xl text-center"> Temas </h2>
      </div>
      <div className="p-6">
        <div className="hidden">
          <h2>{valor}</h2>
        </div>
        <div className="grid grid-cols-6">
          {datos.length >= 1
            ? datos.map((dato, index) => {
                return (
                  <div className="col-span-1">
                    <ElementoTemario
                      datos={dato}
                      iTipoTema={1}
                      iTipo={1}
                      key={dato.IdTema}
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
                  title: "Titulo Del Nuevo Tema",
                  input: "text",
                  inputLabel: "Tema",
                  showCancelButton: true,
                  inputValidator: (value) => {
                    if (!value) {
                      return "Algo salio mal";
                    }
                  },
                });

                const estaCreadoElTema = await crearNuevoTema(sNombreTema);

                if (!estaCreadoElTema) {
                  return;
                }

                if (sNombreTema) {
                  Swal.fire(`Nombre del tema: ${sNombreTema}`);
                  const datosLocal = datos;
                  datosLocal.push({
                    imagen: EstructuraDeUnaBDIMG,
                    titulo: sNombreTema,
                    haciaAbajo: true,
                  });
                  // const temas = await obtenerTemas();
                  setDatos([]);
                  setValor(valor + 1);
                }
              }}
            >
              <img src={aniadirNuevoTemaIMG} alt="" />
            </div>
            <h2 className="pb-5 text-center text-xl font-bold">Nuevo Tema</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default AprenderPage;
