/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useMemo, useContext } from 'react'
import { USER_TOKEN } from '../@api/storage'
import { useNavigate } from 'react-router'
import { Api, ApiNoAuth } from '../@api/axios'
import { isEqual } from 'lodash'

interface AuthContextProps {
  isLoggedIn: boolean
  logIn: (data: { email: string; password: string }) => Promise<void>
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

  const logIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await ApiNoAuth.post('/login', {
        email: email,
        password: password,
      })
      localStorage.setItem(USER_TOKEN, response.data.token)
      await loadUser()
      navigate('/')
    } catch (error) {
      console.error('Erro no login:', error)
      alert('Erro de conexão com o servidor')
    }
  }

  const logOut = () => {
    localStorage.removeItem(USER_TOKEN)
    setUser({
      name: '',
      email: '',
      isLoggedIn: false,
    })
    navigate('/')
  }

  const loadUser = async () => {
    const token = localStorage.getItem(USER_TOKEN)
    if (token) {
      try {
        const response = await Api.get('/me')
        if (!isEqual(response.data, user)) {
          setUser({
            name: response.data.name,
            email: response.data.email,
            isLoggedIn: true,
          })
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        logOut()
      }
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
