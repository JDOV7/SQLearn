import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <>
      <header className=" w-full  lg:fixed bg-cuarto rounded-2xl border-b border-solid border-terciario">
        <nav className=" py-2 ">
          {/* <h1 className="text-4xl text-black py-2 px-4 font-bold">SQLearn</h1> */}
          <Link to="/" className="text-4xl text-black py-2 px-4 font-bold">
            SQLearn
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Nav;
