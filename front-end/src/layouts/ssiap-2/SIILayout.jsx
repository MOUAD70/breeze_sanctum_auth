import React from "react";
import SIISideBar from "../../components/partials/SIISideBar";

const SIILayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-row bg-white mx-auto w-[calc(100%-2rem)] max-w-8xl min-h-[calc(100vh-1rem)]">
        <SIISideBar />
      </div>
    </div>
  );
};

export default SIILayout;
