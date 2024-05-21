import { NextResponse } from "next/server";
import { pbClient } from "@/lib/pocketbase";

export async function middleware(request) {
  console.log(`[middleware] ${request.method} ${request.url}`);
  const isLoggedIn = await pbClient.isAuthenticated(request.cookies);
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

  return NextResponse.next();
}

export const config = {
  matcher: ["/papers/:path*", "/dashboard/:path*"],
};
