import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoutes";
import GlobalLayout from "../layouts/GlobalLayout";
import GuestLayout from "../layouts/GuestLayout";
import Unauthorized from "../pages/errors/Unauthorized";
import SIIIAttendance from "../components/ssiap-3/ManageAttendance/SIIIAttendance";
import EmployeesList from "../components/ssiap-3/ManageEmployees/EmployeesList";
import Replacement from "../components/ssiap-3/Replacement";
import Vacations from "../components/ssiap-3/ManageVacations/Vacations";
import EmployeesListII from "../components/ssiap-2/ManageEmployees/EmployeesListII";
import AddEmployeeForm from "../components/ssiap-3/ManageEmployees/AddEmployeeForm";
import AddEmployeeFormII from "../components/ssiap-2/ManageEmployees/AddEmployeeFormII";
import EditEmployeeForm from "../components/ssiap-3/ManageEmployees/EditEmployeeForm";
import EditEmployeeFormII from "../components/ssiap-2/ManageEmployees/EditEmployeeFormII";
import IncidentsDetailsSsi from "../components/ssiap-1/ManageIncidents/IncidentsDetailsSsi";
import AddIncidentSsi from "../components/ssiap-1/ManageIncidents/AddIncidentSsi";
import EditIncidentSsi from "../components/ssiap-1/ManageIncidents/EditIncidentSsi";
import AttendanceDetailsSsi from "../components/ssiap-1/ManageAttendance/AttendanceDetailsSsi";
import IncidentsDetailsSsii from "../components/ssiap-2/ManageIncidents/IncidentsDetailsSsii";
import AddIncidentSsii from "../components/ssiap-2/ManageIncidents/AddIncidentSsii";
import EditIncidentSsii from "../components/ssiap-2/ManageIncidents/EditIncidentSsii";
import IncidentsDetailsSsiii from "../components/ssiap-3/ManageIncidents/IncidentsDetailsSsiii";
import AddIncidentSsiii from "../components/ssiap-3/ManageIncidents/AddIncidentSsiii";
import EditIncidentSsiii from "../components/ssiap-3/ManageIncidents/EditIncidentSsiii";
import SitesDetailsSsi from "../components/ssiap-1/ManageSites/SitesDetailsSsi";
import AddSiteSsii from "../components/ssiap-2/ManageSites/AddSiteSsii";
import EditSiteSsii from "../components/ssiap-2/ManageSites/EditSiteSsii";
import SitesDetailsSsii from "../components/ssiap-2/ManageSites/SitesDetailsSsii";
import SitesDetailsSsiii from "../components/ssiap-3/ManageSites/SitesDetailsSsiii";
import AddSiteSsiii from "../components/ssiap-3/ManageSites/AddSiteSsiii";
import EditSiteSsiii from "../components/ssiap-3/ManageSites/EditSiteSsiii";
import ShiftDetailsSsiii from "../components/ssiap-3/ManageShifts/ShiftDetailsSsiii";
import AddShiftSsiii from "../components/ssiap-3/ManageShifts/AddShiftSsiii";
import EditShiftSsiii from "../components/ssiap-3/ManageShifts/EditShiftSsiii";
import EditShiftSsii from "../components/ssiap-2/ManageShifts/EditShiftSsii";
import AddShiftSsii from "../components/ssiap-2/ManageShifts/AddShiftSsii";
import ShiftDetailsSsii from "../components/ssiap-2/ManageShifts/ShiftDetailsSsii";
import SIIAttendance from "../components/ssiap-2/ManageAttendance/SIIAttendance";
import AttendanceDetailsSsii from "../components/ssiap-2/ManageAttendance/AttendanceDetailsSsii";
import VacationsII from "../components/ssiap-2/ManageVacations/VacationsII";

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
export const SSIAP_2_SITES_ROUTE = "/ssiap-2/sites";
export const SSIAP_2_ADD_SITE_ROUTE = "/ssiap-2/sites/add";
export const SSIAP_2_EDIT_SITE_ROUTE = "/ssiap-2/sites/edit/:id";
export const SSIAP_2_ASSIGNMENTS_ROUTE = "/ssiap-2/assignments";
export const SSIAP_2_ADD_ASSIGNMENT_ROUTE = "/ssiap-2/assignments/add";
export const SSIAP_2_EDIT_ASSIGNMENT_ROUTE = "/ssiap-2/assignments/edit/:id";
export const SSIAP_2_ATTENDANCE_ROUTE = "/ssiap-2/attendance";
export const SSIAP_2_MARK_ATTENDANCE_ROUTE = "/ssiap-2/attendance/mark";
export const SSIAP_2_VACATIONS_ROUTE = "/ssiap-2/vacations";

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
export const SSIAP_3_SITES_ROUTE = "/ssiap-3/sites";
export const SSIAP_3_ADD_SITE_ROUTE = "/ssiap-3/sites/add";
export const SSIAP_3_EDIT_SITE_ROUTE = "/ssiap-3/sites/edit/:id";
export const SSIAP_3_ASSIGNMENTS_ROUTE = "/ssiap-3/assignments";
export const SSIAP_3_ADD_ASSIGNMENT_ROUTE = "/ssiap-3/assignments/add";
export const SSIAP_3_EDIT_ASSIGNMENT_ROUTE = "/ssiap-3/assignments/edit/:id";

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
      {
        path: SSIAP_2_ASSIGNMENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <ShiftDetailsSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_ADD_ASSIGNMENT_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <AddShiftSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_EDIT_ASSIGNMENT_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <EditShiftSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_ATTENDANCE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <SIIAttendance />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_MARK_ATTENDANCE_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <AttendanceDetailsSsii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_2_VACATIONS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={2}>
            <VacationsII />
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
      {
        path: SSIAP_3_ASSIGNMENTS_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <ShiftDetailsSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_ADD_ASSIGNMENT_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <AddShiftSsiii />
          </ProtectedRoute>
        ),
      },
      {
        path: SSIAP_3_EDIT_ASSIGNMENT_ROUTE,
        element: (
          <ProtectedRoute requiredLevel={3}>
            <EditShiftSsiii />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: UNAUTHORIZED, element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },
]);
