import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
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
    const protectedPaths = [
      '/dashboard',
      '/products',
      '/products/:path*',
      '/settings-message',
      '/messages',
      '/orders',
      '/orders/:path*',
      '/profile',
    ];

    if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
      const targetUrl = new URL(request.url);
      targetUrl.pathname = '/';
      return NextResponse.redirect(targetUrl);
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/login/:path*',
    '/dashboard/:path*',
    '/introduce-product/:path*',
    '/settings-message/:path*',
    '/messages/:path*',
    '/orders/:path*',
    '/profile/:path*',
    '/products/:path*',
    '/:path*',
  ],
};
