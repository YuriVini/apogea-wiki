import { Footer } from '../../../components/footer'
import { Header } from '../../../components/header'
import { TextInput } from '../../../components/text-input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../context/auth'

const validationSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres'),
})

export const Login = () => {
  const { logIn } = useAuth()
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const handleLogin = async (data: z.infer<typeof validationSchema>) => {
    await logIn(data)
  }

  return (
    <div>
      <div className='min-h-screen bg-gray-900'>
        <Header />

        <div className='flex items-center justify-center py-12'>
          <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-md w-full mx-4'>
            <h1 className='text-3xl font-bold text-white text-center mb-8'>Entrar</h1>

            <form onSubmit={handleSubmit(handleLogin)} className='space-y-6'>
              <TextInput title='Email' name='email' control={control} rules={{ required: 'Email é obrigatório' }} />

              <TextInput title='Senha' name='password' control={control} rules={{ required: 'Senha é obrigatória' }} isPassword />

              <button
                type='submit'
                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-105'
              >
                Entrar
              </button>
            </form>

            <div className='mt-6 text-center'>
              <p className='text-gray-400'>
                Não tem uma conta?{' '}
                <a href='/register' className='text-blue-400 hover:text-blue-300 transition-colors duration-300'>
                  Criar conta
                </a>
              </p>
            </div>

            <div className='mt-4 text-center'>
              <a href='/forgot-password' className='text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300'>
                Esqueceu sua senha?
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
