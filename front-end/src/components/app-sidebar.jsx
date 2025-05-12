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
import { useUserContext } from "../context/UserContext";

export function AppSidebar({ data, ...props }) {
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
      <SidebarRail className="text-sky-200" />
    </Sidebar>
  );
}
