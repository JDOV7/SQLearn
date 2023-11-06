import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import ElementoTemario from "../Components/ElementoTemario";

import aniadirNuevoTemaIMG from "../../public/img/anadir.png";
import juegosIMG from "../../public/img/rompecabezas.png";

function Subtema() {
  const params = useParams();
  const { idTema } = params;
  const [opcionUsuario, opcionUsuarioSet] = useState(1);
  const [valor, setValor] = useState(0);
  const [teorias, setTeorias] = useState([]);
  const [juegos, setjuegos] = useState([]);
  const [titulo, setTitulo] = useState("");

  useEffect(() => {
    const obtTeorias = async () => {
      const teorias = await obtenerTeorias();
      setTeorias(teorias[1]);
      setTitulo(teorias[0]["NombreSubTema"]);
      // console.log(titulo);
    };
    obtTeorias();
  }, [teorias]);

  useEffect(() => {
    const obtJuegos = async () => {
      const juegos = await obtenerJuegos();
      setjuegos(juegos[0]);
      console.log(juegos);
    };
    obtJuegos();
  }, [juegos]);

  const obtenerTeorias = async () => {
    try {
      const url = `/sub-temas/subtema/${idTema}`;
      const respuesta = await clienteAxios.get(url);
      // console.log(respuesta);
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
      return [respuesta?.data?.data?.subtema, respuesta?.data?.data?.teorias];
    } catch (error) {
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

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario datos={{ opcionUsuario: 1 }}></OpcionesUsuario>
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
                    ></ElementoTemario>
                  </div>
                );
              })
            : ""}

          <Link className="px-14 " to={`/app/teoria/${idTema}`}>
            <div className="rounded-full bg-terciario py-4 flex items-center justify-center hover:cursor-pointer">
              <img src={aniadirNuevoTemaIMG} alt="" />
            </div>
            <h2 className="pb-5 text-center text-xl font-bold">Nueva Teoria</h2>
          </Link>
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
                      iTipoTema={5}
                      iTipo={5}
                      key={index}
                    ></ElementoTemario>
                  </div>
                );
              })
            : ""}

          <Link className="px-14 " to={`/app/juegos/${idTema}`}>
            <div className="rounded-full bg-terciario py-4 flex items-center justify-center hover:cursor-pointer">
              <img src={juegosIMG} alt="" />
            </div>
            <h2 className="pb-5 text-center text-xl font-bold">Nuevo Juego</h2>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Subtema;
