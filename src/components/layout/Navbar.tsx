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
import { ModeToggle } from "./ModeToggle";
import { userService } from "@/services/user.service";

interface MenuItem {
  title: string;
  url: string;
}

interface NavbarProps {
  className?: string;
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


// console.log("nav data", data);
const Navbar = ({



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
  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 bg-white dark:bg-black",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link
              href={logo.url}
              className="text-2xl font-bold text-slate-900 dark:text-white"
            >
              {logo.title}
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      asChild
                      href={item.url}
                      className="px-4 py-2 text-sm font-medium hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth + Toggle */}
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button
              asChild
              variant="outline"
              className="px-6 font-semibold py-5 hover:bg-blue-600 hover:text-white transition-all"
            >
              <Link href={auth.login.url}>{auth.login.title}</Link>
            </Button>
            <Button
              asChild
              className="px-6 py-5 font-semibold hover:bg-blue-600 hover:text-white transition-all"
            >
              <Link href={auth.signup.url}>{auth.signup.title}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
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
                <SheetTitle className="text-xl font-bold">{logo.title}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-4">
                {menu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="text-md font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors pl-2"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="flex flex-col gap-4 mt-6">
                  <ModeToggle />
                  <Button
                    asChild
                    variant="outline"
                    size="default"
                    className="px-6 py-3 font-semibold hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Link href={auth.login.url}>{auth.login.title}</Link>
                  </Button>
                  <Button
                    asChild
                    size="default"
                    className="px-6 py-3 font-semibold hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <Link href={auth.signup.url}>{auth.signup.title}</Link>
                  </Button>
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
