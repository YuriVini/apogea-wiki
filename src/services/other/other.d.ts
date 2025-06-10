export as namespace OtherApiTypes;

export interface Other {
  id: string;
  name: string;
  imageUrl?: string;
  type: OtherType;
  weight?: string;
  dropBy?: string;
  sellTo?: string;
  description?: string;
  hp?: string;
  exp?: string;
  abilities?: string;
  loot?: string;
  location?: string;
  author?: string;
  notes?: string;
  text?: string;
  satiateTime?: string;
  buffs?: string;
  requirements?: string;
}

export type OtherType =
  | "drop_creatures"
  | "itens_quest"
  | "monster"
  | "book"
  | "food"
  | "recipes"
  | "npc";

export interface OtherListResponse {
  items: Other[];
  total: number;
  page: number;
  pageSize: number;
}

export type CreateOtherRequest = Omit<Other, "id">;

export type UpdateOtherRequest = Other;
