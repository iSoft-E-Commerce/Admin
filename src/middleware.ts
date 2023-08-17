export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/',
    '/type/:path*',
    '/products/:path*',
    '/contacts/:path*',
    '/users/:path*',
  ],
};
