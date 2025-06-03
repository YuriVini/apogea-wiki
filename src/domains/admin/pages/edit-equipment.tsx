import { useEquipments, useUpdateEquipment } from '../../../services/equipments'
import { useParams, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'

export const Edit = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { name } = useParams<{ name: string }>()
  const { data: equipments } = useEquipments()
  const { mutate: updateEquipment } = useUpdateEquipment()
  const [equipment, setEquipment] = useState<EquipmentsApiTypes.Equipment | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        if (equipments && name) {
          const foundEquipment = equipments.find((eq) => eq.name === name)
          if (foundEquipment) {
            setEquipment(foundEquipment)
          }
        }
        setIsLoading(false)
      } catch (error) {
        console.log('Error fetching equipment:', error)
        setIsLoading(false)
      }
    }
    fetchEquipment()
  }, [equipments, name])

  const handleInputChange = (field: keyof EquipmentsApiTypes.Equipment, value: string | number) => {
    setEquipment((prev) => ({
      ...prev!,
      [field]: value,
    }))
  }

  const handleSaveEditEquipment = () => {
    if (isEditing && equipment) {
      updateEquipment(
        {
          id: equipment.id,
          name: equipment.name,
          type: equipment.type,
          category: equipment.category,
          imageUrl: equipment.imageUrl,
          size: equipment.size,
          range: equipment.range,
          damage: equipment.damage,
          weight: equipment.weight,
          dropBy: equipment.dropBy,
          rarity: equipment.rarity,
          sellTo: equipment.sellTo,
          buyFrom: equipment.buyFrom,
          defense: equipment.defense,
          attributes: equipment.attributes,
          attackSpeed: equipment.attackSpeed,
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

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
        <Header />
        <div className='flex items-center justify-center h-screen'>
          <div className='text-center text-white text-2xl animate-pulse'>Carregando...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!equipment) {
    return <div>Equipment not found</div>
  }

  const categories = ['sword', 'dagger', 'axe', 'mace', 'bow', 'staff', 'gloves', 'shield', 'helmet', 'chest', 'legs', 'boots', 'necklace', 'ring', 'backpack']
  const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary']

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
      <Header />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex justify-between items-center mb-8'>
            {isEditing ? (
              <input
                type='text'
                value={equipment.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className='text-4xl font-bold text-center text-blue-400 bg-gray-800 border border-gray-600 rounded px-4 py-2 flex-1 mr-4'
              />
            ) : (
              <h1 className='text-4xl font-bold text-center text-blue-400 flex-1'>{equipment.name}</h1>
            )}
            <div className='flex space-x-2'>
              <button
                onClick={handleSaveEditEquipment}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  isEditing ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isEditing ? 'Salvar' : 'Editar'}
              </button>
              <Link
                to={`/`}
                className='px-6 py-2 rounded-lg font-semibold transition-colors bg-gray-600 hover:bg-gray-700 text-white'
              >
                Voltar
              </Link>
            </div>
          </div>
          <div className='bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {Object.entries(equipment).map(([key, value]) => (
                <div key={key}>
                  <label className='block text-gray-300 mb-2 font-semibold'>{key}</label>
                  {key === 'category' ? (
                    <select
                      value={value as string}
                      onChange={(e) => handleInputChange(key as keyof EquipmentsApiTypes.Equipment, e.target.value)}
                      disabled={!isEditing}
                      className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  ) : key === 'rarity' ? (
                    <select
                      value={value as string}
                      onChange={(e) => handleInputChange(key as keyof EquipmentsApiTypes.Equipment, e.target.value)}
                      disabled={!isEditing}
                      className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                    >
                      {rarities.map((rarity) => (
                        <option key={rarity} value={rarity}>
                          {rarity}
                        </option>
                      ))}
                    </select>
                  ) : key === 'size' ? (
                    <input
                      type='text'
                      value={value as string}
                      onChange={(e) => handleInputChange(key as keyof EquipmentsApiTypes.Equipment, e.target.value)}
                      disabled={!isEditing}
                      className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                      placeholder='Enter size'
                    />
                  ) : (
                    <input
                      type='text'
                      value={value as string}
                      onChange={(e) => handleInputChange(key as keyof EquipmentsApiTypes.Equipment, e.target.value)}
                      disabled={!isEditing}
                      className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
