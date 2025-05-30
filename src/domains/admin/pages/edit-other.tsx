import { useParams, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { OTHER_DATABASE, OtherDatabaseType } from '../../../constants/other-database'

export const EditOther = () => {
  const { name } = useParams<{ name: string }>()
  const itemFromDb = name ? OTHER_DATABASE.find((i) => i.name === name) : undefined

  const [formData, setFormData] = useState<OtherDatabaseType>(() => {
    if (itemFromDb) {
      return {
        name: itemFromDb.name,
        imageUrl: itemFromDb.imageUrl || '',
        type: itemFromDb.type,
        weight: itemFromDb.weight || '',
        dropBy: itemFromDb.dropBy || '',
        sellTo: itemFromDb.sellTo || '',
        description: itemFromDb.description || '',
        hp: itemFromDb.hp || '',
        exp: itemFromDb.exp || '',
        abilities: itemFromDb.abilities || '',
        loot: itemFromDb.loot || '',
        location: itemFromDb.location || '',
        author: itemFromDb.author || '',
        notes: itemFromDb.notes || '',
        text: itemFromDb.text || '',
        satiateTime: itemFromDb.satiateTime || '',
        buffs: itemFromDb.buffs || '',
        requirements: itemFromDb.requirements || '',
      }
    }
    return {
      name: '',
      imageUrl: '',
      type: 'drop_creatures',
      weight: '',
      dropBy: '',
      sellTo: '',
      description: '',
      hp: '',
      exp: '',
      abilities: '',
      loot: '',
      location: '',
      author: '',
      notes: '',
      text: '',
      satiateTime: '',
      buffs: '',
      requirements: '',
    }
  })

  useEffect(() => {
    if (itemFromDb) {
      setFormData({
        name: itemFromDb.name,
        imageUrl: itemFromDb.imageUrl || '',
        type: itemFromDb.type,
        weight: itemFromDb.weight || '',
        dropBy: itemFromDb.dropBy || '',
        sellTo: itemFromDb.sellTo || '',
        description: itemFromDb.description || '',
        hp: itemFromDb.hp || '',
        exp: itemFromDb.exp || '',
        abilities: itemFromDb.abilities || '',
        loot: itemFromDb.loot || '',
        location: itemFromDb.location || '',
        author: itemFromDb.author || '',
        notes: itemFromDb.notes || '',
        text: itemFromDb.text || '',
        satiateTime: itemFromDb.satiateTime || '',
        buffs: itemFromDb.buffs || '',
        requirements: itemFromDb.requirements || '',
      })
    }
  }, [name])

  if (!name) {
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

  if (!itemFromDb) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
        <Header />
        <div className='flex items-center justify-center h-screen'>
          <div className='text-center text-white text-2xl'>Item não encontrado</div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar lógica de update
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const fields: { key: keyof OtherDatabaseType; label: string; type?: string }[] = [
    { key: 'name', label: 'Nome' },
    { key: 'imageUrl', label: 'URL da Imagem' },
    { key: 'type', label: 'Tipo' },
    { key: 'weight', label: 'Peso' },
    { key: 'dropBy', label: 'Drop Por' },
    { key: 'sellTo', label: 'Vender Para' },
    { key: 'description', label: 'Descrição' },
    { key: 'hp', label: 'HP' },
    { key: 'exp', label: 'EXP' },
    { key: 'abilities', label: 'Habilidades' },
    { key: 'loot', label: 'Loot' },
    { key: 'location', label: 'Localização' },
    { key: 'author', label: 'Autor' },
    { key: 'notes', label: 'Notas' },
    { key: 'text', label: 'Texto', type: 'textarea' },
    { key: 'satiateTime', label: 'Tempo de Saciamento' },
    { key: 'buffs', label: 'Buffs' },
    { key: 'requirements', label: 'Requisitos' },
  ]

  const otherTypes = ['drop_creatures', 'itens_quest', 'monster', 'book', 'food', 'recipes', 'npc']

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-800'>
      <Header />
      <div className='max-w-4xl mx-auto p-8'>
        <div className='flex items-center justify-center mb-8'>
          <h1 className='text-4xl font-bold text-white mr-4'>Editar Diverso: {formData.name}</h1>
          {formData.imageUrl && <img src={formData.imageUrl} alt={formData.name} className='w-12 h-12 object-contain' />}
        </div>
        <form onSubmit={handleSubmit} className='bg-gray-800/70 rounded-lg p-8 shadow-lg'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {fields.map(({ key, label, type }) => (
              <div key={key}>
                <label className='block text-gray-300 mb-2 font-semibold'>{label}</label>
                {key === 'type' ? (
                  <select
                    name={key}
                    value={formData[key] as string}
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
                ) : type === 'textarea' ? (
                  <textarea
                    name={key}
                    value={formData[key] as string}
                    onChange={handleInputChange}
                    className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                    rows={3}
                  />
                ) : (
                  <input
                    type='text'
                    name={key}
                    value={formData[key] as string}
                    onChange={handleInputChange}
                    className='w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200'
                  />
                )}
              </div>
            ))}
          </div>
          <div className='mt-10 flex justify-end gap-4'>
            <Link to='/other' className='bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-semibold'>
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

export default EditOther
