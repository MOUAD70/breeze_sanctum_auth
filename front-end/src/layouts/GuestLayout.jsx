import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SSIAP_1_DASHBOARD_ROUTE } from "../routes";
import { useUserContext } from "../context/UserContext.jsx";
import GlobalHeader from "../components/layouts/GlobalHeader.jsx";
import { Button } from "@/components/ui/button";

const GuestLayout = () => {
  const navigate = useNavigate();
  const context = useUserContext;

  useEffect(() => {
    if (context.authenticated) {
      navigate(SSIAP_1_DASHBOARD_ROUTE);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <GlobalHeader />
      <header className="bg-white shadow-lg shadow-gray-200">
        <div className="max-w-6xl mx-auto px-2 py-4 flex justify-between items-center">
          <h1 className="text-sky-800">
            <span className="text-2xl font-semibold text-sky-800">CASA</span>{" "}
            <span className="text-yellow-600">vigilance</span>.
          </h1>
          <nav className="space-x-4">
            <Link to={"/"}>
              <Button className="bg-sky-800 text-white border border-sky-800 hover:bg-white hover:border-sky-800 hover:text-sky-800 transition-colors duration-200 px-4 py-2 rounded-2xl">
                Home
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button className="bg-sky-800 text-white border border-sky-800 hover:bg-white hover:border-sky-800 hover:text-sky-800 transition-colors duration-200 px-4 py-2 rounded-2xl">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-6 px-4 mx-16">
        <Outlet />
      </main>

      <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
        © 2025 <span className="text-yellow-500 font-medium">MyApp</span>. All
        rights reserved.
      </footer>
    </div>
  );
};

export default GuestLayout;
