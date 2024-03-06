import { NextRequest, NextResponse } from "next/server"

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;
  const signInURL = new URL('/login', request.url)
  const homeURL = new URL('/home', request.url)
  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(signInURL)
    }
    if (request.nextUrl.pathname === '/home') {
      return NextResponse.redirect(signInURL)
    }
  }
  if(request.nextUrl.pathname === '/'){
    return NextResponse.redirect(homeURL)
  }
  if(request.nextUrl.pathname === '/register'){
    return NextResponse.redirect(homeURL)
  }
}
export const config = {
  matcher: ['/','/home', '/dashboard/:path*']
}