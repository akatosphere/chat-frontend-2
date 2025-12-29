import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/chats", "/auth/success", "settings"];
const authRoutes = [
  "/auth",
  "/auth/phone",
  "/auth/code",
  "/auth/support",
  "/auth/support/success",
  "/auth/user",
];

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isFilled = request.cookies.get("is_filled")?.value === "true";

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  // 1. Защита приватных маршрутов
  if (isProtectedRoute && !refreshToken) {
    const url = new URL("/auth", request.url);
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  // 1a. Пользователь авторизован, но профиль не заполнен → редирект на страницу заполнения
  if (isProtectedRoute && refreshToken && !isFilled) {
    return NextResponse.redirect(new URL("/auth/user", request.url));
  }

  // 2. Перенаправление авторизованных пользователей с auth-страниц
  if (isAuthRoute && refreshToken && isFilled) {
    const redirectTo = request.nextUrl.searchParams.get("from") || "/chats";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (path === "/auth/user" && !refreshToken) {
    return NextResponse.redirect(new URL("/auth/phone", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
