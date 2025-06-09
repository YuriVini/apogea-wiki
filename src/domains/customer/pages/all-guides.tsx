import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useState, useEffect } from 'react'
import { Api, ApiNoAuth } from '../../../@api/axios'
import { Link } from 'react-router'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../../context/auth'

export const AllGuides = () => {
  const [guides, setGuides] = useState<GuidesApiTypes.Guide[]>([])
  const [loading, setLoading] = useState(true)
  const { user, isAdmin } = useAuth()

  const fetchGuides = async () => {
    try {
      const response = await ApiNoAuth.get('/guides')
      setGuides(response.data)
    } catch {
      toast.error('Erro ao carregar guias.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteGuide = async (guideId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este guia? Esta ação não pode ser desfeita.')) {
      try {
        await Api.delete(`/guides/${guideId}`)
        setGuides(guides.filter((guide) => guide.id !== guideId))
        toast.success('Guia excluído com sucesso!')
      } catch {
        toast.error('Erro ao excluir guia. Tente novamente.')
      }
    }
  }

  useEffect(() => {
    fetchGuides()
  }, [])

  return (
    <div>
      <Header />
      <div className='min-h-screen bg-gray-900'>
        <div className='max-w-7xl mx-auto p-6'>
          <div className='mb-8'>
            <h1 className='text-4xl font-bold text-white text-center mb-4 animate-fade-in-down'>Todos os Guias</h1>
            <p className='text-gray-300 text-center'>Explore nossa coleção completa de guias para melhorar sua experiência no jogo</p>
          </div>

          {loading ? (
            <div className='flex justify-center items-center py-12'>
              <div className='text-white text-xl'>Carregando guias...</div>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className='bg-gray-800/30 rounded-lg p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-700/30 hover:shadow-xl relative group'
                >
                  {(isAdmin || user?.id === guide?.userId) && (
                    <button
                      onClick={() => handleDeleteGuide(guide.id)}
                      className='absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg hover:shadow-red-500/30'
                      title='Excluir guia'
                    >
                      <Trash2 />
                    </button>
                  )}
                  <Link to={`/guides/${guide.id}`} className='block'>
                    <h3 className='text-xl font-bold text-white mb-3 line-clamp-2 pr-12'>{guide.title}</h3>
                    <p className='text-gray-300 mb-4 line-clamp-3'>{guide.description}</p>
                    <div className='flex justify-between items-center text-sm text-gray-400'>
                      <span>{guide.steps?.length || 0} passos</span>
                      <span className='text-blue-400 hover:text-blue-300 transition-colors'>Ver guia →</span>
                    </div>
                    <div className='mt-2 text-sm text-gray-500'>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {!loading && guides.length === 0 && (
            <div className='text-center py-3'>
              <Link to='/guides/create' className='inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200'>
                Criar Primeiro Guia
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
