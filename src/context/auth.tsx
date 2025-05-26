/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useMemo, useContext } from 'react'
import { USER_TOKEN } from '../@api/storage'
import { useNavigate } from 'react-router'

interface AuthContextProps {
  isLoggedIn: boolean
  logIn: () => Promise<void> | void
  logOut: () => Promise<void> | void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface User {
  name: string
  email: string
  isLoggedIn: boolean
}

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()

  const isLoggedIn = useMemo(() => !!user?.isLoggedIn, [user])

  const logIn = () => {
    localStorage.setItem(USER_TOKEN, 'true')
    setUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      isLoggedIn: true,
    })
  }

  const logOut = () => {
    localStorage.removeItem(USER_TOKEN)
    setUser({
      name: '',
      email: '',
      isLoggedIn: false,
    })
    navigate('/auth')
  }

  const loadUser = () => {
    const token = localStorage.getItem(USER_TOKEN)
    if (token) {
      setUser({
        name: 'John Doe',
        email: 'john.doe@example.com',
        isLoggedIn: true,
      })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
