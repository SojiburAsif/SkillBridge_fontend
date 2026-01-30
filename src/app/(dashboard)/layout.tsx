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
import { getSession } from "better-auth/api";
import { userService } from "@/services/user.service";

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

  // console.log("Hello session", data);

  const userRole = data?.user?.role;

  // console.log(userRole);


  return (
    <SidebarProvider>
      <AppSidebar user={{ role: userRole }} />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{userRole}</BreadcrumbPage> {/* just use string */}
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 flex flex-col gap-4 p-4">
          {userRole === Role.admin && admin}
          {userRole === Role.student && student}
          {userRole === Role.tutor && tutor}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );

}
