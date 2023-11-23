import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import mensajeError from "../Helpers/MensajeError";
import { useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import OpcionesUsuario from "../Components/OpcionesUsuario";

function CrearCuentaDocente() {
  const navigate = useNavigate();

  const [NombreJugador, setNombre] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Password, setPassword] = useState("");
  const [passwordRepetir, setPasswordRepetir] = useState("");

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
      if (data.data.tipo != "docente") {
        throw new Error("No eres docente");
      }
    } catch (error) {
      console.log(error);
      mensajeError("Inicia sesion", "Necesitas iniciar sesion primero");
      navigate("/login");
    }
  };

  const crearCuenta = async (e) => {
    e.preventDefault();
    try {
      const regexNombreJugador = /^[a-zA-Z\s]+$/;
      const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (NombreJugador.length < 3 || !regexNombreJugador.test(NombreJugador)) {
        mensajeError("Error en el formulario", "Nombre no valido");
        return;
      }

      if (
        Correo.length < 15 ||
        !regexCorreo.test(Correo) ||
        !Correo.includes("@")
      ) {
        mensajeError("Error en el formulario", "El correo no es valido");
        return;
      }

      if (Password.length < 8) {
        mensajeError("Error en el formulario", "La contraseña es muy corta");
        return;
      }

      const infoUsuario = { NombreDocente: NombreJugador, Correo, Password };

      if (Password.toString() !== passwordRepetir.toString()) {
        Swal.fire({
          icon: "error",
          title: "Error en el formulario",
          text: "Las contraseñas no coinciden",
        });
        return;
      }
      const token = window.localStorage.getItem("jwt_SQLearn_token");
      const url = "/docentes/docente";
      const { data } = await clienteAxios.post(url, infoUsuario, {
        headers: { Authorization: token },
      });
      console.log(data);
      Swal.fire({
        title: "¡Cuenta Creada!",
        text: `La cuenta se creo de forma exitosa`,
        icon: "success",
      }).then(() => {
        navigate("/app");
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "¡No se pudo crear tu cuenta!",
        text: `Ocurrio un error al crear la cuenta`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Nav></Nav>
      <OpcionesUsuario
        datos={{ opcionUsuario: 1, tipoUsuario }}
        key={3254}
      ></OpcionesUsuario>
      <div className="grid grid-cols-1">
        <div className="col-span-1">
          <h2 className="text-3xl text-center text-black font-bold px-4">
            Crea un nuevo Docente
          </h2>
        </div>
        <div className="col-span-1">
          <form action="" className="  px-44">
            {/* <div className="py-10"> */}

            <div className="grid grid-cols-1">
              <div className="col-span-1 pt-8">
                <input
                  type="text"
                  value={NombreJugador}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                  className="bg-cuarto text-xl  w-full p-3  rounded-2xl font-bold"
                  placeholder="Nombre Completo"
                />
              </div>
              <div className="col-span-1 pt-8">
                <input
                  type="text"
                  className="bg-cuarto text-xl  w-full p-3  rounded-2xl font-bold"
                  placeholder="Correo"
                  value={Correo}
                  onChange={(e) => {
                    setCorreo(e.target.value);
                  }}
                />
              </div>
              <div className="col-span-1 pt-8">
                <input
                  type="password"
                  className="bg-cuarto text-xl  w-full p-3 rounded-2xl font-bold"
                  placeholder="Password"
                  value={Password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="col-span-1 pt-8">
                <input
                  type="password"
                  className="bg-cuarto text-xl  w-full p-3 rounded-2xl font-bold"
                  placeholder="Repetir Password"
                  value={passwordRepetir}
                  onChange={(e) => {
                    setPasswordRepetir(e.target.value);
                  }}
                />
              </div>
              <div className="pt-8 text-center">
                <button
                  className="bg-principal uppercase text-center py-4 text-white rounded-2xl font-bold hover:bg-terciario px-8"
                  onClick={(e) => {
                    crearCuenta(e);
                  }}
                >
                  Crear Cuenta
                </button>
              </div>
            </div>
            {/* </div> */}
          </form>
          {/* border-spacing-24 border-2 border-sky-500  */}
          <div className="flex text-center justify-center items-center">
            <hr className="w-64 h-px my-8 bg-secundario border-0 dark:bg-secundario " />
            <p className="px-6"> </p>
            <hr className="w-64 h-px my-8 bg-secundario border-0 dark:bg-secundario" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CrearCuentaDocente;
