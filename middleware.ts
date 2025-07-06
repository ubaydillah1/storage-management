// middleware.ts

import { NextResponse, type NextRequest } from "next/server";
import { validateUserSession } from "./lib/appwrite/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("appwrite-session")?.value;
  const user = session ? await validateUserSession(session) : null;
  const isPublicRoute = pathname === "/sign-in" || pathname === "/sign-up";

  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (user && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
