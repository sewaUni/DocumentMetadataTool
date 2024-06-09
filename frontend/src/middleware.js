import { NextResponse } from "next/server";
import { pbClient } from "@/lib/pocketbase";

export async function middleware(request) {
  // console.log(`[middleware] ${request.method} ${request.url}`);
  const isLoggedIn = await pbClient.isAuthenticated(request.cookies);
  const isAdmin = await pbClient.isAdmin(request.cookies);
  if (
    request.nextUrl.pathname &&
    request.nextUrl.pathname.startsWith("/auth")
  ) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    (request.nextUrl.pathname &&
      request.nextUrl.pathname.startsWith("/admin")) ||
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/papers")
  ) {
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/papers/:path*", "/dashboard/:path*", "/admin/:path*"],
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|papers/).*)"],
};
