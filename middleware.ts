import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  if (token) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/register') {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = 'dashboard';
      return NextResponse.redirect(targetUrl);
    }

    return NextResponse.next();
  }

  if (!token) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/dashboard')) {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = '/';
      return NextResponse.redirect(targetUrl);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/login/:path*', '/dashboard/:path*', '/:path*'],
};
