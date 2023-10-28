import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import ElementoTemario from "../Components/ElementoTemario";

import introduccionIMG from "../../public/img/bombilla.png";
import aniadirNuevoTemaIMG from "../../public/img/anadir.png";

function Subtema() {
  const datos = [
    { imagen: introduccionIMG, titulo: "¿Que es? " },
    { imagen: introduccionIMG, titulo: "¿Para que sirve? " },
    {
      imagen: introduccionIMG,
      titulo: "Sintaxis",
    },
    {
      imagen: introduccionIMG,
      titulo: "Ejemplos",
    },
  ];

  const params = useParams();
  const { idTema } = params;
  const [opcionUsuario, opcionUsuarioSet] = useState(1);
  const [valor, setValor] = useState(0);
  const [teoria, setTeoria] = useState(datos);

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
      <div className="py-4">
        <h1 className="text-6xl text-center"> {idTema} </h1>
      </div>
      <div className="px-10">
        <h1 className="text-4xl text-left font-bold"> Teoria </h1>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-6">
          {teoria.map((dato, index) => {
            return (
              <div className="col-span-1">
                <ElementoTemario
                  datos={dato}
                  iTipoTema={3}
                  iTipo={3}
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

                if (sNombreTema) {
                  Swal.fire(`Nombre del sub tema: ${sNombreTema}`);
                  const datosLocal = teoria;
                  datosLocal.push({
                    imagen: introduccionIMG,
                    titulo: sNombreTema,
                    haciaAbajo: true,
                  });
                  setTeoria(datosLocal);
                  setValor(valor + 1);
                }
              }}
            >
              <img src={aniadirNuevoTemaIMG} alt="" />
            </div>
            <h1 className="pb-5 text-center text-xl font-bold">
              Nuevo Sub Tema
            </h1>
          </div>
        </div>
      </div>

      <div className="px-10">
        <h1 className="text-4xl text-left font-bold"> Juegos </h1>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-6">
          {datos.map((dato, index) => {
            return (
              <div className="col-span-1">
                <ElementoTemario
                  datos={dato}
                  iTipoTema={3}
                  iTipo={3}
                  key={index}
                ></ElementoTemario>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Subtema;
