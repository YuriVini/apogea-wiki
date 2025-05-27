export type SlotType = 'weapon' | 'chest' | 'gloves' | 'boots' | 'pants' | 'helmet' | 'accessory' | 'backpack';

export interface Equipment {
  name: string;
  type: SlotType;
  color: string;
  rarity: 'common' | 'magic' | 'rare' | 'legendary';
  icon: string;
}

export const EQUIPMENT_DATABASE: Equipment[] = [
  { name: 'Penetrating Shot', type: 'weapon', color: 'blue', rarity: 'rare', icon: 'Zap' },
  { name: 'Trickshot', type: 'weapon', color: 'red', rarity: 'rare', icon: 'Target' },
  { name: 'Preparation', type: 'backpack', color: 'purple', rarity: 'legendary', icon: 'Sparkles' },
  { name: 'Shadow Clone', type: 'accessory', color: 'green', rarity: 'magic', icon: 'Ghost' },
  { name: 'Leather Armor', type: 'chest', color: 'green', rarity: 'magic', icon: 'Shield' },
  { name: 'Steel Gauntlets', type: 'gloves', color: 'blue', rarity: 'rare', icon: 'Hand' },
  { name: 'Swift Boots', type: 'boots', color: 'purple', rarity: 'legendary', icon: 'Boot' },
  { name: 'Rogue Mask', type: 'helmet', color: 'red', rarity: 'rare', icon: 'Crown' },
];