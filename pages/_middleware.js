import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token is exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;
  // Allow the request if the following is true
  // 1) It is a request for next-auth session & provider fetching
  // 2) the token exists
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect them to login page if they dont have token AND are requeeting the protected route
  if (!token && pathname !== "/login") {
    console.log("redirecting to login");
    return NextResponse.redirect("/login");
  }
}
