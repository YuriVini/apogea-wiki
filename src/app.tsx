import { AppRoutes } from './routes'
import { GlobalProvider } from './providers/global-provider'

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 to-gray-700'>
      <GlobalProvider>
        <AppRoutes />
      </GlobalProvider>
    </div>
  )
}

export default App
