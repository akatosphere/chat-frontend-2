import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/chat", "/auth/user", "/auth/success"];
const authRoutes = ["/auth", "/auth/phone", "/auth/code", "/auth/support", "/auth/support/success"];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

  const isAuthRoute = authRoutes.includes(path);

  if (isProtectedRoute && !refreshToken) {
    const url = new URL("/auth", request.url);
    url.searchParams.set("from", path);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && refreshToken) {
    const redirectTo = request.nextUrl.searchParams.get("from") || "/chat";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
