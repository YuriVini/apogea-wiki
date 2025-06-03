import { Header } from '../../../components/header'
import { Footer } from '../../../components/footer'
import { useNews } from '../../../services/news'

export const Newsletter = () => {
  const { data: news = [], isLoading, isError } = useNews()

  return (
    <div className='min-h-screen bg-gray-900 flex flex-col'>
      <Header />
      <main className='flex-1'>
        <div className='max-w-7xl mx-auto p-6'>
          <h1 className='text-3xl font-bold text-white mb-8'>Notícias</h1>
          {isLoading && <div className='text-gray-300'>Carregando notícias...</div>}
          {isError && <div className='text-red-400'>Erro ao carregar notícias.</div>}
          {!isLoading && !isError && (
            <div className='space-y-8'>
              {news.length === 0 ? (
                <div className='text-gray-400'>Nenhuma notícia encontrada.</div>
              ) : (
                news.map((item) => (
                  <div key={item.id} className='bg-gray-800/40 rounded-lg p-6 shadow-md'>
                    <a href={item.url} target='_blank' rel='noopener noreferrer'>
                      <h2 className='text-xl font-semibold text-white mb-2 hover:underline'>{item.title}</h2>
                    </a>
                    <div className='text-sm text-gray-400 mb-2'>Por {item.author}</div>
                    <div className='text-gray-300'>{item.content}</div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
