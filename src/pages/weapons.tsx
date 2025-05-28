import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { EQUIPMENT_DATABASE } from '../components/equipment'
import { WeaponTable } from '../components/weapon-table'
import { useParams } from 'react-router'

export const Weapons = () => {
  const { weaponCategory } = useParams()
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-4 animate-fade-in-down">
            Weapons Database
          </h1>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            Banco de dados completo de todas as armas disponíveis no Apogea, incluindo suas estatísticas, requisitos e atributos.
          </p>
        </div>

        <WeaponTable title="Melee Weapons" weapons={EQUIPMENT_DATABASE.filter(weapon => weapon.category === weaponCategory)} />
      </main>

      <Footer />
    </div>
  )
}
