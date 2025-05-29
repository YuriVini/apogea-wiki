import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useState } from 'react'
import { SkillsGrid } from '../../../components/skill-grid'
import { Trash2 } from 'lucide-react'
import { SkillList } from '../../../components/skill-list'
import { StatField } from '../../../components/stat-field'
import { Equipment } from '../../../constants/equipment'
import Helme3 from '/helmet/Helmet3.webp'
import RingIcon from '/ring/Crystal_Ring.webp'
import LegsIcon from '/legs/Leather_Cuisse.webp'
import BootsIcon from '/boots/Boots1.webp'
import ChestIcon from '/armor/Brass_armor.webp'
import BackpackIcon from '/backpack/Backpack_blue.webp'
import AccessoryIcon from '/necklace/Silver_amulet.webp'
import LeftHandIcon from '/swords/Broadsword.webp'
import RightHandIcon from '/swords/Broadsword.webp'

interface BuildData {
  title: string
  overview: string
  equipment: Record<string, Equipment>
  requirements: string[]
  mainSkills: string[]
  supportSkills: string[]
  strategy: string[]
  characterStats: {
    level: number
    health: number
    mana: number
    magic: number
    weaponSkill: number
    hpRegen: number
    mpRegen: number
    capacity: number
    pvpStatus: string
    class: string
  }
}

const initialBuildGrid: Record<string, Equipment> = {
  accessory: {
    name: 'Accessory',
    imageUrl: AccessoryIcon,
    type: 'accessory',
    category: 'ring',
  } as Equipment,
  leftHand: {
    name: 'Left Hand',
    imageUrl: LeftHandIcon,
    type: 'weapon',
    category: 'sword',
  } as Equipment,
  rightHand: {
    name: 'Right Hand',
    imageUrl: RightHandIcon,
    type: 'weapon',
    category: 'sword',
  } as Equipment,
  chest: {
    name: 'Chest',
    imageUrl: ChestIcon,
    type: 'armor',
    category: 'chest',
  } as Equipment,
  legs: {
    name: 'Legs',
    imageUrl: LegsIcon,
    type: 'armor',
    category: 'leg',
  } as Equipment,
  boots: {
    name: 'Boots',
    imageUrl: BootsIcon,
    type: 'armor',
    category: 'boot',
  } as Equipment,
  helmet: {
    name: 'Helmet',
    imageUrl: Helme3,
    type: 'armor',
    category: 'helmet',
  } as Equipment,
  ring: {
    name: 'Ring',
    imageUrl: RingIcon,
    type: 'accessory',
    category: 'ring',
  } as Equipment,
  backpack: {
    name: 'Backpack',
    imageUrl: BackpackIcon,
    type: 'accessory',
    category: 'backpack',
  } as Equipment,
}

const initialBuildData: BuildData = {
  title: 'Penetrating Shot Rogue',
  overview:
    'A build Penetrating Shot Rogue é focada em maximizar o dano à distância com arco, utilizando a habilidade Penetrating Shot para atingir múltiplos inimigos em linha. Esta build é ideal para jogadores que preferem eliminar inimigos rapidamente à distância.',
  equipment: initialBuildGrid,
  requirements: ['Trickshot', 'Bow Mastery', 'Quick Draw'],
  mainSkills: ['Penetrating Shot', 'Multishot', 'Aimed Shot', 'Power Shot'],
  supportSkills: ['Stealth', 'Dodge Roll', 'Critical Strike', 'Weapon Focus: Bow'],
  strategy: [
    'Mantenha distância dos inimigos, use terreno elevado quando possível e posicione-se para alinhar múltiplos inimigos.',
    'Use Penetrating Shot para atingir grupos de inimigos, Aimed Shot para alvos únicos importantes e Stealth para reposicionamento.',
    'Mantenha sempre um estoque grande de flechas, use Multishot em grupos densos e combine Critical Strike com Power Shot para máximo dano.',
  ],
  characterStats: {
    level: 0,
    health: 150,
    mana: 0,
    magic: 15,
    weaponSkill: 0,
    hpRegen: 0,
    mpRegen: 0,
    capacity: 0,
    pvpStatus: 'Off',
    class: 'Squire',
  },
}

export const Builds = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [buildData, setBuildData] = useState<BuildData>(initialBuildData)

  const handleInputChange = (field: keyof BuildData, value: string) => {
    setBuildData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStatsChange = (field: keyof BuildData['characterStats'], value: string | number) => {
    setBuildData((prev) => ({
      ...prev,
      characterStats: {
        ...prev.characterStats,
        [field]: value,
      },
    }))
  }

  const handleStatUpdate = (field: keyof BuildData['characterStats'], increment: boolean) => {
    setBuildData((prev) => ({
      ...prev,
      characterStats: {
        ...prev.characterStats,
        [field]: increment ? (prev.characterStats[field] as number) + 1 : Math.max(0, (prev.characterStats[field] as number) - 1),
      },
    }))
  }

  const handleArrayUpdate = (
    field: keyof Pick<BuildData, 'equipment' | 'requirements' | 'mainSkills' | 'supportSkills' | 'strategy'>,
    action: 'add' | 'delete' | 'edit',
    index?: number,
    value?: string
  ) => {
    setBuildData((prev) => {
      const array = prev[field] as string[]
      switch (action) {
        case 'add':
          return { ...prev, [field]: [...array, ''] }
        case 'delete':
          return { ...prev, [field]: array.filter((_, i) => i !== index) }
        case 'edit':
          return { ...prev, [field]: array.map((item, i) => (i === index ? value! : item)) }
        default:
          return prev
      }
    })
  }

  const stats = [
    { label: 'Level', field: 'level' as const },
    { label: 'Health', field: 'health' as const },
    { label: 'Mana', field: 'mana' as const },
    { label: 'Magic', field: 'magic' as const },
    { label: 'Weapon Skill', field: 'weaponSkill' as const },
    { label: 'HP Regen', field: 'hpRegen' as const },
    { label: 'MP Regen', field: 'mpRegen' as const },
    { label: 'Capacity', field: 'capacity' as const },
  ]

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            {isEditing ? (
              <input
                type='text'
                value={buildData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className='text-4xl font-bold text-center text-blue-400 bg-gray-800 border border-gray-600 rounded px-4 py-2 flex-1 mr-4'
              />
            ) : (
              <h1 className='text-4xl font-bold text-center text-blue-400 flex-1'>{buildData.title}</h1>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                isEditing ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isEditing ? 'Salvar' : 'Editar'}
            </button>
          </div>

          <div className='bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700'>
            <h2 className='text-2xl font-semibold mb-4 text-yellow-400'>Visão Geral</h2>
            {isEditing ? (
              <textarea
                value={buildData.overview}
                onChange={(e) => handleInputChange('overview', e.target.value)}
                className='w-full text-gray-300 bg-gray-700 border border-gray-600 rounded px-4 py-2 leading-relaxed resize-vertical min-h-[100px]'
              />
            ) : (
              <p className='text-gray-300 leading-relaxed'>{buildData.overview}</p>
            )}
          </div>

          <div className='bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700'>
            <h2 className='text-2xl font-semibold mb-4 text-purple-400'>Pontos de Skill</h2>
            <div className='flex justify-evenly bg-gray-900 rounded-lg p-4 border border-gray-600'>
              <div className='w-1/4 space-y-2'>
                {stats.map(({ label, field }) => (
                  <StatField
                    key={field}
                    label={label}
                    value={buildData.characterStats[field]}
                    onIncrement={() => handleStatUpdate(field, true)}
                    onDecrement={() => handleStatUpdate(field, false)}
                    isEditing={isEditing}
                  />
                ))}

                <div className='flex justify-between items-center py-1'>
                  <span className='text-white font-semibold'>Your Class:</span>
                  {isEditing ? (
                    <select
                      value={buildData.characterStats.class}
                      onChange={(e) => handleStatsChange('class', e.target.value)}
                      className='bg-gray-700 border border-gray-600 rounded px-2 py-1 w-32 text-white'
                    >
                      {['Squire', 'Knight', 'Mage', 'Rogue'].map((className) => (
                        <option key={className} value={className}>
                          {className}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className='text-white'>{buildData.characterStats.class}</span>
                  )}
                </div>
              </div>

              <SkillsGrid initialBuildGrid={buildData.equipment} />
            </div>
          </div>

          <br />

          <div className='bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700'>
            <h3 className='text-xl font-semibold mb-4 text-red-400'>Habilidades Recomendadas</h3>
            <div className='grid md:grid-cols-2 gap-4'>
              <SkillList
                title='Principais'
                skills={buildData.mainSkills}
                onAdd={() => handleArrayUpdate('mainSkills', 'add')}
                onDelete={(index) => handleArrayUpdate('mainSkills', 'delete', index)}
                onEdit={(index, value) => handleArrayUpdate('mainSkills', 'edit', index, value)}
                isEditing={isEditing}
              />
              <SkillList
                title='Suporte'
                skills={buildData.supportSkills}
                onAdd={() => handleArrayUpdate('supportSkills', 'add')}
                onDelete={(index) => handleArrayUpdate('supportSkills', 'delete', index)}
                onEdit={(index, value) => handleArrayUpdate('supportSkills', 'edit', index, value)}
                isEditing={isEditing}
              />
            </div>
          </div>

          <div className='bg-gray-800 rounded-lg p-6 border border-gray-700'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-semibold text-cyan-400'>Estratégia de Combate</h3>
              {isEditing && (
                <button onClick={() => handleArrayUpdate('strategy', 'add')} className='text-green-400 hover:text-green-300 text-sm'>
                  ➕
                </button>
              )}
            </div>
            <ul className='space-y-2 text-gray-300'>
              {buildData.strategy.map((strategyItem, index) => (
                <li key={index} className='flex items-center justify-between'>
                  <div className='flex items-center flex-1'>
                    <span className='text-cyan-400 mr-2'>💡</span>
                    {isEditing ? (
                      <textarea
                        value={strategyItem}
                        onChange={(e) => handleArrayUpdate('strategy', 'edit', index, e.target.value)}
                        className='bg-gray-700 border border-gray-600 rounded px-2 py-1 flex-1 resize-vertical min-h-[60px]'
                      />
                    ) : (
                      <span>{strategyItem}</span>
                    )}
                  </div>
                  {isEditing && (
                    <button onClick={() => handleArrayUpdate('strategy', 'delete', index)} className='ml-2 text-red-400 hover:text-red-300 text-sm'>
                      <Trash2 />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
