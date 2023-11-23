import React, { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import mensajeError from "../Helpers/MensajeError";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import Swal from "sweetalert2";

function EditarTeoria() {
  const navigate = useNavigate();
  const params = useParams();
  const { IdTeoria } = params;
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [teoria, setTeoria] = useState({});

  useEffect(() => {
    const iniciarSesion = async () => {
      await verificarSesion();
    };
    iniciarSesion();
  }, []);

  useEffect(() => {
    const obtTeoria = async () => {
      const teoriaRes = await obtenerTeoria();
      //   setTeorias(teorias[1]);
      console.log(teoriaRes);
      setTeoria(teoriaRes);
      // console.log(titulo);
    };
    obtTeoria();
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

  const obtenerTeoria = async () => {
    try {
      const url = `/teoria/teoria/editar/${IdTeoria}`;
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const respuesta = await clienteAxios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      //   console.log(respuesta);
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
      return respuesta?.data?.data?.teoria;
    } catch (error) {
      mensajeError("Inicia sesion", "Necesitas iniciar sesion primero");
      navigate("/login");
    }
  };

  const actualizarTeoria = async () => {
    try {
      const url = `/teoria/teoria/editar/${IdTeoria}`;
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const { data } = await clienteAxios.put(
        url,
        {
          NombreTeoria: teoria.NombreTeoria,
          contenido: teoria.contenido,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      Swal.fire({
        title: "Editado Correctamente",
        text: "La Teoria se edito de buena forma",
        icon: "success",
      }).then(() => {
        window.location.href = `/app/teoria/editar/${IdTeoria}`;
      });

      //   console.log(respuesta);
      // console.log(respuesta?.data?.data?.subtemas);
      // setDatos(respuesta.data.data.crearTema);
    } catch (error) {
      mensajeError("No se pudo editar", "Error al editar, intenta mas tarde");
      window.location.href = `/app/teoria/editar/${IdTeoria}`;
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
      <OpcionesUsuario
        datos={{ opcionUsuario: 1, tipoUsuario }}
      ></OpcionesUsuario>
      <div className="py-4 px-52">
        <div className="flex justify-center items-center">
          <label htmlFor="titulo" className="text-2xl p-4">
            Titulo
          </label>
          <input
            type="text"
            className="bg-cuarto text-lg rounded-xl p-2 w-full"
            id="titulo"
            value={teoria.NombreTeoria}
            onChange={(evento) => {
              // setNombreTeoria(evento.target.value);
              setTeoria({
                ...teoria,
                NombreTeoria: evento.target.value,
              });
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
              value={teoria.contenido}
              onChange={(evento) => {
                // setNombreTeoria(evento.target.value);
                setTeoria({
                  ...teoria,
                  contenido: evento,
                });
              }}
            />
          </div>
        </div>
        <div className="col-span-1">
          <h1 className="text-3xl text-center font-bold">
            Previsualizador De Contenido Teorico
          </h1>
          <div className="flex justify-center items-center">
            <div dangerouslySetInnerHTML={{ __html: teoria.contenido }} />
          </div>
        </div>
      </div>
      <div className="pt-8 text-center">
        <button
          className="bg-principal uppercase text-center py-3 text-white rounded-2xl font-bold hover:bg-terciario px-8"
          onClick={(e) => {
            e.preventDefault();
            actualizarTeoria();
          }}
        >
          Guardar Cambios
        </button>
      </div>
    </>
  );
}

export default EditarTeoria;
