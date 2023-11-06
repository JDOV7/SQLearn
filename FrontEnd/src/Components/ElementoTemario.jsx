import React, { useState } from "react";
import PantallaTema from "../Pages/PantallaTemaPage";
import { Link } from "react-router-dom";
import EstructuraDeUnaBDIMG from "../../public/img/organizado.png";
import introduccionIMG from "../../public/img/bombilla.png";
import teoriaIMG from "../../public/img/bombilla.png";
import videojuegoIMG from "../../public/img/videojuego.png";
function ElementoTemario({ datos, iTipoTema, iTipo, funcionalidad }) {
  const { titulo, url } = datos;
  // console.log(esTema);
  // const [click, setClick] = useState(false);
  let sColorFondo = "";
  let imagen = "";
  let sURL;
  switch (iTipo) {
    case 1:
      sColorFondo = "bg-principal";
      imagen = EstructuraDeUnaBDIMG;
      break;
    case 2:
      sColorFondo = "bg-secundario";
      imagen = introduccionIMG;
      break;
    case 3:
      sColorFondo = "bg-terciario";
      imagen = teoriaIMG;
      break;
    case 4:
      sColorFondo = "bg-cuarto";
      break;
    case 5:
      sColorFondo = "bg-terciario";
      imagen = videojuegoIMG;
      break;
    default:
      break;
  }

  switch (iTipoTema) {
    case 1:
      sURL = `/app/tema/${url}`;
      break;
    case 2:
      sURL = `/app/subtema/${url}`;
      break;
    case 3:
      sURL = `/app/teoria/contenido/${url}`;
      break;
    case 5:
      sURL = `/app/teoria/contenido/${url}`;
      break;
    default:
      break;
  }

  // const mostrarPantalla = () => {
  //   console.log(titulo);
  //   return <PantallaTema datos={titulo}></PantallaTema>;
  // };

  return (
    <>
      <div>
        <div className="px-14 ">
          <div
            className="shadow-2xl rounded-full bg-red flex items-center justify-center hover:cursor-pointer"
            onClick={() => {
              funcionalidad();
            }}
          >
            <h2 className="shadow-2xl font-extrabold text-black">Eliminar</h2>
          </div>
          <Link
            to={sURL}
            className={`rounded-full ${sColorFondo} py-4 flex items-center justify-center hover:cursor-pointer`}
          >
            <img src={imagen} alt="" />
          </Link>
          <div className="shadow-2xl rounded-full bg-green flex items-center justify-center hover:cursor-pointer">
            <h2 className="font-extrabold text-black">Editar</h2>
          </div>
          <h2 className="pt-5 text-center text-xl font-bold">{titulo}</h2>
        </div>
      </div>
    </>
  );
}

export default ElementoTemario;
