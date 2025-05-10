import * as React from "react";
import {
  Users,
  CalendarClock,
  MapPinHouse,
  LayoutDashboard,
  MessageCircleWarning,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  SSIAP_3_ATTENDANCE_ROUTE,
  SSIAP_3_DASHBOARD_ROUTE,
  SSIAP_3_EMPLOYEES_ROUTE,
  SSIAP_3_REPLACEMENT_ROUTE,
  SSIAP_3_VACATIONS_ROUTE,
} from "../routes";
import { useUserContext } from "../context/UserContext";

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
        {
          title: "Today's Attendance",
          url: SSIAP_3_ATTENDANCE_ROUTE,
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
        {
          title: "Manage Replacements",
          url: SSIAP_3_REPLACEMENT_ROUTE,
        },
        {
          title: "Manage Vacations",
          url: SSIAP_3_VACATIONS_ROUTE,
        },
      ],
    },
    {
      title: "Shifts",
      url: "#",
      icon: CalendarClock,
      items: [
        {
          title: "Manage Shifts",
          url: "#",
        },
        {
          title: "My Shifts",
          url: "#",
        },
      ],
    },
    {
      title: "Incidents reports",
      url: "#",
      icon: MessageCircleWarning,
      items: [
        {
          title: "Recent Incidents",
          url: "#",
        },
      ],
    },
    {
      title: "Sites",
      url: "#",
      icon: MapPinHouse,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Teams",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { user } = useUserContext();
  return (
    <Sidebar className="bg-sky-50" collapsible="icon" {...props}>
      <SidebarContent className="pt-2 bg-sky-50">
        <NavMain className="bg-sky-50" items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="bg-sky-50">
        <NavUser
          user={{
            name: user?.name.toUpperCase(),
            email: user?.email,
          }}
        />
      </SidebarFooter>
      <SidebarRail className="text-sky-200"/>
    </Sidebar>
  );
}
