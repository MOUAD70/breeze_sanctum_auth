import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  CalendarClock,
  LayoutDashboard,
  MapPinHouse,
  MessageCircleWarning,
  ScanSearch,
  Users,
} from "lucide-react";
import { Outlet } from "react-router-dom";
import {
  SSIAP_2_ASSIGNMENTS_ROUTE,
  SSIAP_2_ATTENDANCE_ROUTE,
  SSIAP_2_DASHBOARD_ROUTE,
  SSIAP_2_EMPLOYEES_ROUTE,
  SSIAP_2_INCIDENTS_ROUTE,
  SSIAP_2_MARK_ATTENDANCE_ROUTE,
  SSIAP_2_SITES_ROUTE,
  SSIAP_2_VACATIONS_ROUTE,
} from "../../routes";
const SIISideBar = () => {
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
            url: SSIAP_2_DASHBOARD_ROUTE,
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
            url: SSIAP_2_EMPLOYEES_ROUTE,
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
            url: SSIAP_2_ATTENDANCE_ROUTE,
          },
          {
            title: "Mark Your Attendance",
            url: SSIAP_2_MARK_ATTENDANCE_ROUTE,
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
            url: SSIAP_2_ASSIGNMENTS_ROUTE,
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
            url: SSIAP_2_INCIDENTS_ROUTE,
          },
        ],
      },
      {
        title: "Sites",
        url: "#",
        icon: MapPinHouse,
        items: [
          {
            title: "Sites Details",
            url: SSIAP_2_SITES_ROUTE,
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

export default SIISideBar;
