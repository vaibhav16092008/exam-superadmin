import Cookies from "js-cookie";
// import { token, tokenTitle } from "./utils/connection";
import { NextResponse } from "next/server";
import { tokenTitle } from "./utils/connection";

export function middleware(request) {
  const tokenValue = request.cookies.get(tokenTitle)?.value;
  const pathname = request.nextUrl.pathname;

  if (tokenValue && pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }
  if ((tokenValue && pathname.startsWith("/login")) || pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (!tokenValue && (pathname.startsWith("/dashboard") || pathname === "/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
