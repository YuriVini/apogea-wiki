import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useState } from 'react'

export const Knight = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'builds'>('overview')

    return (
        <div className='min-h-screen bg-gray-900'>
            <Header />
            
            <main className='max-w-7xl mx-auto p-6'>
                <div className='mb-8'>
                    <h1 className='text-4xl font-bold text-white text-center mb-4 animate-fade-in-down'>
                        Knight - O Guardião de Apogea
                    </h1>
                    <p className='text-gray-300 text-center text-lg'>
                        Guerreiro resistente especializado em combate corpo a corpo e proteção de aliados
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className='mb-8'>
                    <div className='flex justify-center space-x-4'>
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                                activeTab === 'overview'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30 hover:text-white'
                            }`}
                        >
                            📖 Visão Geral
                        </button>
                        <button
                            onClick={() => setActiveTab('builds')}
                            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                                activeTab === 'builds'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-800/30 text-gray-300 hover:bg-gray-700/30 hover:text-white'
                            }`}
                        >
                            ⚔️ Builds
                        </button>
                    </div>
                </div>

                {activeTab === 'overview' && (
                    <>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12'>
                            {/* Estatísticas */}
                            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg'>
                                <h2 className='text-2xl font-bold text-white mb-4'>📊 Estatísticas</h2>
                                <div className='space-y-3'>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300'>Vida:</span>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-32 bg-gray-700 rounded-full h-3'>
                                                <div className='bg-green-500 h-3 rounded-full w-5/6'></div>
                                            </div>
                                            <span className='text-green-400 font-bold'>Alto</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300'>Dano:</span>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-32 bg-gray-700 rounded-full h-3'>
                                                <div className='bg-yellow-500 h-3 rounded-full w-3/6'></div>
                                            </div>
                                            <span className='text-yellow-400 font-bold'>Médio</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300'>Defesa:</span>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-32 bg-gray-700 rounded-full h-3'>
                                                <div className='bg-blue-500 h-3 rounded-full w-5/6'></div>
                                            </div>
                                            <span className='text-blue-400 font-bold'>Alto</span>
                                        </div>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='text-gray-300'>Velocidade:</span>
                                        <div className='flex items-center gap-2'>
                                            <div className='w-32 bg-gray-700 rounded-full h-3'>
                                                <div className='bg-red-500 h-3 rounded-full w-2/6'></div>
                                            </div>
                                            <span className='text-red-400 font-bold'>Baixo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Estilo de Jogo */}
                            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg'>
                                <h2 className='text-2xl font-bold text-white mb-4'>🎯 Estilo de Jogo</h2>
                                <div className='space-y-4'>
                                    <div className='bg-blue-500/20 rounded-lg p-4 border border-blue-400/30'>
                                        <h3 className='text-blue-300 font-bold mb-2'>Tank/Defensor</h3>
                                        <p className='text-gray-300 text-sm'>
                                            O Knight é a linha de frente do grupo, absorvendo dano e protegendo aliados mais frágeis.
                                        </p>
                                    </div>
                                    <div className='bg-green-500/20 rounded-lg p-4 border border-green-400/30'>
                                        <h3 className='text-green-300 font-bold mb-2'>Controle de Campo</h3>
                                        <p className='text-gray-300 text-sm'>
                                            Usa habilidades para controlar o posicionamento dos inimigos e manter a atenção deles.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Habilidades */}
                        <div className='mb-12'>
                            <h2 className='text-3xl font-bold text-white mb-6 text-center'>⚔️ Habilidades</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <span className='text-2xl'>🛡️</span>
                                        <h3 className='text-xl font-bold text-white'>Shield Bash</h3>
                                    </div>
                                    <p className='text-gray-300'>Atordoa inimigos com um golpe poderoso do escudo, causando dano e deixando-os vulneráveis por alguns segundos.</p>
                                </div>

                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <span className='text-2xl'>🎯</span>
                                        <h3 className='text-xl font-bold text-white'>Taunt</h3>
                                    </div>
                                    <p className='text-gray-300'>Força todos os inimigos próximos a atacar o Knight, protegendo aliados e mantendo o controle da batalha.</p>
                                </div>

                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <span className='text-2xl'>💥</span>
                                        <h3 className='text-xl font-bold text-white'>Heavy Strike</h3>
                                    </div>
                                    <p className='text-gray-300'>Ataque devastador que causa dano massivo, mas requer tempo de carregamento. Ideal para eliminar inimigos resistentes.</p>
                                </div>

                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <span className='text-2xl'>🏰</span>
                                        <h3 className='text-xl font-bold text-white'>Guardian Stance</h3>
                                    </div>
                                    <p className='text-gray-300'>Aumenta drasticamente a defesa e reduz dano recebido, mas diminui a velocidade de movimento e ataque.</p>
                                </div>
                            </div>
                        </div>

                        {/* Equipamentos */}
                        <div className='mb-12'>
                            <h2 className='text-3xl font-bold text-white mb-6 text-center'>🎒 Equipamentos Recomendados</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg text-center'>
                                    <span className='text-4xl mb-3 block'>⚔️</span>
                                    <h3 className='text-lg font-bold text-white mb-2'>Espadas Pesadas</h3>
                                    <p className='text-gray-300 text-sm'>Alto dano e durabilidade para combate prolongado</p>
                                </div>

                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg text-center'>
                                    <span className='text-4xl mb-3 block'>🛡️</span>
                                    <h3 className='text-lg font-bold text-white mb-2'>Escudos</h3>
                                    <p className='text-gray-300 text-sm'>Proteção essencial e habilidades defensivas</p>
                                </div>

                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg text-center'>
                                    <span className='text-4xl mb-3 block'>🛡️</span>
                                    <h3 className='text-lg font-bold text-white mb-2'>Armaduras Pesadas</h3>
                                    <p className='text-gray-300 text-sm'>Máxima proteção contra ataques físicos</p>
                                </div>

                                <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg text-center'>
                                    <span className='text-4xl mb-3 block'>🪓</span>
                                    <h3 className='text-lg font-bold text-white mb-2'>Machados</h3>
                                    <p className='text-gray-300 text-sm'>Alternativa para maior dano bruto</p>
                                </div>
                            </div>
                        </div>

                        {/* Dicas de Estratégia */}
                        <div className='mb-12'>
                            <h2 className='text-3xl font-bold text-white mb-6 text-center'>💡 Dicas de Estratégia</h2>
                            <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                                    <div>
                                        <h3 className='text-xl font-bold text-green-400 mb-4'>✅ Faça</h3>
                                        <ul className='space-y-2 text-gray-300'>
                                            <li>• Sempre mantenha a atenção dos inimigos em você</li>
                                            <li>• Use Guardian Stance em situações críticas</li>
                                            <li>• Posicione-se entre inimigos e aliados frágeis</li>
                                            <li>• Combine Shield Bash com Heavy Strike</li>
                                            <li>• Mantenha seu equipamento sempre reparado</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className='text-xl font-bold text-red-400 mb-4'>❌ Evite</h3>
                                        <ul className='space-y-2 text-gray-300'>
                                            <li>• Perseguir inimigos que fogem</li>
                                            <li>• Usar Heavy Strike sem proteção</li>
                                            <li>• Ignorar a posição dos aliados</li>
                                            <li>• Ficar isolado do grupo</li>
                                            <li>• Esquecer de usar Taunt regularmente</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progressão */}
                        <div className='mb-12'>
                            <h2 className='text-3xl font-bold text-white mb-6 text-center'>📈 Progressão Recomendada</h2>
                            <div className='bg-gray-800/30 rounded-lg p-8 shadow-lg'>
                                <div className='space-y-6'>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>1</div>
                                        <div>
                                            <h3 className='text-white font-bold'>Níveis 1-10: Fundamentos</h3>
                                            <p className='text-gray-300'>Foque em Shield Bash e equipamentos básicos de defesa</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>2</div>
                                        <div>
                                            <h3 className='text-white font-bold'>Níveis 11-25: Controle</h3>
                                            <p className='text-gray-300'>Desenvolva Taunt e aprenda a gerenciar múltiplos inimigos</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>3</div>
                                        <div>
                                            <h3 className='text-white font-bold'>Níveis 26-40: Poder</h3>
                                            <p className='text-gray-300'>Maximize Heavy Strike e Guardian Stance para combates difíceis</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <div className='bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold'>4</div>
                                        <div>
                                            <h3 className='text-white font-bold'>Níveis 41+: Maestria</h3>
                                            <p className='text-gray-300'>Combine todas as habilidades e lidere grupos em dungeons avançadas</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab === 'builds' && (
                    <div className='mb-12'>
                        <div className='flex justify-between items-center mb-8'>
                            <h2 className='text-3xl font-bold text-white'>⚔️ Builds de Knight</h2>
                            <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/20'>
                                ✨ Criar Nova Build
                            </button>
                        </div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                            {/* Build Example 1 */}
                            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                <div className='flex justify-between items-start mb-4'>
                                    <div>
                                        <h3 className='text-xl font-bold text-white mb-2'>🛡️ Tank Supremo</h3>
                                        <p className='text-gray-400 text-sm'>Por: GameMaster</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-yellow-400'>⭐</span>
                                        <span className='text-white font-bold'>4.8</span>
                                    </div>
                                </div>
                                <p className='text-gray-300 mb-4'>Build focada em máxima defesa e controle de grupo. Ideal para dungeons difíceis e raids.</p>
                                <div className='space-y-2 mb-4'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Shield Bash:</span>
                                        <span className='text-blue-400'>Nível 10</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Guardian Stance:</span>
                                        <span className='text-blue-400'>Nível 10</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Taunt:</span>
                                        <span className='text-blue-400'>Nível 8</span>
                                    </div>
                                </div>
                                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors duration-200'>
                                    Ver Build Completa
                                </button>
                            </div>

                            {/* Build Example 2 */}
                            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                <div className='flex justify-between items-start mb-4'>
                                    <div>
                                        <h3 className='text-xl font-bold text-white mb-2'>⚔️ Guerreiro Híbrido</h3>
                                        <p className='text-gray-400 text-sm'>Por: WarriorPro</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-yellow-400'>⭐</span>
                                        <span className='text-white font-bold'>4.5</span>
                                    </div>
                                </div>
                                <p className='text-gray-300 mb-4'>Equilibrio entre dano e defesa. Perfeita para jogadores solo e grupos pequenos.</p>
                                <div className='space-y-2 mb-4'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Heavy Strike:</span>
                                        <span className='text-red-400'>Nível 10</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Shield Bash:</span>
                                        <span className='text-blue-400'>Nível 7</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Guardian Stance:</span>
                                        <span className='text-blue-400'>Nível 6</span>
                                    </div>
                                </div>
                                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors duration-200'>
                                    Ver Build Completa
                                </button>
                            </div>

                            {/* Build Example 3 */}
                            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                <div className='flex justify-between items-start mb-4'>
                                    <div>
                                        <h3 className='text-xl font-bold text-white mb-2'>🏰 Protetor de Grupo</h3>
                                        <p className='text-gray-400 text-sm'>Por: GuildLeader</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-yellow-400'>⭐</span>
                                        <span className='text-white font-bold'>4.7</span>
                                    </div>
                                </div>
                                <p className='text-gray-300 mb-4'>Especializada em proteger aliados e controlar battlefield. Ideal para PvP em grupo.</p>
                                <div className='space-y-2 mb-4'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Taunt:</span>
                                        <span className='text-green-400'>Nível 10</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Guardian Stance:</span>
                                        <span className='text-blue-400'>Nível 9</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Shield Bash:</span>
                                        <span className='text-blue-400'>Nível 8</span>
                                    </div>
                                </div>
                                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors duration-200'>
                                    Ver Build Completa
                                </button>
                            </div>

                            {/* Build Example 4 */}
                            <div className='bg-gray-800/30 rounded-lg p-6 shadow-lg hover:bg-gray-700/30 transition-all duration-300'>
                                <div className='flex justify-between items-start mb-4'>
                                    <div>
                                        <h3 className='text-xl font-bold text-white mb-2'>💥 Destruidor</h3>
                                        <p className='text-gray-400 text-sm'>Por: DamageDealer</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-yellow-400'>⭐</span>
                                        <span className='text-white font-bold'>4.3</span>
                                    </div>
                                </div>
                                <p className='text-gray-300 mb-4'>Foco máximo em dano. Para Knights que querem surpreender com poder ofensivo.</p>
                                <div className='space-y-2 mb-4'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Heavy Strike:</span>
                                        <span className='text-red-400'>Nível 10</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Shield Bash:</span>
                                        <span className='text-blue-400'>Nível 9</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-400'>Taunt:</span>
                                        <span className='text-green-400'>Nível 5</span>
                                    </div>
                                </div>
                                <button className='w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors duration-200'>
                                    Ver Build Completa
                                </button>
                            </div>
                        </div>

                        <div className='mt-8 text-center'>
                            <p className='text-gray-400 mb-4'>Não encontrou a build perfeita?</p>
                            <button className='bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/20'>
                                🔧 Criar Sua Própria Build
                            </button>
                        </div>
                    </div>
                )}
            </main>
            
            <Footer />
        </div>
    )
}  
