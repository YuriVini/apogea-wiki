export as namespace BuildsApiTypes

export interface BuildEquipmentData {
  ring: EquipmentsApiTypes.Equipment
  legs: EquipmentsApiTypes.Equipment
  boots: EquipmentsApiTypes.Equipment
  chest: EquipmentsApiTypes.Equipment
  helmet: EquipmentsApiTypes.Equipment
  leftHand: EquipmentsApiTypes.Equipment
  backpack: EquipmentsApiTypes.Equipment
  rightHand: EquipmentsApiTypes.Equipment
  accessory: EquipmentsApiTypes.Equipment
  necklace: EquipmentsApiTypes.Equipment
}

export interface CharacterStats {
  mana: number
  level: number
  magic: number
  health: number
  hpRegen: number
  mpRegen: number
  capacity: number
  weaponSkill: number
}

export interface BuildData {
  id: string
  title: string
  overview: string
  equipment: BuildEquipmentData
  strategy: string[]
  rating: number
  characterClass: string
  characterStats: CharacterStats
  userId: string
}

export interface BuildSchemaRequest {
  id: string
  title: string
  overview: string
  strategy: string[]
  characterClass: string
  characterStats: CharacterStats
  equipment: {
    legs: string
    ring: string
    boots: string
    chest: string
    helmet: string
    leftHand: string
    backpack: string
    rightHand: string
    accessory: string
    necklace: string
  }
}
