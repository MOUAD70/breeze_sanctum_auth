import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/errors/NotFound";
import GlobalLayout from "../layouts/GlobalLayout";
import GuestLayout from "../layouts/GuestLayout";
import SIILayout from "../layouts/ssiap-2/SIILayout";
import SILayout from "../layouts/ssiap-1/SILayout";
import SIIILayout from "../layouts/ssiap-3/SIIILayout";
import SIDashboard from "../components/ssiap-1/SIDashboard";
import SIIDashboard from "../components/ssiap-2/SIIDashboard";
import SIIIDashboard from "../components/ssiap-3/SIIIDashboard";

export const LOGIN_ROUTE = "/login";
export const SSIAP_1_DASHBOARD_ROUTE = "/ssiap-1/dashboard";
export const SSIAP_2_DASHBOARD_ROUTE = "/ssiap-2/dashboard";
export const SSIAP_3_DASHBOARD_ROUTE = "/ssiap-3/dashboard";

export const routes = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    element: <GuestLayout />,
    children: [
      {
        path: LOGIN_ROUTE,
        element: <Login />,
      },
    ],
  },
  {
    element: <SILayout />,
    children: [
      {
        path: SSIAP_1_DASHBOARD_ROUTE,
        element: <SIDashboard />,
      },
    ],
  },
  {
    element: <SIILayout />,
    children: [
      {
        path: SSIAP_2_DASHBOARD_ROUTE,
        element: <SIIDashboard />,
      },
    ],
  },
  {
    element: <SIIILayout />,
    children: [
      {
        path: SSIAP_3_DASHBOARD_ROUTE,
        element: <SIIIDashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
