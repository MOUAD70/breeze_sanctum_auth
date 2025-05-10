import React from "react";
import SIIISideBar from "../../components/partials/SIIISideBar";

const SIIILayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-row bg-white mx-auto w-[calc(100%)] max-w-8xl min-h-[calc(100vh-1rem)]">
        <SIIISideBar />
      </div>
    </div>
  );
};

export default SIIILayout;
