import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";
import ahorcado from "../../public/img/ahorcado.webp";

function AhorcadoForm() {
  //   useEffect(() => {}, [palabras]);

  const [inputs, setInputs] = useState([]);
  const [contenidos, setContenidos] = useState({});

  // Función para agregar un nuevo input
  const agregarInput = () => {
    const nuevoId = Date.now();
    setInputs([...inputs, nuevoId]);
    setContenidos({
      ...contenidos,
      [nuevoId]: {
        palabra: "",
        regla: "",
      },
    });
  };

  // Función para eliminar un input por su ID
  const eliminarInput = (id) => {
    const nuevosInputs = inputs.filter((inputId) => inputId !== id);
    setInputs(nuevosInputs);

    // Eliminar el contenido asociado al input
    const { [id]: omitido, ...nuevosContenidos } = contenidos;
    setContenidos(nuevosContenidos);
  };

  // Función para manejar cambios en el contenido del input
  const manejarCambioContenido = (id, valor) => {
    setContenidos({ ...contenidos, [id]: valor });
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario datos={{ opcionUsuario: 1 }}></OpcionesUsuario>
      <div className="py-4">
        <h1 className="text-center text-6xl">
          Llena los datos para el Ahorcado
        </h1>
      </div>

      <div className=" grid grid-cols-3  py-2 px-10">
        <div className="grid col-span-1 px-64">
          <h1 className="text-justify text-xl font-bold p-5">Titulo</h1>
        </div>
        <div className="grid col-span-2">
          <input
            type="text"
            className="bg-cuarto rounded-lg w-full font-bold p-4"
          />
        </div>
      </div>

      <div className=" grid grid-cols-3  py-2 px-10">
        <div className="grid col-span-1 px-64">
          <h1 className=" text-justify text-xl font-bold p-5">Descripcion</h1>
        </div>
        <div className="grid col-span-2">
          <textarea className="bg-cuarto rounded-lg w-full font-bold p-4"></textarea>
        </div>
      </div>

      <div className="grid grid-cols-3 p-5">
        <div className="grid col-span-2 ">
          <div>
            {/* Botón para agregar un nuevo input */}
            <button
              onClick={agregarInput}
              className="rounded-full bg-principal text-white font-extrabold py-3 flex items-center justify-center hover:cursor-pointer px-4"
            >
              Agregar Palabra
            </button>

            {/* Renderizar los inputs y botones de eliminación */}
            {inputs.map((inputId) => (
              <div key={inputId} className="py-4 grid grid-cols-3 gap-3">
                {/* Input */}
                <div className="grid col-span-1">
                  <input
                    type="text"
                    placeholder="Ingrese Palabra"
                    className="p-2 rounded-2xl bg-cuarto font-extrabold "
                    value={contenidos[inputId].palabra}
                    onChange={(e) =>
                      manejarCambioContenido(inputId, {
                        palabra: e.target.value,
                        regla: contenidos[inputId].regla,
                      })
                    }
                  />
                </div>

                <div className="grid col-span-1">
                  <textarea
                    type="text"
                    placeholder="Ingrese una descripcion"
                    className="p-2 rounded-2xl bg-cuarto font-extrabold "
                    value={contenidos[inputId].regla}
                    onChange={(e) =>
                      manejarCambioContenido(inputId, {
                        palabra: contenidos[inputId].palabra,
                        regla: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Botón de eliminación asociado al input */}
                <div className="col-span-1">
                  <button
                    onClick={() => eliminarInput(inputId)}
                    className="rounded-full bg-secundario text-white font-extrabold p-2 hover:cursor-pointer  "
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            {/* Mostrar el contenido de los inputs no borrados */}
            {/* <div>
              <h2>Contenido de Inputs No Borrados</h2>
              {Object.entries(contenidos).map(([id, contenido]) => (
                <p key={id}>{`Input ${id}: ${JSON.stringify(contenido)}`}</p>
              ))}
            </div> */}
          </div>
        </div>

        <div className=" grid col-span-1 ">
          <div className="flex items-center justify-center">
            <img src={ahorcado} alt="" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-5">
        <button
          // onClick={agregarInput}
          className="rounded-full bg-principal text-white font-extrabold py-3 flex items-center justify-center hover:cursor-pointer px-4"
        >
          Guardar Juego
        </button>
      </div>
    </>
  );
}

export default AhorcadoForm;
