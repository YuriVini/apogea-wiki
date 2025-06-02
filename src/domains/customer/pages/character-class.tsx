import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useMemo, useState } from 'react'
import { useBuilds } from '../../../services/builds'
import { useNavigate, useParams } from 'react-router'
import { useAuth } from '../../../context/auth'
import { CHARACTER_CLASS_DATABASE } from '../../../constants/caracter-class-database'

export const CharacterClass = () => {
  const navigate = useNavigate()
  const { data: builds = [] } = useBuilds()
  const [activeTab, setActiveTab] = useState<'overview' | 'builds'>('overview')
  const { className } = useParams<{ className: string }>()
  const { isLoggedIn } = useAuth()

  const classData = useMemo(() => CHARACTER_CLASS_DATABASE.find((c) => c.type === className), [className])
  console.log('TESTE___________________________________________', className)

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />

      <main className='max-w-7xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white text-center mb-4 animate-fade-in-down'>{classData?.name}</h1>
          <p className='text-gray-300 text-center text-lg'>{classData?.description}</p>
        </div>

        <div className='mb-8 gap-6 flex justify-center'>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === 'overview'
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30 hover:text-white hover:scale-105'
            }`}
          >
            📖 Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('builds')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === 'builds' ? 'bg-blue-500 text-white shadow-lg transform scale-105' : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30 hover:text-white hover:scale-105'
            }`}
          >
            ⚔️ Builds
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 mb-12'>
              <div className='flex flex-col lg:flex-row items-center gap-8'>
                <div className='lg:w-1/2'>
                  <h2 className='text-2xl font-bold text-white mb-4'>📊 Status do {classData?.name}</h2>
                  <div className='space-y-2'>
                    {classData?.stats?.map((stat, index) => (
                      <div key={index} className='flex flex-col'>
                        <div className='flex justify-between items-center'>
                          <span className='text-gray-300'>{stat.title}:</span>
                          <span className={`${stat.color} font-bold`}>{stat.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className='lg:w-1/2 flex justify-center items-center'>
                  <img
                    src={classData?.imageUrl}
                    alt={classData?.name}
                    className='rounded-lg shadow-lg max-w-full h-auto transition-all duration-300 hover:scale-105 hover:shadow-xl'
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </div>

            <div className='mb-12'>
              <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300'>
                <h2 className='text-2xl font-bold text-white mb-4'>🎯 Estilo de Jogo</h2>
                <div className='space-y-4'>
                  {classData?.playstyle?.map((style, index) => (
                    <div
                      key={index}
                      className={`bg-${index === 0 ? 'blue' : 'green'}-500/20 rounded-lg p-4 border border-${index === 0 ? 'blue' : 'green'}-400/30 hover:bg-${
                        index === 0 ? 'blue' : 'green'
                      }-500/30 transition-all duration-300`}
                    >
                      <h3 className={`text-${index === 0 ? 'blue' : 'green'}-300 font-bold mb-2`}>{style.title}</h3>
                      <p className='text-gray-300 text-sm'>{style.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Habilidades */}
            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-white mb-6 text-center'>⚔️ Habilidades</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {classData?.abilities?.map((ability, index) => (
                  <div key={index} className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300 transform hover:scale-105'>
                    <div className='flex items-center gap-3 mb-3'>
                      <h3 className='text-xl font-bold text-white'>{ability.name}</h3>
                    </div>
                    <p className='text-gray-300'>{ability.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipamentos */}
            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-white mb-6 text-center'>🎒 Equipamentos Recomendados</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                {classData?.recommendedEquipment?.map((equipment, index) => (
                  <div key={index} className='bg-gray-800/30 rounded-lg p-6 shadow-lg text-center hover:bg-gray-700/30 transition-all duration-300 transform hover:scale-105'>
                    {equipment.icon && (
                      <img src={equipment.icon} alt={equipment.name} className='w-16 h-16 mx-auto mb-3' />
                    )}
                    <h3 className='text-lg font-bold text-white mb-2'>{equipment.name}</h3>
                    <p className='text-gray-300 text-sm'>{equipment.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-white mb-6 text-center'>💡 Dicas de Estratégia</h2>
              <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                  <div>
                    <h3 className='text-xl font-bold text-green-400 mb-4'>✅ Faça</h3>
                    <ul className='space-y-2 text-gray-300'>
                      {classData?.strategy?.do.map((tip, index) => (
                        <li key={index} className='hover:text-green-300 transition-colors duration-200'>
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-red-400 mb-4'>❌ Evite</h3>
                    <ul className='space-y-2 text-gray-300'>
                      {classData?.strategy?.dont.map((tip, index) => (
                        <li key={index} className='hover:text-red-300 transition-colors duration-200'>
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'builds' && (
          <div className='mb-12'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-3xl font-bold text-white'>⚔️ Builds de Knight</h2>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {builds?.map((build, index) => (
                <div key={index} className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300 transform hover:scale-105'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h3 className='text-xl font-bold text-white mb-2'>{build.title}</h3>
                      <p className='text-lg text-blue-400 mb-2'>Nível {build.characterStats.level}</p>
                    </div>
                    <div className='flex items-center gap-1'>
                      <span className='text-yellow-400'>⭐</span>
                      <span className='text-white font-bold'>{build?.rating}</span>
                    </div>
                  </div>
                  <p className='text-gray-300 mb-4'>{build.overview}</p>
                  <button
                    onClick={() => navigate(`/builds/${build?.id}`)}
                    className='w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors duration-200'
                  >
                    Ver Build Completa
                  </button>
                </div>
              ))}
            </div>

            <div className='mt-8 text-center'>
              <p className='text-gray-400 mb-4'>Não encontrou a build perfeita?</p>
              {isLoggedIn ? (
                <button
                  onClick={() => navigate('/builds/create')}
                  className='bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/20'
                >
                  🔧 Criar Sua Própria Build
                </button>
              ) : (
                <p className='text-gray-400'>
                  Faça{' '}
                  <a href='/login' className='text-blue-400 hover:text-blue-300'>
                    login
                  </a>{' '}
                  para criar sua própria build
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
