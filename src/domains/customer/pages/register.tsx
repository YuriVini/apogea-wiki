import { Footer } from '../../../components/footer'
import { TextInput } from '../../../components/text-input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiNoAuth } from '../../../@api/axios'
import { Link, useNavigate } from 'react-router'
import { Header } from '../../../components/header'
import { toast } from 'react-toastify'

const validationSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
})

export const Register = () => {
  const navigate = useNavigate()
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(validationSchema),
  })

  const handleRegister = async (data: z.infer<typeof validationSchema>) => {
    try {
      await ApiNoAuth.post('/register', data)
      navigate('/login')
    } catch {
      toast.error('Ocorreu um erro ao criar a conta. Tente novamente.')
    }
  }

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />

      <div className='flex items-center justify-center py-12'>
        <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-md w-full mx-4'>
          <h1 className='text-3xl font-bold text-white text-center mb-8'>Criar Conta</h1>

          <form onSubmit={handleSubmit(handleRegister)} className='space-y-6'>
            <TextInput title='Nome' name='name' control={control} rules={{ required: 'Nome é obrigatório' }} />

            <TextInput title='Email' name='email' control={control} rules={{ required: 'Email é obrigatório' }} />

            <TextInput title='Senha' name='password' control={control} rules={{ required: 'Senha é obrigatória' }} isPassword />

            <button
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-105'
            >
              Criar Conta
            </button>
          </form>

          <div className='mt-6 text-center'>
            <Link to='/' className='text-gray-400 hover:text-white transition-colors duration-300'>
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
