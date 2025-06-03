import { HighlightBuilds } from '../../../components/highlight-builds'
import { WeaponBox } from '../../../components/weapon-box'
import { OtherBox } from '../../../components/other-box'
import StaffIcon from '/staff/Wooden_staff.webp'
import SwordIcon from '/swords/Broadsword.webp'
import DaggerIcon from '/daggers/Silver_Dagger.webp'
import ShieldIcon from '/shield/Tower_Shield.webp'
import BowIcon from '/bow/StoneBow.webp'
import ArmorIcon from '/armor/Brass_armor.webp'
import BackpackIcon from '/backpack/Backpack_blue.webp'
import CreatureDropsIcon from '/creature-drops/Forsaken_cross.webp'
import QuestItensIcon from '/quest-items/Aqua_vial_jebidiah.webp'
import GlovesIcon from '/gloves/Leather_gloves.webp'
import RingIcon from '/ring/Golden_ring.webp'
import NecklaceIcon from '/necklace/Silver_amulet.webp'
import AbilitiesIcon from '/abilities/Ability2.webp'
import SpellsIcon from '/spells/Spell23.webp'
import FoodIcon from '/food/Bread_loaf.webp'
import HelmetIcon from '/helmet/Spanghen_helmet.webp'
import PantsIcon from '/legs/Leather_Cuisse.webp'
import BootsIcon from '/boots/Boots1.webp'
import RecipesIcon from '/recipes/Apple_Pie.webp'
import { Link } from 'react-router'
import { Footer } from '../../../components/footer'
import { Suspense } from 'react'
import { Header } from '../../../components/header'
import KnightIcon from '/caracter-classes/knight-icon.png'
import MageIcon from '/caracter-classes/mage-icon.png'
import RogueIcon from '/caracter-classes/rogue-icon.png'
import SquireIcon from '/caracter-classes/squire-icon.png'
import { useGuides } from '../../../services/guides'
import { useBuilds } from '../../../services/builds'
import { Countdown } from '../../../components/countdown'
import { useNews } from '../../../services/news'
import { useAuth } from '../../../context/auth'

interface Weapon {
  title: string
  imageUrl: string
  category: EquipmentsApiTypes.CategoryType
}

const weapons: Weapon[] = [
  {
    title: 'Espadas',
    imageUrl: SwordIcon,
    category: 'sword',
  },
  {
    title: 'Arcos',
    imageUrl: BowIcon,
    category: 'bow',
  },
  {
    title: 'Cajados',
    imageUrl: StaffIcon,
    category: 'staff',
  },
  {
    title: 'Adagas',
    imageUrl: DaggerIcon,
    category: 'dagger',
  },
  {
    title: 'Luvas',
    imageUrl: GlovesIcon,
    category: 'glove',
  },
  {
    title: 'Escudos',
    imageUrl: ShieldIcon,
    category: 'shield',
  },
  {
    title: 'Elmo',
    imageUrl: HelmetIcon,
    category: 'helmet',
  },
  {
    title: 'Armaduras',
    imageUrl: ArmorIcon,
    category: 'chest',
  },
  {
    title: 'Pernas',
    imageUrl: PantsIcon,
    category: 'legs',
  },
  {
    title: 'Botas',
    imageUrl: BootsIcon,
    category: 'boots',
  },
  {
    title: 'Anel',
    imageUrl: RingIcon,
    category: 'ring',
  },
  {
    title: 'Colar',
    imageUrl: NecklaceIcon,
    category: 'necklace',
  },
  {
    title: 'Mochila',
    imageUrl: BackpackIcon,
    category: 'backpack',
  },
]

const other = [
  {
    title: 'Monstros',
    imageUrl: QuestItensIcon,
    type: 'monster',
  },
  {
    title: 'Drop de Criaturas',
    imageUrl: CreatureDropsIcon,
    type: 'drop_creatures',
  },
  {
    title: 'Habilidades',
    imageUrl: AbilitiesIcon,
    type: 'abilities',
  },
  {
    title: 'Feitiços',
    imageUrl: SpellsIcon,
    type: 'spells',
  },
  {
    title: 'Livros',
    imageUrl: QuestItensIcon,
    type: 'book',
  },
  {
    title: 'Comidas',
    imageUrl: FoodIcon,
    type: 'food',
  },
  {
    title: 'NPCs',
    imageUrl: QuestItensIcon,
    type: 'npc',
  },
  {
    title: 'Itens de Quest',
    imageUrl: QuestItensIcon,
    type: 'itens_quest',
  },
  {
    title: 'Receitas',
    imageUrl: RecipesIcon,
    type: 'recipes',
  },
]

const caracterClasses = [
  {
    title: 'Knight',
    imageUrl: KnightIcon,
    type: 'knight',
  },
  {
    title: 'Mage',
    imageUrl: MageIcon,
    type: 'mage',
  },
  {
    title: 'Rogue',
    imageUrl: RogueIcon,
    type: 'rogue',
  },
  {
    title: 'Squire',
    imageUrl: SquireIcon,
    type: 'squire',
  },
]

export const Home = () => {
  const { data: guides = [] } = useGuides()
  const { data: builds = [] } = useBuilds()
  const { data: news = [], isLoading: isLoadingNews } = useNews()
  const { isLoggedIn } = useAuth()

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />

        <Countdown />

        <main className='max-w-7xl mx-auto p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
              <h2 className='text-xl font-bold text-white mb-4'>Guias de Quest em Destaque</h2>
              <ul className='space-y-3'>
                {guides?.slice(0, 4).map((guide, index) => (
                  <li key={index} className='text-gray-300 hover:text-white cursor-pointer transition-colors duration-200'>
                    <Link to={`/guides/${guide?.id}`}>{guide?.title}</Link>
                  </li>
                ))}
              </ul>
              <div className='flex justify-center items-center gap-1'>
                <div className='text-center mt-6'>
                    <Link  to={isLoggedIn ? '/guides/create': '/login'} className='inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'>
                      Criar meu guia
                    </Link>
                </div>
                {guides?.length > 3 && (
                  <div className='text-center mt-6'>
                    <Link to='/guides' className='inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm'>
                      Ver Todos os Guias
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
              <h2 className='text-xl font-bold text-white'>Classes</h2>
              <ul className='grid grid-cols-2 h-full'>
                {caracterClasses.map((caracterClass, index) => (
                  <li key={index} className='flex justify-center cursor-pointer transition-colors duration-200'>
                    <Link to={`/character-class/${caracterClass.type}`} className='flex flex-col items-center'>
                      <img src={caracterClass.imageUrl} alt={caracterClass.title} className='w-[70px] h-[70px] rounded-lg' />
                      <span className='text-gray-300 w-full text-center'>{caracterClass.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
              <h2 className='text-xl font-bold text-white mb-4'>Últimas Atualizações</h2>
              {isLoadingNews ? (
                <p className='text-gray-300'>Carregando...</p>
              ) : (
                <div className='space-y-4'>
                  {news?.slice(0, 2).map((item, index) => (
                    <div key={index} className='border-b border-gray-700 pb-2 last:border-b-0'>
                      <Link to={item.url} target='_blank'>
                        <p className='text-sm text-gray-400'>{item.title}</p>
                        <p className='text-gray-300 transition-colors duration-200 hover:text-white'>{item.content}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>Builds em Destaque</h2>
              <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-6xl mx-auto'>
                <div className='space-y-6'>
                  {builds?.slice(0, 3)?.map((build, index) => (
                    <Link to={`/builds/${build.id}`} key={index}>
                      <HighlightBuilds {...build} key={index} />
                    </Link>
                  ))}
                </div>
                <div className='flex justify-center items-center gap-1'>
                  <div className='text-center mt-6'>
                    <Link to={isLoggedIn ? '/builds/create' : '/login' } className='inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'>
                      Criar minha build
                    </Link>
                </div>
                {builds?.length > 3 && (
                  <div className='text-center mt-6'>
                    <Link to='/builds' className='inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm'>
                      Ver Todas as Builds
                    </Link>
                  </div>
                )}
                </div>
              </div>
            </div>

            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>Armas e Equipamentos</h2>
              <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-6xl mx-auto transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
                <div className='grid grid-cols-3 gap-4'>
                  {weapons.map((weapon, index) => (
                    <div key={index} className='transition-transform duration-300 hover:scale-125'>
                      <Link to={`/weapons/${weapon.category}`}>
                        <WeaponBox {...weapon} />
                      </Link>
                    </div>
                  ))}
                </div>
                <div className='text-center mt-6'></div>
              </div>
            </div>

            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>Outros</h2>
              <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-6xl mx-auto transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
                <div className='grid grid-cols-3 gap-4'>
                  {other.map((item, index) => (
                    <div key={index} className='transition-transform duration-300 hover:scale-125'>
                      <Link to={`/other/${item.type}`}>
                        <OtherBox {...item} />
                      </Link>
                    </div>
                  ))}
                </div>
                <div className='text-center mt-6'></div>
              </div>
            </div>
          </div>

          <div className='flex justify-center mb-10'>
            <div className='max-w-4xl w-full'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>Conheça Apogea</h2>
              <div className='relative pt-[56.25%] w-full'>
                <iframe
                  className='absolute top-0 left-0 w-full h-full rounded-lg shadow-lg'
                  src='https://www.youtube.com/embed/_Qlm2aAbS6w'
                  title='Apogea Game Trailer'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </Suspense>
    </div>
  )
}
