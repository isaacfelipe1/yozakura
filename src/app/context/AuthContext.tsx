import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import Cookies from 'js-cookie'

interface AuthContextType {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loggedIn = !!Cookies.get('isLoggedIn')
    setIsLoggedIn(loggedIn)
    setLoading(false)
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    Cookies.set('isLoggedIn', 'true')
  }

  const logout = () => {
    setIsLoggedIn(false)
    Cookies.remove('isLoggedIn')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
