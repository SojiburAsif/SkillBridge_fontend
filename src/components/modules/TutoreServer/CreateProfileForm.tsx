"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function upsertTutorProfile(
  formData: FormData,
  profileId?: string // প্রোফাইল আইডি থাকলে PUT হবে, না থাকলে POST
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value; // আপনার টোকেনের নাম অনুযায়ী পরিবর্তন করুন

  // FormData কে JSON অবজেক্টে রূপান্তর
  const rawData = Object.fromEntries(formData);
  
  // API URL নির্ধারণ
  const url = profileId 
    ? `${env.API_URL}/api/tutor/profile/` 
    : `${env.API_URL}/api/tutor/profile`;

  const response = await fetch(url, {
    method: profileId ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      // সরাসরি কুকি পাস করা বা হেডার থেকে টোকেন নিয়ে পাঠানো
      Authorization: `Bearer ${token}`, 
      Cookie: cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; "),
    },
    body: JSON.stringify({
      ...rawData,
      price: Number(rawData.price), // নিশ্চিত করা হচ্ছে এটি নাম্বার
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to save profile data");
  }

  // ক্যাশ ক্লিয়ার করা যাতে নতুন ডাটা দেখায়
  revalidatePath("/dashboard/profile"); 

  return { success: true, data: result.data };
}