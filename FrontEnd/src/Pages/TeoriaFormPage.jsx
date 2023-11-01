import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import clienteAxios from "../../config/axios";
import "react-quill/dist/quill.snow.css";

import Swal from "sweetalert2";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";

function TeoriaPage() {
  const navigate = useNavigate();

  const params = useParams();
  const { IdSubTema } = params;

  const [value, setValue] = useState("");
  const [NombreTeoria, setNombreTeoria] = useState(" ");

  const crearNuevaTeoria = async (e) => {
    e.preventDefault();
    try {
      const url = `/teoria/teoria`;
      console.log(IdSubTema);
      console.log(NombreTeoria);
      console.log(value);
      const respuesta = await clienteAxios.post(url, {
        IdSubTema,
        NombreTeoria,
        contenido: value,
      });
      console.log(respuesta?.data?.data?.teoria);
      Swal.fire("Guardada Correctamente");
      navigate(`/app/subtema/${IdSubTema}`);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario datos={{ opcionUsuario: 1 }}></OpcionesUsuario>
      <div className="py-4 px-52">
        <div className="flex justify-center items-center">
          <label htmlFor="titulo" className="text-2xl p-4">
            Titulo
          </label>
          <input
            type="text"
            className="bg-cuarto text-lg rounded-xl p-2 w-full"
            id="titulo"
            value={NombreTeoria}
            onChange={(evento) => {
              setNombreTeoria(evento.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 py-10">
        <div className="col-span-1">
          <div className="flex justify-center items-center">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="text-3xl text-center font-bold">
            Previsualizador De Contenido Teorico
          </h1>
          <div className="flex justify-center items-center">
            <div dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        </div>
      </div>
      <div className="pt-8 text-center">
        <button
          className="bg-principal uppercase text-center py-3 text-white rounded-2xl font-bold hover:bg-terciario px-8"
          onClick={(e) => {
            crearNuevaTeoria(e);
          }}
        >
          Guardar
        </button>
      </div>
    </>
  );
}

export default TeoriaPage;
