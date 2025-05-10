import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-600 tracking-widest">
          403
        </h1>
        <div className="bg-red-200 px-3 text-sm rounded rotate-12 absolute mt-2 ml-4 text-red-800">
          Unauthorized
        </div>

        <p className="text-gray-600 mt-8 text-lg">
          You don't have permission to access this page.
        </p>
        <Link
          to={"/"}
          className="bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 font-semibold py-3.5 px-6 text-[16px] rounded-4xl cursor-pointer  border-0 outline-0 inline-flex justify-center align-center mt-4"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
