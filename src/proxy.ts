import { NextRequest, NextResponse } from "next/server";
import { Role, RoleType } from "./app/constants/role";
import { userService } from "./services/user.service";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // ---------------- Logout ----------------
    if (pathname === "/logout") {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete({
            name: "better-auth.session_token",
            path: "/",
        });

        return response;
    }

    let isAuthenticated = false;
    let role: RoleType | null = null;

    const { data, error } = await userService.getSession();

    if (error) {
        console.log("Session error:", error.message);
    }
    

    if (data?.user) {
        isAuthenticated = true;
        role = data.user.role;
        // console.log("Session data Thiss:", role);
    }

    // ---------------- Role-based redirects ----------------
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (role === Role.student) {
        if (pathname.startsWith("/tutor-dashboard") || pathname.startsWith("/admin-dashboard")) {
            return NextResponse.redirect(new URL("/student-dashboard", request.url));
        }
    }

    if (role === Role.tutor) {
        if (pathname.startsWith("/student-dashboard") || pathname.startsWith("/admin-dashboard")) {
            return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
        }
    }

    if (role === Role.admin) {
        if (pathname.startsWith("/student-dashboard") || pathname.startsWith("/tutor-dashboard")) {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/student-dashboard",
        "/student-dashboard/:path*",
        "/tutor-dashboard",
        "/tutor-dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/logout", // <- Logout route include
    ],
};
