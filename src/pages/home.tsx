import { HighlightQuest } from '../components/highlight-quest'
import { WeaponBox } from '../components/weapon-box'
import { OtherBox } from '../components/other-box'
import StaffIcon from '/staff/Wooden_staff.webp'
import SwordIcon from '/swords/Broadsword.webp'
import DaggerIcon from '/daggers/Dagger2.webp'
import ShieldIcon from '/shield/Shield4.webp'
import BowIcon from '/bow/StoneBow.webp'
import ArmorIcon from '/armor/Armor1.webp'
import BackpackIcon from '/backpack/Backpack_blue.webp'
import CreatureDropsIcon from '/creature-drops/Forsaken_cross.webp'
import QuestItensIcon from '/quest-items/Aqua_vial_jebidiah.webp'
import GlovesIcon from '/gloves/Leather_gloves.webp'
import RingIcon from '/ring/Golden_ring.webp'
import NecklaceIcon from '/necklace/Silver_amulet.webp'
import AbilitiesIcon from '/abilities/Ability2.webp'
import SpellsIcon from '/spells/Spell23.webp'
import FoodIcon from '/food/Bread_loaf.webp'
import { Link } from 'react-router'
import { Footer } from '../components/footer'
import { useEffect, useState, Suspense } from 'react'
import { ApiNoAuth } from '../@api/axios'
import { Header } from '../components/header'

const highlightQuest = [
  {
    title: 'A Ameaça das Cavernas Cristalinas',
    level: '25+',
    rewards: '1000 ouro, Cristal Ancestral, XP',
    description: 'Explore as Cavernas Cristalinas e derrote o Guardião de Cristal que ameaça a região.',
  },
  {
    title: 'O Segredo da Floresta Ancestral',
    level: '30+',
    rewards: '1500 ouro, Pergaminho Místico, XP',
    description: 'Descubra os mistérios escondidos na Floresta Ancestral e encontre o artefato perdido.',
  },
  {
    title: 'A Forja do Destino',
    level: '20+',
    rewards: '800 ouro, Martelo do Artesão, XP',
    description: 'Ajude o ferreiro local a criar uma arma lendária reunindo materiais raros.',
  },
]

const weapons = [
  {
    title: 'Espadas',
    imageUrl: SwordIcon,
  },
  {
    title: 'Arcos',
    imageUrl: BowIcon,
  },
  {
    title: 'Cajados',
    imageUrl: StaffIcon,
  },
  {
    title: 'Adagas',
    imageUrl: DaggerIcon,
  },
  {
    title: 'Luvas',
    imageUrl: GlovesIcon,
  },
  {
    title: 'Escudos',
    imageUrl: ShieldIcon,
  },
  {
    title: 'Armaduras',
    imageUrl: ArmorIcon,
  },
  {
    title: 'Anel',
    imageUrl: RingIcon,
  },
  {
    title: 'Colar',
    imageUrl: NecklaceIcon,
  },
  {
    title: 'Container',
    imageUrl: BackpackIcon,
  },
  {
    title: 'Drop de Criaturas',
    imageUrl: CreatureDropsIcon,
  },
  {
    title: 'Itens de Quest',
    imageUrl: QuestItensIcon,
  },
]

const other = [
  {
    title: 'Monstros',
    imageUrl: QuestItensIcon,
  },
  {
    title: 'Habilidades',
    imageUrl: AbilitiesIcon,
  },
  {
    title: 'Feitiços',
    imageUrl: SpellsIcon,
  },
  {
    title: 'Livros',
    imageUrl: QuestItensIcon,
  },
  {
    title: 'Comidas',
    imageUrl: FoodIcon,
  },
  {
    title: 'NPCs',
    imageUrl: QuestItensIcon,
  },
]

export const Home = () => {
  const [guides, setGuides] = useState<GuidesApiTypes.Guide[]>([])

  const fetchGuides = async () => {
    try {
      const response = await ApiNoAuth.get('/guides')
      setGuides(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchGuides()
  }, [])

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />

        <main className='max-w-7xl mx-auto p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
              <h2 className='text-xl font-bold text-white mb-4'>Guias em Destaque</h2>
              <ul className='space-y-3'>
                {guides?.slice(0, 4).map((guide, index) => (
                  <li key={index} className='text-gray-300 hover:text-white cursor-pointer transition-colors duration-200'>
                    <Link to={`/guides/${guide?.id}`}>{guide?.title}</Link>
                  </li>
                ))}
              </ul>
              <div className='mt-4 text-center'>
                <Link 
                  to='/all-guides' 
                  className='inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm'
                >
                  Ver Todos os Guias
                </Link>
              </div>
            </div>

            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
              <h2 className='text-xl font-bold text-white mb-4'>Classes</h2>
              <ul className='space-y-3'>
                <li className='text-gray-300 hover:text-white cursor-pointer transition-colors duration-200'>
                  <Link to='/knight'>Knight</Link>
                </li>
                <li className='text-gray-300 hover:text-white cursor-pointer transition-colors duration-200'>Mage</li>
                <li className='text-gray-300 hover:text-white cursor-pointer transition-colors duration-200'>Rogue</li>
                <li className='text-gray-300 hover:text-white cursor-pointer transition-colors duration-200'>Squire</li>
              </ul>
            </div>

            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
              <h2 className='text-xl font-bold text-white mb-4'>Últimas Atualizações</h2>
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-400'>22/03/2024</p>
                  <p className='text-gray-300 transition-colors duration-200 hover:text-white'>Novo Dungeon: Cavernas Cristalinas</p>
                </div>
                <div>
                  <p className='text-sm text-gray-400'>20/03/2024</p>
                  <p className='text-gray-300 transition-colors duration-200 hover:text-white'>Atualização do Sistema de Crafting</p>
                </div>
                <div>
                  <p className='text-sm text-gray-400'>18/03/2024</p>
                  <p className='text-gray-300 transition-colors duration-200 hover:text-white'>Nova Região: Floresta Ancestral</p>
                </div>
              </div>
            </div>

            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>Quests em Destaque</h2>
              <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-6xl mx-auto'>
                <div className='space-y-6'>
                  {highlightQuest.map((quest, index) => (
                    <HighlightQuest {...quest} key={index} />
                  ))}
                </div>
                <div className='text-center mt-6'>
                  <a href='#' className='inline-block px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors'>
                    Ver Mais Quests
                  </a>
                </div>
              </div>
            </div>

            <div className='mb-10'>
              <h2 className='text-2xl font-bold text-white mb-6 text-center'>Armas e Equipamentos</h2>
              <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg max-w-6xl mx-auto transition-all duration-300 hover:scale-105 hover:bg-gray-700/30'>
                <div className='grid grid-cols-3 gap-4'>
                  {weapons.map((weapon, index) => (
                    <div key={index} className='transition-transform duration-300 hover:scale-125'>
                      <Link to='/weapons'>
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
                      <OtherBox {...item} />
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
