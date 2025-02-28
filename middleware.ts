import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PROTECTED_ROUTES = [
  "/dashboard",
  "/users",
  "/services",
  "/plinc",
  "/wallet",
  "/transactions",
  "/validations",
  "/content",
  "/support",
  "/settings",
];

const isProtectedRoute = (pathname: string) => {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname)) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      // Rediriger vers la page de connexion
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === "/login") {
    const token = request.cookies.get("auth-token")?.value;

    if (token) {
      const url = request.nextUrl.clone();
      const from = request.nextUrl.searchParams.get("from");
      url.pathname = from || "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/users",
    "/users/:path*",
    "/services",
    "/services/:path*",
    "/plinc",
    "/plinc/:path*",
    "/wallet",
    "/wallet/:path*",
    "/transactions",
    "/transactions/:path*",
    "/validations",
    "/validations/:path*",
    "/content",
    "/content/:path*",
    "/support",
    "/support/:path*",
    "/settings",
    "/settings/:path*",
    "/login",
  ],
};
