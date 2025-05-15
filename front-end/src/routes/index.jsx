import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoutes";
import GlobalLayout from "../layouts/GlobalLayout";
import GuestLayout from "../layouts/GuestLayout";
import Unauthorized from "../pages/errors/Unauthorized";
import SIIIAttendance from "../components/ssiap-3/SIIIAttendance";
import EmployeesList from "../components/ssiap-3/ManageEmployees/EmployeesList";
import Replacement from "../components/ssiap-3/Replacement";
import Vacations from "../components/ssiap-3/Vacations";
import EmployeesListII from "../components/ssiap-2/ManageEmployees/EmployeesListII";
import AddEmployeeForm from "../components/ssiap-3/ManageEmployees/AddEmployeeForm";
import AddEmployeeFormII from "../components/ssiap-2/ManageEmployees/AddEmployeeFormII";
import EditEmployeeForm from "../components/ssiap-3/ManageEmployees/EditEmployeeForm";
import EditEmployeeFormII from "../components/ssiap-2/ManageEmployees/EditEmployeeFormII";
import IncidentsDetailsSsi from "../components/ssiap-1/ManageIncidents/IncidentsDetailsSsi";
import IncidentsSitesAndTeamsSsi from "../components/ssiap-1/ManageIncidents/IncidentsSitesAndTeamsSsi";
import AddIncidentSsi from "../components/ssiap-1/ManageIncidents/AddIncidentSsi";
import EditIncidentSsi from "../components/ssiap-1/ManageIncidents/EditIncidentSsi";
import AttendanceDetailsSsi from "../components/ssiap-1/ManageAttendance/AttendanceDetailsSsi";
import IncidentsDetailsSsii from "../components/ssiap-2/ManageIncidents/IncidentsDetailsSsii";
import AddIncidentSsii from "../components/ssiap-2/ManageIncidents/AddIncidentSsii";
import EditIncidentSsii from "../components/ssiap-2/ManageIncidents/EditIncidentSsii";
import IncidentsSitesAndTeamsSsii from "../components/ssiap-2/ManageIncidents/IncidentsSitesAndTeamsSsii";
import IncidentsDetailsSsiii from "../components/ssiap-3/ManageIncidents/IncidentsDetailsSsiii";
import AddIncidentSsiii from "../components/ssiap-3/ManageIncidents/AddIncidentSsiii";
import EditIncidentSsiii from "../components/ssiap-3/ManageIncidents/EditIncidentSsiii";
import IncidentsSitesAndTeamsSsiii from "../components/ssiap-3/ManageIncidents/IncidentsSitesAndTeamsSsiii";
import SitesDetailsSsi from "../components/ssiap-1/ManageSites/SitesDetailsSsi";
import AddSiteSsii from "../components/ssiap-2/ManageSites/AddSiteSsii";
import EditSiteSsii from "../components/ssiap-2/ManageSites/EditSiteSsii";
import SitesDetailsSsii from "../components/ssiap-2/ManageSites/SitesDetailsSsii";
import SitesDetailsSsiii from "../components/ssiap-3/ManageSites/SitesDetailsSsiii";
import AddSiteSsiii from "../components/ssiap-3/ManageSites/AddSiteSsiii";
import EditSiteSsiii from "../components/ssiap-3/ManageSites/EditSiteSsiii";

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
export const SSIAP_1_INCIDENTS_ROUTE = "/ssiap-1/incidents";
export const SSIAP_1_ADD_INCIDENTS_ROUTE = "/ssiap-1/incidents/add";
export const SSIAP_1_EDIT_INCIDENTS_ROUTE = "/ssiap-1/incidents/edit/:id";
export const SSIAP_1_INCIDENTS_SITES_AND_TEAMS_ROUTE =
  "/ssiap-1/incidentsSitesAndTeams";
export const SSIAP_1_ATTENDANCE_ROUTE = "/ssiap-1/attendance";
export const SSIAP_1_SITES_ROUTE = "/ssiap-1/sites";

// SSIAP 2
export const SSIAP_2_DASHBOARD_ROUTE = "/ssiap-2/dashboard";
export const SSIAP_2_EMPLOYEES_ROUTE = "/ssiap-2/employees";
export const SSIAP_2_ADD_EMPLOYEE_ROUTE = "/ssiap-2/employees/add";
export const SSIAP_2_EDIT_EMPLOYEE_ROUTE = "/ssiap-2/employees/edit/:id";
export const SSIAP_2_INCIDENTS_ROUTE = "/ssiap-2/incidents";
export const SSIAP_2_ADD_INCIDENTS_ROUTE = "/ssiap-2/incidents/add";
export const SSIAP_2_EDIT_INCIDENTS_ROUTE = "/ssiap-2/incidents/edit/:id";
export const SSIAP_2_INCIDENTS_SITES_AND_TEAMS_ROUTE =
  "/ssiap-2/incidentsSitesAndTeams";
export const SSIAP_2_SITES_ROUTE = "/ssiap-2/sites";
export const SSIAP_2_ADD_SITE_ROUTE = "/ssiap-2/sites/add";
export const SSIAP_2_EDIT_SITE_ROUTE = "/ssiap-2/sites/edit/:id";

// SSIAP 3
export const SSIAP_3_DASHBOARD_ROUTE = "/ssiap-3/dashboard";
export const SSIAP_3_ATTENDANCE_ROUTE = "/ssiap-3/attendance";
export const SSIAP_3_EMPLOYEES_ROUTE = "/ssiap-3/employees";
export const SSIAP_3_REPLACEMENT_ROUTE = "/ssiap-3/replacement";
export const SSIAP_3_VACATIONS_ROUTE = "/ssiap-3/vacations";
export const SSIAP_3_ADD_EMPLOYEE_ROUTE = "/ssiap-3/employees/add";
export const SSIAP_3_EDIT_EMPLOYEE_ROUTE = "/ssiap-3/employees/edit/:id";
export const SSIAP_3_INCIDENTS_ROUTE = "/ssiap-3/incidents";
export const SSIAP_3_ADD_INCIDENTS_ROUTE = "/ssiap-3/incidents/add";
export const SSIAP_3_EDIT_INCIDENTS_ROUTE = "/ssiap-3/incidents/edit/:id";
export const SSIAP_3_INCIDENTS_SITES_AND_TEAMS_ROUTE =
  "/ssiap-3/incidentsSitesAndTeams";
export const SSIAP_3_SITES_ROUTE = "/ssiap-3/sites";
export const SSIAP_3_ADD_SITE_ROUTE = "/ssiap-3/sites/add";
export const SSIAP_3_EDIT_SITE_ROUTE = "/ssiap-3/sites/edit/:id";

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
      {
        path: SSIAP_1_ATTENDANCE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={1}>
            <AttendanceDetailsSsi />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_1_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={1}>
            <IncidentsDetailsSsi />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_1_ADD_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={1}>
            <AddIncidentSsi />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_1_EDIT_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={1}>
            <EditIncidentSsi />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_1_INCIDENTS_SITES_AND_TEAMS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={1}>
            <IncidentsSitesAndTeamsSsi />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_1_SITES_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={1}>
            <SitesDetailsSsi />
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
      {
        path: SSIAP_2_EDIT_EMPLOYEE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <EditEmployeeFormII />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <IncidentsDetailsSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_ADD_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <AddIncidentSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_EDIT_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <EditIncidentSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_INCIDENTS_SITES_AND_TEAMS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <IncidentsSitesAndTeamsSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_SITES_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <SitesDetailsSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_ADD_SITE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <AddSiteSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_EDIT_SITE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <EditSiteSsii />
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
      {
        path: SSIAP_3_EDIT_EMPLOYEE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <EditEmployeeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <IncidentsDetailsSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_ADD_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <AddIncidentSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_EDIT_INCIDENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <EditIncidentSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_INCIDENTS_SITES_AND_TEAMS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <IncidentsSitesAndTeamsSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_SITES_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <SitesDetailsSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_ADD_SITE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <AddSiteSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_EDIT_SITE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <EditSiteSsiii />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: UNAUTHORIZED, element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);
