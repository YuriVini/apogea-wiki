import { Header } from '../components/header'
import { Footer } from '../components/footer'

interface WeaponData {
  item: string
  name: string
  damage: string
  attackSpeed: string
  range: string
  defense: string
  attributes: string
  size: string
  weight: string
  url_image: string
}

const meleeWeaponsData: WeaponData[] = [
  {
    item: '🗡️',
    name: 'Knife',
    damage: '+3',
    attackSpeed: '+3',
    range: '',
    defense: '',
    attributes: '',
    size: '2/10',
    weight: '8 oz',
    url_image: '/weapons/Knife.webp'
  },
  {
    item: '⚔️',
    name: 'Rusty Sword',
    damage: '+8',
    attackSpeed: '+2',
    range: '+2',
    defense: '+2',
    attributes: '',
    size: '6/10',
    weight: '30 oz',
    url_image: '/weapons/Rusty_sword.webp'
  },
  {
    item: '🗡️',
    name: 'Ironsword',
    damage: '+15',
    attackSpeed: '+4',
    range: '+2',
    defense: '+2',
    attributes: '',
    size: '6/10',
    weight: '36 oz',
    url_image: '/weapons/Ironsword.webp'
  },
  {
    item: '⚔️',
    name: 'Longsword',
    damage: '+40',
    attackSpeed: '+1',
    range: '+7',
    defense: '+10',
    attributes: '',
    size: '8/10',
    weight: '98 oz',
    url_image: '/weapons/Longsword.webp'
  },
  {
    item: '⚔️',
    name: 'Broadsword',
    damage: '+30',
    attackSpeed: '-2',
    range: '+2',
    defense: '+7',
    attributes: '',
    size: '8/10',
    weight: '75 oz',
    url_image: '/weapons/Broadsword.webp'
  },
  {
    item: '🗡️',
    name: 'Cutlass',
    damage: '+25',
    attackSpeed: '+3',
    range: '+2',
    defense: '+3',
    attributes: '',
    size: '6/10',
    weight: '45 oz'
  }
]

const WeaponTable = ({ title, weapons }: { title: string; weapons: WeaponData[] }) => {
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
                <th className="text-left p-3 border-r border-gray-600">Item</th>
                <th className="text-left p-3 border-r border-gray-600">Name</th>
                <th className="text-left p-3 border-r border-gray-600">Damage</th>
                <th className="text-left p-3 border-r border-gray-600">Attack Speed</th>
                <th className="text-left p-3 border-r border-gray-600">Range</th>
                <th className="text-left p-3 border-r border-gray-600">Defense</th>
                <th className="text-left p-3 border-r border-gray-600">Attributes</th>
                <th className="text-left p-3 border-r border-gray-600">Size</th>
                <th className="text-left p-3">Weight</th>
              </tr>
            </thead>
            <tbody>
              {weapons.map((weapon, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                  <td className="p-3 border-r border-gray-600 text-center text-lg">{weapon.item}</td>
                  <td className="p-3 border-r border-gray-600 text-yellow-400 font-medium">{weapon.name}</td>
                  <td className="p-3 border-r border-gray-600 text-green-400">{weapon.damage}</td>
                  <td className="p-3 border-r border-gray-600 text-blue-400">{weapon.attackSpeed}</td>
                  <td className="p-3 border-r border-gray-600 text-orange-400">{weapon.range}</td>
                  <td className="p-3 border-r border-gray-600 text-purple-400">{weapon.defense}</td>
                  <td className="p-3 border-r border-gray-600 text-gray-300">{weapon.attributes}</td>
                  <td className="p-3 border-r border-gray-600 text-gray-300">{weapon.size}</td>
                  <td className="p-3 text-gray-300">{weapon.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const Weapons = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white text-center mb-4 animate-fade-in-down">
            Weapons Database
          </h1>
          <p className="text-gray-300 text-center max-w-3xl mx-auto">
            Complete database of all weapons available in Apogea, including their stats, requirements, and attributes.
          </p>
        </div>

        <WeaponTable title="Melee Weapons" weapons={meleeWeaponsData} />
      </main>

      <Footer />
    </div>
  )
}
