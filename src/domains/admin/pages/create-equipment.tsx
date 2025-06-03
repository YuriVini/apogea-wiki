import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateEquipment } from '../../../services/equipments'
import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'

export const CreateEquipment = () => {
  const navigate = useNavigate()
  const { mutateAsync: createEquipment } = useCreateEquipment()
  const [formData, setFormData] = useState<Omit<EquipmentsApiTypes.Equipment, 'id'>>({
    name: '',
    type: 'weapon',
    category: 'sword',
    imageUrl: '',
    size: '',
    range: '',
    damage: '',
    weight: '',
    dropBy: '',
    rarity: 'common',
    sellTo: '',
    buyFrom: '',
    defense: '',
    attributes: '',
    attackSpeed: '',
  })

  console.log('[ENTRADA] Estado inicial do formData:', formData)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[ENTRADA] handleSubmit - Dados enviados para criação:', formData)
    try {
      const result = await createEquipment(formData)
      console.log('[SAÍDA] handleSubmit - Equipamento criado com sucesso! Resposta:', result)
      navigate('/weapons/sword')
    } catch (error) {
      console.error('[SAÍDA] handleSubmit - Erro ao criar equipamento:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    console.log(`[ENTRADA] handleChange - Alterando campo ${name} para:`, value)
    setFormData((prev) => {
      const newFormData = {
        ...prev,
        [name]: value,
      }
      console.log('[SAÍDA] handleChange - Novo formData:', newFormData)
      return newFormData
    })
  }

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />

      <main className='max-w-4xl mx-auto p-6'>
        <h1 className='text-3xl font-bold text-white mb-8'>Adicionar Equipamento</h1>

        <form onSubmit={handleSubmit} className='bg-gray-800 rounded-lg p-6 space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <div>
              <label className='block text-gray-300 mb-2'>Name</label>
              <input type='text' name='name' value={formData.name} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' required />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Rarity</label>
              <select name='rarity' value={formData.rarity} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white'>
                <option value='common'>Common</option>
                <option value='magic'>Magic</option>
                <option value='rare'>Rare</option>
                <option value='legendary'>Legendary</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Image URL</label>
              <input type='text' name='imageUrl' value={formData.imageUrl} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' required />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Type</label>
              <select name='type' value={formData.type} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white'>
                <option value='weapon'>Weapon</option>
                <option value='armor'>Armor</option>
                <option value='accessory'>Accessory</option>
                <option value='spell'>Spell</option>
                <option value='ability'>Ability</option>
                <option value='backpack'>Backpack</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Category</label>
              <select name='category' value={formData.category} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white'>
                <option value='sword'>Sword</option>
                <option value='dagger'>Dagger</option>
                <option value='axe'>Axe</option>
                <option value='mace'>Mace</option>
                <option value='bow'>Bow</option>
                <option value='staff'>Staff</option>
                <option value='gloves'>Gloves</option>
                <option value='shield'>Shield</option>
                <option value='helmet'>Helmet</option>
                <option value='chest'>Chest</option>
                <option value='legs'>Legs</option>
                <option value='boots'>Boots</option>
                <option value='necklace'>Necklace</option>
                <option value='ring'>Ring</option>
                <option value='backpack'>Backpack</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Damage</label>
              <input type='text' name='damage' value={formData.damage} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='e.g. 10-20' />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Attack Speed</label>
              <input
                type='text'
                name='attackSpeed'
                value={formData.attackSpeed}
                onChange={handleChange}
                className='w-full p-2 rounded bg-gray-700 text-white'
                placeholder='e.g. 1.2'
              />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Range</label>
              <input type='text' name='range' value={formData.range} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='e.g. 5' />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Defense</label>
              <input type='text' name='defense' value={formData.defense} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='e.g. 15' />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Attributes</label>
              <textarea
                name='attributes'
                value={formData.attributes}
                onChange={handleChange}
                className='w-full p-2 rounded bg-gray-700 text-white'
                placeholder='e.g. +5 Strength, +2 Agility'
                rows={2}
              />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Size</label>
              <input type='text' name='size' value={formData.size} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='e.g. Medium' />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Weight</label>
              <input type='text' name='weight' value={formData.weight} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='e.g. 2.5kg' />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Drop By</label>
              <input
                type='text'
                name='dropBy'
                value={formData.dropBy}
                onChange={handleChange}
                className='w-full p-2 rounded bg-gray-700 text-white'
                placeholder='e.g. Goblin King'
              />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Buy From</label>
              <input
                type='text'
                name='buyFrom'
                value={formData.buyFrom}
                onChange={handleChange}
                className='w-full p-2 rounded bg-gray-700 text-white'
                placeholder='e.g. Blacksmith'
              />
            </div>

            <div>
              <label className='block text-gray-300 mb-2'>Sell To</label>
              <input type='text' name='sellTo' value={formData.sellTo} onChange={handleChange} className='w-full p-2 rounded bg-gray-700 text-white' placeholder='e.g. Merchant' />
            </div>
          </div>

          <button type='submit' className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700'>
            Adicionar Equipamento
          </button>
        </form>
      </main>

      <Footer />
    </div>
  )
}
