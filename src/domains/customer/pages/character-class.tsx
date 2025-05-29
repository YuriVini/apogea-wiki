import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useState } from 'react'
import { useBuilds } from '../../../services/builds'
import { useNavigate } from 'react-router'

const knightData = {
  title: 'Knight - O Guardião de Apogea',
  description: 'Guerreiro resistente especializado em combate corpo a corpo e proteção de aliados',
  stats: [
    {
      title: 'Skill',
      value: 125,
      color: 'text-green-400',
    },
    {
      title: 'Magic',
      value: 50,
      color: 'text-red-400',
    },
    {
      title: 'Armor',
      value: 150,
      color: 'text-green-400',
    },
    {
      title: 'Defense',
      value: 150,
      color: 'text-green-400',
    },
    {
      title: 'Health',
      value: 200,
      color: 'text-green-400',
    },
    {
      title: 'Mana',
      value: 50,
      color: 'text-red-400',
    },
    {
      title: 'Capacity',
      value: 150,
      color: 'text-green-400',
    },
    {
      title: 'Hp Regen',
      value: 125,
      color: 'text-green-400',
    },
    {
      title: 'Mp Regen',
      value: 50,
      color: 'text-red-400',
    },
    {
      title: 'Attack Speed',
      value: 100,
      color: 'text-yellow-400',
    },
  ],
  playstyle: [
    {
      title: 'Tank/Defensor',
      description: 'O Knight é a linha de frente do grupo, absorvendo dano e protegendo aliados mais frágeis.',
    },
    {
      title: 'Controle de Campo',
      description: 'Usa habilidades para controlar o posicionamento dos inimigos e manter a atenção deles.',
    },
  ],
  abilities: [
    {
      icon: '🛡️',
      name: 'Shield Bash',
      description: 'Atordoa inimigos com um golpe poderoso do escudo, causando dano e deixando-os vulneráveis por alguns segundos.',
    },
    {
      icon: '🎯',
      name: 'Taunt',
      description: 'Força todos os inimigos próximos a atacar o Knight, protegendo aliados e mantendo o controle da batalha.',
    },
    {
      icon: '💥',
      name: 'Heavy Strike',
      description: 'Ataque devastador que causa dano massivo, mas requer tempo de carregamento. Ideal para eliminar inimigos resistentes.',
    },
    {
      icon: '🏰',
      name: 'Guardian Stance',
      description: 'Aumenta drasticamente a defesa e reduz dano recebido, mas diminui a velocidade de movimento e ataque.',
    },
  ],
  recommendedEquipment: [
    {
      icon: '⚔️',
      name: 'Espadas Pesadas',
      description: 'Alto dano e durabilidade para combate prolongado',
    },
    {
      icon: '🛡️',
      name: 'Escudos',
      description: 'Proteção essencial e habilidades defensivas',
    },
    {
      icon: '🛡️',
      name: 'Armaduras Pesadas',
      description: 'Máxima proteção contra ataques físicos',
    },
    {
      icon: '🪓',
      name: 'Machados',
      description: 'Alternativa para maior dano bruto',
    },
  ],
  strategy: {
    do: [
      'Sempre mantenha a atenção dos inimigos em você',
      'Use Guardian Stance em situações críticas',
      'Posicione-se entre inimigos e aliados frágeis',
      'Combine Shield Bash com Heavy Strike',
      'Mantenha seu equipamento sempre reparado',
    ],
    dont: ['Perseguir inimigos que fogem', 'Usar Heavy Strike sem proteção', 'Ignorar a posição dos aliados', 'Ficar isolado do grupo', 'Esquecer de usar Taunt regularmente'],
  },
  progression: [
    {
      level: '1-10',
      title: 'Fundamentos',
      description: 'Foque em Shield Bash e equipamentos básicos de defesa',
    },
    {
      level: '11-25',
      title: 'Controle',
      description: 'Desenvolva Taunt e aprenda a gerenciar múltiplos inimigos',
    },
    {
      level: '26-40',
      title: 'Poder',
      description: 'Maximize Heavy Strike e Guardian Stance para combates difíceis',
    },
    {
      level: '41+',
      title: 'Maestria',
      description: 'Combine todas as habilidades e lidere grupos em dungeons avançadas',
    },
  ],
}

export const CharacterClass = () => {
  const navigate = useNavigate()
  const { data: builds = [] } = useBuilds()
  const [activeTab, setActiveTab] = useState<'overview' | 'builds'>('overview')

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />

      <main className='max-w-7xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white text-center mb-4 animate-fade-in-down'>{knightData.title}</h1>
          <p className='text-gray-300 text-center text-lg'>{knightData.description}</p>
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
                  <h2 className='text-2xl font-bold text-white mb-4'>📊 Status do Knight</h2>
                  <div className='space-y-2'>
                    {knightData.stats.map((stat, index) => (
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
                    src='/caracter-classes/knight.png'
                    alt='Knight'
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
                  {knightData.playstyle.map((style, index) => (
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
                {knightData.abilities.map((ability, index) => (
                  <div key={index} className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300 transform hover:scale-105'>
                    <div className='flex items-center gap-3 mb-3'>
                      <span className='text-2xl'>{ability.icon}</span>
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
                {knightData.recommendedEquipment.map((equipment, index) => (
                  <div key={index} className='bg-gray-800/30 rounded-lg p-6 shadow-lg text-center hover:bg-gray-700/30 transition-all duration-300 transform hover:scale-105'>
                    <span className='text-4xl mb-3 block'>{equipment.icon}</span>
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
                      {knightData.strategy.do.map((tip, index) => (
                        <li key={index} className='hover:text-green-300 transition-colors duration-200'>
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-red-400 mb-4'>❌ Evite</h3>
                    <ul className='space-y-2 text-gray-300'>
                      {knightData.strategy.dont.map((tip, index) => (
                        <li key={index} className='hover:text-red-300 transition-colors duration-200'>
                          • {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='mb-12'>
              <h2 className='text-3xl font-bold text-white mb-6 text-center'>📈 Progressão Recomendada</h2>
              <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300'>
                <div className='space-y-6'>
                  {knightData.progression.map((stage, index) => (
                    <div key={index} className='flex items-center gap-4 hover:bg-gray-700/30 p-4 rounded-lg transition-all duration-200'>
                      <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>{index + 1}</div>
                      <div>
                        <h3 className='text-white font-bold'>
                          Níveis {stage.level}: {stage.title}
                        </h3>
                        <p className='text-gray-300'>{stage.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'builds' && (
          <div className='mb-12'>
            <div className='flex justify-between items-center mb-8'>
              <h2 className='text-3xl font-bold text-white'>⚔️ Builds de Knight</h2>
              <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/20'>
                ✨ Criar Nova Build
              </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {builds?.map((build, index) => (
                <div key={index} className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300 transform hover:scale-105'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h3 className='text-xl font-bold text-white mb-2'>{build.title}</h3>
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
              <button className='bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/20'>
                🔧 Criar Sua Própria Build
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
