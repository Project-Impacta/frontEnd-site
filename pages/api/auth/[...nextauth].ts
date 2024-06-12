import {
  API_URL,
  FRONTEND_ORIGIN,
  FRONTEND_TOKEN,
  NEXTAUTH_SECRET,
} from 'environment';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        cpf: { label: 'CPF', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const secret_origin = FRONTEND_ORIGIN ?? '';
        const token = FRONTEND_TOKEN ?? '';

        console.log('Sending request to API with credentials:', {
          cpf: credentials?.cpf,
          password: credentials?.password,
        });
        console.log('Headers:', {
          'Content-Type': 'application/json',
          secret_origin,
          token,
        });

        const res = await fetch(`${API_URL}/login/auth`, {
          method: 'POST',
          body: JSON.stringify({
            cpf: credentials?.cpf,
            password: credentials?.password,
          }),
          headers: {
            'Content-Type': 'application/json',
            secret_origin,
            token,
          },
        });

        if (!res.ok) {
          console.error('Error from API:', res.status, res.statusText);
          return null;
        }

        const user = await res.json();

        console.log('User received from API:', user);

        if (user) {
          return {
            ...user,
            role: user.profile.type,
            token: user.token,
          };
        }
        return null;
      },
    }),
  ],
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.cpf = user.cpf;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.cpf = token.cpf as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/account-page',
    newUser: '/account-page',
  },
});
