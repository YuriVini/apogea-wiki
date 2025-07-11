export as namespace EquipmentsApiTypes;

export type SlotType =
  | "weapon"
  | "armor"
  | "accessory"
  | "spell"
  | "ability"
  | "backpack"
  | "all";

export type CategoryType =
  | "weapon"
  | "armor"
  | "accessory"
  | "spell"
  | "ability"
  | "leftHand"
  | "rightHand"
  | "backpack"
  | "sword"
  | "dagger"
  | "bow"
  | "staff"
  | "shield"
  | "glove"
  | "boots"
  | "legs"
  | "chest"
  | "helmet"
  | "backpack"
  | "ring"
  | "necklace"
  | "book"
  | "class-abilities"
  | "sword-staff-bow-dagger-shield-glove"
  | "all";

export interface Equipment {
  id: string;
  name: string;
  rarity?: "common" | "magic" | "rare" | "legendary";
  imageUrl: string;
  type: SlotType;
  armor?: string;
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
