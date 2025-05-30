import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useEffect, useState } from 'react'
import { SkillsGrid } from '../../../components/skill-grid'
import { Trash2 } from 'lucide-react'
import { StatField } from '../../../components/stat-field'

import { useParams } from 'react-router'
import { fetchBuildById, useUpdateBuild } from '../../../services/builds'
import { useBuilder } from '../../../context/builder'
export const BuildsDetails = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { buildId } = useParams<{ buildId: string }>()
  const { build: buildData, isEditing, setIsEditing, setBuild } = useBuilder()
  const { mutate: updateBuild } = useUpdateBuild()

  const handleInputChange = (field: keyof BuildsApiTypes.BuildData, value: string) => {
    setBuild((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleStatsChange = (field: keyof BuildsApiTypes.BuildData['characterStats'], value: string | number) => {
    setBuild((prev) => ({
      ...prev,
      characterStats: {
        ...prev.characterStats,
        [field]: value,
      },
    }))
  }

  const handleStatUpdate = (field: keyof BuildsApiTypes.BuildData['characterStats'], increment: boolean) => {
    setBuild((prev) => ({
      ...prev,
      characterStats: {
        ...prev.characterStats,
        [field]: increment ? (prev.characterStats[field] as number) + 1 : Math.max(0, (prev.characterStats[field] as number) - 1),
      },
    }))
  }

  const handleArrayUpdate = (field: keyof Pick<BuildsApiTypes.BuildData, 'equipment' | 'strategy'>, action: 'add' | 'delete' | 'edit', index?: number, value?: string) => {
    setBuild((prev) => {
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

  const handleSaveEditBuild = () => {
    if (isEditing) {
      updateBuild(
        {
          id: buildData?.id,
          title: buildData?.title,
          overview: buildData?.overview,
          characterStats: buildData?.characterStats,
          equipment: {
            accessory: buildData?.equipment?.accessory?.id,
            backpack: buildData?.equipment?.backpack?.id,
            chest: buildData?.equipment?.chest?.id,
            helmet: buildData?.equipment?.helmet?.id,
            legs: buildData?.equipment?.legs?.id,
            boots: buildData?.equipment?.boots?.id,
            leftHand: buildData?.equipment?.leftHand?.id,
            rightHand: buildData?.equipment?.rightHand?.id,
            ring: buildData?.equipment?.ring?.id,
            necklace: buildData?.equipment?.necklace?.id,
          },
          strategy: buildData?.strategy,
        },
        {
          onSuccess: () => {
            setIsEditing(false)
          },
        }
      )
    } else {
      setIsEditing(true)
    }
  }

  useEffect(() => {
    const fetchBuild = async () => {
      try {
        const data = await fetchBuildById(buildId!)
        setBuild(data)
        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching build:', error)
        setIsLoading(false)
      }
    }
    fetchBuild()
  }, [buildId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!buildData) {
    return <div>Build not found</div>
  }

  return (
    <div className='min-h-screen bg-gray-900 text-white'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            {isEditing ? (
              <input
                type='text'
                value={buildData?.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className='text-4xl font-bold text-center text-blue-400 bg-gray-800 border border-gray-600 rounded px-4 py-2 flex-1 mr-4'
              />
            ) : (
              <h1 className='text-4xl font-bold text-center text-blue-400 flex-1'>{buildData.title}</h1>
            )}
            <button
              onClick={() => handleSaveEditBuild()}
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
                value={buildData?.overview}
                onChange={(e) => handleInputChange('overview', e.target.value)}
                className='w-full text-gray-300 bg-gray-700 border border-gray-600 rounded px-4 py-2 leading-relaxed resize-vertical min-h-[100px]'
              />
            ) : (
              <p className='text-gray-300 leading-relaxed'>{buildData?.overview}</p>
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
                    value={buildData?.characterStats[field]}
                    onIncrement={() => handleStatUpdate(field, true)}
                    onDecrement={() => handleStatUpdate(field, false)}
                    isEditing={isEditing}
                  />
                ))}

                <div className='flex  flex-1 justify-between items-center py-1'>
                  <span className='text-white font-semibold'>Your Class:</span>
                  {isEditing ? (
                    <select
                      value={buildData?.characterStats?.class}
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
                    <span className='text-white'>{buildData?.characterStats?.class}</span>
                  )}
                </div>
              </div>

              <div className='flex flex-1 justify-center'>
                <SkillsGrid buildGrid={buildData?.equipment} />
              </div>
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
              {buildData?.strategy.map((strategyItem, index) => (
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
