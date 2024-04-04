import React, { createContext, useContext, useState, ReactNode } from 'react'

// Definição do tipo para os dados do usuário
type User = {
  cpf: string
  username: string
  email: string
}

// Definição do tipo para o contexto
type AuthContextType = {
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Props do AuthProvider
type AuthProviderProps = {
  children: ReactNode
}

// Componente de provedor de autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Função para realizar o login do usuário
  const login = (userData: User) => {
    setUser(userData)
  }

  // Função para realizar o logout do usuário
  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
