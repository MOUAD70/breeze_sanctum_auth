import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
          404
        </h1>
        <div className="bg-yellow-400 px-2 text-sm rounded rotate-12 absolute mt-2 ml-4 text-blue-900">
          Not Found
        </div>

        <p className="text-gray-600 mt-8 text-lg">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded shadow transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
