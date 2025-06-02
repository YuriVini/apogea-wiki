import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useAuth } from '../../../context/auth'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'

const profileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  avatar_url: z.string().url('URL do avatar deve ser válida').optional().or(z.literal('')),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z.string().min(6, 'Nova senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

export const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const nameInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      avatar_url: user?.avatar_url || '',
    },
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile({
        name: data.name,
        avatar_url: data.avatar_url || '',
      })
      setIsEditing(false)
      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar perfil')
    }
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })
      setIsChangingPassword(false)
      resetPassword()
      setShowCurrentPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)
      toast.success('Senha alterada com sucesso!')
    } catch {
      toast.error('Erro ao alterar senha. Verifique se a senha atual está correta.')
    }
  }

  const handleEditClick = () => {
    setIsEditing(true)
    reset({
      name: user?.name || '',
      avatar_url: user?.avatar_url || '',
    })
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    reset()
  }

  const handleChangePasswordClick = () => {
    setIsChangingPassword(true)
    resetPassword()
  }

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false)
    resetPassword()
    setShowCurrentPassword(false)
    setShowNewPassword(false)
    setShowConfirmPassword(false)
  }

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus()
    }
  }, [isEditing])

  return (
    <div>
      <Header />
      <main className='max-w-4xl mx-auto p-6'>
        <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg'>
          <h1 className='text-3xl font-bold text-white mb-8 text-center'>Meu Perfil</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Informações do Usuário */}
            <div className='bg-gray-700/30 rounded-lg p-6'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-white'>Informações Pessoais</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className='bg-blue-500/20 text-blue-300 p-2 rounded border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-105'
                  >
                    ✏️
                  </button>
                )}
              </div>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-2'>Nome</label>
                    <input
                      {...register('name')}
                      ref={nameInputRef}
                      className='w-full bg-gray-600/30 rounded-lg p-3 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none'
                      placeholder='Digite seu nome'
                    />
                    {errors.name && <p className='text-red-400 text-sm mt-1'>{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-2'>Email</label>
                    <div className='bg-gray-600/30 rounded-lg p-3 text-gray-400'>{user?.email || 'Email não informado'} (não editável)</div>
                  </div>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-2'>Membro desde</label>
                    <div className='bg-gray-600/30 rounded-lg p-3 text-white'>Março 2024</div>
                  </div>
                  <div className='flex space-x-2 pt-4'>
                    <button
                      type='submit'
                      disabled={isSubmitting}
                      className='bg-green-500/20 text-green-300 px-4 py-2 rounded border border-green-400/30 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                      type='button'
                      onClick={handleCancelEdit}
                      className='bg-gray-500/20 text-gray-300 px-4 py-2 rounded border border-gray-400/30 hover:bg-gray-500/30 transition-colors'
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                <div className='space-y-4'>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-2'>Nome</label>
                    <div className='bg-gray-600/30 rounded-lg p-3 text-white'>{user?.name || 'Nome não informado'}</div>
                  </div>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-2'>Email</label>
                    <div className='bg-gray-600/30 rounded-lg p-3 text-white'>{user?.email || 'Email não informado'}</div>
                  </div>
                  <div>
                    <label className='block text-gray-300 text-sm font-medium mb-2'>Membro desde</label>
                    <div className='bg-gray-600/30 rounded-lg p-3 text-white'>Março 2024</div>
                  </div>
                </div>
              )}
            </div>

            {/* Estatísticas */}
            <div className='bg-gray-700/30 rounded-lg p-6'>
              <h2 className='text-xl font-bold text-white mb-4'>Estatísticas</h2>
              <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-300'>Guias Criados</span>
                  <span className='text-white font-bold'>5</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-300'>Guias Favoritos</span>
                  <span className='text-white font-bold'>12</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-300'>Comentários</span>
                  <span className='text-white font-bold'>23</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-gray-300'>Curtidas Recebidas</span>
                  <span className='text-white font-bold'>87</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alterar Senha */}
          {isChangingPassword && (
            <div className='mt-8 bg-gray-700/30 rounded-lg p-6'>
              <h2 className='text-xl font-bold text-white mb-4'>Alterar Senha</h2>
              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className='space-y-4'>
                <div>
                  <label className='block text-gray-300 text-sm font-medium mb-2'>Senha Atual</label>
                  <div className='relative'>
                    <input
                      {...registerPassword('currentPassword')}
                      type={showCurrentPassword ? 'text' : 'password'}
                      className='w-full bg-gray-600/30 rounded-lg p-3 pr-12 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none'
                      placeholder='Digite sua senha atual'
                    />
                    <button
                      type='button'
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                    >
                      {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && <p className='text-red-400 text-sm mt-1'>{passwordErrors.currentPassword.message}</p>}
                </div>
                <div>
                  <label className='block text-gray-300 text-sm font-medium mb-2'>Nova Senha</label>
                  <div className='relative'>
                    <input
                      {...registerPassword('newPassword')}
                      type={showNewPassword ? 'text' : 'password'}
                      className='w-full bg-gray-600/30 rounded-lg p-3 pr-12 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none'
                      placeholder='Digite sua nova senha'
                    />
                    <button
                      type='button'
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                    >
                      {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordErrors.newPassword && <p className='text-red-400 text-sm mt-1'>{passwordErrors.newPassword.message}</p>}
                </div>
                <div>
                  <label className='block text-gray-300 text-sm font-medium mb-2'>Confirmar Nova Senha</label>
                  <div className='relative'>
                    <input
                      {...registerPassword('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className='w-full bg-gray-600/30 rounded-lg p-3 pr-12 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none'
                      placeholder='Confirme sua nova senha'
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors'
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && <p className='text-red-400 text-sm mt-1'>{passwordErrors.confirmPassword.message}</p>}
                </div>
                <div className='flex space-x-2 pt-4'>
                  <button
                    type='submit'
                    disabled={isSubmittingPassword}
                    className='bg-green-500/20 text-green-300 px-4 py-2 rounded border border-green-400/30 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isSubmittingPassword ? 'Alterando...' : 'Alterar Senha'}
                  </button>
                  <button
                    type='button'
                    onClick={handleCancelPasswordChange}
                    className='bg-gray-500/20 text-gray-300 px-4 py-2 rounded border border-gray-400/30 hover:bg-gray-500/30 transition-colors'
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Meus Guias */}
          <div className='mt-8 bg-gray-700/30 rounded-lg p-6'>
            <h2 className='text-xl font-bold text-white mb-4'>Meus Guias</h2>
            <div className='space-y-3'>
              <div className='bg-gray-600/30 rounded-lg p-4 flex justify-between items-center'>
                <div>
                  <h3 className='text-white font-medium'>Guia Completo para Iniciantes</h3>
                  <p className='text-gray-400 text-sm'>Criado em 15/03/2024 • 234 visualizações</p>
                </div>
                <div className='flex space-x-2'>
                  <button className='bg-blue-500/20 text-blue-300 px-3 py-1 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors'>Editar</button>
                  <button className='bg-red-500/20 text-red-300 px-3 py-1 rounded border border-red-400/30 hover:bg-red-500/30 transition-colors'>Excluir</button>
                </div>
              </div>

              <div className='bg-gray-600/30 rounded-lg p-4 flex justify-between items-center'>
                <div>
                  <h3 className='text-white font-medium'>Melhores Builds para Mage</h3>
                  <p className='text-gray-400 text-sm'>Criado em 10/03/2024 • 156 visualizações</p>
                </div>
                <div className='flex space-x-2'>
                  <button className='bg-blue-500/20 text-blue-300 px-3 py-1 rounded border border-blue-400/30 hover:bg-blue-500/30 transition-colors'>Editar</button>
                  <button className='bg-red-500/20 text-red-300 px-3 py-1 rounded border border-red-400/30 hover:bg-red-500/30 transition-colors'>Excluir</button>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className='mt-8 flex justify-center space-x-4'>
            {!isChangingPassword && (
              <button
                onClick={handleChangePasswordClick}
                className='bg-gray-500/20 text-gray-300 px-6 py-2 rounded-lg border border-gray-400/30 hover:bg-gray-500/30 hover:border-gray-300/50 transition-all duration-300 hover:scale-105'
              >
                Alterar Senha
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
