"use server";

import { cookies } from "next/headers";

export async function saveTokenToCookie(token: string | null) {
  const cookieStore = await cookies();

  if (token) {
    cookieStore.set({
      name: "accessToken",
      value: token,
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 30,
    });
  } else {
    cookieStore.delete("accessToken");
  }
}
