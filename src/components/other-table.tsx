import { OtherDatabaseType } from './other-database'
import { OtherBox } from './other-box'

export const OtherTable = ({ title, items }: { title: string; items: OtherDatabaseType[] }) => {
    const isMonsterType = items.length > 0 && items[0]?.type === 'monster'
    const isDropCreatureType = items.length > 0 && items[0]?.type === 'drop_creatures'
    const isBookType = items.length > 0 && items[0]?.type === 'book'
    const isFoodType = items.length > 0 && items[0]?.type === 'food'
    const isRecipeType = items.length > 0 && items[0]?.type === 'recipes'
    const isNpcType = items.length > 0 && items[0]?.type === 'npc'
    const isItensQuestType = items.length > 0 && items[0]?.type === 'itens_quest'
    
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4 bg-purple-900/50 p-3 rounded-t-lg">
          {title}
        </h2>
        <div className="bg-gray-800/50 rounded-b-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-purple-900/30 text-gray-300">
                  {isMonsterType ? (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">HP</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Experiência</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Habilidades</th>
                      <th className="text-left p-4 font-semibold">Loot</th>
                    </>
                  ) : isDropCreatureType ? (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Item</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Peso</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Drop Por</th>
                      <th className="text-left p-4 font-semibold">Preço de Venda</th>
                    </>
                  ) : isBookType ? (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Localização</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Autor</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Notas</th>
                      <th className="text-left p-4 font-semibold">Texto</th>
                    </>
                  ) : isFoodType ? (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Item</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Peso</th>
                      <th className="text-left p-4 font-semibold">Drop Por</th>
                    </>
                  ) : isRecipeType ? (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Item</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Tempo de Saciedade</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Buffs</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Peso</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Requisitos</th>
                      <th className="text-left p-4 font-semibold">Drop Por</th>
                    </>
                  ) : isNpcType ? (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Localização</th>
                      <th className="text-left p-4 font-semibold">Vende</th>
                    </>
                  ) : isItensQuestType ? (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Item</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Peso</th>
                      <th className="text-left p-4 font-semibold">Descrição</th>
                    </>
                  ) : (
                    <>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Item</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Nome</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Tipo</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">HP</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Exp</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Habilidades</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Loot</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Localização</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Autor</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Notas</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Texto</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Tempo de Saciedade</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Buffs</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Peso</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Requisitos</th>
                      <th className="text-left p-4 border-r border-gray-600 font-semibold">Drop Por</th>
                      <th className="text-left p-4 font-semibold">Vender Para</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                    {isMonsterType ? (
                      <>
                        <td className="p-4 border-r border-gray-600 text-orange-400 font-bold text-lg">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-red-400 font-semibold">
                          <span className="bg-red-900/30 px-2 py-1 rounded">{item.hp || '-'}</span>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-green-400 font-semibold">
                          <span className="bg-green-900/30 px-2 py-1 rounded">{item.exp || '-'}</span>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-purple-400 text-sm">{item.abilities || 'Nenhuma habilidade especial'}</td>
                        <td className="p-4 text-yellow-400 text-sm">{item.loot || 'Nenhum loot'}</td>
                      </>
                    ) : isDropCreatureType ? (
                      <>
                        <td className="p-4 border-r border-gray-600 text-center">
                          <div className="flex justify-center">
                            <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                          </div>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-orange-400 font-bold text-lg">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300 font-semibold">
                          <span className="bg-gray-900/30 px-2 py-1 rounded">{item.weight || '-'}</span>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-red-400 text-sm">{item.dropBy || 'Não informado'}</td>
                        <td className="p-4 text-green-400 text-sm">{item.sellTo || 'Não vendável'}</td>
                      </>
                    ) : isBookType ? (
                      <>
                        <td className="p-4 border-r border-gray-600 text-orange-400 font-bold text-lg">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-cyan-400 font-semibold">
                          <span className="bg-cyan-900/30 px-2 py-1 rounded">{item.location || '-'}</span>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-purple-400 text-sm">{item.author || 'Autor desconhecido'}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300 text-sm">{item.notes || 'Sem notas'}</td>
                        <td className="p-4 text-yellow-400 text-sm">{item.text || 'Sem texto'}</td>
                      </>
                    ) : isFoodType ? (
                      <>
                        <td className="p-4 border-r border-gray-600 text-center">
                          <div className="flex justify-center">
                            <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                          </div>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-orange-400 font-bold text-lg">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300 font-semibold">
                          <span className="bg-gray-900/30 px-2 py-1 rounded">{item.weight || '-'}</span>
                        </td>
                        <td className="p-4 text-red-400 text-sm">{item.dropBy || 'Não informado'}</td>
                      </>
                    ) : isRecipeType ? (
                      <>
                        <td className="p-4 border-r border-gray-600 text-center">
                          <div className="flex justify-center">
                            <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                          </div>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-orange-400 font-bold text-lg">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-green-400 font-semibold">
                          <span className="bg-green-900/30 px-2 py-1 rounded">{item.satiateTime || '-'}</span>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-purple-400 text-sm">{item.buffs || 'Nenhum buff'}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300 font-semibold">
                          <span className="bg-gray-900/30 px-2 py-1 rounded">{item.weight || '-'}</span>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-yellow-400 text-sm">{item.requirements || 'Sem requisitos'}</td>
                        <td className="p-4 text-red-400 text-sm">{item.dropBy || 'Não informado'}</td>
                      </>
                    ) : isNpcType ? (
                      <>
                        <td className="p-4 border-r border-gray-600 text-orange-400 font-bold text-lg">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-cyan-400 font-semibold">
                          <span className="bg-cyan-900/30 px-2 py-1 rounded">{item.location || '-'}</span>
                        </td>
                        <td className="p-4 text-green-400 text-sm">{item.sellTo || 'Não vende nada'}</td>
                      </>
                    ) : isItensQuestType ? (
                      <>
                        <td className="p-4 border-r border-gray-600 text-center">
                          <div className="flex justify-center">
                            <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                          </div>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-orange-400 font-bold text-lg">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300 font-semibold">
                          <span className="bg-gray-900/30 px-2 py-1 rounded">{item.weight || '-'}</span>
                        </td>
                        <td className="p-4 text-purple-400 text-sm">{item.description || 'Sem descrição'}</td>
                      </>
                    ) : (
                      <>
                        <td className="p-4 border-r border-gray-600 text-center">
                          <div className="flex justify-center">
                            <OtherBox title={item.name} imageUrl={item.imageUrl || ''} />
                          </div>
                        </td>
                        <td className="p-4 border-r border-gray-600 text-yellow-400 font-medium">{item.name}</td>
                        <td className="p-4 border-r border-gray-600 text-blue-400">{item.type}</td>
                        <td className="p-4 border-r border-gray-600 text-red-400">{item.hp || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-green-400">{item.exp || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-purple-400">{item.abilities || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-orange-400">{item.loot || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-cyan-400">{item.location || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300">{item.author || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300">{item.notes || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300">{item.text || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-green-400">{item.satiateTime || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-purple-400">{item.buffs || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-gray-300">{item.weight || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-orange-400">{item.requirements || '-'}</td>
                        <td className="p-4 border-r border-gray-600 text-red-400">{item.dropBy || '-'}</td>
                        <td className="p-4 text-green-300">{item.sellTo || '-'}</td>
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