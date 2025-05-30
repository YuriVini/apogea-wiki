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

export interface BuildData {
  id: string
  title: string
  overview: string
  equipment: BuildEquipmentData
  strategy: string[]
  rating: number
  characterStats: {
    level: number
    health: number
    mana: number
    magic: number
    weaponSkill: number
    hpRegen: number
    mpRegen: number
    capacity: number
    pvpStatus: string
    class: string
  }
}

export interface BuildSchemaRequest {
  id: string
  title: string
  overview: string
  strategy: string[]
  characterStats: {
    mana: number
    level: number
    magic: number
    class: string
    health: number
    hpRegen: number
    mpRegen: number
    capacity: number
    pvpStatus: string
    weaponSkill: number
  }
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
  }
}
