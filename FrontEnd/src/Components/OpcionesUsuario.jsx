import React from "react";
import aprenderIMG from "../../public/img/lluvia-de-ideas.png";
import logrosIMG from "../../public/img/insignia.png";
import desafiosIMG from "../../public/img/exito.png";
import tiendaIMG from "../../public/img/tienda.png";
import perfilIMG from "../../public/img/perfil.png";
import { Link } from "react-router-dom";
function OpcionesUsuario({ datos }) {
  const { opcionUsuario } = datos;
  return (
    <>
      <div className="grid grid-cols-5 pt-20 text-center font-bold text-2xl">
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
        <div
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
        </div>
        <div
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
        </div>
        <div
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
        </div>
        <div
          className={`col-span-1 flex items-center justify-center ${
            opcionUsuario == 5 ? "bg-secundario rounded-2xl p-2" : ""
          }`}
        >
          <button
            className="flex items-center justify-center"
            onClick={() => handlerEscogerOpcion(5)}
          >
            <img src={perfilIMG} alt="" />
            <h2 className="px-3">Perfil</h2>
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
