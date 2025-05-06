import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next(); // Do nothing for now
}

export const config = {
  matcher: [], // Empty matcher disables the middleware
};



// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const DOMAIN_HOST = process.env.NEXT_PUBLIC_DOMAIN_HOST;

// const ROLE_CONFIG = {
//   admin: {
//     loginPath: "/webapp/auth/admin/login",
//     validationUrl: `${DOMAIN_HOST}/api/v1/session/valid/admin`,
//   },
//   owner: {
//     loginPath: "/webapp/auth/pet-owner/login",
//     validationUrl: `${DOMAIN_HOST}/api/v1/session/valid/pet-owner`,
//   },
// };

// // Function to validate session
// async function validateSession(
//   request: NextRequest,
//   role: "admin" | "owner"
// ): Promise<NextResponse | null> {
//   const { loginPath, validationUrl } = ROLE_CONFIG[role];
//   const token = request.headers.get("Authorization")?.replace("Bearer ", "");

//   if (!token) {
//     console.log(`No ${role} token found in headers, redirecting to ${loginPath}`);
//     return NextResponse.redirect(new URL(loginPath, request.url));
//   }

//   try {
//     const response = await fetch(validationUrl, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       console.log(`${role} token validation failed, redirecting to ${loginPath}`);
//       return NextResponse.redirect(new URL(loginPath, request.url));
//     }

//     console.log(`${role} token validated successfully`);
//     return null; // Validation passed, no redirect needed
//   } catch (error) {
//     console.error(`Error validating ${role} token:`, error);
//     return NextResponse.redirect(new URL(loginPath, request.url));
//   }
// }

// export async function middleware(request: NextRequest) {
//   console.log("Middleware triggered for:", request.nextUrl.pathname);

//   if (request.nextUrl.pathname.startsWith("/webapp/admin")) {
//     const response = await validateSession(request, "admin");
//     if (response) return response;
//   }

//   if (request.nextUrl.pathname.startsWith("/webapp/pet-owner")) {
//     const response = await validateSession(request, "owner");
//     if (response) return response;
//   }

//   return NextResponse.next(); // Allow the request to proceed if no validation is required
// }

// // Configure which paths should trigger this middleware
// export const config = {
//   matcher: [
//     "/webapp/admin/:path*", // Apply middleware to all admin routes
//     "/webapp/pet-owner/:path*", // Apply middleware to all owner routes
//   ],
// };