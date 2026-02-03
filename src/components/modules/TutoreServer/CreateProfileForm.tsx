"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function upsertTutorProfile(
  formData: FormData,
  profileId?: string,
) {
  const cookieStore = await cookies();
  const allCookies = cookieStore.toString();

  const rawData = Object.fromEntries(formData);

  const url = profileId
    ? `${env.API_URL}/api/tutor/profile/`
    : `${env.API_URL}/api/tutor/profile`;

  const response = await fetch(url, {
    method: profileId ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      "Cookie": allCookies,
    },
    body: JSON.stringify({
      ...rawData,
      price: Number(rawData.price),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to save profile data");
  }

  revalidatePath("/dashboard/profile");

  return { success: true, data: 
result.data
 };
} 

