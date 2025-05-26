import { useState } from 'react'
import { Footer } from '../components/footer'

export const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [emailValid, setEmailValid] = useState<boolean | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const validateEmail = (email: string) => {
        if (email.length === 0) {
            setEmailValid(null)
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setEmailValid(emailRegex.test(email))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === 'email') {
            validateEmail(value)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (emailValid === false) {
            alert('Por favor, digite um email válido.')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Login realizado com sucesso:', data)
                // Aqui você pode redirecionar o usuário ou salvar o token
                window.location.href = '/'
            } else {
                const errorData = await response.json()
                alert(errorData.message || 'Erro no login')
            }
        } catch (error) {
            console.error('Erro no login:', error)
            alert('Erro de conexão com o servidor')
        }
    }

    const getEmailValidationColor = () => {
        if (emailValid === null) return 'border-gray-600'
        return emailValid ? 'border-green-500' : 'border-red-500'
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <header className='bg-gray-800/50 p-4 shadow-lg'>
                <div className='max-w-7xl mx-auto flex justify-between items-center'>
                    <h1 onClick={() => (window.location.href = '/')} className='text-3xl font-bold text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer'>
                        Apogea Wiki
                    </h1>
                    <nav className='space-x-6'>
                        <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
                            Guia Inicial
                        </a>
                        <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
                            Classes
                        </a>
                        <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
                            Dungeons
                        </a>
                        <a href='#' className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block'>
                            Crafting
                        </a>
                    </nav>
                </div>
            </header>

            <div className="flex items-center justify-center py-12">
                <div className="bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
                    <h1 className="text-3xl font-bold text-white text-center mb-8">Entrar</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 bg-gray-700/50 border ${getEmailValidationColor()} rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                                placeholder="Digite seu email"
                                required
                            />
                            {emailValid === false && (
                                <div className="mt-2">
                                    <span className="text-sm font-medium text-red-400">
                                        Email inválido
                                    </span>
                                    <div className="mt-1 text-xs text-gray-400">
                                        Digite um email válido (exemplo: usuario@dominio.com)
                                    </div>
                                </div>
                            )}
                            {emailValid === true && (
                                <div className="mt-2">
                                    <span className="text-sm font-medium text-green-400">
                                        Email válido
                                    </span>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 pr-10 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Digite sua senha"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-105"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Não tem uma conta?{' '}
                            <a href="/register" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                                Criar conta
                            </a>
                        </p>
                    </div>

                    <div className="mt-4 text-center">
                        <a href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-300">
                            Esqueceu sua senha?
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}
