import { HighlightQuest } from './components/highlight-quest'
import { WeaponBox } from './components/weapon-box'
import SwordIcon from '/swords/Broadsword.webp'
import DaggerIcon from '/daggers/Dagger2.webp'

const highlightQuest = [
  {
    title: 'A Ameaça das Cavernas Cristalinas',
    level: '25+',
    rewards: '1000 ouro, Cristal Ancestral, XP',
    description:
      'Explore as Cavernas Cristalinas e derrote o Guardião de Cristal que ameaça a região.',
  },
  {
    title: 'O Segredo da Floresta Ancestral',
    level: '30+',
    rewards: '1500 ouro, Pergaminho Místico, XP',
    description:
      'Descubra os mistérios escondidos na Floresta Ancestral e encontre o artefato perdido.',
  },
  {
    title: 'A Forja do Destino',
    level: '20+',
    rewards: '800 ouro, Martelo do Artesão, XP',
    description:
      'Ajude o ferreiro local a criar uma arma lendária reunindo materiais raros.',
  },
]

const weapons = [
  {
    title: 'Espadas',
    imageUrl: SwordIcon,
  },
  {
    title: 'Arcos',
    imageUrl: '/weapons/bow.png',
  },
  {
    title: 'Cajados',
    imageUrl: '/weapons/staff.png',
  },
  {
    title: 'Adagas',
    imageUrl: DaggerIcon,
  },
  {
    title: 'Escudos',
    imageUrl: '/weapons/shield.png',
  },
  {
    title: 'Armaduras',
    imageUrl: '/weapons/armor.png',
  },
]

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-700'>
      {/* Header */}
      <header className='bg-gray-800/50 p-4 shadow-lg'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-white'>Apogea Wiki</h1>
          <nav className='space-x-6'>
            <a href='#' className='text-gray-300 hover:text-white'>
              Guia Inicial
            </a>
            <a href='#' className='text-gray-300 hover:text-white'>
              Classes
            </a>
            <a href='#' className='text-gray-300 hover:text-white'>
              Dungeons
            </a>
            <a href='#' className='text-gray-300 hover:text-white'>
              Crafting
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto p-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Featured Guides */}
          <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg'>
            <h2 className='text-xl font-bold text-white mb-4'>
              Guias em Destaque
            </h2>
            <ul className='space-y-3'>
              <li className='text-gray-300 hover:text-white cursor-pointer'>
                Primeiros Passos em Apogea
              </li>
              <li className='text-gray-300 hover:text-white cursor-pointer'>
                Sistema de Combate
              </li>
              <li className='text-gray-300 hover:text-white cursor-pointer'>
                Progressão de Personagem
              </li>
            </ul>
          </div>

          {/* Classes */}
          <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg'>
            <h2 className='text-xl font-bold text-white mb-4'>Classes</h2>
            <ul className='space-y-3'>
              <li className='text-gray-300 hover:text-white cursor-pointer'>
                Guerreiro
              </li>
              <li className='text-gray-300 hover:text-white cursor-pointer'>
                Mago
              </li>
              <li className='text-gray-300 hover:text-white cursor-pointer'>
                Arqueiro
              </li>
              <li className='text-gray-300 hover:text-white cursor-pointer'>
                Rogue
              </li>
            </ul>
          </div>

          {/* Latest Updates */}
          <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg'>
            <h2 className='text-xl font-bold text-white mb-4'>
              Últimas Atualizações
            </h2>
            <div className='space-y-4'>
              <div>
                <p className='text-sm text-gray-400'>22/03/2024</p>
                <p className='text-gray-300'>
                  Novo Dungeon: Cavernas Cristalinas
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-400'>20/03/2024</p>
                <p className='text-gray-300'>
                  Atualização do Sistema de Crafting
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-400'>18/03/2024</p>
                <p className='text-gray-300'>Nova Região: Floresta Ancestral</p>
              </div>
            </div>
          </div>

          {/* Quests Section */}
          <div className='mb-10'>
            <h2 className='text-2xl font-bold text-white mb-6 text-center'>
              Quests em Destaque
            </h2>
            <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-6xl mx-auto'>
              <div className='space-y-6'>
                {highlightQuest.map((quest, index) => (
                  <HighlightQuest {...quest} key={index} />
                ))}
              </div>
              <div className='text-center mt-6'>
                <a
                  href='#'
                  className='inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
                >
                  Ver Mais Quests
                </a>
              </div>
            </div>
          </div>

          {/* Weapons Section */}
          <div className='mb-10'>
            <h2 className='text-2xl font-bold text-white mb-6 text-center'>
              Armas e Equipamentos
            </h2>
            <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-6xl mx-auto'>
              <div className='grid grid-cols-3 gap-4'>
                {weapons.map((weapon, index) => (
                  <WeaponBox key={index} {...weapon} />
                ))}
              </div>
              <div className='text-center mt-6'>
                <a
                  href='#'
                  className='inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'
                >
                  Ver Mais Equipamentos
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className='bg-gray-800/50 text-gray-300 py-8 mt-12'>
        <div className='max-w-7xl mx-auto px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-white text-lg font-bold mb-4'>
                Sobre WikiApogea
              </h3>
              <p className='text-sm text-justify'>
                Um mundo vasto de aventuras e descobertas aguarda por você em
                Apogea. Junte-se a milhares de jogadores nesta jornada épica.
              </p>
            </div>
            <div>
              <h3 className='text-white text-lg font-bold mb-4'>Links Úteis</h3>
              <ul className='space-y-2 text-sm'>
                <li>
                  <a href='#' className='hover:text-white'>
                    Regras do Jogo
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Suporte
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Fórum
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Notícias
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-white text-lg font-bold mb-4'>
                Redes Sociais
              </h3>
              <div className='flex space-x-4'>
                <a
                  href='#'
                  className='hover:text-white flex items-center gap-2'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z' />
                  </svg>
                  Discord
                </a>
                <a
                  href='#'
                  className='hover:text-white flex items-center gap-2'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                  </svg>
                  Twitter
                </a>
                <a
                  href='#'
                  className='hover:text-white flex items-center gap-2'
                >
                  <svg
                    className='w-5 h-5'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
                  </svg>
                  YouTube
                </a>
              </div>
            </div>
          </div>
          <div className='text-center mt-8 pt-8 border-t border-gray-700'>
            <p className='text-sm'>
              &copy; 2024 Apogea Wiki. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
