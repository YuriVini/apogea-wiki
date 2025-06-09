import { Link } from 'react-router'
import { useAuth } from '../context/auth'
import logo from '/logo.png'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export const Header = () => {
  const { isLoggedIn, logOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='bg-gray-800/50 shadow-lg'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4'>
        <Link to='/'>
          <img src={logo} alt='Apogea Wiki Logo' className='object-contain w-24 h-24' />
        </Link>
        <button className='md:hidden text-white' onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          className={`md:flex md:space-x-6 ${
            isMenuOpen ? 'block' : 'hidden'
          } md:relative fixed inset-0 bg-gray-800 md:bg-transparent p-4 md:p-0 z-50 overflow-y-auto md:overflow-visible`}
        >
          <div className='md:hidden flex justify-end'>
            <button className='text-white mb-4' onClick={toggleMenu}>
              <X size={24} />
            </button>
          </div>
          <Link to='/' className='block md:inline-block text-gray-300 hover:text-white py-2 md:py-0'>
            Guia Inicial
          </Link>
          <Link to='/class' className='block md:inline-block text-gray-300 hover:text-white py-2 md:py-0'>
            Classes
          </Link>
          <Link to='/builds' className='block md:inline-block text-gray-300 hover:text-white py-2 md:py-0'>
            Builds
          </Link>
          <Link to='/guides' className='block md:inline-block text-gray-300 hover:text-white py-2 md:py-0'>
            Tutoriais
          </Link>
          <Link
            to={isLoggedIn ? '/guides/create' : '/login'}
            className='block md:inline-block text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 bg-blue-500/20 px-3 py-2 md:py-1 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-300/50 shadow-md hover:shadow-blue-500/20 my-2 md:my-0 text-center'
          >
            ✨ Criar Guia
          </Link>
          {!isLoggedIn && (
            <Link
              to='/login'
              className='block md:inline-block text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 bg-purple-500/20 px-3 py-2 md:py-1 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-300/50 shadow-md hover:shadow-purple-500/20 my-2 md:my-0 text-center'
            >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to='/profile'
              className='block md:inline-block text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 bg-purple-500/20 px-3 py-2 md:py-1 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-300/50 shadow-md hover:shadow-purple-500/20 my-2 md:my-0 text-center'
            >
              Perfil
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={() => logOut()}
              className='block md:inline-block w-full md:w-auto text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 bg-purple-500/20 px-3 py-2 md:py-1 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-300/50 shadow-md hover:shadow-purple-500/20 my-2 md:my-0 text-center'
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
