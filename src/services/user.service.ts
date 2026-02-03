// import { env } from "@/env";
// import { cookies } from "next/headers";

// const AUTH_URL = env.AUTH_URL

// export const userService = {
//     getSession: async function () {
//         try {
//             const cookieStore = await cookies();




//             const res = await fetch(`${AUTH_URL}/get-session`, {
//                 headers: {
//                     Cookie: cookieStore.toString(),
//                 },
//                 cache: "no-store",
//             });

//             const session = await res.json();

//             if (session === null) {
//                 return { data: null, error: { message: "Session is missing." } };
//             }

//             return { data: session, error: null };
//         } catch (err) {
//             console.error(err);
//             return { data: null, error: { message: "Something Went Wrong" } };
//         }
//     }
// }

import { env } from "@/env";

export const userService = {
    // Accepting the optional cookie string
    getSession: async function (cookieHeader?: string) {
        try {
            let finalCookies = "";

            if (cookieHeader) {
                // Use the cookie
                finalCookies = cookieHeader;
            } else {
                // Fallback
                const { cookies } = await import("next/headers");
                const cookieStore = await cookies();
                finalCookies = cookieStore.toString();
            }

            const res = await fetch(`${env.AUTH_URL}/get-session`, {
                headers: {
                    //  forwards
                    Cookie: finalCookies,
                },
                cache: "no-store",
            });

            if (!res.ok) return { data: null, error: { message: "Unauthorized" } };

            const session = await res.json();
            return { data: session, error: null };
        } catch (err) {
            console.error("Fetch error:", err);
            return { data: null, error: { message: "Connection failed" } };
        }
    },
}; 