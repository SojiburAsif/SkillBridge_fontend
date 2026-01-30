import * as React from "react";
import Link from "next/link";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";
import { adminRoutes } from "@/routes/adminRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { Route } from "@/types";

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
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
    default:
      routes = [];
      break;
  }

  return (
    <Sidebar {...props} className="bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
      <SidebarContent className="flex flex-col justify-between h-full">
        
        {/* Top: Home + Routes */}
        <div>
          {/* Home Button */}
          <div className="mb-6 px-4">
            <Link href="/" className="block w-full text-center py-2 rounded-lg text-white font-bold shadow transition-all">
              Home
            </Link>
          </div>

          {/* Route Groups */}
          {routes.map((group) => (
            <SidebarGroup key={group.title} className="mb-4">
              <SidebarGroupLabel className="text-gray-500 dark:text-gray-400 font-semibold">{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url} className="block w-full text-left px-3 py-2 rounded hover:bg-blue-50  transition-all">
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

        {/* Bottom: Logout */}
        <div className="mb-4 px-4">
          <button
            className="w-full py-2 rounded-lg bg-red-600 text-white font-bold shadow hover:bg-red-700 transition-all"
           
          >
            Logout
          </button>
        </div>
      </SidebarContent>

      <SidebarRail className="" />
    </Sidebar>
  );
}
