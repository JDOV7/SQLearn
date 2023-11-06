import React from "react";
import { useParams, Link } from "react-router-dom";

function JuegoCard({ datos }) {
  const { titulo, img, IdJuego, IdSubTema } = datos;
  console.log(datos);

  const generarURL = () => {
    let urlGenerada = "";
    switch (titulo) {
      case "Ahorcado":
        urlGenerada = `/app/juegos/ahorcado/${IdSubTema}/${IdJuego}`;
        break;
      default:
        break;
    }
    return urlGenerada;
  };

  return (
    <>
      <div className="p-3 bg-cuarto rounded-2xl shadow-2xl">
        <div className="py-2">
          <h1 className="text-center text-3xl font-extrabold">{titulo}</h1>
        </div>
        <div className="flex items-center justify-center py-2">
          <img src={img} alt="" />
        </div>
        <div>
          <h1 className="text-base">{IdJuego}</h1>
          <h1 className="text-base"> {IdSubTema}</h1>
        </div>
        <div className="p-6">
          <Link
            to={generarURL()}
            className={`rounded-full bg-principal text-white font-extrabold py-4 flex items-center justify-center hover:cursor-pointer`}
          >
            Crear Juego
          </Link>
        </div>
      </div>
    </>
  );
}

export default JuegoCard;
