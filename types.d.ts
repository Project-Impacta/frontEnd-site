import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
      cpf: string;
      token: string;
    } & DefaultSession['user'];
  }

  interface User {
    role: string;
    cpf: string;
    token: string;
  }
}
