/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from 'react'

interface BuilderContextProps {
  isEditing: boolean
  build: BuildsApiTypes.BuildData
  setBuild: React.Dispatch<React.SetStateAction<BuildsApiTypes.BuildData>>
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

const BuilderContext = createContext<BuilderContextProps>({} as BuilderContextProps)

export const BuilderProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [build, setBuild] = useState<BuildsApiTypes.BuildData>({} as BuildsApiTypes.BuildData)

  return <BuilderContext.Provider value={{ build, isEditing, setIsEditing, setBuild }}>{children}</BuilderContext.Provider>
}

export const useBuilder = () => useContext(BuilderContext)
