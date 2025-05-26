/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useMemo, useContext } from 'react'
import { USER_TOKEN } from '../@api/storage'
import { useNavigate } from 'react-router'
import { Api, ApiNoAuth } from '../@api/axios'
import { isEqual } from 'lodash'

interface AuthContextProps {
  isLoggedIn: boolean
  user: User
  logIn: (data: { email: string; password: string }) => Promise<void>
  logOut: () => Promise<void> | void
  updateProfile: (data: { name: string; avatar_url: string }) => Promise<void>
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>
  recoverPassword: (data: { email: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

interface User {
  name: string
  email: string
  avatar_url: string
  isLoggedIn: boolean
}

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    avatar_url: '',
    isLoggedIn: false,
  })
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
      alert('Erro ao fazer login \n' + JSON.stringify(error))
    }
  }

  const logOut = () => {
    localStorage.removeItem(USER_TOKEN)
    setUser({
      name: '',
      email: '',
      avatar_url: '',
      isLoggedIn: false,
    })
    navigate('/')
  }

  const updateProfile = async ({ name, avatar_url }: { name: string; avatar_url: string }) => {
    try {
      const response = await Api.put('/me', {
        name: name,
        avatar_url: avatar_url,
      })
      setUser({
        name: response.data.name,
        email: response.data.email,
        avatar_url: response.data.avatar_url,
        isLoggedIn: true,
      })
    } catch (error) {
      alert('Erro ao atualizar perfil \n' + JSON.stringify(error))
    }
  }

  const changePassword = async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
    try {
      await Api.put('/me/update-password', {
        current_password: currentPassword,
        new_password: newPassword,
      })
    } catch (error) {
      alert('Erro ao alterar senha \n' + JSON.stringify(error))
    }
  }

  const recoverPassword = async ({ email }: { email: string }) => {
    try {
      await ApiNoAuth.post('/password/recover', {
        email: email,
      })
    } catch (error) {
      alert('Erro ao recuperar senha \n' + JSON.stringify(error))
    }
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
            avatar_url: response.data.avatar_url,
            isLoggedIn: true,
          })
        }
      } catch (error) {
        alert('Erro ao carregar usuário \n' + JSON.stringify(error))
      }
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, user, logIn, logOut, updateProfile, changePassword, recoverPassword }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
