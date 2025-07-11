import { Route, Routes } from "react-router";
import { Home } from "./domains/customer/pages/home";
import { Guide } from "./domains/customer/pages/guide";
import { Weapons } from "./domains/customer/pages/weapons";
import { CreateGuide } from "./domains/customer/pages/create-guide";
import { Register } from "./domains/auth/pages/register";
import { Login } from "./domains/auth/pages/login";
import { Profile } from "./domains/customer/pages/profile";
import { ForgotPassword } from "./domains/auth/pages/forgot-password";
import { ResetPassword } from "./domains/auth/pages/reset-password";
import { AllGuides } from "./domains/customer/pages/all-guides";
import { Class } from "./domains/customer/pages/class";
import { CharacterClass } from "./domains/customer/pages/character-class";
import { BuildsDetails } from "./domains/customer/pages/build-details";
import { Other } from "./domains/customer/pages/other";
import { usePrefetchQuery } from "@tanstack/react-query";
import { EQUIPMENTS_QUERY_KEY } from "./services/equipments";
import { queryClient } from "./app";
import { Edit } from "./domains/admin/pages/edit-equipment";
import { BuildCreate } from "./domains/customer/pages/build-create";
import { AllBuilds } from "./domains/customer/pages/all-builds";
import { CreateEquipment } from "./domains/admin/pages/create-equipment";
import { Newsletter } from "./domains/customer/pages/newsletter";
import { EditOther } from "./domains/admin/pages/edit-other";
import { CreateOther } from "./domains/admin/pages/create-other";
import { TableExperience } from "./domains/customer/pages/table-experience";

export const AppRoutes = () => {
  usePrefetchQuery({ queryKey: [EQUIPMENTS_QUERY_KEY] }, queryClient);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guides/:guideId" element={<Guide />} />
      <Route path="/weapons/:weaponCategory" element={<Weapons />} />
      <Route path="/guides/create" element={<CreateGuide />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/guides" element={<AllGuides />} />
      <Route path="/class" element={<Class />} />
      <Route path="/character-class/:className" element={<CharacterClass />} />
      <Route path="/builds/:buildId" element={<BuildsDetails />} />
      <Route path="/builds/create" element={<BuildCreate />} />
      <Route path="/other/:otherCategory" element={<Other />} />
      <Route path="/builds" element={<AllBuilds />} />
      <Route path="/newsletter" element={<Newsletter />} />
      <Route path="/table-experience" element={<TableExperience />} />

      {/* Admin Routes */}
      <Route path="/admin/edit/:name" element={<Edit />} />
      <Route path="/admin/equipments/create" element={<CreateEquipment />} />
      <Route path="/admin/other/:id" element={<EditOther />} />
      <Route path="/admin/other/create-other" element={<CreateOther />} />
    </Routes>
  );
};
