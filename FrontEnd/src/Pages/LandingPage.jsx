import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Components/Nav";
import sqlIMG from "../../public/img/servidor-sql.png";

function LandingPage() {
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
            <div className="flex justify-center items-center">
              <div className="grid grid-cols-1">
                <div className="col-span-1">
                  <h1 className="text-3xl text-center text-black font-bold px-4">
                    ¡La forma divertida, efectiva y gratis de aprender SQL!
                  </h1>
                </div>
                <div className="col-span-1">
                  <div>
                    <div className="p-16 text-center">
                      <Link
                        to="/crear-cuenta"
                        className="p-4 text-white bg-secundario rounded-2xl font-bold hover:bg-terciario"
                      >
                        Empieza ahora
                      </Link>
                    </div>
                    <div className=" text-center ">
                      <Link
                        to="/login"
                        className="p-4 text-white bg-secundario rounded-2xl font-bold hover:bg-terciario"
                      >
                        Ya tengo una cuenta
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
