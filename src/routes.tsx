import { Route, Routes } from 'react-router'
import { Home } from './domains/customer/pages/home'
import { Guide } from './domains/customer/pages/guide'
import { Weapons } from './domains/customer/pages/weapons'
import { Armor } from './domains/customer/pages/armor'
import { CreateGuide } from './domains/customer/pages/create-guide'
import { Register } from './domains/auth/pages/register'
import { Login } from './domains/auth/pages/login'
import { Profile } from './domains/customer/pages/profile'
import { ForgotPassword } from './domains/auth/pages/forgot-password'
import { ResetPassword } from './domains/auth/pages/reset-password'
import { AllGuides } from './domains/customer/pages/all-guides'
import { Class } from './domains/customer/pages/class'
import { CharacterClass } from './domains/customer/pages/character-class'
import { BuildsDetails } from './domains/customer/pages/build-details'
import { Other } from './domains/customer/pages/other'
import { usePrefetchQuery } from '@tanstack/react-query'
import { EQUIPMENTS_QUERY_KEY } from './services/equipments'
import { queryClient } from './app'
import { Edit } from './domains/admin/pages/edit-equipment'
import { BuildCreate } from './domains/customer/pages/build-create'
import { AllBuilds } from './domains/customer/pages/all-builds'
import { CreateEquipment } from './domains/admin/pages/create-equipment'
import { Newsletter } from './domains/customer/pages/newsletter'
import { EditOther } from './domains/admin/pages/edit-other'

export const AppRoutes = () => {
  usePrefetchQuery({ queryKey: [EQUIPMENTS_QUERY_KEY] }, queryClient)

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/guides/:guideId' element={<Guide />} />
      <Route path='/weapons/:weaponCategory' element={<Weapons />} />
      <Route path='/armor' element={<Armor />} />
      <Route path='/guides/create' element={<CreateGuide />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/guides' element={<AllGuides />} />
      <Route path='/class' element={<Class />} />
      <Route path='/character-class/:className' element={<CharacterClass />} />
      <Route path='/builds/:buildId' element={<BuildsDetails />} />
      <Route path='/builds/create' element={<BuildCreate />} />
      <Route path='/other/:otherCategory' element={<Other />} />
      <Route path='/builds' element={<AllBuilds />} />
      <Route path='/newsletter' element={<Newsletter />} />

      {/* Admin Routes */}
      <Route path='/admin/edit/:name' element={<Edit />} />
      <Route path='/admin/equipments/create' element={<CreateEquipment />} />
      <Route path='/admin/other/:name' element={<EditOther />} />
    </Routes>
  )
}
