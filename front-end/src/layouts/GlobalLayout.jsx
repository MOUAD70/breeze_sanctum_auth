import React from "react";
import { Outlet } from "react-router-dom";

const GlobalLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen text-gray-800">
      <div className="bg-white w-full max-w-8xl min-h-[calc(100vh)]">
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
