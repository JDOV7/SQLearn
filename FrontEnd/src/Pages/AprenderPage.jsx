import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ElementoTemario from "../Components/ElementoTemario";
import datosT from "../../Datos/Temas";
import aniadirNuevoTemaIMG from "../../public/img/anadir.png";
import EstructuraDeUnaBDIMG from "../../public/img/organizado.png";

function AprenderPage() {
  const [valor, setValor] = useState(0);
  const [datos, setDatos] = useState(datosT);
  // const esTema = true;
  // useEffect(() => {
  //   const dibujarTemas = () => {};
  //   dibujarTemas();
  // }, [datos]);

  return (
    <>
      <div className="py-4">
        <h1 className="text-6xl text-center"> Temas </h1>
      </div>
      <div className="p-6">
        <div className="hidden">
          <h1>{valor}</h1>
        </div>
        <div className="grid grid-cols-6">
          {datos.map((dato, index) => {
            return (
              <div className="col-span-1">
                <ElementoTemario
                  datos={dato}
                  iTipoTema={1}
                  iTipo={1}
                  key={index}
                ></ElementoTemario>
              </div>
            );
          })}
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

                if (sNombreTema) {
                  Swal.fire(`Nombre del tema: ${sNombreTema}`);
                  const datosLocal = datos;
                  datosLocal.push({
                    imagen: EstructuraDeUnaBDIMG,
                    titulo: sNombreTema,
                    haciaAbajo: true,
                  });
                  setDatos(datosLocal);
                  setValor(valor + 1);
                }
              }}
            >
              <img src={aniadirNuevoTemaIMG} alt="" />
            </div>
            <h1 className="pb-5 text-center text-xl font-bold">Nuevo Tema</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default AprenderPage;
