import { jwtDecode } from 'jwt-decode'
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface User {
  cpf: string
  firstName: string
}

interface AuthContextType {
  user: User | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decodedToken: any = jwtDecode(token)
      setUser(decodedToken.user)
    }
  }, [])

  const login = (token: string) => {
    const decodedToken: any = jwtDecode(token)
    setUser(decodedToken.user)
    localStorage.setItem('accessToken', token)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('accessToken')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
