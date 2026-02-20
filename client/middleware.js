import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  // Public routes
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // If not logged in → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // RBAC checks
  if (pathname.startsWith("/applicant") && role !== "applicant") {
    return NextResponse.redirect(new URL("/recruiter", request.url));
  }

  if (pathname.startsWith("/recruiter") && role !== "recruiter") {
    return NextResponse.redirect(new URL("/applicant", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/applicant/:path*", "/recruiter/:path*"],
};