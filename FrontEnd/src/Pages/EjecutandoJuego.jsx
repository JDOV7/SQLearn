import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";

import vacio from "../../public/img/Ahorcado/vacio.png";
import cabeza from "../../public/img/Ahorcado/cabeza.png";
import tronco from "../../public/img/Ahorcado/tronco.png";
import pierna1 from "../../public/img/Ahorcado/pierna1.png";
import pierna2 from "../../public/img/Ahorcado/pierna2.png";
import brazo1 from "../../public/img/Ahorcado/brazo1.png";
import brazo2 from "../../public/img/Ahorcado/brazo2.png";
import duda from "../../public/img/pregunta.png";
import mensajeError from "../Helpers/MensajeError";

function EjecutandoJuego() {
  const params = useParams();
  const navigate = useNavigate();
  const { IdAhorcado } = params;
  const [juego, setjuego] = useState({});
  const [intentos, setintentos] = useState(0);
  const [intentosVidas, setintentosVidas] = useState(5);
  const [palabra, setpalabra] = useState("");
  const [regla, setregla] = useState("");
  const [letrasRespuesta, setletrasRespuesta] = useState("");
  const [palabraAux, setpalabraAux] = useState([]);
  const [horaInicio, sethoraInicio] = useState(new Date());
  const [palabrasPorNivel, setPalabrasPorNivel] = useState(0);
  const [palabrasPorNivelTotal, setPalabrasPorNivelTotal] = useState(0);
  // const
  const [tipoUsuario, setTipoUsuario] = useState("");
  useEffect(() => {
    const iniciarSesion = async () => {
      await verificarSesion();
    };
    iniciarSesion();
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
      if (data.data.tipo != "alumno") {
        throw new Erro("");
      }
    } catch (error) {
      mensajeError("Inicia sesion", "Necesitas iniciar sesion primero");
      navigate("/login");
    }
  };

  const obtenerJuego = async () => {
    try {
      // throw new Error();
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const url = `/ahorcado/ahorcado/${IdAhorcado}`;
      const respuesta = await clienteAxios.get(url, {
        headers: { Authorization: token },
      });
      setjuego(respuesta?.data?.data?.ahorcado);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo abrir el juego",
      });
      navigate(`/app`);
    }
  };

  const guardarPartida = async () => {
    try {
      const url = `/partidas/partida`;
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const tiempo = obtenerTiempoTrascurrido();
      const partida = {
        IdAhorcado,
        tiempo,
        fecha: new Date(),
        errores: intentos,
      };
      console.log(partida);

      const { data } = await clienteAxios.post(url, partida, {
        headers: { Authorization: token },
      });

      console.log(data);
    } catch (error) {
      Swal.fire({
        title: "Error al guardar la partida",
        icon: "error",
      });
      navigate(`/app`);
    }
  };

  useEffect(() => {
    const obtJuego = async () => {
      console.log("ejecutando juego..........");
      await obtenerJuego();
    };
    obtJuego();
  }, []);

  useEffect(() => {
    const evaluadorProgresoNivel = async () => {
      console.log(palabrasPorNivel + " : " + palabrasPorNivelTotal);
      if (palabrasPorNivel == palabrasPorNivelTotal - 1) {
        guardarPartida();
        const tiempo = obtenerTiempoTrascurrido();
        Swal.fire({
          title: "Juego Terminado!",
          text: `Terminado en ${tiempo}`,
          icon: "success",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: "Continuar",
        }).then((result) => {
          navigate(`/app/subtema/${juego.IdSubTema}`);
        });
      } else {
        setpalabra(juego.palabras.split("*|*")[palabrasPorNivel]);
      }
    };
    evaluadorProgresoNivel();
  }, [palabrasPorNivel]);

  useEffect(() => {
    if (juego && juego.palabras) {
      // window.alert(juego.palabras.split("*|*")[0]);
      setpalabra(juego.palabras.split("*|*")[0]);
      setregla(juego.reglas.split("*|*")[0]);
      setPalabrasPorNivelTotal(juego.palabras.split("*|*").length);
    }
  }, [juego]);

  useEffect(() => {
    const guardarPartidaU = async () => {
      if (intentos == 6) {
        await guardarPartida();
      }
    };
    guardarPartidaU();
  }, [intentos]);

  const probar = () => {
    const partesAhorcado = [
      vacio,
      cabeza,
      tronco,
      pierna1,
      pierna2,
      brazo1,
      brazo2,
    ];
    return partesAhorcado[intentos];
  };

  const obtenerTiempoTrascurrido = () => {
    // Coloca la hora de inicio aquí
    const horaFin = new Date(); // Utiliza new Date() para obtener la hora actual

    // Calcular la diferencia en milisegundos
    const diferenciaEnMilisegundos = horaFin - horaInicio;

    // Calcular minutos y segundos
    const minutos = Math.floor(diferenciaEnMilisegundos / (1000 * 60));
    const segundos = Math.floor(
      (diferenciaEnMilisegundos % (1000 * 60)) / 1000
    );

    return `${minutos}:${segundos}`;
  };

  const probarLetra = async (letra) => {
    // obtenerTiempoTrascurrido();
    if (palabra.toLocaleLowerCase().indexOf(letra.toLocaleLowerCase()) != -1) {
      const posiciones = palabra
        .toLocaleLowerCase()
        .split("")
        .map((valor, index) => {
          if (valor == letra.toLocaleLowerCase() || valor == " ") {
            return index;
          }
        })
        .filter((val) => val != undefined);
      const valoresConocidos = [...palabraAux, ...posiciones];
      const valoresFiltrados = [];
      valoresConocidos.forEach((val) => {
        if (!valoresFiltrados.includes(val)) {
          valoresFiltrados.push(val);
        }
      });

      // setValores.keys();
      setpalabraAux(valoresFiltrados);
      setpalabra(palabra);
      setletrasRespuesta("");
      if (valoresFiltrados.length == palabra.length) {
        setpalabraAux([]);
        setPalabrasPorNivel(palabrasPorNivel + 1);
        // setletrasRespuesta("");
      }
      console.log(palabraAux);
    } else {
      setintentosVidas(intentosVidas - 1);
      setintentos(intentos + 1);
      if (intentosVidas == 0) {
        setintentos(6);

        Swal.fire({
          title: "¡Perdiste!",
          text: `No pudiste terminar el juego`,
          icon: "error",
        }).then(() => {
          navigate(`/app/subtema/${juego.IdSubTema}`);
        });
      } else {
        Swal.fire({
          title: "Equivocado",
          text: `Te quedan ${intentosVidas} vidas`,
          icon: `warning`,
        });
      }
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario datos={{ opcionUsuario: 1 }}></OpcionesUsuario>
      {/* <div>
        <img src={duda} alt="" />
      </div> */}
      <p hidden>{intentos}</p>
      <div className="p-5">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="grid grid-cols-3">
              <div className="col-span-1">
                <img
                  src={duda}
                  className="cursor-pointer"
                  onClick={() => {
                    Swal.fire({
                      title: "Nota",
                      text: "Tienes un maximo de 6 vidas, donde cada vida perdida es una pieza mas al ahorcado",
                    });
                  }}
                />
              </div>
              <div className="col-span-2 text-start p-4">
                <h1 className="text-4xl font-extrabold">{juego.titulo}</h1>
              </div>
            </div>
            <div className="text-center p-4">
              <p className="text-lg text-justify font-extrabold">
                {juego.descripcion}
              </p>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-center"> {palabra}</h1>
            </div>

            <div>
              <h1 className="text-lg text-justify font-extrabold">{regla}</h1>
            </div>
          </div>

          <div className="col-span-1">
            <div>
              <img src={probar()} alt="" />
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="grid grid-cols-12 gap-10">
            {palabra.length > 0 ? (
              palabra.split("").map((letra, index) => {
                return (
                  <>
                    <div className=" col-span-1 ">
                      {letra != " " ? (
                        // <input type="text" className=" bg-terciario" />
                        <div className="max-w-md mx-auto">
                          <input
                            type="text"
                            max={1}
                            className="w-full px-4 py-2 border rounded-md bg-terciario font-extrabold text-center text-3xl"
                            value={palabraAux.includes(index) ? letra : ""}
                            readOnly
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </>
                );
              })
            ) : (
              // <>
              //   <h1>ta bien.-...............</h1>
              // </>
              <>
                <h1>Ta mal.............</h1>
              </>
            )}
          </div>
        </div>

        <div className="p-2 text-center">
          <input
            type="text"
            className=" px-4 py-2 border rounded-md bg-secundario font-extrabold text-center text-3xl placeholder-black"
            placeholder="Escribe una letra"
            value={letrasRespuesta}
            onChange={(e) => {
              if (e.target.value.length > 1) {
                Swal.fire({
                  icon: "warning",
                  title: "Solo se puede una letra",
                });
                setletrasRespuesta("");
              } else {
                setletrasRespuesta(e.target.value);
              }
            }}
          />
        </div>
        <div className="text-center">
          <button
            className="rounded-full bg-principal text-white font-extrabold p-4 hover:cursor-pointer"
            onClick={(e) => {
              e.preventDefault();

              probarLetra(letrasRespuesta);
              // if (intentos > 5) {
              //   setintentos(0);
              // } else {
              //   setintentos(intentos + 1);
              // }

              // if (intentos < 4) {
              //   setpalabra(juego.palabras.split("*|*")[intentos]);
              //   setregla(juego.reglas.split("*|*")[intentos]);
              // }
            }}
          >
            Probar
          </button>
        </div>
      </div>
    </>
  );
}

export default EjecutandoJuego;
