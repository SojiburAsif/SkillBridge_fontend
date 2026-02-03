import { Role, RoleType } from "@/app/constants/role";
import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // extract the cookies
  const cookieHeader = request.headers.get("cookie") || "";

  // Logout
  if (pathname === "/logout") {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("better-auth.session_token");
    return response;
  }

  let isAuthenticated = false;
  let role: RoleType | null = null;

  //  Pass the cookieHeader
  const { data, error } = await userService.getSession(cookieHeader);

  if (error) {
    console.log("Session error:", error.message);
  }

  if (data?.user) {
    isAuthenticated = true;
    role = data.user.role;
  }

  // Role-based redirects
  if (!isAuthenticated) {
    // Prevent infinite redirect loops if already on login
    if (pathname === "/login") return 
NextResponse.next
();
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //  Dashboard Protection
  if (role === Role.student) {
    if (
      pathname.startsWith("/tutor-dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/student-dashboard", request.url));
    }
  }

  if (role === Role.tutor) {
    if (
      pathname.startsWith("/student-dashboard") ||
      pathname.startsWith("/admin-dashboard")
    ) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  if (role === Role.admin) {
    if (
      pathname.startsWith("/student-dashboard") ||
      pathname.startsWith("/tutor-dashboard")
    ) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/student-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/logout",
  ],
}; 

