// src/components/layout/NavbarServer.tsx
"use server"
import { userService } from "@/services/user.service";
import { Navbar } from "./Navbar";



export default async function NavbarServer() {
 
    const { data } = await userService.getSession();
  

    return <Navbar session={data} />;
}
