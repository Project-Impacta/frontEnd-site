import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const middleware = (request: NextRequestWithAuth) => {
  console.log('[MIDDLEWARE_NEXT_AUTH_TOKEN]:', request.nextauth.token);

  const isPrivateRoutes = request.nextUrl.pathname.startsWith('/admin');

  const isAdminUser = request.nextauth.token?.type === 'admin';

  if (isPrivateRoutes && isAdminUser) {
    return NextResponse.rewrite(new URL('denied', request.url));
  }
};
const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = { matcher: ['/admin'] };
