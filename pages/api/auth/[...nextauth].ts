import 'dotenv/config';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = 'http://localhost:3333';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        cpf: { label: 'CPF', type: 'string' },
        password: { label: 'Password', type: 'Password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${API_URL}/login/auth`, {
          method: 'POST',
          body: JSON.stringify({
            cpf: credentials?.cpf,
            password: credentials?.password,
          }),
          headers: {
            'Content-Type': 'application/json',
            secret_origin: `${process.env.FRONTEND_ORIGIN}`,
            token: `${process.env.FRONTEND_TOKEN}`,
          },
        });
        const user = await res.json();
        if (res.ok && user) {
          return {
            ...user,
            role: user.profile.type,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: token,
          /*BUG - TOKEN NÃO ESTÁ ESPIRANDO*/
          maxAge: 60 * 60 * 1 /* NOTE: 1 hora */,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/account-page',
    newUser: '/account-page',
  },
});
