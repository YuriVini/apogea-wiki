/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useMemo, useContext } from 'react'
import { USER_TOKEN } from '../@api/storage'
import { useNavigate } from 'react-router'
import { Api, ApiNoAuth } from '../@api/axios'
import { isEqual } from 'lodash'
import { toast } from 'react-toastify'
import { useLogin } from '../services/auth'

interface AuthContextProps {
  isLoggedIn: boolean
  isAdmin: boolean
  user: User
  loadingUser: boolean
  logIn: (data: { email: string; password: string }) => Promise<void>
  logOut: () => Promise<void> | void
  updateProfile: (data: { name: string; avatar_url: string; onSuccess: () => void }) => Promise<void>
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<void>
  recoverPassword: (data: { email: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface User {
  role: UserRole
  name: string
  email: string
  avatar_url: string
  isLoggedIn: boolean
  created_at: string
}

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [loadingUser, setLoadingUser] = useState(false)
  const [user, setUser] = useState<User>({
    role: UserRole.USER,
    name: '',
    email: '',
    avatar_url: '',
    isLoggedIn: false,
    created_at: '',
  })
  const navigate = useNavigate()
  const { mutate: mutateLogin } = useLogin()

  const isLoggedIn = useMemo(() => !!user?.isLoggedIn, [user])

  const logIn = async ({ email, password }: { email: string; password: string }) => {
    mutateLogin(
      { email, password },
      {
        onSuccess: async (response) => {
          localStorage.setItem(USER_TOKEN, response.token)
          await loadUser()
          navigate('/')
        },
        onError: (error) => {
          toast.error('Erro ao fazer login \n' + error?.data?.message)
        },
      }
    )
  }

  const logOut = () => {
    localStorage.removeItem(USER_TOKEN)
    setUser({
      role: UserRole.USER,
      name: '',
      email: '',
      avatar_url: '',
      isLoggedIn: false,
      created_at: '',
    })
    navigate('/')
  }

  const updateProfile = async ({ name, avatar_url, onSuccess }: { name: string; avatar_url: string; onSuccess: () => void }) => {
    try {
      const response = await Api.put<{ user: User }>('/me', {
        name: name,
        avatar_url: avatar_url,
      })
      console.log('teste1____________', response?.data)
      setUser({
        ...user,
        name: response?.data?.user?.name,
        isLoggedIn: true,
      })
      toast.success('Perfil atualizado com sucesso!')
      onSuccess()
    } catch (error) {
      const { data } = error as GlobalApiTypes.ErrorResponse
      console.log('teste2____________', error)
      toast.error('Erro ao atualizar perfil \n' + data?.message)
    }
  }

  const changePassword = async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
    try {
      await Api.put('/me/update-password', {
        current_password: currentPassword,
        new_password: newPassword,
      })
    } catch (error) {
      const { data } = error as GlobalApiTypes.ErrorResponse
      toast.error('Erro ao alterar senha \n' + data?.message)
    }
  }

  const recoverPassword = async ({ email }: { email: string }) => {
    try {
      await ApiNoAuth.post('/password/recover', {
        email: email,
      })
    } catch (error) {
      const { data } = error as GlobalApiTypes.ErrorResponse
      toast.error('Erro ao recuperar senha \n' + data?.message)
    }
  }

  const loadUser = async () => {
    const token = localStorage.getItem(USER_TOKEN)
    if (token) {
      setLoadingUser(true)
      try {
        const response = await Api.get('/me')
        if (!isEqual(response.data, user)) {
          setUser({
            isLoggedIn: true,
            name: response.data.name,
            role: response.data.role,
            email: response.data.email,
            avatar_url: response.data.avatar_url,
            created_at: response.data.created_at,
          })
        }
      } catch (error) {
        const { data, status } = error as GlobalApiTypes.ErrorResponse
        if (status === 404) {
          localStorage.removeItem(USER_TOKEN)
          logOut()
        }
        toast.error('Erro ao carregar usuário \n' + data?.message)
      } finally {
        setLoadingUser(false)
      }
    }
  }

  const isAdmin = useMemo(() => user.role === UserRole.ADMIN, [user])

  useEffect(() => {
    loadUser()
  }, [])

  return <AuthContext.Provider value={{ isLoggedIn, loadingUser, user, isAdmin, logIn, logOut, updateProfile, changePassword, recoverPassword }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
