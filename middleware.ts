import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from 'next-auth/middleware';
import { NextResponse } from 'next/server';

const middleware = (request: NextRequestWithAuth) => {
  console.log('[MIDDLEWARE_NEXT_AUTH_TOKEN]:', request.nextauth.token);

  const isPrivateRoutes = request.nextUrl.pathname.startsWith('/admin');

  const isAdminUser = request.nextauth.token?.role === 'admin';

  if (isPrivateRoutes && !isAdminUser) {
    // Se a rota é privada (começa com '/admin') e o usuário não é um administrador, redirecione para uma página de negação de acesso
    return NextResponse.redirect(new URL('/denied', request.url).toString());
  }

  // Se o usuário for um administrador ou se a rota não for privada, continue o fluxo normal
  return NextResponse.next();
};

const callbackOptions: NextAuthMiddlewareOptions = {};

export default withAuth(middleware, callbackOptions);

export const config = { matcher: ['/admin'] };
