import { NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt"
import { ROLE } from "./utils/types/roles";
import { jwtDecode } from "jwt-decode";



export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const homeURL = new URL('/home', request.url);
  const redirectScreenURL = new URL('/redirectScreen', request.url);
  const signInURL = new URL('/login', request.url);

  if (!token && request.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(signInURL);
  }

  if (token) {
    const decodedToken: any = jwtDecode(token as any);

    // Verifica a role para acessar a raiz
    if (request.nextUrl.pathname === '/' && decodedToken?.role !== ROLE.ADMIN && decodedToken?.role !== ROLE.SUPERADMIN) {
      return NextResponse.redirect(homeURL);
    }

    // Redireciona para '/redirectScreen' se não estiver nas rotas permitidas para ADMIN ou SUPERADMIN
    if (
      !['/dashboard', '/home','/redirectScreen'].includes(request.nextUrl.pathname) &&
      (decodedToken?.role === ROLE.ADMIN && decodedToken?.role === ROLE.SUPERADMIN)
    ) {
      return NextResponse.redirect(redirectScreenURL);
    }

    // Redireciona para '/home' se CUSTOMER ou OPERATOR tentar acessar '/dashboard'
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