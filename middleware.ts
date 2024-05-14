import {
  NextAuthMiddlewareOptions,
  NextRequestWithAuth,
  withAuth,
} from 'next-auth/middleware';
import { NextResponse } from 'next/server';

// Definindo um tipo personalizado que inclui a propriedade 'authorize'
interface CustomNextAuthMiddlewareOptions extends NextAuthMiddlewareOptions {
  authorize: (req: NextRequestWithAuth, res: any) => Promise<boolean>;
}

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

// Definindo as opções de middleware personalizado
const callbackOptions: CustomNextAuthMiddlewareOptions = {
  authorize: async (req) => {
    // Aqui você pode acessar as informações do usuário através de req.nextauth.token
    // Verifique se o token contém as informações necessárias
    const userRole = req.nextauth.token?.role;

    // Verifique se o usuário tem a permissão necessária
    if (userRole === 'admin') {
      return true; // Permita o acesso
    } else {
      return false; // Negue o acesso
    }
  },
};

// Aplicando o middleware personalizado
export default withAuth(middleware, callbackOptions);

export const config = { matcher: ['/admin'] };
