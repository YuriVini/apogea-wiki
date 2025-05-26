import { useState } from 'react'
import { Footer } from '../components/footer'

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null)
    const [emailValid, setEmailValid] = useState<boolean | null>(null)

    const validateEmail = (email: string) => {
        if (email.length === 0) {
            setEmailValid(null)
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        setEmailValid(emailRegex.test(email))
    }

    const validatePassword = (password: string) => {
        if (password.length === 0) {
            setPasswordStrength(null)
            return
        }

        let score = 0
        if (password.length >= 8) score++
        if (/[a-z]/.test(password)) score++
        if (/[A-Z]/.test(password)) score++
        if (/[0-9]/.test(password)) score++
        if (/[^A-Za-z0-9]/.test(password)) score++

        if (score <= 2) {
            setPasswordStrength('weak')
        } else if (score <= 3) {
            setPasswordStrength('medium')
        } else {
            setPasswordStrength('strong')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if (name === 'password') {
            validatePassword(value)
        } else if (name === 'email') {
            validateEmail(value)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        if (passwordStrength === 'weak') {
            alert('Por favor, use uma senha mais forte.')
            return
        }

        if (emailValid === false) {
            alert('Por favor, digite um email válido.')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
            })

            if (response.ok) {
                const data = await response.json()
                console.log('Registro realizado com sucesso:', data)
                // Redirecionar para a página de login ou home
                window.location.href = '/login'
            } else {
                const errorData = await response.json()
                alert(errorData.message || 'Erro no registro')
            }
        } catch (error) {
            console.error('Erro no registro:', error)
            alert('Erro de conexão com o servidor')
        }
    }

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 'weak':
                return 'text-red-400'
            case 'medium':
                return 'text-yellow-400'
            case 'strong':
                return 'text-green-400'
            default:
                return 'text-gray-400'
        }
    }

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 'weak':
                return 'Senha fraca'
            case 'medium':
                return 'Senha média'
            case 'strong':
                return 'Senha forte'
            default:
                return ''
        }
    }

    const getEmailValidationColor = () => {
        if (emailValid === null) return 'border-gray-600'
        return emailValid ? 'border-green-500' : 'border-red-500'
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
                    <h1 className="text-3xl font-bold text-white text-center mb-8">Criar Conta</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>

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
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Digite sua senha"
                                required
                            />
                            {passwordStrength && (
                                <div className="mt-2">
                                    <span className={`text-sm font-medium ${getPasswordStrengthColor()}`}>
                                        {getPasswordStrengthText()}
                                    </span>
                                    <div className="mt-1 text-xs text-gray-400">
                                        Use pelo menos 8 caracteres com letras maiúsculas, minúsculas, números e símbolos
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transform hover:scale-105"
                        >
                            Criar Conta
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <a href="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                            Voltar para o início
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}