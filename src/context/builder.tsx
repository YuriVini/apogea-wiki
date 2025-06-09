/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from 'react'

interface BuilderContextProps {
  isEditing: boolean
  build: BuildsApiTypes.BuildData
  setBuild: React.Dispatch<React.SetStateAction<BuildsApiTypes.BuildData>>
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const BuilderContext = createContext<BuilderContextProps>({} as BuilderContextProps)

const defaultBuild: BuildsApiTypes.BuildData = {
  id: '',
  title: 'Nova Build',
  overview: '',
  userId: '',
  rating: 0,
  characterClass: 'Knight',
  characterStats: {
    level: 1,
    health: 0,
    mana: 0,
    magic: 0,
    weaponSkill: 0,
    hpRegen: 0,
    mpRegen: 0,
    capacity: 0,
  },
  equipment: {} as BuildsApiTypes.BuildEquipmentData,
  strategy: [],
}

export const BuilderProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [build, setBuild] = useState<BuildsApiTypes.BuildData>(defaultBuild)

  return <BuilderContext.Provider value={{ build, isEditing, setIsEditing, setBuild }}>{children}</BuilderContext.Provider>
}

export const useBuilder = () => useContext(BuilderContext)
