import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { TextInput } from '../components/text-input'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../context/auth'

const validationSchema = z.object({
  email: z.string().email('Email inválido'),
})

export const ForgotPassword = () => {
    const { recoverPassword } = useAuth()
    const { control, handleSubmit } = useForm({
        resolver: zodResolver(validationSchema),
    })

    const handleForgotPassword = async (data: z.infer<typeof validationSchema>) => {
        try {
            await recoverPassword(data)
            alert('Instruções enviadas para seu email!')
        } catch (error) {
            console.error('Erro ao recuperar senha:', error)
            alert('Erro ao enviar instruções. Verifique se o email está correto.')
        }
    }

    return (
        <div>
            <div className='min-h-screen bg-gray-900'>
                <Header />

                <div className='flex items-center justify-center py-12'>
                    <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-md w-full mx-4'>
                        <h1 className='text-3xl font-bold text-white text-center mb-8'>Esqueceu sua senha?</h1>
                        
                        <p className='text-gray-300 text-center mb-6'>
                            Digite seu email abaixo e enviaremos instruções para redefinir sua senha.
                        </p>

                        <form onSubmit={handleSubmit(handleForgotPassword)} className='space-y-6'>
                            <TextInput title='Email' name='email' control={control} rules={{ required: 'Email é obrigatório' }} />

                            <button
                                type='submit'
                                className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-105'
                            >
                                Enviar instruções
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