import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { WeaponBox } from '../../../components/weapon-box'
import { useParams, Link } from 'react-router'
import { useEquipments } from '../../../services/equipments'
import { useAuth } from '../../../context/auth'
import { useState } from 'react'

export const Weapons = () => {
  const { weaponCategory } = useParams<{ weaponCategory: string }>()
  const { data: equipments, isLoading } = useEquipments()
  const { isAdmin } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) return <div>Loading...</div>

  const filteredWeapons = equipments?.filter((weapon) => 
    weapon.category === weaponCategory && 
    weapon.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  function renderEditHeader() {
    return isAdmin && <th className='text-center px-2 py-4 font-semibold w-16 border-l border-gray-600'>Editar</th>
  }

  function renderEditButton(weapon: EquipmentsApiTypes.Equipment) {
    return isAdmin && (
      <td className='px-2 py-4 text-center w-16 border-l border-gray-600'>
        <Link
          to={`/admin/edit/${weapon.name}`}
          className='inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full transition-colors text-base shadow-md'
          title='Editar'
        >
          <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.828l-4.243 1.414 1.414-4.243a4 4 0 01.828-1.414z'
            />
          </svg>
        </Link>
      </td>
    )
  }

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />

      <main className='max-w-7xl mx-auto p-6'>
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-4xl font-bold text-white text-center flex-1 animate-fade-in-down'>Weapons Database</h1>
          </div>
          <p className='text-gray-300 text-center max-w-3xl mx-auto'>
            Banco de dados completo de todas as armas disponíveis no Apogea, incluindo suas estatísticas, requisitos e atributos.
          </p>
        </div>

          <div className='mb-4 flex justify-end'>
            <input
              type='text'
              placeholder='Buscar por nome...'
              className='p-2 rounded-lg bg-gray-700 text-white'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-white mb-4 bg-purple-900/50 p-3 rounded-t-lg'>Melee Weapons</h2>
          <div className='bg-gray-800/50 rounded-lg overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='bg-purple-900/30 text-gray-300'>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Item</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Dano</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Velocidade de Ataque</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Alcance</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Defesa</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Atributos</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Tamanho</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Peso</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Drop Por</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Comprar De</th>
                    <th className='text-left p-4 border-r border-gray-600 font-semibold'>Vender Para</th>
                    {renderEditHeader()}
                  </tr>
                </thead>
                <tbody>
                  {filteredWeapons.map((weapon, index) => (
                    <tr key={index} className='border-b border-gray-700 hover:bg-gray-700/30 transition-colors'>
                      <td className='p-4 border-r border-gray-600 text-center'>
                        <div className='flex justify-center'>
                          <WeaponBox title={weapon.name} imageUrl={weapon.imageUrl} />
                        </div>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-yellow-400 font-medium'>{weapon.name}</td>
                      <td className='p-4 border-r border-gray-600 text-green-400'>{weapon.damage}</td>
                      <td className='p-4 border-r border-gray-600 text-blue-400'>{weapon.attackSpeed}</td>
                      <td className='p-4 border-r border-gray-600 text-orange-400'>{weapon.range}</td>
                      <td className='p-4 border-r border-gray-600 text-purple-400'>{weapon.defense}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300'>{weapon.attributes}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300'>{weapon.size}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300'>{weapon.weight}</td>
                      <td className='p-4 border-r border-gray-600 text-red-400'>{weapon.dropBy}</td>
                      <td className='p-4 border-r border-gray-600 text-cyan-400'>{weapon.buyFrom}</td>
                      <td className='p-4 border-r border-gray-600 text-green-300'>{weapon.sellTo}</td>
                      {renderEditButton(weapon)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
