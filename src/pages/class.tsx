import { Header } from '../components/header'
import { Footer } from '../components/footer'

const classes = [
  {
    name: 'Knight',
    description: 'Guerreiro resistente especializado em combate corpo a corpo e proteção de aliados.',
    stats: {
      health: 'Alto',
      damage: 'Médio',
      defense: 'Alto',
      speed: 'Baixo',
    },
    abilities: [
      'Shield Bash - Atordoa inimigos com o escudo',
      'Taunt - Força inimigos a atacar o Knight',
      'Heavy Strike - Ataque poderoso com arma pesada',
      'Guardian Stance - Aumenta defesa drasticamente',
    ],
    equipment: ['Espadas Pesadas', 'Escudos', 'Armaduras Pesadas', 'Machados'],
    playstyle: 'Tank/Defensor',
  },
  {
    name: 'Mage',
    description: 'Conjurador de magias poderosas que controla os elementos para devastar inimigos.',
    stats: {
      health: 'Baixo',
      damage: 'Alto',
      defense: 'Baixo',
      speed: 'Médio',
    },
    abilities: [
      'Fireball - Projétil de fogo explosivo',
      'Ice Shard - Congela e perfura inimigos',
      'Lightning Bolt - Raio que salta entre alvos',
      'Mana Shield - Escudo mágico que absorve dano',
    ],
    equipment: ['Cajados', 'Orbes', 'Robes Mágicos', 'Amuletos'],
    playstyle: 'DPS Mágico/Controle',
  },
  {
    name: 'Rogue',
    description: 'Assassino ágil que ataca pelas sombras com velocidade e precisão letais.',
    stats: {
      health: 'Médio',
      damage: 'Alto',
      defense: 'Baixo',
      speed: 'Alto',
    },
    abilities: [
      'Stealth - Torna-se invisível temporariamente',
      'Backstab - Ataque crítico pelas costas',
      'Poison Blade - Envenena armas causando dano contínuo',
      'Shadow Step - Teleporte curto para trás do inimigo',
    ],
    equipment: ['Adagas', 'Arcos', 'Armaduras Leves', 'Venenos'],
    playstyle: 'DPS Físico/Assassino',
  },
  {
    name: 'Squire',
    description: 'Classe iniciante versátil que pode evoluir para outras especializações.',
    stats: {
      health: 'Médio',
      damage: 'Médio',
      defense: 'Médio',
      speed: 'Médio',
    },
    abilities: [
      'Basic Attack - Ataque básico com arma equipada',
      'First Aid - Cura básica para si mesmo',
      'Weapon Mastery - Bônus com diferentes tipos de arma',
      'Quick Learn - Ganha experiência mais rapidamente',
    ],
    equipment: ['Espadas Curtas', 'Escudos Leves', 'Armaduras Médias', 'Arcos Básicos'],
    playstyle: 'Versátil/Iniciante',
  },
]

export const Class = () => {
  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />

      <main className='max-w-7xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white text-center mb-4 animate-fade-in-down'>Classes de Personagem</h1>
          <p className='text-gray-300 text-center max-w-3xl mx-auto'>
            Escolha sua classe e domine os campos de batalha de Apogea. Cada classe possui habilidades únicas, estilos de combate distintos e caminhos de progressão especializados.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {classes.map((classInfo, index) => (
            <div
              key={index}
              className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-gray-700/30 hover:shadow-xl border border-gray-700/50'
            >
              <div className='mb-6'>
                <h2 className='text-2xl font-bold text-white mb-2'>{classInfo.name}</h2>
                <p className='text-gray-300 text-sm leading-relaxed'>{classInfo.description}</p>
                <div className='mt-3 inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-400/30'>{classInfo.playstyle}</div>
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-white mb-3'>Atributos</h3>
                <div className='grid grid-cols-2 gap-3'>
                  {Object.entries(classInfo.stats).map(([stat, value]) => (
                    <div key={stat} className='flex justify-between items-center bg-gray-700/30 rounded p-2'>
                      <span className='text-gray-300 capitalize text-sm'>
                        {stat === 'health' ? 'Vida' : stat === 'damage' ? 'Dano' : stat === 'defense' ? 'Defesa' : 'Velocidade'}:
                      </span>
                      <span className={`text-sm font-medium ${value === 'Alto' ? 'text-green-400' : value === 'Médio' ? 'text-yellow-400' : 'text-red-400'}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-semibold text-white mb-3'>Habilidades Principais</h3>
                <div className='space-y-2'>
                  {classInfo.abilities.map((ability, abilityIndex) => (
                    <div key={abilityIndex} className='text-gray-300 text-sm bg-gray-700/20 rounded p-2'>
                      <span className='text-blue-300 font-medium'>{ability.split(' - ')[0]}</span>
                      {' - '}
                      <span>{ability.split(' - ')[1]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-white mb-3'>Equipamentos</h3>
                <div className='flex flex-wrap gap-2'>
                  {classInfo.equipment.map((equipment, equipIndex) => (
                    <span key={equipIndex} className='px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-400/30'>
                      {equipment}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-12 bg-gray-800/30 rounded-lg p-6 border border-gray-700/50'>
          <h2 className='text-2xl font-bold text-white mb-4 text-center'>Dicas para Iniciantes</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold text-blue-300 mb-2'>🛡️ Para Novos Jogadores</h3>
              <p className='text-gray-300 text-sm'>
                Recomendamos começar com <strong>Squire</strong> para aprender os fundamentos do jogo, ou <strong>Knight</strong> se preferir um estilo mais defensivo e resistente.
              </p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-green-300 mb-2'>⚔️ Para Veteranos</h3>
              <p className='text-gray-300 text-sm'>
                <strong>Mage</strong> e <strong>Rogue</strong> oferecem gameplay mais complexo e recompensador, mas exigem maior conhecimento de mecânicas e posicionamento.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
