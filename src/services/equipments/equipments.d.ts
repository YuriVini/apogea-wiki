export as namespace EquipmentsApiTypes

export type SlotType = 
  | 'weapon'   
  | 'armor'    
  | 'accessory'
  | 'spell'
  | 'ability'
  | 'leftHand'
  | 'rightHand'

export type CategoryType = 
  | 'sword'
  | 'dagger'
  | 'bow'
  | 'staff'
  | 'shield'
  | 'glove'
  | 'boots'
  | 'leg'
  | 'chest'
  | 'helmet'
  | 'backpack'
  | 'ring'
  | 'necklace'
  | 'book'
  | 'class-abilities'
  | 'weapon-staff-bow-dagger-shield-glove'

 


export interface Equipment {
  id: string;
  name: string;
  rarity?: 'common' | 'magic' | 'rare' | 'legendary';
  imageUrl: string;
  type: SlotType;
  category: CategoryType;
  damage?: string;
  attackSpeed?: string;
  range?: string;
  defense?: string;
  attributes?: string;
  size?: string;
  weight?: string;
  dropBy?: string;
  buyFrom?: string;
  sellTo?: string;
}
