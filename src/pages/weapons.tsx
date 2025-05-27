import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { WeaponBox } from '../components/weapon-box'
import DaggerIcon from '/daggers/Silver_Dagger.webp'
import Rusty_sword from '/swords/Rusty_sword.webp'
import Ironsword from '/swords/Ironsword.webp'
import Longsword from '/swords/Longsword.webp'
import Broadsword from '/swords/Broadsword.webp'
import Cutlass from '/swords/Cutlass_sword.webp'

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
  dropBy: string
  buyFrom: string
  sellTo: string
}

const meleeWeaponsData: WeaponData[] = [
  {
    item: DaggerIcon,
    name: 'Knife',
    damage: '+3',
    attackSpeed: '+3',
    range: '',
    defense: '',
    attributes: '',
    size: '2/10',
    weight: '8 oz',
    dropBy: 'Goblin',
    buyFrom: 'Blacksmith',
    sellTo: '50 gp'
  },
  {
    item: Rusty_sword,
    name: 'Rusty Sword',
    damage: '+8',
    attackSpeed: '+2',
    range: '+2',
    defense: '+2',
    attributes: '',
    size: '6/10',
    weight: '30 oz',
    dropBy: 'Skeleton',
    buyFrom: 'Weapon Shop',
    sellTo: '75 gp'
  },
  {
    item: Ironsword,
    name: 'Ironsword',
    damage: '+15',
    attackSpeed: '+4',
    range: '+2',
    defense: '+2',
    attributes: '',
    size: '6/10',
    weight: '36 oz',
    dropBy: 'Orc Warrior',
    buyFrom: 'Blacksmith',
    sellTo: '150 gp'
  },
  {
    item: Longsword,
    name: 'Longsword',
    damage: '+40',
    attackSpeed: '+1',
    range: '+7',
    defense: '+10',
    attributes: '',
    size: '8/10',
    weight: '98 oz',
    dropBy: 'Knight',
    buyFrom: 'Royal Armory',
    sellTo: '500 gp'
  },
  {
    item: Broadsword,
    name: 'Broadsword',
    damage: '+30',
    attackSpeed: '-2',
    range: '+2',
    defense: '+7',
    attributes: '',
    size: '8/10',
    weight: '75 oz',
    dropBy: 'Troll',
    buyFrom: 'Weapon Master',
    sellTo: '350 gp'
  },
  {
    item: Cutlass,
    name: 'Cutlass',
    damage: '+25',
    attackSpeed: '+3',
    range: '+2',
    defense: '+3',
    attributes: '',
    size: '6/10',
    weight: '45 oz',
    dropBy: 'Pirate',
    buyFrom: 'Harbor Shop',
    sellTo: '250 gp'
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
                <th className="text-left p-3 border-r border-gray-600">Weight</th>
                <th className="text-left p-3 border-r border-gray-600">Drop by</th>
                <th className="text-left p-3 border-r border-gray-600">Buy From</th>
                <th className="text-left p-3">Sell To</th>
              </tr>
            </thead>
            <tbody>
              {weapons.map((weapon, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                  <td className="p-3 border-r border-gray-600 text-center">
                    <div className="flex justify-center">
                      <WeaponBox title={weapon.name} imageUrl={weapon.item} />
                    </div>
                  </td>
                  <td className="p-3 border-r border-gray-600 text-yellow-400 font-medium">{weapon.name}</td>
                  <td className="p-3 border-r border-gray-600 text-green-400">{weapon.damage}</td>
                  <td className="p-3 border-r border-gray-600 text-blue-400">{weapon.attackSpeed}</td>
                  <td className="p-3 border-r border-gray-600 text-orange-400">{weapon.range}</td>
                  <td className="p-3 border-r border-gray-600 text-purple-400">{weapon.defense}</td>
                  <td className="p-3 border-r border-gray-600 text-gray-300">{weapon.attributes}</td>
                  <td className="p-3 border-r border-gray-600 text-gray-300">{weapon.size}</td>
                  <td className="p-3 border-r border-gray-600 text-gray-300">{weapon.weight}</td>
                  <td className="p-3 border-r border-gray-600 text-red-400">{weapon.dropBy}</td>
                  <td className="p-3 border-r border-gray-600 text-cyan-400">{weapon.buyFrom}</td>
                  <td className="p-3 text-green-300">{weapon.sellTo}</td>
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
            Banco de dados completo de todas as armas disponíveis no Apogea, incluindo suas estatísticas, requisitos e atributos.
          </p>
        </div>

        <WeaponTable title="Melee Weapons" weapons={meleeWeaponsData} />
      </main>

      <Footer />
    </div>
  )
}
