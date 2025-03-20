import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Add any middleware logic here

  // For example, you could redirect certain paths to the 404 page
  const url = request.nextUrl.clone();

  // Check for known non-existent paths that should show the 404 page
  if (
    url.pathname.startsWith("/old-page") ||
    url.pathname.startsWith("/deleted-section")
  ) {
    url.pathname = "/not-found";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    // Add paths that should be checked by the middleware
    "/old-page/:path*",
    "/deleted-section/:path*",
  ],
};
