import * as React from "react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { Route } from "@/types";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  let routes: Route[] = [];

  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes;
      break;
    case "STUDENT":
      routes = studentRoutes;
      break;
    case "TUTOR":
      routes = tutorRoutes;
      break;
  }

  return (
    <Sidebar
      {...props}
      className="bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800"
    >
      <SidebarContent className="flex flex-col justify-between h-full">

        {/* TOP */}
        <div>
          {/* Dashboard Home */}
          <div className="px-4 py-4">
            <Link
              href="/"
              className="block text-center py-2 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-blue-600 to-blue-500 
              hover:from-blue-700 hover:to-blue-600 transition"
            >
              Home
            </Link>
          </div>

          {/* Route Groups */}
          {routes.map((group) => (
            <SidebarGroup key={group.title} className="px-2">
              <SidebarGroupLabel className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {group.title}
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="
                          flex items-center gap-3 px-4 py-2 rounded-lg
                          text-slate-700 dark:text-slate-300
                          hover:bg-blue-50 dark:hover:bg-slate-800
                          hover:text-blue-600 dark:hover:text-blue-400
                          transition
                          "
                        >
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </div>

        {/* BOTTOM */}
        <div className="px-4 pb-4">
          <Link
            href="/logout"
            className="block w-full text-center py-2 rounded-lg
            border border-red-500 text-red-600
            hover:bg-red-500 hover:text-white transition"
          >
            Logout
          </Link>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
