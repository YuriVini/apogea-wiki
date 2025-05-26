import { Route, Routes } from 'react-router'
import { Home } from './pages/home'
import { Guides } from './pages/guides'
import { Weapons } from './pages/weapons'
import { Armor } from './pages/armor'
import { CreateGuide } from './pages/create-guide'
import { Register } from './pages/register'
import { Login } from './pages/login'
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/guides/:guideId' element={<Guides />} />
      <Route path='/weapons' element={<Weapons />} />
      <Route path='/armor' element={<Armor />} />
      <Route path='/create-guide' element={<CreateGuide />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
