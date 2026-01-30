"use client";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/ModeToggle";


/* ================= TYPES ================= */

interface MenuItem {
  title: string;
  url: string;
}

interface SessionUser {
  name?: string;
  email?: string;
  role?: string;
}

interface Session {
  user?: SessionUser;
}

interface NavbarProps {
  className?: string;
  session?: Session | null;
  logo?: {
    url: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

/* ================= COMPONENT ================= */

const Navbar = ({
  session,
  logo = { url: "/", title: "RentRide" },
  menu = [
    { title: "Home", url: "/" },
    { title: "Browse Tutors", url: "/TutoreProfile" },
    { title: "About", url: "/about" },
    { title: "Dashboard", url: "/student-dashboard" },
    { title: "Contact", url: "/contact" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
  className,
}: NavbarProps) => {
  const isLoggedIn = Boolean(session?.user);


  console.log("chack", session);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-white dark:bg-black",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* ================= DESKTOP ================= */}
        <nav className="hidden lg:flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link
              href={logo.url}
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              {logo.title}
            </Link>

            {/* Menu */}
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="px-4 py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                      >
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Area */}
          <div className="flex items-center gap-4">
            <ModeToggle />

            {isLoggedIn ? (
              <>
                <span className="text-sm font-semibold">
                  {session?.user?.name ?? "User"}
                </span>

                <Button
                  asChild
                  variant="destructive"
                  className="px-6 py-5 font-semibold"
                >
                  <Link href="/logout">Logout</Link>
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="px-6 py-5 font-semibold"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                <Button
                  asChild
                  className="px-6 py-5 font-semibold"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* ================= MOBILE ================= */}
        <div className="flex lg:hidden items-center justify-between h-16">
          <Link
            href={logo.url}
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {logo.title}
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-white dark:bg-black p-6">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">
                  {logo.title}
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-4">
                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="text-md font-semibold hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}

                <div className="flex flex-col gap-4 mt-6">
                  <ModeToggle />

                  {isLoggedIn ? (
                    <>
                      <span className="font-semibold">
                        {session?.user?.name}
                      </span>
                      <Link
                        href="/logout"
                        className="font-semibold text-red-500"
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={auth.login.url}>
                        {auth.login.title}
                      </Link>
                      <Link href={auth.signup.url}>
                        {auth.signup.title}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
