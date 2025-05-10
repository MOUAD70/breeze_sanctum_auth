"use client";

import { BadgeCheck, Bell, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../routes";
import { useEffect } from "react";
import SsiApi from "../services/api/SsiApi";

export function NavUser({ user }) {
  const { isMobile } = useSidebar();

  const {
    user: contextUser,
    setUser,
    authenticated,
    logout: contextLogout,
  } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && authenticated) {
      const controller = new AbortController();

      const fetchUser = async () => {
        try {
          const { data } = await SsiApi.getUser({
            signal: controller.signal,
          });
          setUser(data);
        } catch (error) {
          if (error.name !== "CanceledError") {
            contextLogout();
          }
        }
      };

      fetchUser();
      return () => controller.abort();
    }
  }, [user, authenticated]);

  const handleLogout = async () => {
    try {
      await contextLogout();
      navigate(LOGIN_ROUTE, { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = LOGIN_ROUTE;
    }
  };
  return (
    <SidebarMenu className="bg-transparent">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-gradient-to-r from-sky-100 to-sky-50 data-[state=open]:bg-sky-100 data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-6 w-6 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {contextUser.name[0].toUpperCase() +
                    "" +
                    contextUser.name[1].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-6 w-6 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {contextUser.name[0].toUpperCase() +
                      "" +
                      contextUser.name[1].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
