import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { useState } from 'react'
import { SkillsGrid } from '../components/skill-grid'
interface BuildData {
    title: string;
    overview: string;
    attributes: string[];
    equipment: string[];
    requirements: string[];
    mainSkills: string[];
    supportSkills: string[];
    strategy: string[];
}

export const Builds = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [buildData, setBuildData] = useState<BuildData>({
        title: "Penetrating Shot Rogue",
        overview: "A build Penetrating Shot Rogue é focada em maximizar o dano à distância com arco, utilizando a habilidade Penetrating Shot para atingir múltiplos inimigos em linha. Esta build é ideal para jogadores que preferem eliminar inimigos rapidamente à distância.",
        attributes: ["Destreza: 40", "Força: 25", "Vitalidade: 20", "Resistência: 15"],
        equipment: ["Composite Bow +5", "Bodkin Arrows", "Leather Armor +3", "Ring of Archery", "Amulet of Dexterity"],
        requirements: ["Trickshot", "Bow Mastery", "Quick Draw"],
        mainSkills: ["Penetrating Shot", "Multishot", "Aimed Shot", "Power Shot"],
        supportSkills: ["Stealth", "Dodge Roll", "Critical Strike", "Weapon Focus: Bow"],
        strategy: [
            "Mantenha distância dos inimigos, use terreno elevado quando possível e posicione-se para alinhar múltiplos inimigos.",
            "Use Penetrating Shot para atingir grupos de inimigos, Aimed Shot para alvos únicos importantes e Stealth para reposicionamento.",
            "Mantenha sempre um estoque grande de flechas, use Multishot em grupos densos e combine Critical Strike com Power Shot para máximo dano."
        ]
    })

    const handleInputChange = (field: keyof BuildData, value: string) => {
        setBuildData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const handleArrayInputChange = (field: keyof Pick<BuildData, 'attributes' | 'equipment' | 'requirements' | 'mainSkills' | 'supportSkills' | 'strategy'>, index: number, value: string) => {
        setBuildData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).map((item, i) => i === index ? value : item)
        }))
    }

    const handleArrayItemDelete = (field: keyof Pick<BuildData, 'attributes' | 'equipment' | 'requirements' | 'mainSkills' | 'supportSkills' | 'strategy'>, index: number) => {
        setBuildData(prev => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((_, i) => i !== index)
        }))
    }

    const handleArrayItemAdd = (field: keyof Pick<BuildData, 'attributes' | 'equipment' | 'requirements' | 'mainSkills' | 'supportSkills' | 'strategy'>) => {
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

                    <SkillsGrid />
                    <br />

                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-green-400">Atributos Principais</h3>
                                {isEditing && (
                                    <button
                                        onClick={() => handleArrayItemAdd('attributes')}
                                        className="text-green-400 hover:text-green-300 text-sm"
                                    >
                                        ➕
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-2 text-gray-300">
                                {buildData.attributes.map((attribute, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <div className="flex items-center flex-1">
                                            <span className="text-yellow-400 mr-2">📊</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={attribute}
                                                    onChange={(e) => handleArrayInputChange('attributes', index, e.target.value)}
                                                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 flex-1"
                                                />
                                            ) : (
                                                <span>{attribute}</span>
                                            )}
                                        </div>
                                        {isEditing && (
                                            <button
                                                onClick={() => handleArrayItemDelete('attributes', index)}
                                                className="ml-2 text-red-400 hover:text-red-300 text-sm"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-purple-400">Equipamentos</h3>
                                {isEditing && (
                                    <button
                                        onClick={() => handleArrayItemAdd('equipment')}
                                        className="text-green-400 hover:text-green-300 text-sm"
                                    >
                                        ➕
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-2 text-gray-300">
                                {buildData.equipment.map((equipment, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <div className="flex items-center flex-1">
                                            <span className="text-blue-400 mr-2">⚔️</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={equipment}
                                                    onChange={(e) => handleArrayInputChange('equipment', index, e.target.value)}
                                                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 flex-1"
                                                />
                                            ) : (
                                                <span>{equipment}</span>
                                            )}
                                        </div>
                                        {isEditing && (
                                            <button
                                                onClick={() => handleArrayItemDelete('equipment', index)}
                                                className="ml-2 text-red-400 hover:text-red-300 text-sm"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold text-cyan-400">Requisitos</h3>
                                {isEditing && (
                                    <button
                                        onClick={() => handleArrayItemAdd('requirements')}
                                        className="text-green-400 hover:text-green-300 text-sm"
                                    >
                                        ➕
                                    </button>
                                )}
                            </div>
                            <ul className="space-y-2 text-gray-300">
                                {buildData.requirements.map((req, index) => (
                                    <li key={index} className="flex items-center justify-between">
                                        <div className="flex items-center flex-1">
                                            <span className="text-red-400 mr-2">🎯</span>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={req}
                                                    onChange={(e) => handleArrayInputChange('requirements', index, e.target.value)}
                                                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1 flex-1"
                                                />
                                            ) : (
                                                <span>{req}</span>
                                            )}
                                        </div>
                                        {isEditing && (
                                            <button
                                                onClick={() => handleArrayItemDelete('requirements', index)}
                                                className="ml-2 text-red-400 hover:text-red-300 text-sm"
                                            >
                                                🗑️
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

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
                                                    🗑️
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
                                                    🗑️
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
                                            🗑️
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
