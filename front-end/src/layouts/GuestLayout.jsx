import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SSIAP_1_DASHBOARD_ROUTE } from "../routes";
import { useUserContext } from "../context/UserContext.jsx";
import { Button } from "@/components/ui/button";
import { House, LogIn } from "lucide-react";

const GuestLayout = () => {
  const navigate = useNavigate();
  const context = useUserContext;

  useEffect(() => {
    if (context.authenticated) {
      navigate(SSIAP_1_DASHBOARD_ROUTE);
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      <div className="bg-white mx-auto w-[calc(100%)] max-w-8xl min-h-[calc(100vh-1rem)]">
        <div className="px-6 py-4 flex justify-end">
          <nav className="flex space-x-4 bg-sky-900 px-6 py-2 rounded-4xl border-none">
            <Link to={"/"}>
              <Button
                variant="ghost"
                className="text-white rounded-2xl hover:bg-sky-800 hover:text-white transition duration-200 px-4 py-2"
              >
                Home
                <House />
              </Button>
            </Link>
            <Link to={"/login"}>
              <Button
                variant="ghost"
                className="text-white rounded-2xl hover:bg-sky-800 hover:text-white transition duration-200 px-4 py-2"
              >
                Login
                <LogIn />
              </Button>
            </Link>
          </nav>
        </div>
        <div className="flex-1 py-2 px-4 mx-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;
