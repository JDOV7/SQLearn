import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import clienteAxios from "../../config/axios";
import "react-quill/dist/quill.snow.css";

import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
function TeoriaContenido() {
  const params = useParams();
  const navigate = useNavigate();
  const { IdTeoria } = params;
  const [NombreTeoria, setNombreTeoria] = useState("");
  const [contenido, setcontenido] = useState("");

  useEffect(() => {
    const obtTeorias = async () => {
      const teoria = await obtenerTeorias();
      //   setTeorias(teorias[1]);
      setNombreTeoria(teoria["NombreTeoria"]);
      setcontenido(teoria["contenido"]);
      // console.log(titulo);
    };
    obtTeorias();
  }, []);

  const obtenerTeorias = async () => {
    try {
      const url = `/teoria/teoria/${IdTeoria}`;
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const respuesta = await clienteAxios.get(url, {
        headers: { Authorization: token },
      });
      // console.log(respuesta);
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
      return respuesta?.data?.data?.teoria;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Necesitas iniciar sesion",
        text: "Inicia sesion",
      });
      navigate("/login");
      console.log(error.message);
      return {};
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario datos={{ opcionUsuario: 1 }}></OpcionesUsuario>
      <div className=" p-10">
        <h1 className="text-center text-4xl font-bold"> {NombreTeoria} </h1>
        <div className="flex items-center">
          <div dangerouslySetInnerHTML={{ __html: contenido }} />
        </div>
      </div>
    </>
  );
}

export default TeoriaContenido;
