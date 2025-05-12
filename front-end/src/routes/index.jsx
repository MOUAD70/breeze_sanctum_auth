import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoutes";
import GlobalLayout from "../layouts/GlobalLayout";
import GuestLayout from "../layouts/GuestLayout";
import Unauthorized from "../pages/errors/Unauthorized";
import SIIIAttendance from "../components/ssiap-3/SIIIAttendance";
import EmployeesList from "../components/ssiap-3/EmployeesList";
import Replacement from "../components/ssiap-3/Replacement";
import Vacations from "../components/ssiap-3/Vacations";
import EmployeesListII from "../components/ssiap-2/EmployeesListII";
import AddEmployeeForm from "../components/ssiap-3/AddEmployeeForm";
import AddEmployeeFormII from "../components/ssiap-2/AddEmployeeFormII";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const NotFound = lazy(() => import("../pages/errors/NotFound"));
const SILayout = lazy(() => import("../layouts/ssiap-1/SILayout"));
const SIILayout = lazy(() => import("../layouts/ssiap-2/SIILayout"));
const SIIILayout = lazy(() => import("../layouts/ssiap-3/SIIILayout"));
const SIDashboard = lazy(() => import("../components/ssiap-1/SIDashboard"));
const SIIDashboard = lazy(() => import("../components/ssiap-2/SIIDashboard"));
const SIIIDashboard = lazy(() => import("../components/ssiap-3/SIIIDashboard"));

export const LOGIN_ROUTE = "/login";
export const UNAUTHORIZED = "/unauthorized";
// SSIAP 1
export const SSIAP_1_DASHBOARD_ROUTE = "/ssiap-1/dashboard";

// SSIAP 2
export const SSIAP_2_DASHBOARD_ROUTE = "/ssiap-2/dashboard";
export const SSIAP_2_EMPLOYEES_ROUTE = "/ssiap-2/employees";
export const SSIAP_2_ADD_EMPLOYEE_ROUTE = "/ssiap-2/employees/add";

// SSIAP 3
export const SSIAP_3_DASHBOARD_ROUTE = "/ssiap-3/dashboard";
export const SSIAP_3_ATTENDANCE_ROUTE = "/ssiap-3/attendance";
export const SSIAP_3_EMPLOYEES_ROUTE = "/ssiap-3/employees";
export const SSIAP_3_REPLACEMENT_ROUTE = "/ssiap-3/replacement";
export const SSIAP_3_VACATIONS_ROUTE = "/ssiap-3/vacations";
export const SSIAP_3_ADD_EMPLOYEE_ROUTE = "/ssiap-3/employees/add";

export const routes = createBrowserRouter([
  {
    element: <GlobalLayout />,
    children: [{ path: "/", element: <Home /> }],
  },
  {
    element: <GuestLayout />,
    children: [{ path: LOGIN_ROUTE, element: <Login /> }],
  },
  {
    element: <SILayout />,
    children: [
      {
        path: SSIAP_1_DASHBOARD_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={1}>
            <SIDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <SIILayout />,
    children: [
      {
        path: SSIAP_2_DASHBOARD_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <SIIDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_EMPLOYEES_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <EmployeesListII />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_ADD_EMPLOYEE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <AddEmployeeFormII />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    element: <SIIILayout />,
    children: [
      {
        path: SSIAP_3_DASHBOARD_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <SIIIDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_ATTENDANCE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <SIIIAttendance />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_EMPLOYEES_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <EmployeesList />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_REPLACEMENT_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <Replacement />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_VACATIONS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <Vacations />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_ADD_EMPLOYEE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <AddEmployeeForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: UNAUTHORIZED, element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);
