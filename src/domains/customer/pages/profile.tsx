import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useAuth } from '../../../context/auth'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { TextInput } from '../../../components/text-input'

const profileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  avatar_url: z.string().url('URL do avatar deve ser válida').optional().or(z.literal('')),
  email: z.string().email('Email deve ser válido').optional().or(z.literal('')),
  created_at: z.string().optional(),
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

  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    formState: { isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatar_url: user?.avatar_url || '',
      created_at: new Date(user?.created_at || new Date()).toLocaleDateString('pt-BR') || '',
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
    await updateProfile({
      name: data.name,
      avatar_url: data.avatar_url || '',
      onSuccess: () => {
        setIsEditing(false)
        setValue('name', data.name)
      },
    })
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
    setFocus('name')
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

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="bg-gray-800/30 rounded-lg p-4 sm:p-8 shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 text-center">Meu Perfil</h1>

          <div className="space-y-6 sm:space-y-8">
            {/* Informações do Usuário */}
            <div className="bg-gray-700/30 rounded-lg p-4 sm:p-6 w-full">
              <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6 gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-600 bg-gray-900 flex items-center justify-center">
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl text-gray-500">
                        {user?.name?.[0]?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                    <h2 className="text-xl font-bold text-white mb-2 sm:mb-0">Informações Pessoais</h2>
                    {!isEditing && (
                      <button
                        onClick={handleEditClick}
                        className="bg-blue-500/20 text-blue-300 p-2 rounded border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-300/50 transition-all duration-300 hover:scale-105"
                        title="Editar perfil"
                      >
                        ✏️
                      </button>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm">
                    Visualize e edite suas informações pessoais.
                  </p>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <TextInput
                    title="Nome"
                    name="name"
                    control={control}
                    disabled={!isEditing}
                    placeholder="Digite seu nome"
                    className="w-full bg-gray-600/30 rounded-lg p-3 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none"
                  />
                  <TextInput
                    title="Email"
                    name="email"
                    control={control}
                    disabled
                    className="w-full bg-gray-600/30 rounded-lg p-3 text-white border border-gray-500/30"
                  />
                  <TextInput
                    title="Membro desde"
                    name="created_at"
                    control={control}
                    disabled
                    className="w-full bg-gray-600/30 rounded-lg p-3 text-white border border-gray-500/30"
                  />
                  <TextInput
                    title="Avatar URL"
                    name="avatar_url"
                    control={control}
                    disabled={!isEditing}
                    placeholder="URL do seu avatar"
                    className="w-full bg-gray-600/30 rounded-lg p-3 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none"
                  />
                </div>
                {isEditing && (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-green-500/20 text-green-300 px-4 py-2 rounded border border-green-400/30 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                    >
                      {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-500/20 text-gray-300 px-4 py-2 rounded border border-gray-400/30 hover:bg-gray-500/30 transition-colors w-full sm:w-auto"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Alterar Senha */}
          {isChangingPassword && (
            <div className="mt-6 sm:mt-8 bg-gray-700/30 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl font-bold text-white mb-4">Alterar Senha</h2>
              <form onSubmit={handleSubmitPassword(onPasswordSubmit)} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Senha Atual</label>
                  <div className="relative">
                    <input
                      {...registerPassword('currentPassword')}
                      type={showCurrentPassword ? 'text' : 'password'}
                      className="w-full bg-gray-600/30 rounded-lg p-3 pr-12 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none"
                      placeholder="Digite sua senha atual"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showCurrentPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.currentPassword.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Nova Senha</label>
                  <div className="relative">
                    <input
                      {...registerPassword('newPassword')}
                      type={showNewPassword ? 'text' : 'password'}
                      className="w-full bg-gray-600/30 rounded-lg p-3 pr-12 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none"
                      placeholder="Digite sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showNewPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordErrors.newPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.newPassword.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Confirmar Nova Senha</label>
                  <div className="relative">
                    <input
                      {...registerPassword('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full bg-gray-600/30 rounded-lg p-3 pr-12 text-white border border-gray-500/30 focus:border-blue-400/50 focus:outline-none"
                      placeholder="Confirme sua nova senha"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && <p className="text-red-400 text-sm mt-1">{passwordErrors.confirmPassword.message}</p>}
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmittingPassword}
                    className="bg-green-500/20 text-green-300 px-4 py-2 rounded border border-green-400/30 hover:bg-green-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    {isSubmittingPassword ? 'Alterando...' : 'Alterar Senha'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelPasswordChange}
                    className="bg-gray-500/20 text-gray-300 px-4 py-2 rounded border border-gray-400/30 hover:bg-gray-500/30 transition-colors w-full sm:w-auto"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* Ações */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            {!isChangingPassword && (
              <button
                onClick={handleChangePasswordClick}
                className="bg-gray-500/20 text-gray-300 px-6 py-2 rounded-lg border border-gray-400/30 hover:bg-gray-500/30 hover:border-gray-300/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
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
