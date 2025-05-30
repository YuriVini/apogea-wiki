import { useEquipments } from '../../../services/equipments'
import { useParams, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { OTHER_DATABASE, OtherDatabaseType } from '../../../constants/other-database'

type FormData = {
  name: string
  damage?: string
  attackSpeed?: string
  range?: string
  defense?: string
  attributes?: string
  size?: string
  weight?: string
  dropBy?: string
  buyFrom?: string
  sellTo?: string
  imageUrl?: string
  category?: string
  type?: string
  description?: string
  hp?: string
  exp?: string
  abilities?: string
  loot?: string
  location?: string
  author?: string
  notes?: string
  text?: string
  satiateTime?: string
  buffs?: string
  requirements?: string
}

export const Edit = () => {
  const { name } = useParams<{ name: string }>()
  const { data: equipments, isLoading } = useEquipments()

  // Try to find in OTHER_DATABASE first
  const otherItem: OtherDatabaseType | undefined = name ? OTHER_DATABASE.find((item) => item.name === name) : undefined

  // If found in OTHER_DATABASE, use its keys for fields
  const otherFields = otherItem ? Object.keys(otherItem).filter((key) => otherItem[key as keyof OtherDatabaseType] !== undefined) : []

  // Default equipment fields
  const equipmentFields = ['name', 'damage', 'attackSpeed', 'range', 'defense', 'attributes', 'size', 'weight', 'dropBy', 'buyFrom', 'sellTo', 'imageUrl', 'category']

  // Initial formData based on type
  const [formData, setFormData] = useState<FormData>(() => {
    if (otherItem) {
      const data: FormData = { name: '' }
      for (const key of otherFields) {
        data[key as keyof FormData] = otherItem[key as keyof OtherDatabaseType]?.toString() || ''
      }
      return data
    }
    return equipmentFields.reduce((acc, key) => ({ ...acc, [key]: '' }), { name: '' })
  })

  useEffect(() => {
    if (otherItem) {
      const data: FormData = { name: '' }
      for (const key of otherFields) {
        data[key as keyof FormData] = otherItem[key as keyof OtherDatabaseType]?.toString() || ''
      }
      setFormData(data)
    } else if (equipments && name) {
      const equipment = equipments.find((eq) => eq.name === name)
      if (equipment) {
        setFormData({
          name: equipment.name,
          damage: equipment.damage?.toString() || '',
          attackSpeed: equipment.attackSpeed?.toString() || '',
          range: equipment.range?.toString() || '',
          defense: equipment.defense?.toString() || '',
          attributes: equipment.attributes || '',
          size: equipment.size || '',
          weight: equipment.weight || '',
          dropBy: equipment.dropBy || '',
          buyFrom: equipment.buyFrom || '',
          sellTo: equipment.sellTo || '',
          imageUrl: equipment.imageUrl || '',
          category: equipment.category || '',
        })
      }
    }
  }, [equipments, name])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement update logic
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const categories = ['Sword', 'dagger', 'Axe', 'Mace', 'Bow', 'Staff', 'Gloves', 'Shield', 'Helmet', 'Chest', 'Legs', 'Boots', 'Nacklace', 'Ring', 'Backpack']

  const fieldsToShow = otherItem ? otherFields : equipmentFields
  const fieldLabels: Record<string, string> = {
    name: 'Nome',
    damage: 'Dano',
    attackSpeed: 'Velocidade de Ataque',
    range: 'Alcance',
    defense: 'Defesa',
    attributes: 'Atributos',
    size: 'Tamanho',
    weight: 'Peso',
    dropBy: 'Drop Por',
    buyFrom: 'Comprar De',
    sellTo: 'Vender Para',
    imageUrl: 'URL da Imagem',
    category: 'Categoria',
    // OtherDatabaseType fields
    type: 'Tipo',
    description: 'Descrição',
    hp: 'HP',
    exp: 'EXP',
    abilities: 'Habilidades',
    loot: 'Loot',
    location: 'Localização',
    author: 'Autor',
    notes: 'Notas',
    text: 'Texto',
    satiateTime: 'Tempo de Saciamento',
    buffs: 'Buffs',
    requirements: 'Requisitos',
  }

  const textareaFields = ['description', 'notes', 'text', 'abilities', 'loot', 'location', 'author', 'buffs', 'requirements']
  const otherTypes = ['drop_creatures', 'itens_quest', 'monster', 'book', 'food', 'recipes', 'npc']

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
      <Header />
      <div className='max-w-4xl mx-auto p-8'>
        <div className='flex items-center justify-center mb-8'>
          <h1 className='text-4xl font-bold text-white mr-4'>Editar {formData.name || name}</h1>
          {formData.imageUrl && <img src={formData.imageUrl} alt={formData.name || name} className='w-12 h-12 object-contain' />}
        </div>
        <form onSubmit={handleSubmit} className='bg-gray-800/70 rounded-lg p-8 shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {fieldsToShow.map((key) => (
              <div key={key}>
                <label className='block text-gray-300 mb-2 font-semibold'>{fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}</label>
                {key === 'category' && !otherItem ? (
                  <select
                    name={key}
                    value={formData[key as keyof FormData] || ''}
                    onChange={handleInputChange}
                    className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                  >
                    <option value=''>Selecione a categoria</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : key === 'type' && otherItem ? (
                  <select
                    name={key}
                    value={formData[key as keyof FormData] || ''}
                    onChange={handleInputChange}
                    className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                  >
                    <option value=''>Selecione o tipo</option>
                    {otherTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                ) : textareaFields.includes(key) ? (
                  <textarea
                    name={key}
                    value={formData[key as keyof FormData] || ''}
                    onChange={handleInputChange}
                    className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                    rows={3}
                  />
                ) : (
                  <input
                    type='text'
                    name={key}
                    value={formData[key as keyof FormData] || ''}
                    onChange={handleInputChange}
                    className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                  />
                )}
              </div>
            ))}
          </div>
          <div className='mt-10 flex justify-end gap-4'>
            <Link to='/admin/equipments' className='bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-semibold'>
              Cancelar
            </Link>
            <button type='submit' className='bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-200 font-semibold'>
              Salvar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}
