import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useParams } from 'react-router'
import { OTHER_DATABASE } from '../../../constants/other-database'
import { OtherTable } from '../../../components/other-table'

export const Other = () => {
  const { otherCategory } = useParams()
  return (
    <div className='min-h-screen bg-gray-900'>
      <Header />
      <main className='max-w-7xl mx-auto p-6'>
        <div className='mb-8'>
          <h1 className='text-4xl font-bold text-white text-center mb-4 animate-fade-in-down'>Diversos</h1>
          <p className='text-gray-300 text-center max-w-3xl mx-auto'>Conteúdo adicional e recursos diversos do Apogea.</p>
        </div>
        <OtherTable title='Diversos' items={OTHER_DATABASE.filter((item) => item.type === otherCategory)} />
      </main>
      <Footer />
    </div>
  )
}
