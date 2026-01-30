import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Role } from "../constants/role";
import { userService } from "@/services/user.service";
import { HiOutlineBell, HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"; // React Icons ব্যবহার করা হয়েছে

export default async function DashboardLayout({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userRole = data?.user?.role;

  return (
    <SidebarProvider>
   
      <div className="flex min-h-screen w-full bg-[#f8fafc] dark:bg-black transition-colors duration-300">

        <AppSidebar user={{ role: userRole }} />

        <SidebarInset className="bg-transparent">
          {/* --- Minimalist Header --- */}
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white/80 dark:bg-black/80 px-6 backdrop-blur-md transition-all dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all rounded-lg p-2" />
              <Separator orientation="vertical" className="h-6 bg-slate-200 dark:bg-zinc-800" />

              <Breadcrumb className="hidden sm:block">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard" className="text-[11px] font-bold text-slate-500 hover:text-blue-600 uppercase tracking-widest transition-colors">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-slate-300 dark:text-zinc-700" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-[11px] font-black text-blue-600 dark:text-blue-500 uppercase tracking-widest">
                      {userRole} Portal
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>



          </header>

          {/* --- Dynamic Content Body --- */}
          <main className="flex-1 overflow-y-auto relative">



            <div className="mx-auto w-full ">
              {userRole === Role.admin && (
                <div className="">{admin}</div>
              )}

              {userRole === Role.student && (
                <div className="pt-2">{student}</div>
              )}

              {userRole === Role.tutor && (
                <div className="pt-2">{tutor}</div>
              )}
            </div>
          </main>

          {/* --- Minimalist Footer --- */}
          <footer className="px-10 py-6 border-t border-slate-100 dark:border-zinc-900/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-600 uppercase tracking-[2px]">
              &copy; 2026 SkillBridge
            </p>
            <div className="flex gap-6">
              <span className="text-[9px] font-black text-slate-400 dark:text-zinc-600 uppercase cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Privacy</span>
              <span className="text-[9px] font-black text-slate-400 dark:text-zinc-600 uppercase cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Terms</span>
              <span className="text-[9px] font-black text-slate-400 dark:text-zinc-600 uppercase cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Support</span>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}