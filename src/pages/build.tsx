import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useState } from 'react'
import { SkillsGrid } from '../components/skill-grid'
import { Trash2, Plus, Minus } from 'lucide-react'

interface BuildData {
    title: string;
    overview: string;
    equipment: string[];
    requirements: string[];
    mainSkills: string[];
    supportSkills: string[];
    strategy: string[];
    
    characterStats: {
        level: number;
        health: number;
        mana: number;
        magic: number;
        weaponSkill: number;
        hpRegen: number;
        mpRegen: number;
        capacity: number;
        pvpStatus: string;
        class: string;
    };
}

export const Builds = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [buildData, setBuildData] = useState<BuildData>({
        title: "Penetrating Shot Rogue",
        overview: "A build Penetrating Shot Rogue é focada em maximizar o dano à distância com arco, utilizando a habilidade Penetrating Shot para atingir múltiplos inimigos em linha. Esta build é ideal para jogadores que preferem eliminar inimigos rapidamente à distância.",
        equipment: ["Composite Bow +5", "Bodkin Arrows", "Leather Armor +3", "Ring of Archery", "Amulet of Dexterity"],
        requirements: ["Trickshot", "Bow Mastery", "Quick Draw"],
        mainSkills: ["Penetrating Shot", "Multishot", "Aimed Shot", "Power Shot"],
        supportSkills: ["Stealth", "Dodge Roll", "Critical Strike", "Weapon Focus: Bow"],
        strategy: [
            "Mantenha distância dos inimigos, use terreno elevado quando possível e posicione-se para alinhar múltiplos inimigos.",
            "Use Penetrating Shot para atingir grupos de inimigos, Aimed Shot para alvos únicos importantes e Stealth para reposicionamento.",
            "Mantenha sempre um estoque grande de flechas, use Multishot em grupos densos e combine Critical Strike com Power Shot para máximo dano."
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
            pvpStatus: "Off",
            class: "Squire"
        }
    })

    const handleInputChange = (field: keyof BuildData, value: string) => {
        setBuildData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleStatsChange = (field: keyof BuildData['characterStats'], value: string | number) => {
        setBuildData(prev => ({
            ...prev,
            characterStats: {
                ...prev.characterStats,
                [field]: value
            }
        }))
    }

    const incrementStat = (field: keyof BuildData['characterStats']) => {
        setBuildData(prev => ({
            ...prev,
            characterStats: {
                ...prev.characterStats,
                [field]: (prev.characterStats[field] as number) + 1
            }
        }))
    }

    const decrementStat = (field: keyof BuildData['characterStats']) => {
        setBuildData(prev => ({
            ...prev,
            characterStats: {
                ...prev.characterStats,
                [field]: Math.max(0, (prev.characterStats[field] as number) - 1)
            }
        }))
    }

    const handleArrayInputChange = (field: keyof Pick<BuildData,  'equipment' | 'requirements' | 'mainSkills' | 'supportSkills' | 'strategy'>, index: number, value: string) => {
        setBuildData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
        }))
    }

    const handleArrayItemDelete = (field: keyof Pick<BuildData, 'equipment' | 'requirements' | 'mainSkills' | 'supportSkills' | 'strategy'>, index: number) => {
        setBuildData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((_, i) => i !== index)
        }))
    }

    const handleArrayItemAdd = (field: keyof Pick<BuildData, 'equipment' | 'requirements' | 'mainSkills' | 'supportSkills' | 'strategy'>) => {
        setBuildData(prev => ({
            ...prev,
            [field]: [...(prev[field] as string[]), ""]
        }))
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        {isEditing ? (
                            <input
                                type="text"
                                value={buildData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="text-4xl font-bold text-center text-blue-400 bg-gray-800 border border-gray-600 rounded px-4 py-2 flex-1 mr-4"
                            />
                        ) : (
                            <h1 className="text-4xl font-bold text-center text-blue-400 flex-1">
                                {buildData.title}
                            </h1>
                        )}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                                isEditing 
                                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                        >
                            {isEditing ? 'Salvar' : 'Editar'}
                        </button>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Visão Geral</h2>
                        {isEditing ? (
                            <textarea
                                value={buildData.overview}
                                onChange={(e) => handleInputChange('overview', e.target.value)}
                                className="w-full text-gray-300 bg-gray-700 border border-gray-600 rounded px-4 py-2 leading-relaxed resize-vertical min-h-[100px]"
                            />
                        ) : (
                            <p className="text-gray-300 leading-relaxed">
                                {buildData.overview}
                            </p>
                        )}
                    </div>

                    {/* Character Stats Table */}
                    <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Pontos de Skill</h2>
                        <div className="flex justify-evenly bg-gray-900 rounded-lg p-4 border border-gray-600">
                            <div className="w-1/4 space-y-2">
                                {/* Level */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">Level:</span>
                                    <div className="flex items-center gap-2">
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={buildData.characterStats.level}
                                                onChange={(e) => handleStatsChange('level', parseInt(e.target.value) || 0)}
                                                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-20 text-white"
                                                min="1"
                                                max="100"
                                            />
                                        ) : (
                                            <span className="text-white">{buildData.characterStats.level}</span>
                                        )}
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('level')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('level')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                        
                                
                                

                                {/* Health */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">Health:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{buildData.characterStats.health}</span>
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('health')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('health')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Mana */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">Mana:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{buildData.characterStats.mana}</span>
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('mana')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('mana')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Magic */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">Magic:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{buildData.characterStats.magic}</span>
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('magic')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('magic')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Weapon Skill */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">Weapon Skill:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{buildData.characterStats.weaponSkill}</span>
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('weaponSkill')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('weaponSkill')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* HP Regen */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">HP Regen:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{buildData.characterStats.hpRegen}</span>
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('hpRegen')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('hpRegen')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* MP Regen */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">MP Regen:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{buildData.characterStats.mpRegen}</span>
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('mpRegen')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('mpRegen')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Capacity */}
                                <div className="flex justify-between items-center py-1 border-b border-gray-700">
                                    <span className="text-white font-semibold">Capacity:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white">{buildData.characterStats.capacity}</span>
                                        {isEditing && (
                                            <>
                                                <button
                                                    onClick={() => incrementStat('capacity')}
                                                    className="bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                                <button
                                                    onClick={() => decrementStat('capacity')}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Your Class */}
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-white font-semibold">Your Class:</span>
                                    {isEditing ? (
                                        <select
                                            value={buildData.characterStats.class}
                                            onChange={(e) => handleStatsChange('class', e.target.value)}
                                            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-32 text-white"
                                        >
                                            <option value="Squire">Squire</option>
                                            <option value="Knight">Knight</option>
                                            <option value="Mage">Mage</option>
                                            <option value="Rogue">Rogue</option>
                                        </select>
                                    ) : (
                                        <span className="text-white">{buildData.characterStats.class}</span>
                                    )}
                                </div>
                            </div>
                            <SkillsGrid />
                        </div>
                    </div>

                    <br />

                    <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
                        <h3 className="text-xl font-semibold mb-4 text-red-400">Habilidades Recomendadas</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-yellow-400">Principais</h4>
                                    {isEditing && (
                                        <button
                                            onClick={() => handleArrayItemAdd('mainSkills')}
                                            className="text-green-400 hover:text-green-300 text-sm"
                                        >
                                            ➕
                                        </button>
                                    )}
                                </div>
                                <ul className="space-y-1 text-gray-300">
                                    {buildData.mainSkills.map((skill, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={skill}
                                                        onChange={(e) => handleArrayInputChange('mainSkills', index, e.target.value)}
                                                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-full"
                                                    />
                                                ) : (
                                                    <span>• {skill}</span>
                                                )}
                                            </div>
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleArrayItemDelete('mainSkills', index)}
                                                    className="ml-2 text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    <Trash2 />
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-semibold text-yellow-400">Suporte</h4>
                                    {isEditing && (
                                        <button
                                            onClick={() => handleArrayItemAdd('supportSkills')}
                                            className="text-green-400 hover:text-green-300 text-sm"
                                        >
                                            ➕
                                        </button>
                                    )}
                                </div>
                                <ul className="space-y-1 text-gray-300">
                                    {buildData.supportSkills.map((skill, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={skill}
                                                        onChange={(e) => handleArrayInputChange('supportSkills', index, e.target.value)}
                                                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1 w-full"
                                                    />
                                                ) : (
                                                    <span>• {skill}</span>
                                                )}
                                            </div>
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleArrayItemDelete('supportSkills', index)}
                                                    className="ml-2 text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    <Trash2 />
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-cyan-400">Estratégia de Combate</h3>
                            {isEditing && (
                                <button
                                    onClick={() => handleArrayItemAdd('strategy')}
                                    className="text-green-400 hover:text-green-300 text-sm"
                                >
                                    ➕
                                </button>
                            )}
                        </div>
                        <ul className="space-y-2 text-gray-300">
                            {buildData.strategy.map((strategyItem, index) => (
                                <li key={index} className="flex items-center justify-between">
                                    <div className="flex items-center flex-1">
                                        <span className="text-cyan-400 mr-2">💡</span>
                                        {isEditing ? (
                                            <textarea
                                                value={strategyItem}
                                                onChange={(e) => handleArrayInputChange('strategy', index, e.target.value)}
                                                className="bg-gray-700 border border-gray-600 rounded px-2 py-1 flex-1 resize-vertical min-h-[60px]"
                                            />
                                        ) : (
                                            <span>{strategyItem}</span>
                                        )}
                                    </div>
                                    {isEditing && (
                                        <button
                                            onClick={() => handleArrayItemDelete('strategy', index)}
                                            className="ml-2 text-red-400 hover:text-red-300 text-sm"
                                        >
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
