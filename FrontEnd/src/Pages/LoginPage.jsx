import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Nav from "../Components/Nav";
import sqlIMG from "../../public/img/servidor-sql.png";
import facebookIMG from "../../public/img/facebook.png";
import mensajeError from "../Helpers/MensajeError";
import Swal from "sweetalert2";
import mensajeCorrecto from "../Helpers/MensajeCorrecto";
import clienteAxios from "../../config/axios";

function LoginPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("12345678");

  const iniciarSesion = async () => {
    try {
      const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (
        correo.length < 15 ||
        !regexCorreo.test(correo) ||
        !correo.includes("@")
      ) {
        mensajeError("Error en el formulario", "El correo no es valido");
        return;
      }

      if (password.length < 8) {
        mensajeError("Error en el formulario", "La contraseña esta mal");
        return;
      }
      const url = "/jugadores/iniciar-sesion";
      const { data } = await clienteAxios.post(url, {
        Correo: correo,
        Password: password,
      });
      console.log(data);
      window.localStorage.setItem("jwt_SQLearn_token", data.data.jsonWebToken);
      mensajeCorrecto("Inicio de sesion exitoso");
      navigate("/app");
    } catch (error) {
      mensajeError("Error al iniciar sesion", "No se pudo iniciar sesio");
    }
  };

  return (
    <>
      <Nav></Nav>
      <div className="pt-36">
        <div className="grid grid-cols-3 ">
          <div className="col-span-1">
            <div className="flex items-center justify-center">
              <img src={sqlIMG} alt="" />
            </div>
          </div>
          <div className="col-span-2 ">
            {/* <div className="flex justify-center items-center"> */}
            <div className="grid grid-cols-1">
              <div className="col-span-1">
                <h2 className="text-3xl text-center text-black font-bold px-4">
                  Ingresar
                </h2>
              </div>
              <div className="col-span-1">
                <form action="" className="  px-44">
                  {/* <div className="py-10"> */}

                  <div className="grid grid-cols-1">
                    <div className="col-span-1 pt-8">
                      <input
                        type="text"
                        className="bg-cuarto text-xl  w-full p-3  rounded-2xl font-bold"
                        placeholder="Correo"
                        value={correo}
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
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="pt-8 text-center">
                      <button
                        className="bg-principal uppercase text-center py-4 text-white rounded-2xl font-bold hover:bg-terciario px-8"
                        onClick={(e) => {
                          e.preventDefault();
                          iniciarSesion();
                        }}
                      >
                        Ingresar
                      </button>
                    </div>
                  </div>
                  {/* </div> */}
                </form>
                {/* border-spacing-24 border-2 border-sky-500  */}
                <div className="flex text-center justify-center items-center">
                  <hr class="w-64 h-px my-8 bg-secundario border-0 dark:bg-secundario " />
                  <p className="px-6"> </p>
                  <hr class="w-64 h-px my-8 bg-secundario border-0 dark:bg-secundario" />
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
