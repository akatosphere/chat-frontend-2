import { NextResponse } from "next/server";

export const POST = async () => {
  const res = NextResponse.json({ success: true });

  // Удаляем refresh_token
  res.cookies.set({
    name: "refresh_token",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
};
