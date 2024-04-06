import { api } from '@/services/api';
import { recoverUserInformation, singInRequest } from '@/services/auth';
import Router from 'next/router';
import { setCookie, parseCookies } from 'nookies';
import React, { createContext, useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

type User = {
  firstName: string;
  email: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  singIn: (data: SingInData) => Promise<void>;
  logout: () => Promise<void>;
};

type SingInData = {
  cpf: string;
  password: string;
};
export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider(props: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      recoverUserInformation({} as any).then((response) => {
        setUser(response.user as User);
      });
    }
  }, []);

  async function logout(): Promise<void> {
    setUser(null);
    setCookie(undefined, 'nextauth.token', '', { maxAge: -1 });
    Router.push('/login');
  }

  async function singIn({ cpf, password }: SingInData): Promise<void> {
    const { token, user: userData } = await singInRequest({ cpf, password });

    if (userData) {
      const { firstName, email } = userData ?? {};
      setUser({ firstName: firstName || '', email: email || '' });
    }

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1 /* NOTE: 1 hora */,
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    setUser(user);
    Router.push('/home');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, singIn, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
