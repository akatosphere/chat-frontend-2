import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/chat", "/auth/success"];
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
  const isAuthenticated = request.cookies.get("is_authenticated")?.value === "true";
  const isAuth = refreshToken && isAuthenticated;
  const isFilled = request.cookies.get("is_filled")?.value === "true";

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  // 1. Защита приватных маршрутов
  if (isProtectedRoute && !isAuth) {
    const url = new URL("/auth", request.url);
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  // 1a. Пользователь авторизован, но профиль не заполнен → редирект на страницу заполнения
  if (isProtectedRoute && isAuth && !isFilled) {
    return NextResponse.redirect(new URL("/auth/user", request.url));
  }

  // 2. Перенаправление авторизованных пользователей с auth-страниц
  if (isAuthRoute && isAuth && isFilled) {
    const redirectTo = request.nextUrl.searchParams.get("from") || "/chat";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  // 3. если есть refresh_token и isAuthenticated, запретить доступ к /auth/code
  if (path === "/auth/code" && isAuth) {
    return NextResponse.redirect(new URL("/auth/phone", request.url));
  }

  // 4. сброс статуса аутентификации при переходе на страницу ввода телефона
  if (path === "/auth/phone") {
    const res = NextResponse.next();
    res.cookies.set("is_authenticated", "false", { path: "/" });
    return res;
  }

  // 5. запрет на доступ к странице /auth/user не авторизованным пользователям
  if (path === "/auth/user" && !isAuth) {
    return NextResponse.redirect(new URL("/auth/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
