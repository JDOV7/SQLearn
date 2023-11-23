import React from "react";
import aprenderIMG from "../../public/img/lluvia-de-ideas.png";
import logrosIMG from "../../public/img/insignia.png";
import desafiosIMG from "../../public/img/exito.png";
import tiendaIMG from "../../public/img/tienda.png";
import perfilIMG from "../../public/img/perfil.png";
import { Link, useNavigate } from "react-router-dom";
import mensajeError from "../Helpers/MensajeError";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
function OpcionesUsuario({ datos }) {
  const navigate = useNavigate();

  const { opcionUsuario, tipoUsuario } = datos;

  const agregarNuevoTemaAlUsuario = async () => {
    try {
      // const { value: sCodigoTema } =
      await Swal.fire({
        title: "Agregar Tema",
        input: "text",
        inputLabel: "Codigo del Tema",
      }).then(async (e) => {
        if (e.isConfirmed) {
          // Swal.fire({ title: e.value });
          const token = window.localStorage.getItem("jwt_SQLearn_token");
          const url = `/temas/tema/jugador`;
          const { data } = await clienteAxios.post(
            url,
            { Codigo: e.value },
            { headers: { Authorization: token } }
          );
          // navigate("/app");
        }
      });

      Swal.fire({
        title: "Agregado Correctamente",
        icon: "success",
        text: "Tema nuevo, ahora puedes estudiarlo",
      }).then(() => {
        window.location.href = "/app";
      });
    } catch (error) {
      console.log(error);
      mensajeError(
        "Error al agregar tema",
        "No se pudo agregar el tema en este momento"
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 pt-20 text-center font-bold text-2xl">
        <Link
          to="/app"
          className={`col-span-1 flex items-center justify-center ${
            opcionUsuario == 1 ? "bg-secundario rounded-2xl p-2" : ""
          }`}
        >
          <button
            onClick={() => {
              handlerEscogerOpcion(1);
            }}
            className="flex items-center justify-center"
          >
            {/* click */}
            <img src={aprenderIMG} alt="" />
            <h2 className="px-3">Aprender</h2>
          </button>
        </Link>
        {/* <div
          className={`col-span-1 flex items-center justify-center ${
            opcionUsuario == 2 ? "bg-secundario rounded-2xl p-2" : ""
          }`}
        >
          <button
            className="flex items-center justify-center"
            onClick={() => handlerEscogerOpcion(2)}
          >
            <img src={logrosIMG} alt="" />
            <h2 className="px-3">Logros</h2>
          </button>
        </div> */}
        {/* <div
          className={`col-span-1 flex items-center justify-center ${
            opcionUsuario == 3 ? "bg-secundario rounded-2xl p-2" : ""
          }`}
        >
          <button
            className="flex items-center justify-center"
            onClick={() => handlerEscogerOpcion(3)}
          >
            <img src={desafiosIMG} alt="" />
            <h2 className="px-3">Desafios</h2>
          </button>
        </div> */}
        {/* <div
          className={`col-span-1 flex items-center justify-center ${
            opcionUsuario == 4 ? "bg-secundario rounded-2xl p-2" : ""
          }`}
        >
          <button
            className="flex items-center justify-center"
            onClick={() => handlerEscogerOpcion(4)}
          >
            <img src={tiendaIMG} alt="" />
            <h2 className="px-3">Tienda</h2>
          </button>
        </div> */}
        <div
          className={`col-span-1 flex items-center justify-center ${
            opcionUsuario == 5 ? "bg-secundario rounded-2xl p-2" : ""
          }`}
        >
          <button
            className="flex items-center justify-center"
            // onClick={() => handlerEscogerOpcion(5)}
          >
            <img src={perfilIMG} alt="" />
            <h2 className="px-3">Opciones</h2>
            <div className="px-3">
              <select
                className="px-3 text-lg"
                onChange={async (e) => {
                  // e.preventDefault();

                  if (e.target.value == "agregar-tema") {
                    await agregarNuevoTemaAlUsuario();
                  } else if (e.target.value == "cerrar-sesion") {
                    window.localStorage.clear();
                    navigate("/login");
                  } else if (e.target.value == "crear-docente") {
                    // Swal.fire("Nuevo Docente");
                    navigate("/app/docente");
                  }
                }}
              >
                <option value="bucharest" selected>
                  --Escoge--
                </option>
                {tipoUsuario == "alumno" ? (
                  <>
                    <option key={1} value="agregar-tema">
                      Agregar Tema
                    </option>
                  </>
                ) : (
                  <></>
                )}

                {tipoUsuario == "docente" ? (
                  <>
                    <option key={2} value="crear-docente">
                      Nuevo Docente
                    </option>
                  </>
                ) : (
                  <></>
                )}

                <option value="cerrar-sesion">Cerrar Sesion</option>
              </select>
            </div>
          </button>
        </div>
      </div>
      <div className="px-10">
        <hr className=" h-px w-full my-8 bg-secundario border-0 dark:bg-secundario " />
      </div>
    </>
  );
}

export default OpcionesUsuario;
