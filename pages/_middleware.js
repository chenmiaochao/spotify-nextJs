import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  //Token is exist if user is logged in
  const token = getToken({ req, secret: process.env.JWT_SECRET });
  const {pathname}= req.nextUrl
  // Allow the request if the following is true
  // 1) It is a request for next-auth session & provider fetching
  // 2) the token exists
  if(pathname.includes("/api/auth") || token)
}
