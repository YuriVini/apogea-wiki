import { AppRoutes } from './routes'
import { GlobalProvider } from './providers/global-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient()

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-700'>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <AppRoutes />
        </GlobalProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
