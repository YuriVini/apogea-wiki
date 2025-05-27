export type SlotType = 
  | 'weapon'   
  | 'armor'    
  | 'accessory'
  | 'spell'
  | 'ability'

export type CategoryType = 
  | 'sword'
  | 'dagger'
  | 'bow'
  | 'staff'
  | 'shield'
  | 'glove'
  | 'boot'
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
  name: string;
  rarity?: 'common' | 'magic' | 'rare' | 'legendary';
  imageUrl: string;
  type: SlotType;
  category: CategoryType;
}

export const EQUIPMENT_DATABASE: Equipment[] = [
  // Weapons
  { name: 'Broadsword', imageUrl: '/swords/Broadsword.webp', rarity: 'common', type: 'weapon', category: 'sword' },
  { name: 'Cutlass Sword', imageUrl: '/swords/Cutlass_sword.webp', rarity: 'magic', type: 'weapon', category: 'sword' },
  { name: 'Epee Sword', imageUrl: '/swords/Epee_sword.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  { name: 'Iron Sword', imageUrl: '/swords/Ironsword.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  { name: 'Long Sword', imageUrl: '/swords/Longsword.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  { name: 'Rusty Sword', imageUrl: '/swords/Rusty_sword.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  { name: 'Serpent Sword', imageUrl: '/swords/Serpent_Sword.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  { name: 'Sword', imageUrl: '/swords/Sword3.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  { name: 'Sword', imageUrl: '/swords/Sword4.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  { name: 'Sword', imageUrl: '/swords/Sword6.webp', rarity: 'legendary', type: 'weapon', category: 'sword' },
  
  // Dagger
  { name: 'Bone Knife', imageUrl: '/daggers/Bone_Knife.webp', rarity: 'common', type: 'weapon', category: 'dagger' },
  { name: 'Dagger', imageUrl: '/daggers/Dagger3.webp', rarity: 'magic', type: 'weapon', category: 'dagger' },
  { name: 'Knife', imageUrl: '/daggers/Knife.png', rarity: 'rare', type: 'weapon', category: 'dagger' },
  { name: 'Onyx Dagger', imageUrl: '/daggers/Onyx_Dagger.webp', rarity: 'rare', type: 'weapon', category: 'dagger' },
  { name: 'Silver Dagger', imageUrl: '/daggers/Silver_Dagger.webp', rarity: 'rare', type: 'weapon', category: 'dagger' },
  
  // Bows
  { name: 'Bone Bow', imageUrl: '/bow/Bone_Bow.webp', rarity: 'common', type: 'weapon', category: 'staff' },
  { name: 'Long Bow', imageUrl: '/bow/Longbow.webp', rarity: 'magic', type: 'weapon', category: 'staff' },
  { name: 'Stone Bow', imageUrl: '/bow/StoneBow.webp', rarity: 'legendary', type: 'weapon', category: 'staff' },
  { name: 'Wooden Bow', imageUrl: '/bow/Wooden_Bow.webp', rarity: 'legendary', type: 'weapon', category: 'staff' },

  // Staffs
  { name: 'Crystal Staff', imageUrl: '/staff/Crystal_Staff.webp', rarity: 'common', type: 'weapon', category: 'staff' },
  { name: 'Orb blue', imageUrl: '/staff/Orb_blue.webp', rarity: 'magic', type: 'weapon', category: 'staff' },
  { name: 'Orb green', imageUrl: '/staff/Orb_green.webp', rarity: 'legendary', type: 'weapon', category: 'staff' },
  { name: 'Orb red', imageUrl: '/staff/Orb_red.webp', rarity: 'legendary', type: 'weapon', category: 'staff' },
  { name: 'Wooden Staff', imageUrl: '/staff/Wooden_staff.webp', rarity: 'legendary', type: 'weapon', category: 'staff' },

  // Shields
  { name: 'Buckler Shield', imageUrl: '/shield/Buckler_shield.webp', rarity: 'common', type: 'weapon', category: 'shield' },
  { name: 'Plated Shield', imageUrl: '/shield/Plated_Shield.webp', rarity: 'magic', type: 'weapon', category: 'shield' },
  { name: 'Brass Shield', imageUrl: '/shield/Shield5.webp', rarity: 'rare', type: 'weapon', category: 'shield' },
  { name: 'Studded Shield', imageUrl: '/shield/Studded_shield.webp', rarity: 'legendary', type: 'weapon', category: 'shield' },
  { name: 'Tower Shield', imageUrl: '/shield/Tower_Shield.webp', rarity: 'legendary', type: 'weapon', category: 'shield' },
  { name: 'Wooden Shield', imageUrl: '/shield/Wooden_shield.webp', rarity: 'legendary', type: 'weapon', category: 'shield' },

  // Gloves
  { name: 'Cloth Gloves', imageUrl: '/gloves/Cloth_gloves.webp', rarity: 'common', type: 'weapon', category: 'glove' },
  { name: 'Leather Gloves', imageUrl: '/gloves/Leather_gloves.webp', rarity: 'magic', type: 'weapon', category: 'glove' },
  { name: 'Plate Gloves', imageUrl: '/gloves/Plate_gloves.webp', rarity: 'rare', type: 'weapon', category: 'glove' },
 
  // Chest
  { name: 'Brass Armor', imageUrl: '/armor/Brass_armor.webp', rarity: 'magic', type: 'armor', category: 'chest' },
  { name: 'Brigandine Vest', imageUrl: '/armor/Brigandine_Vest.webp', rarity: 'rare', type: 'armor', category: 'chest' },
  { name: 'Chain Armor', imageUrl: '/armor/Chain_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Cloth Armor', imageUrl: '/armor/Cloth_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Cloth Vest', imageUrl: '/armor/Cloth_Vest.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Crooked Vest', imageUrl: '/armor/Crooked_Vest.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Dark Robe', imageUrl: '/armor/Dark_Robe.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Gambeson Armor', imageUrl: '/armor/Gambeson_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Leather Cloak', imageUrl: '/armor/Leather_Cloak.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Nightshade Robe', imageUrl: '/armor/Nightshade_Robe.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Plate Armor', imageUrl: '/armor/Plate_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  { name: 'Royal Armor', imageUrl: '/armor/Royal_Armor.webp', rarity: 'legendary', type: 'armor', category: 'chest' },
  
  // Helmets
  { name: 'Druid Hat', imageUrl: '/helmet/Druid_hat.webp', rarity: 'common', type: 'armor', category: 'helmet' },
  { name: 'Mask Helmet', imageUrl: '/helmet/Helmet3.webp', rarity: 'magic', type: 'armor', category: 'helmet' },
  { name: 'Mage Leather Hat', imageUrl: '/helmet/Helmet5.webp', rarity: 'rare', type: 'armor', category: 'helmet' },
  { name: 'Kettle Helmet', imageUrl: '/helmet/Kettle_helmet.webp', rarity: 'legendary', type: 'armor', category: 'helmet' },
  { name: 'Leather Helmet', imageUrl: '/helmet/Leather_helmet1.webp', rarity: 'legendary', type: 'armor', category: 'helmet' },
  { name: 'Leather Hood', imageUrl: '/helmet/Leather_hood.webp', rarity: 'legendary', type: 'armor', category: 'helmet' },
  { name: 'Mage Hat', imageUrl: '/helmet/Mage_hat1.webp', rarity: 'legendary', type: 'armor', category: 'helmet' },
  { name: 'Mage Hood', imageUrl: '/helmet/Mage_hood.webp', rarity: 'legendary', type: 'armor', category: 'helmet' },
  { name: 'Plate Helmet', imageUrl: '/helmet/Plate_helmet.webp', rarity: 'legendary', type: 'armor', category: 'helmet' },
  { name: 'Spanghen Helmet', imageUrl: '/helmet/Spanghen_helmet.webp', rarity: 'legendary', type: 'armor', category: 'helmet' },

  // Boots
  { name: 'Boots', imageUrl: '/boots/Boots1.webp', rarity: 'common', type: 'armor', category: 'boot' },
  { name: 'Leather Boots', imageUrl: '/boots/Leather_boots.webp', rarity: 'magic', type: 'armor', category: 'boot' },
  { name: 'Plate Boots', imageUrl: '/boots/Plate_boots.webp', rarity: 'rare', type: 'armor', category: 'boot' },
  { name: 'Quoki Shoes', imageUrl: '/boots/Quoki_Shoes.webp', rarity: 'legendary', type: 'armor', category: 'boot' },
  { name: 'Sailor Boots', imageUrl: '/boots/Sailor_Boots.webp', rarity: 'legendary', type: 'armor', category: 'boot' },
  { name: 'Winged Boots', imageUrl: '/boots/Winged_Boots.webp', rarity: 'legendary', type: 'armor', category: 'boot' },

  // Legs
  { name: 'Brass Legs', imageUrl: '/legs/Brass_Legs.webp', rarity: 'common', type: 'armor', category: 'leg' },
  { name: 'Brigandine Legs', imageUrl: '/legs/Brigandine_Legs.webp', rarity: 'magic', type: 'armor', category: 'leg' },
  { name: 'Burlap Skirt', imageUrl: '/legs/Burlap_Skirt.webp', rarity: 'rare', type: 'armor', category: 'leg' },
  { name: 'Cloth Pants', imageUrl: '/legs/Cloth_Pants.webp', rarity: 'legendary', type: 'armor', category: 'leg' },
  { name: 'Euler Pants', imageUrl: '/legs/Euler_Pants.webp', rarity: 'legendary', type: 'armor', category: 'leg' },
  { name: 'Leather Cuisse', imageUrl: '/legs/Leather_Cuisse.webp', rarity: 'legendary', type: 'armor', category: 'leg' },
  { name: 'Plate Legs', imageUrl: '/legs/Plate_legs.webp', rarity: 'legendary', type: 'armor', category: 'leg' },

  // Rings
  { name: 'Crystal Ring', imageUrl: '/ring/Crystal_Ring.webp', rarity: 'common', type: 'armor', category: 'ring' },
  { name: 'Death Ring', imageUrl: '/ring/Death_ring.webp', rarity: 'magic', type: 'armor', category: 'ring' },
  { name: 'Diamond Ring', imageUrl: '/ring/Diamond_Ring.webp', rarity: 'rare', type: 'armor', category: 'ring' },
  { name: 'Garnet Ring', imageUrl: '/ring/Garnet_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring' },
  { name: 'Golden Ring', imageUrl: '/ring/Golden_ring.webp', rarity: 'legendary', type: 'armor', category: 'ring' },
  { name: 'Regeeration Ring', imageUrl: '/ring/Regeneration_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring' },
  { name: 'Silver Ring', imageUrl: '/ring/Silver_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring' },
  { name: 'Zircon Ring', imageUrl: '/ring/Zircon_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring' },

  // Necklaces
  { name: 'Blessed Amulet', imageUrl: '/necklace/Blessed_Amulet.webp', rarity: 'legendary', type: 'armor', category: 'necklace' },
  { name: 'Leather Collar', imageUrl: '/necklace/Leather_Collar.webp', rarity: 'common', type: 'armor', category: 'necklace' },
  { name: 'Ruby Necklace', imageUrl: '/necklace/Ruby_necklace.webp', rarity: 'magic', type: 'armor', category: 'necklace' },
  { name: 'Scarf', imageUrl: '/necklace/Scarf.webp', rarity: 'rare', type: 'armor', category: 'necklace' },
  { name: 'Silver amulet', imageUrl: '/necklace/Silver_amulet.webp', rarity: 'rare', type: 'armor', category: 'necklace' },

  // Backpacks
  { name: 'Backpack Blue', imageUrl: '/backpack/Backpack_blue.webp', rarity: 'common', type: 'accessory', category: 'backpack' },
  { name: 'Simple Backpack', imageUrl: '/backpack/Simple_Bag.webp', rarity: 'magic', type: 'accessory', category: 'backpack' },
  { name: 'Backpack Brown', imageUrl: '/backpack/Backpack_brown.webp', rarity: 'rare', type: 'accessory', category: 'backpack' },

  // Spells
  { name: 'Heal', imageUrl: '/spells/Spell23.webp', rarity: 'magic', type: 'spell', category: 'book' },

  // Abilities
  { name: 'Lightfoot', imageUrl: '/abilities/Ability2.webp', rarity: 'magic', type: 'ability', category: 'class-abilities' },

];
