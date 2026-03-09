// export { auth as middleware } from "@/lib/auth";

// export const config = {
//   matcher: ["/admin/:path*"]
// };




import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {

  const url = req.nextUrl.clone()

  // Only protect /admin routes
  if (url.pathname.startsWith("/admin")) {

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    // Not logged in → redirect to login
    if (!token) {
      url.pathname = "/login"
      return NextResponse.redirect(url)
    }

    // Not admin → redirect to home
    if (token.role !== "admin") {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

// Only run middleware on /admin routes
export const config = {
  matcher: ["/admin/:path*"],
}