import { OtherDatabaseType } from '../constants/other-database'
import { OtherBox } from './other-box'
import { Link } from 'react-router'
import { useAuth } from '../context/auth'

export const OtherTable = ({ title, items }: { title: string; items: OtherDatabaseType[] }) => {
  const isMonsterType = items.length > 0 && items[0]?.type === 'monster'
  const isDropCreatureType = items.length > 0 && items[0]?.type === 'drop_creatures'
  const isBookType = items.length > 0 && items[0]?.type === 'book'
  const isFoodType = items.length > 0 && items[0]?.type === 'food'
  const isRecipeType = items.length > 0 && items[0]?.type === 'recipes'
  const isNpcType = items.length > 0 && items[0]?.type === 'npc'
  const isItensQuestType = items.length > 0 && items[0]?.type === 'itens_quest'
  const { isAdmin } = useAuth()

  function renderEditHeader() {
    if (isAdmin) {
      return <th className='text-center px-2 py-4 font-semibold w-16 border-l border-gray-600'>Editar</th>
    }
    return null
  }

  function renderEditButton(item: OtherDatabaseType) {
    if (isAdmin) {
      return (
        <td className='px-2 py-4 text-center w-16 border-l border-gray-600'>
          <Link
            to={`/admin/other/${item.name}`}
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
    return null
  }

  return (
    <div className='mb-8'>
      <h2 className='text-2xl font-bold text-white mb-4 bg-purple-900/50 p-3 rounded-t-lg'>{title}</h2>
      <div className='bg-gray-800/50 rounded-b-lg overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='bg-purple-900/30 text-gray-300'>
                {isMonsterType ? (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>HP</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Experiência</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Habilidades</th>
                    <th className='text-center p-4 font-semibold'>Loot</th>
                    {renderEditHeader()}
                  </>
                ) : isDropCreatureType ? (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Item</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Peso</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Drop Por</th>
                    <th className='text-center p-4 font-semibold'>Preço de Venda</th>
                    {renderEditHeader()}
                  </>
                ) : isBookType ? (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Localização</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Autor</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Notas</th>
                    <th className='text-center p-4 font-semibold'>Texto</th>
                    {renderEditHeader()}
                  </>
                ) : isFoodType ? (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Item</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Peso</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Drop Por</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Tempo de Saciedade</th>
                    <th className='text-center p-4 font-semibold'>Buffs</th>
                    {renderEditHeader()}
                  </>
                ) : isRecipeType ? (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Item</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Tempo de Saciedade</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Buffs</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Peso</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Requisitos</th>
                    <th className='text-center p-4 font-semibold'>Drop Por</th>
                    {renderEditHeader()}
                  </>
                ) : isNpcType ? (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Localização</th>
                    <th className='text-center p-4 font-semibold'>Vende</th>
                    {renderEditHeader()}
                  </>
                ) : isItensQuestType ? (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Item</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Peso</th>
                    <th className='text-center p-4 font-semibold'>Descrição</th>
                    {renderEditHeader()}
                  </>
                ) : (
                  <>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Item</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Nome</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Tipo</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>HP</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Exp</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Habilidades</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Loot</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Localização</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Autor</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Notas</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Texto</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Tempo de Saciedade</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Buffs</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Peso</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Requisitos</th>
                    <th className='text-center p-4 border-r border-gray-600 font-semibold'>Drop Por</th>
                    <th className='text-center p-4 font-semibold'>Vender Para</th>
                    {renderEditHeader()}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className='border-b border-gray-700 hover:bg-gray-700/30 transition-colors'>
                  {isMonsterType ? (
                    <>
                      <td className='p-4 border-r border-gray-600 text-orange-400 font-bold text-lg text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-red-400 font-semibold text-center'>
                        <span className='bg-red-900/30 px-2 py-1 rounded'>{item.hp || '-'}</span>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-green-400 font-semibold text-center'>
                        <span className='bg-green-900/30 px-2 py-1 rounded'>{item.exp || '-'}</span>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-purple-400 text-sm text-center'>{item.abilities || 'Nenhuma habilidade especial'}</td>
                      <td className='p-4 text-yellow-400 text-sm text-center'>{item.loot || 'Nenhum loot'}</td>
                      {renderEditButton(item)}
                    </>
                  ) : isDropCreatureType ? (
                    <>
                      <td className='p-4 border-r border-gray-600 text-center'>
                        <div className='flex justify-center'>
                          <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                        </div>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-orange-400 font-bold text-lg text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 font-semibold text-center'>
                        <span className='bg-gray-900/30 px-2 py-1 rounded'>{item.weight || '-'}</span>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-red-400 text-sm text-center'>{item.dropBy || 'Não informado'}</td>
                      <td className='p-4 text-green-400 text-sm text-center'>{item.sellTo || 'Não vendável'}</td>
                      {renderEditButton(item)}
                    </>
                  ) : isBookType ? (
                    <>
                      <td className='p-4 border-r border-gray-600 text-orange-400 font-bold text-lg text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-cyan-400 font-semibold text-center'>
                        <span className='bg-cyan-900/30 px-2 py-1 rounded'>{item.location || '-'}</span>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-purple-400 text-sm text-center'>{item.author || 'Autor desconhecido'}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 text-sm text-center'>{item.notes || 'Sem notas'}</td>
                      <td className='p-4 text-yellow-400 text-sm text-center'>{item.text || 'Sem texto'}</td>
                      {renderEditButton(item)}
                    </>
                  ) : isFoodType ? (
                    <>
                      <td className='p-4 border-r border-gray-600 text-center'>
                        <div className='flex justify-center'>
                          <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                        </div>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-orange-400 font-bold text-lg text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 font-semibold text-center'>
                        <span className='bg-gray-900/30 px-2 py-1 rounded'>{item.weight || '-'}</span>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-red-400 text-sm text-center'>{item.dropBy || 'Não informado'}</td>
                      <td className='p-4 border-r border-gray-600 text-green-400 font-semibold text-center'>
                        <span className='bg-green-900/30 px-2 py-1 rounded'>{item.satiateTime || '-'}</span>
                      </td>
                      <td className='p-4 text-purple-400 text-sm text-center'>{item.buffs || 'Nenhum buff'}</td>
                      {renderEditButton(item)}
                    </>
                  ) : isRecipeType ? (
                    <>
                      <td className='p-4 border-r border-gray-600 text-center'>
                        <div className='flex justify-center'>
                          <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                        </div>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-orange-400 font-bold text-lg text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-green-400 font-semibold text-center'>
                        <span className='bg-green-900/30 px-2 py-1 rounded'>{item.satiateTime || '-'}</span>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-purple-400 text-sm text-center'>{item.buffs || 'Nenhum buff'}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 font-semibold text-center'>
                        <span className='bg-gray-900/30 px-2 py-1 rounded'>{item.weight || '-'}</span>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-yellow-400 text-sm text-center'>{item.requirements || 'Sem requisitos'}</td>
                      <td className='p-4 text-red-400 text-sm text-center'>{item.dropBy || 'Não informado'}</td>
                      {renderEditButton(item)}
                    </>
                  ) : isNpcType ? (
                    <>
                      <td className='p-4 border-r border-gray-600 text-orange-400 font-bold text-lg text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-cyan-400 font-semibold text-center'>
                        <span className='bg-cyan-900/30 px-2 py-1 rounded'>{item.location || '-'}</span>
                      </td>
                      <td className='p-4 text-green-400 text-sm text-center'>{item.sellTo || 'Não vende nada'}</td>
                      {renderEditButton(item)}
                    </>
                  ) : isItensQuestType ? (
                    <>
                      <td className='p-4 border-r border-gray-600 text-center'>
                        <div className='flex justify-center'>
                          <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                        </div>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-orange-400 font-bold text-lg text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 font-semibold text-center'>
                        <span className='bg-gray-900/30 px-2 py-1 rounded'>{item.weight || '-'}</span>
                      </td>
                      <td className='p-4 text-purple-400 text-sm text-center'>{item.description || 'Sem descrição'}</td>
                      {renderEditButton(item)}
                    </>
                  ) : (
                    <>
                      <td className='p-4 border-r border-gray-600 text-center'>
                        <div className='flex justify-center'>
                          <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                        </div>
                      </td>
                      <td className='p-4 border-r border-gray-600 text-yellow-400 font-medium text-center'>{item.name}</td>
                      <td className='p-4 border-r border-gray-600 text-blue-400 text-center'>{item.type}</td>
                      <td className='p-4 border-r border-gray-600 text-red-400 text-center'>{item.hp || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-green-400 text-center'>{item.exp || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-purple-400 text-center'>{item.abilities || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-orange-400 text-center'>{item.loot || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-cyan-400 text-center'>{item.location || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 text-center'>{item.author || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 text-center'>{item.notes || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 text-center'>{item.text || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-green-400 text-center'>{item.satiateTime || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-purple-400 text-center'>{item.buffs || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-gray-300 text-center'>{item.weight || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-orange-400 text-center'>{item.requirements || '-'}</td>
                      <td className='p-4 border-r border-gray-600 text-red-400 text-center'>{item.dropBy || '-'}</td>
                      <td className='p-4 text-green-300 text-center'>{item.sellTo || '-'}</td>
                      {renderEditButton(item)}
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
