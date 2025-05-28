import { Link } from 'react-router'
import { useAuth } from '../context/auth'
import logo from '/logo.png'

export const Header = () => {
  const { isLoggedIn, logOut } = useAuth()

  return (
    <header className='bg-gray-800/50 shadow-lg'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/'>
          <img src={logo} alt='Apogea Wiki Logo' className='object-contain w-24 h-24' />
        </Link>
        <nav className='space-x-6'>
          <Link to='/' className='text-gray-300 hover:text-white'>
            Guia Inicial
          </Link>
          <Link to='/class' className='text-gray-300 hover:text-white'>
            Classes
          </Link>
          <Link to='#' className='text-gray-300 hover:text-white'>
            Dungeons
          </Link>
          <Link to='#' className='text-gray-300 hover:text-white'>
            Crafting
          </Link>
          <Link
            to='/create-guide'
            className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block bg-blue-500/20 px-3 py-1 rounded-lg border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-300/50 shadow-md hover:shadow-blue-500/20'
          >
            ✨ Criar Guia
          </Link>
          {!isLoggedIn && (
            <Link
              to='/login'
              className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-300/50 shadow-md hover:shadow-purple-500/20'
            >
              Login
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to='/profile'
              className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-300/50 shadow-md hover:shadow-purple-500/20'
            >
              Perfil
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={() => logOut()}
              className='text-gray-300 hover:text-white transition-all duration-300 hover:scale-110 inline-block bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-300/50 shadow-md hover:shadow-purple-500/20'
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
