import { Route, Routes } from 'react-router'
import { Home } from './pages/home'
import { Guide } from './pages/guide'
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
import { CharacterClass } from './pages/character-class'
import { Builds } from './pages/build'
import { Other } from './pages/other'
import { usePrefetchQuery } from '@tanstack/react-query'
import { EQUIPMENTS_QUERY_KEY } from './services/equipments'
import { queryClient } from './app'

export const AppRoutes = () => {
  usePrefetchQuery({ queryKey: [EQUIPMENTS_QUERY_KEY] }, queryClient)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/guides/:guideId' element={<Guide />} />
      <Route path='/weapons/:weaponCategory' element={<Weapons />} />
      <Route path='/armor' element={<Armor />} />
      <Route path='/create-guide' element={<CreateGuide />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/guides' element={<AllGuides />} />
      <Route path='/class' element={<Class />} />
      <Route path='/character-class/:className' element={<CharacterClass />} />
      <Route path='/build' element={<Builds />} />
      <Route path='/other/:otherCategory' element={<Other />} />
    </Routes>
  )
}
