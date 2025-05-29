import { Equipment } from '../../../constants/equipment'
import { WeaponTable } from '../../../components/weapon-table'
import { useEquipments } from '../../../services/equipments'
import { Footer } from '../../../components/footer'
import { Header } from '../../../components/header'

export const Equipments = () => {
    const { data: equipments, isLoading, error } = useEquipments()

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Header />
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center text-white text-xl">Carregando equipamentos...</div>
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Header />
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center text-red-400 text-xl">Erro ao carregar equipamentos</div>
                    </div>
                </div>
            </div>
        )
    }

    if (!equipments) {
        return (
            <div className="min-h-screen bg-gray-900">
                <Header />
                <div className="p-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center text-white text-xl">Nenhum equipamento encontrado</div>
                    </div>
                </div>
            </div>
        )
    }

    // Agrupar equipamentos por categoria
    const groupedEquipments = equipments.reduce((acc, equipment) => {
        if (!acc[equipment.category]) {
            acc[equipment.category] = []
        }
        acc[equipment.category].push(equipment)
        return acc
    }, {} as Record<string, Equipment[]>)

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Gerenciar Equipamentos</h1>
                        <p className="text-gray-400">Visualize e gerencie todos os equipamentos do sistema</p>
                    </div>

                    <div className="mb-6">
                        <div className="bg-gray-800/50 p-4 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                <div className="bg-purple-900/30 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-purple-400">{equipments.length}</div>
                                    <div className="text-gray-300">Total de Equipamentos</div>
                                </div>
                                <div className="bg-blue-900/30 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-blue-400">{Object.keys(groupedEquipments).length}</div>
                                    <div className="text-gray-300">Categorias</div>
                                </div>
                                <div className="bg-green-900/30 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-green-400">
                                        {equipments.filter(eq => eq.type === 'weapon').length}
                                    </div>
                                    <div className="text-gray-300">Armas</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {Object.entries(groupedEquipments).map(([category, categoryEquipments]) => (
                            <WeaponTable 
                                key={category}
                                title={`${category.charAt(0).toUpperCase() + category.slice(1)} (${categoryEquipments.length})`}
                                weapons={categoryEquipments}
                            />
                        ))}
                    </div>

                    {equipments.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-xl mb-4">Nenhum equipamento encontrado</div>
                            <div className="text-gray-500">Adicione equipamentos para visualizá-los aqui</div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}
