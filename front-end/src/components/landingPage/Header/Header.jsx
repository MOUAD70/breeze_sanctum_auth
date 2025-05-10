import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { House, LogIn } from "lucide-react";
import bgImg from "../../../assets/bg-img.webp"

const Header = () => {
  return (
    <div className="w-full min-h-screen relative flex items-center justify-center text-sky-900">
      <img
        src={bgImg}
        className="absolute inset-0 w-full h-full object-cover object-[center_0%] z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b  from-sky-800/40 to-white  z-10"></div>
      <div className="absolute top-0 left-0 right-0 px-6 py-4 flex justify-end z-20">
        <nav className="flex space-x-4 bg-sky-900 px-6 py-2 rounded-4xl border-none">
          <Link to={"/"}>
            <Button
              variant="ghost"
              className="text-white rounded-2xl hover:bg-sky-800 hover:text-white transition duration-200 px-4 py-2"
            >
              Home
              <House className="ml-2" />
            </Button>
          </Link>
          <Link to={"/login"}>
            <Button
              variant="ghost"
              className="text-white rounded-2xl hover:bg-sky-800 hover:text-white transition duration-200 px-4 py-2"
            >
              Login
              <LogIn className="ml-2" />
            </Button>
          </Link>
        </nav>
      </div>

      <div className="relative z-20 text-center max-w-[800px] px-4">
        <h1 className="text-[70px] font-[700] drop-shadow-md">
          Your <span className="text-yellow-400">VIGILANT</span> Partner
        </h1>
        <p className="max-w-[700px] mx-auto mt-2.5 mb-5 leading-relaxed text-[17px] drop-shadow-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
          repellendus ab natus expedita unde dolorum rerum tenetur et eligendi
          nemo, perferendis maxime deleniti quod voluptate voluptates neque
          consectetur. Laborum, exercitationem!
        </p>
        <a
          href="#contact"
          className="bg-sky-900 text-white hover:bg-sky-950 transition-colors duration-150 font-semibold py-3.5 px-6 text-[16px] rounded-4xl cursor-pointer border-0 outline-0 inline-flex justify-center align-center"
        >
          Contact us
        </a>
      </div>
    </div>
  );
};

export default Header;
