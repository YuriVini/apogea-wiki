import { Route, Routes } from 'react-router'
import { Home } from './pages/home'
import { Guides } from './pages/guides'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/guides/:guideId' element={<Guides />} />
    </Routes>
  )
}
