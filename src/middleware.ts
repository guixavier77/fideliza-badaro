import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"
import { ROLE } from "./utils/types/roles";
import { jwtDecode } from "jwt-decode";



export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const homeURL = new URL('/home', request.url);
  const signInURL = new URL('/login', request.url);
  const dashboardURL = new URL('/dashboard', request.url);

  if (!token && request.nextUrl.pathname !== '/login' && request.nextUrl.pathname !== '/register' && request.nextUrl.pathname !== '/accountRecovery') {
    return NextResponse.redirect(signInURL);
  }

  if (token) {
    const decodedToken: any = jwtDecode(token as any);

    if (request.nextUrl.pathname === '/' && decodedToken?.role !== ROLE.ADMIN && decodedToken?.role !== ROLE.SUPERADMIN) {
      return NextResponse.redirect(homeURL);
    } 
      
    if (request.nextUrl.pathname === '/'){
      return NextResponse.redirect(dashboardURL);
    }
    
    if (
      request.nextUrl.pathname === '/dashboard' &&
      (decodedToken?.role === ROLE.CUSTOMER || decodedToken?.role === ROLE.OPERATOR)
    ) {
      return NextResponse.redirect(homeURL);
    }
  }
}

export const config = {
  matcher: ['/', '/login', '/home', '/dashboard', '/redirectScreen', '/register','/accountRecovery']
}