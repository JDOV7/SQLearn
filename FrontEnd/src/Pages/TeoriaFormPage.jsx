import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";

function TeoriaPage() {
  const params = useParams();
  const { idTema } = params;

  const [value, setValue] = useState("");

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario  datos={{ opcionUsuario: 1 }}></OpcionesUsuario>
      <div className="py-4">
        <h1 className="text-6xl text-center"> Hola mundo: {idTema}</h1>
      </div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </>
  );
}

export default TeoriaPage;
