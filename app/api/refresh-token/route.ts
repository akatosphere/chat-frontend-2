"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  console.log("cookieStore", cookieStore.get("refresh_token")?.value);
  const refreshToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc3MDE1NjY3NiwiaWF0IjoxNzY3NTY0Njc2LCJqdGkiOiI4NGRjNTc2ZTA1ZGM0ZWU4YTQwNzBhNDM0N2QwZTJlYSIsInVzZXJfaWQiOiI1NzNjZjBmYi01YzFmLTQwYjctYmMxOS0zODdkNjQ0ODM1ZmMifQ.rGVZkuGND9wZyL2-wOvcHLdrlDnC3Sg0yZnE5dkLuiI";
  if (!refreshToken) {
    console.log("result");
    return NextResponse.json({ error: "Нет refresh токена" }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login/refresh/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    console.log("res", res);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.detail || "Ошибка обновления refresh токена" },
        { status: 401 },
      );
    }

    if (data.refresh) {
      cookieStore.set({
        name: "refresh_token",
        value: data.refresh,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return NextResponse.json({ access: data.access });
  } catch {
    return NextResponse.json({ error: "Серверная ошибка" }, { status: 500 });
  }
}
