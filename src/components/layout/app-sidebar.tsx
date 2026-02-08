"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // useRouter ইম্পোর্ট করা হয়েছে
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
import { authClient } from "@/lib/auth-client"; // authClient ইম্পোর্ট করা হয়েছে

import { Route } from "@/types/icon"; 
import { LogOut, Home, LayoutDashboard } from "lucide-react";

function cn(...inputs: (string | boolean | undefined | null | number)[]) {
  return inputs.filter(Boolean).join(" ");
}

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string };
} & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter(); // router হুক কল করা হয়েছে
  
  let routes: Route[] = [];

  switch (user.role) {
    case "ADMIN":
      routes = adminRoutes as Route[];
      break;
    case "STUDENT":
      routes = studentRoutes as Route[];
      break;
    case "TUTOR":
      routes = tutorRoutes as Route[];
      break;
  }

  // লগআউট হ্যান্ডলার ফাংশন
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/"); // হোম পেজে পাঠিয়ে দেবে
          router.refresh(); // স্টেট আপডেট করার জন্য রিফ্রেশ করবে
        },
      },
    });
  };

  return (
    <Sidebar
      {...props}
      className="border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-black transition-colors duration-300"
    >
      <SidebarContent className="flex flex-col justify-between h-full bg-white dark:bg-black">
        
        <div>
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <LayoutDashboard className="text-white" size={20} />
              </div>
              <span className="font-black text-xl tracking-tight dark:text-white uppercase">
                Skill<span className="text-blue-600">Bridge</span>
              </span>
            </div>
          </div>

          <div className="px-4 mb-6">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200",
                pathname === "/" 
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25" 
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-900"
              )}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
          </div>

          <div className="space-y-4">
            {routes.map((group) => (
              <SidebarGroup key={group.title} className="px-4">
                <SidebarGroupLabel className="px-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-zinc-500 mb-2">
                  {group.title}
                </SidebarGroupLabel>

                <SidebarGroupContent>
                  <SidebarMenu className="gap-1">
                    {group.items.map((item) => {
                      const isActive = pathname === item.url;
                      const Icon = item.icon || LayoutDashboard; 

                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.url}
                              className={cn(
                                "flex items-center gap-3 px-4 py-6 rounded-2xl font-bold transition-all duration-200 group",
                                isActive 
                                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                                  : "text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-blue-600 dark:hover:text-blue-400"
                              )}
                            >
                              <Icon 
                                size={18} 
                                className={cn(
                                  "transition-transform group-hover:scale-110",
                                  isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600"
                                )} 
                              />
                              <span className="text-sm tracking-wide">{item.title}</span>
                              
                              {isActive && (
                                <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                              )}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </div>
        </div>

        <div className="px-4 pb-8">
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-900">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-4 rounded-2xl
              font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 
              border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 transition-all duration-200"
            >
              <LogOut size={18} />
              <span className="text-sm">Logout Session</span>
            </button>
          </div>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}