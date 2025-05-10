import React from "react";
import SISideBar from "../../components/partials/SISideBar";

const SILayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <div className="flex flex-row bg-white mx-auto w-[calc(100%-2rem)] max-w-8xl min-h-[calc(100vh-1rem)]">
        <SISideBar />
      </div>
    </div>
  );
};

export default SILayout;
