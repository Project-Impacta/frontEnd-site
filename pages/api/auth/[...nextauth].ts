import 'dotenv/config';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = process.env.API_URL ?? 'http://localhost:3333';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        cpf: { label: 'CPF', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${API_URL}/login/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              secret_origin: `${process.env.FRONTEND_ORIGIN}`,
              token: `${process.env.FRONTEND_TOKEN}`,
            },
            body: JSON.stringify({
              cpf: credentials?.cpf,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            throw new Error('Failed to authenticate');
          }

          const user = await res.json();

          if (user) {
            return {
              ...user,
              role: user.profile.type,
              accessToken: user.accessToken,
            };
          }

          return null;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/account-page',
    newUser: '/account-page',
  },
  session: {
    maxAge: 60 * 60, // 1 hora
  },
});
