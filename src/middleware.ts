import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"
import { ROLE } from "./utils/types/roles";



export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const decodedToken: any = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  const homeURL = new URL('/home', request.url)
  const signInURL = new URL('/login', request.url)

  if (!token) {
    if (request.nextUrl.pathname !== '/login') {
      return NextResponse.redirect(signInURL)
    }
  }
  if (token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(homeURL)
    }
    if (request.nextUrl.pathname === '/register') {
      return NextResponse.redirect(homeURL)
    }
    if (request.nextUrl.pathname === '/login') {
      return NextResponse.redirect(homeURL)
    }
    if (request.nextUrl.pathname === '/dashboard' && decodedToken?.user?.role === ROLE.CUSTOMER || decodedToken?.user?.role === ROLE.OPERATOR) {
      return NextResponse.redirect(homeURL)
    }
  }
}
export const config = {
  matcher: ['/', '/login', '/register', '/home', '/dashboard']
}