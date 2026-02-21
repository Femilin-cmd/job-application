import { NextResponse } from "next/server";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request) {
  const tokenCookie = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  // Allow public routes
  if (
    pathname === "/" ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/register")
  ) {
    return NextResponse.next();
  }

  if (!tokenCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = parseJwt(tokenCookie.value);
  const role = decoded?.role;

  // Block applicant from recruiter
  if (pathname.startsWith("/recruiter") && role === "applicant") {
    return NextResponse.redirect(new URL("/applicant", request.url));
  }

  // Block recruiter from applicant
  if (pathname.startsWith("/applicant") && role === "recruiter") {
    return NextResponse.redirect(new URL("/recruiter", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};