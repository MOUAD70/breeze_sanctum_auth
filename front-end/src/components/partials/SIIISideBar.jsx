import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import {
  CalendarClock,
  LayoutDashboard,
  MessageCircleWarning,
  Users,
  ScanSearch,
} from "lucide-react";
import {
  SSIAP_3_ATTENDANCE_ROUTE,
  SSIAP_3_DASHBOARD_ROUTE,
  SSIAP_3_EMPLOYEES_ROUTE,
  SSIAP_3_INCIDENTS_ROUTE,
  SSIAP_3_INCIDENTS_SITES_AND_TEAMS_ROUTE,
  SSIAP_3_REPLACEMENT_ROUTE,
  SSIAP_3_VACATIONS_ROUTE,
} from "../../routes";
const SIIISideBar = () => {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: LayoutDashboard,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: SSIAP_3_DASHBOARD_ROUTE,
          },
        ],
      },
      {
        title: "Employees",
        url: "#",
        icon: Users,
        items: [
          {
            title: "Employees list",
            url: SSIAP_3_EMPLOYEES_ROUTE,
          },
          ,
          {
            title: "Vacations Request",
            url: SSIAP_3_VACATIONS_ROUTE,
          },
          {
            title: "Manage Replacements",
            url: SSIAP_3_REPLACEMENT_ROUTE,
          },
        ],
      },
      {
        title: "Attendance",
        url: "#",
        icon: ScanSearch,
        items: [
          {
            title: "Today's Attendance",
            url: SSIAP_3_ATTENDANCE_ROUTE,
          },
        ],
      },
      {
        title: "Shifts",
        url: "#",
        icon: CalendarClock,
        items: [
          {
            title: "Shifts details",
            url: "#",
          },
        ],
      },
      {
        title: "Incidents",
        url: "#",
        icon: MessageCircleWarning,
        items: [
          {
            title: "Incidents Details",
            url: SSIAP_3_INCIDENTS_ROUTE,
          },
          {
            title: "Incidents Sites And Teams",
            url: SSIAP_3_INCIDENTS_SITES_AND_TEAMS_ROUTE,
          },
        ],
      },
    ],
  };
  return (
    <SidebarProvider>
      <AppSidebar data={data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="mx-4 my-2">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SIIISideBar;
