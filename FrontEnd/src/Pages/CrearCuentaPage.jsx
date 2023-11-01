import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import sqlIMG from "../../public/img/servidor-sql.png";
import facebookIMG from "../../public/img/facebook.png";

function CrearCuenta() {
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
                  Crea tu perfil
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
                        placeholder="Nombre Completo"
                      />
                    </div>
                    <div className="col-span-1 pt-8">
                      <input
                        type="text"
                        className="bg-cuarto text-xl  w-full p-3  rounded-2xl font-bold"
                        placeholder="Correo"
                      />
                    </div>
                    <div className="col-span-1 pt-8">
                      <input
                        type="password"
                        className="bg-cuarto text-xl  w-full p-3 rounded-2xl font-bold"
                        placeholder="Password"
                      />
                    </div>
                    <div className="pt-8 text-center">
                      <button className="bg-principal uppercase text-center py-4 text-white rounded-2xl font-bold hover:bg-terciario px-8">
                        Crear Cuenta
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

export default CrearCuenta;
