import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useParams } from 'react-router'
import { OTHER_DATABASE } from '../../../constants/other-database'
import { OtherTable } from '../../../components/other-table'
import { useState } from 'react'

export const Other = () => {
  const { otherCategory } = useParams()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = OTHER_DATABASE.filter((item) => 
    item.type === otherCategory && 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />
      <main className='max-w-7xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white text-center mb-4 animate-fade-in-down'>Diversos</h1>
          <p className='text-gray-300 text-center max-w-3xl mx-auto'>Conteúdo adicional e recursos diversos do Apogea.</p>
        </div>
        <div className='mb-4 flex justify-end'>
          <input
            type='text'
            placeholder='Buscar por nome...'
            className='p-2 rounded-lg bg-gray-700 text-white'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <OtherTable title='Diversos' items={filteredItems} />
      </main>
      <Footer />
    </div>
  )
}
