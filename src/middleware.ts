import { NextRequest,NextResponse } from "next/server"

export default function middleware(request:NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;
  const signInURL = new URL('/login',request.url)
  if(!token) {
    if(request.nextUrl.pathname === '/home'){
      return NextResponse.redirect(signInURL)
    }
  } 
}
export const config = {
  matcher: [ '/home', '/dashboard/:path*']
}