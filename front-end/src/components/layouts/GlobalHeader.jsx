import React from "react";
import { Button } from "@/components/ui/button";

const GlobalHeader = () => {
  return (
    <header className="px-8 py-4 flex justify-between items-center h-12 bg-yellow-400">
      <div className="flex items-center space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-sky-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
        <p className="text-sky-800 font-medium">05 08 62 82 25</p>
      </div>
      <div className="text-center">
        <p className="text-md text-sky-800 italic">
          Le leader de la sécurité incendie depuis 1998
        </p>
      </div>
      <div>
        <Button className="bg-sky-800 text-white border border-sky-800 hover:bg-white hover:border-sky-800 hover:text-sky-800 transition-colors duration-200 px-4 py-2 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Demande de devis
        </Button>
      </div>
    </header>
  );
};

export default GlobalHeader;
