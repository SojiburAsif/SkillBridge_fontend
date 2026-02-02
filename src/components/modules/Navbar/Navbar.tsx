"use client";

import { Menu, LogOut, User } from "lucide-react";
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
import { useRouter } from "next/navigation"; // Router ইম্পোর্ট করুন
import { ModeToggle } from "@/components/layout/ModeToggle";
import { authClient } from "@/lib/auth-client";

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
  logo = { url: "/", title: "SkillBridge " },
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
  const router = useRouter(); // Router হুক কল করুন
  const isLoggedIn = Boolean(session?.user);

  const handalLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          // লগআউট সফল হলে পেজ রিফ্রেশ হবে এবং হোমপেজে নিয়ে যাবে
          router.push("/"); 
          router.refresh(); 
        },
      },
    });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-slate-100 dark:border-zinc-900",
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
              className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white"
            >
              {logo.title}
            </Link>

            {/* Menu */}
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.url}
                        className="px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-white transition-colors"
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
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-zinc-900/50 p-1 pr-4 rounded-full border border-slate-100 dark:border-zinc-800">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
                <span className="text-sm font-bold truncate max-w-[120px]">
                  {session?.user?.name ?? "User"}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handalLogout} 
                  className="text-slate-400 hover:text-red-500 transition-colors ml-2 h-8 w-8"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  variant="ghost"
                  className="font-bold text-sm hover:bg-slate-50 dark:hover:bg-zinc-900"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-xl shadow-lg shadow-blue-500/10 transition-all active:scale-95"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* ================= MOBILE ================= */}
        <div className="flex lg:hidden items-center justify-between h-16">
          <Link
            href={logo.url}
            className="text-xl font-black tracking-tighter text-slate-900 dark:text-white"
          >
            {logo.title}
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu size={22} />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="bg-white dark:bg-black border-l dark:border-zinc-900">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-xl font-black tracking-tighter uppercase">
                    {logo.title}
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-1 mt-8">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-md font-bold p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}

                  <div className="h-[1px] bg-slate-100 dark:bg-zinc-900 my-4" />

                  {isLoggedIn ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 px-3">
                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white uppercase">
                          {session?.user?.name?.[0]}
                        </div>
                        <span className="font-bold">{session?.user?.name}</span>
                      </div>
                      <Button onClick={handalLogout} variant="destructive" className="w-full rounded-xl font-bold">
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <Button asChild variant="outline" className="rounded-xl font-bold">
                        <Link href={auth.login.url}>{auth.login.title}</Link>
                      </Button>
                      <Button asChild className="bg-blue-600 rounded-xl font-bold">
                        <Link href={auth.signup.url}>{auth.signup.title}</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };