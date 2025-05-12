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
  MessageCircleWarning,
  ScanSearch,
  Users,
} from "lucide-react";
import { Outlet } from "react-router-dom";
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
            url: "#",
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
            url: "#",
          },
          {
            title: "Mark Your Attendance",
            url: "#",
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
            url: "#",
          },
          {
            title: "Vacations Request",
            url: "#",
          },
          {
            title: "Manage Replacements",
            url: "#",
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
            url: "#",
          },
          {
            title: "Incidents Sites",
            url: "#",
          },
          {
            title: "Incidents Teams",
            url: "#",
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
