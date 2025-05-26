import { Route, Routes } from 'react-router'
import { Home } from './pages/home'
import { Guides } from './pages/guides'
import { Weapons } from './pages/weapons'
import { Armor } from './pages/armor'
import { CreateGuide } from './pages/create-guide'
import { Register } from './pages/register'
import { Login } from './pages/login'
import { Profile } from './pages/profile'
import { ForgotPassword } from './pages/forgot-password'
import { ResetPassword } from './pages/reset-password'
import { AllGuides } from './pages/all-guides'
import { Class } from './pages/class'
import { Knight } from './pages/knight'
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
      <Route path='/profile' element={<Profile />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/all-guides' element={<AllGuides />} />
      <Route path='/class' element={<Class />} />
      <Route path='/knight' element={<Knight />} />
    </Routes>
  )
}
