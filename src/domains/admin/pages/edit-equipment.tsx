import { useEquipments } from "../../../services/equipments"
import { useParams, Link } from 'react-router'
import { useState, useEffect } from 'react'
import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'

export const Edit = () => {
    const { name } = useParams<{ name: string }>()
    const { data: equipments, isLoading } = useEquipments()
    const [formData, setFormData] = useState({
        name: '',
        damage: '',
        attackSpeed: '',
        range: '',
        defense: '',
        attributes: '',
        size: '',
        weight: '',
        dropBy: '',
        buyFrom: '',
        sellTo: '',
        imageUrl: '',
        category: ''
    })

    useEffect(() => {
        if (equipments && name) {
            const equipment = equipments.find(eq => eq.name === name)
            if (equipment) {
                setFormData({
                    name: equipment.name,
                    damage: equipment.damage || '',
                    attackSpeed: equipment.attackSpeed || '',
                    range: equipment.range || '',
                    defense: equipment.defense || '',
                    attributes: equipment.attributes || '',
                    size: equipment.size || '',
                    weight: equipment.weight || '',
                    dropBy: equipment.dropBy || '',
                    buyFrom: equipment.buyFrom || '',
                    sellTo: equipment.sellTo || '',
                    imageUrl: equipment.imageUrl || '',
                    category: equipment.category || ''
                })
            }
        }
    }, [equipments, name])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
                <Header />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center text-white text-2xl animate-pulse">Carregando...</div>
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const categories = ['Sword', 'dagger', 'Axe', 'Mace', 'Bow', 'Staff', 'Gloves', 'Shield', 'Helmet', 'Chest', 'Legs', 'Boots', 'Nacklace', 'Ring', 'Backpack']

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <Header />
            <div className="max-w-4xl mx-auto p-8">
                <div className="flex items-center justify-center mb-8">
                    <h1 className="text-4xl font-bold text-white mr-4">Editar {name}</h1>
                    {formData.imageUrl && (
                        <img src={formData.imageUrl} alt={name} className="w-12 h-12 object-contain" />
                    )}
                </div>
                
                <form onSubmit={handleSubmit} className="bg-gray-800/70 rounded-lg p-8 shadow-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(formData).map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-gray-300 mb-2 font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                                {key === 'category' ? (
                                    <select
                                        name={key}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type="text"
                                        name={key}
                                        value={value}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-700 text-white rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-end gap-4">
                        <Link
                            to="/admin/equipments"
                            className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-semibold"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-200 font-semibold"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}
