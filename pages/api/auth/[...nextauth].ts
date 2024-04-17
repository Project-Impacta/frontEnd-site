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
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const customUser = user as unknown as any;
      if (user) {
        return {
          ...token,
          customUser,
        };
      }
      return token;
    },

    async session({ session, token }) {
      const customToken = token as unknown as any;
      if (token) {
        return {
          ...session,
          customToken,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});
