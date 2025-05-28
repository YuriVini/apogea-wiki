import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { TextInput } from '../../../components/text-input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router'
import { ApiNoAuth } from '../../../@api/axios'

const validationSchema = z
  .object({
    password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
    confirmPassword: z.string().min(6, 'A confirmação de senha deve conter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não coincidem',
    path: ['confirmPassword'],
  })

export const ResetPassword = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const handleResetPassword = async (data: z.infer<typeof validationSchema>) => {
    try {
      await ApiNoAuth.post('/password/reset', {
        token: token,
        password: data.password,
        password_confirmation: data.confirmPassword,
      })
      alert('Senha redefinida com sucesso!')
      navigate('/login')
    } catch (error) {
      console.error('Erro ao redefinir senha:', error)
      alert('Erro ao redefinir senha. Verifique se o link é válido.')
    }
  }

  if (!token) {
    return (
      <div>
        <div className='min-h-screen bg-gray-900'>
          <Header />
          <div className='flex items-center justify-center py-12'>
            <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-md w-full mx-4'>
              <h1 className='text-3xl font-bold text-white text-center mb-8'>Link Inválido</h1>
              <p className='text-gray-300 text-center mb-6'>O link para redefinir senha é inválido ou expirou.</p>
              <div className='text-center'>
                <a href='/forgot-password' className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
                  Solicitar novo link
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <div className='min-h-screen bg-gray-900'>
        <Header />
        <div className='flex items-center justify-center py-12'>
          <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-md w-full mx-4'>
            <h1 className='text-3xl font-bold text-white text-center mb-8'>Redefinir Senha</h1>

            <p className='text-gray-300 text-center mb-6'>Digite sua nova senha abaixo.</p>

            <form onSubmit={handleSubmit(handleResetPassword)} className='space-y-6'>
              <TextInput title='Nova Senha' name='password' control={control} rules={{ required: 'Nova senha é obrigatória' }} isPassword />

              <TextInput title='Confirmar Nova Senha' name='confirmPassword' control={control} rules={{ required: 'Confirmação de senha é obrigatória' }} isPassword />

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-105 disabled:transform-none'
              >
                {isSubmitting ? 'Redefinindo...' : 'Redefinir Senha'}
              </button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-400'>
                Lembrou da senha?{' '}
                <a href='/login' className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
                  Fazer login
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
