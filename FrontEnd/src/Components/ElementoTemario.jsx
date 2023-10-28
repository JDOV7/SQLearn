import React, { useState } from "react";
import PantallaTema from "../Pages/PantallaTemaPage";
import { Link } from "react-router-dom";

function ElementoTemario({ datos, iTipoTema, iTipo }) {
  const { imagen, titulo } = datos;
  // console.log(esTema);
  // const [click, setClick] = useState(false);
  let sColorFondo = "",
    sURL;
  switch (iTipo) {
    case 1:
      sColorFondo = "bg-principal";
      break;
    case 2:
      sColorFondo = "bg-secundario";
      break;
    case 3:
      sColorFondo = "bg-terciario";
      break;
    case 4:
      sColorFondo = "bg-cuarto";
      break;
    default:
      break;
  }

  switch (iTipoTema) {
    case 1:
      sURL = `/app/tema/${titulo}`;
      break;
    case 2:
      sURL = `/app/subtema/${titulo}`;
      break;
    case 3:
      sURL = `/app/teoria/${titulo}`;
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
        <div className="px-14">
          <Link
            to={sURL}
            className={`rounded-full ${sColorFondo} py-4 flex items-center justify-center hover:cursor-pointer`}
          >
            <img src={imagen} alt="" />
          </Link>
          <h1 className="pt-5 text-center text-xl font-bold">{titulo}</h1>
        </div>
      </div>
    </>
  );
}

export default ElementoTemario;
