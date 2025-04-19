import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import SsiApi from "../../services/api/ssiap-1/SsiApi";
import { LOGIN_ROUTE } from "../../routes";
import { Button } from "@/components/ui/button";

const SILayout = () => {
  const { setUser, setAuthenticated, logout: contextLogout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    SsiApi.getUser()
      .then(({ data }) => {
        setUser(data);
        setAuthenticated(true);
      })
      .catch(() => {
        contextLogout();
        navigate(LOGIN_ROUTE);
      });
  }, []);

  const logout = async () => {
    SsiApi.logout().then(() => {
      contextLogout(), navigate(LOGIN_ROUTE);
    });
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-lg shadow-gray-200">
        <div className="max-w-6xl mx-auto px-2 py-4 flex justify-between items-center">
          <h1 className="text-sky-800">
            <span className="text-2xl font-semibold text-sky-800">CASA</span>{" "}
            <span className="text-yellow-600">vigilance</span>.
          </h1>
          <nav className="space-x-4">
            <Button
              onClick={logout}
              className="bg-sky-800 text-white border border-sky-800 hover:bg-white hover:border-sky-800 hover:text-sky-800 transition-colors duration-200 px-4 py-2 rounded-2xl"
            >
              Log out
            </Button>
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

export default SILayout;
