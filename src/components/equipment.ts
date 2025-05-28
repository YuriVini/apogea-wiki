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

export const EQUIPMENT_DATABASE: Equipment[] = [
  // Weapons
  { name: 'Broadsword', imageUrl: '/swords/Broadsword.webp', rarity: 'common', type: 'weapon', category: 'sword', damage: '+30',attackSpeed: '-2',range: '+2',defense: '+7',attributes: '',size: '8/10',weight: '75 oz',dropBy: 'Troll',buyFrom: 'Weapon Master',sellTo: '350 gp' },
  { name: 'Cutlass Sword', imageUrl: '/swords/Cutlass_sword.webp', rarity: 'magic', type: 'weapon', category: 'sword', damage: '+25',attackSpeed: '+3',range: '+2',defense: '+3',attributes: '',size: '8/10',weight: '70 oz',dropBy: 'Troll',buyFrom: 'Weapon Master',sellTo: '300 gp' },
  { name: 'Epee Sword', imageUrl: '/swords/Epee_sword.webp', rarity: 'legendary', type: 'weapon', category: 'sword', damage: '+35',attackSpeed: '+2',range: '+2',defense: '+10',attributes: '',size: '8/10',weight: '80 oz',dropBy: 'Knight',buyFrom: 'Royal Armory',sellTo: '400 gp' },
  { name: 'Iron Sword', imageUrl: '/swords/Ironsword.webp', rarity: 'legendary', type: 'weapon', category: 'sword',     damage: '+15',attackSpeed: '+4',range: '+2',defense: '+2',attributes: '',size: '6/10',weight: '36 oz',dropBy: 'Orc Warrior',buyFrom: 'Blacksmith',sellTo: '150 gp' },
  { name: 'Long Sword', imageUrl: '/swords/Longsword.webp', rarity: 'legendary', type: 'weapon', category: 'sword', damage: '+40',attackSpeed: '+1',range: '+7',defense: '+10',attributes: '',size: '8/10',weight: '98 oz',dropBy: 'Knight',buyFrom: 'Royal Armory',sellTo: '500 gp' },
  { name: 'Rusty Sword', imageUrl: '/swords/Rusty_sword.webp', rarity: 'legendary', type: 'weapon', category: 'sword', damage: '+8',attackSpeed: '+2',range: '+2',defense: '+2',attributes: '',size: '6/10',weight: '30 oz',dropBy: 'Skeleton',buyFrom: 'Weapon Shop',sellTo: '75 gp' },
  { name: 'Serpent Sword', imageUrl: '/swords/Serpent_Sword.webp', rarity: 'legendary', type: 'weapon', category: 'sword', damage: '+30',attackSpeed: '+2',range: '+2',defense: '+10',attributes: '',size: '8/10',weight: '80 oz',dropBy: 'Knight',buyFrom: 'Royal Armory',sellTo: '400 gp' },
  { name: 'Sword', imageUrl: '/swords/Sword3.webp', rarity: 'legendary', type: 'weapon', category: 'sword', damage: '+20',attackSpeed: '+3',range: '+2',defense: '+5',attributes: '',size: '8/10',weight: '70 oz',dropBy: 'Troll',buyFrom: 'Weapon Master',sellTo: '300 gp' },
  { name: 'Sword', imageUrl: '/swords/Sword4.webp', rarity: 'legendary', type: 'weapon', category: 'sword', damage: '+25',attackSpeed: '+2',range: '+2',defense: '+10',attributes: '',size: '8/10',weight: '75 oz',dropBy: 'Troll',buyFrom: 'Weapon Master',sellTo: '350 gp' },
  { name: 'Sword', imageUrl: '/swords/Sword6.webp', rarity: 'legendary', type: 'weapon', category: 'sword', damage: '+30',attackSpeed: '+1',range: '+2',defense: '+10',attributes: '',size: '8/10',weight: '80 oz',dropBy: 'Knight',buyFrom: 'Royal Armory',sellTo: '400 gp' },
  
  // Dagger
  { name: 'Bone Knife', imageUrl: '/daggers/Bone_Knife.webp', rarity: 'common', type: 'weapon', category: 'dagger', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Dagger', imageUrl: '/daggers/Dagger3.webp', rarity: 'magic', type: 'weapon', category: 'dagger', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Knife', imageUrl: '/daggers/Knife.png', rarity: 'rare', type: 'weapon', category: 'dagger', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Onyx Dagger', imageUrl: '/daggers/Onyx_Dagger.webp', rarity: 'rare', type: 'weapon', category: 'dagger', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Silver Dagger', imageUrl: '/daggers/Silver_Dagger.webp', rarity: 'rare', type: 'weapon', category: 'dagger', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  
  // Bows
  { name: 'Bone Bow', imageUrl: '/bow/Bone_Bow.webp', rarity: 'common', type: 'weapon', category: 'bow', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Long Bow', imageUrl: '/bow/Longbow.webp', rarity: 'magic', type: 'weapon', category: 'bow', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Stone Bow', imageUrl: '/bow/StoneBow.webp', rarity: 'legendary', type: 'weapon', category: 'bow', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Wooden Bow', imageUrl: '/bow/Wooden_Bow.webp', rarity: 'legendary', type: 'weapon', category: 'bow', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},

  // Staffs
  { name: 'Crystal Staff', imageUrl: '/staff/Crystal_Staff.webp', rarity: 'common', type: 'weapon', category: 'staff', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Orb blue', imageUrl: '/staff/Orb_blue.webp', rarity: 'magic', type: 'weapon', category: 'staff', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Orb green', imageUrl: '/staff/Orb_green.webp', rarity: 'legendary', type: 'weapon', category: 'staff', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Orb red', imageUrl: '/staff/Orb_red.webp', rarity: 'legendary', type: 'weapon', category: 'staff', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Wooden Staff', imageUrl: '/staff/Wooden_staff.webp', rarity: 'legendary', type: 'weapon', category: 'staff', damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },

  // Shields
  { name: 'Buckler Shield', imageUrl: '/shield/Buckler_shield.webp', rarity: 'common', type: 'weapon', category: 'shield',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Plated Shield', imageUrl: '/shield/Plated_Shield.webp', rarity: 'magic', type: 'weapon', category: 'shield',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Brass Shield', imageUrl: '/shield/Shield5.webp', rarity: 'rare', type: 'weapon', category: 'shield',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Studded Shield', imageUrl: '/shield/Studded_shield.webp', rarity: 'legendary', type: 'weapon', category: 'shield',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Tower Shield', imageUrl: '/shield/Tower_Shield.webp', rarity: 'legendary', type: 'weapon', category: 'shield',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},
  { name: 'Wooden Shield', imageUrl: '/shield/Wooden_shield.webp', rarity: 'legendary', type: 'weapon', category: 'shield',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'},

  // Gloves
  { name: 'Cloth Gloves', imageUrl: '/gloves/Cloth_gloves.webp', rarity: 'common', type: 'weapon', category: 'glove',  damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Leather Gloves', imageUrl: '/gloves/Leather_gloves.webp', rarity: 'magic', type: 'weapon', category: 'glove',  damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Plate Gloves', imageUrl: '/gloves/Plate_gloves.webp', rarity: 'rare', type: 'weapon', category: 'glove',  damage: '+3',attackSpeed: '+3',range: '',defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
 
  // Chest
  { name: 'Brass Armor', imageUrl: '/armor/Brass_armor.webp', rarity: 'magic', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Brigandine Vest', imageUrl: '/armor/Brigandine_Vest.webp', rarity: 'rare', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Chain Armor', imageUrl: '/armor/Chain_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Cloth Armor', imageUrl: '/armor/Cloth_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Cloth Vest', imageUrl: '/armor/Cloth_Vest.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Crooked Vest', imageUrl: '/armor/Crooked_Vest.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Dark Robe', imageUrl: '/armor/Dark_Robe.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Gambeson Armor', imageUrl: '/armor/Gambeson_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Leather Cloak', imageUrl: '/armor/Leather_Cloak.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Nightshade Robe', imageUrl: '/armor/Nightshade_Robe.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Plate Armor', imageUrl: '/armor/Plate_armor.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Royal Armor', imageUrl: '/armor/Royal_Armor.webp', rarity: 'legendary', type: 'armor', category: 'chest', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  
  // Helmets
  { name: 'Druid Hat', imageUrl: '/helmet/Druid_hat.webp', rarity: 'common', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Mask Helmet', imageUrl: '/helmet/Helmet3.webp', rarity: 'magic', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Mage Leather Hat', imageUrl: '/helmet/Helmet5.webp', rarity: 'rare', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Kettle Helmet', imageUrl: '/helmet/Kettle_helmet.webp', rarity: 'legendary', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Leather Helmet', imageUrl: '/helmet/Leather_helmet1.webp', rarity: 'legendary', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Leather Hood', imageUrl: '/helmet/Leather_hood.webp', rarity: 'legendary', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Mage Hat', imageUrl: '/helmet/Mage_hat1.webp', rarity: 'legendary', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Mage Hood', imageUrl: '/helmet/Mage_hood.webp', rarity: 'legendary', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Plate Helmet', imageUrl: '/helmet/Plate_helmet.webp', rarity: 'legendary', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Spanghen Helmet', imageUrl: '/helmet/Spanghen_helmet.webp', rarity: 'legendary', type: 'armor', category: 'helmet', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },

  // Boots
  { name: 'Boots', imageUrl: '/boots/Boots1.webp', rarity: 'common', type: 'armor', category: 'boot', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Leather Boots', imageUrl: '/boots/Leather_boots.webp', rarity: 'magic', type: 'armor', category: 'boot', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Plate Boots', imageUrl: '/boots/Plate_boots.webp', rarity: 'rare', type: 'armor', category: 'boot', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Quoki Shoes', imageUrl: '/boots/Quoki_Shoes.webp', rarity: 'legendary', type: 'armor', category: 'boot', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Sailor Boots', imageUrl: '/boots/Sailor_Boots.webp', rarity: 'legendary', type: 'armor', category: 'boot', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Winged Boots', imageUrl: '/boots/Winged_Boots.webp', rarity: 'legendary', type: 'armor', category: 'boot', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },

  // Legs
  { name: 'Brass Legs', imageUrl: '/legs/Brass_Legs.webp', rarity: 'common', type: 'armor', category: 'leg', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Brigandine Legs', imageUrl: '/legs/Brigandine_Legs.webp', rarity: 'magic', type: 'armor', category: 'leg', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Burlap Skirt', imageUrl: '/legs/Burlap_Skirt.webp', rarity: 'rare', type: 'armor', category: 'leg', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Cloth Pants', imageUrl: '/legs/Cloth_Pants.webp', rarity: 'legendary', type: 'armor', category: 'leg', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Euler Pants', imageUrl: '/legs/Euler_Pants.webp', rarity: 'legendary', type: 'armor', category: 'leg', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Leather Cuisse', imageUrl: '/legs/Leather_Cuisse.webp', rarity: 'legendary', type: 'armor', category: 'leg', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Plate Legs', imageUrl: '/legs/Plate_legs.webp', rarity: 'legendary', type: 'armor', category: 'leg', defense: '',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },

  // Rings
  { name: 'Crystal Ring', imageUrl: '/ring/Crystal_Ring.webp', rarity: 'common', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },
  { name: 'Death Ring', imageUrl: '/ring/Death_ring.webp', rarity: 'magic', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Diamond Ring', imageUrl: '/ring/Diamond_Ring.webp', rarity: 'rare', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Garnet Ring', imageUrl: '/ring/Garnet_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Golden Ring', imageUrl: '/ring/Golden_ring.webp', rarity: 'legendary', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Regeeration Ring', imageUrl: '/ring/Regeneration_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Silver Ring', imageUrl: '/ring/Silver_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Zircon Ring', imageUrl: '/ring/Zircon_Ring.webp', rarity: 'legendary', type: 'armor', category: 'ring',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp' },

  // Necklaces
  { name: 'Blessed Amulet', imageUrl: '/necklace/Blessed_Amulet.webp', rarity: 'legendary', type: 'armor', category: 'necklace',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Leather Collar', imageUrl: '/necklace/Leather_Collar.webp', rarity: 'common', type: 'armor', category: 'necklace',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Ruby Necklace', imageUrl: '/necklace/Ruby_necklace.webp', rarity: 'magic', type: 'armor', category: 'necklace',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Scarf', imageUrl: '/necklace/Scarf.webp', rarity: 'rare', type: 'armor', category: 'necklace',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Silver amulet', imageUrl: '/necklace/Silver_amulet.webp', rarity: 'rare', type: 'armor', category: 'necklace',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },

  // Backpacks
  { name: 'Backpack Blue', imageUrl: '/backpack/Backpack_blue.webp', rarity: 'common', type: 'accessory', category: 'backpack',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Simple Backpack', imageUrl: '/backpack/Simple_Bag.webp', rarity: 'magic', type: 'accessory', category: 'backpack',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },
  { name: 'Backpack Brown', imageUrl: '/backpack/Backpack_brown.webp', rarity: 'rare', type: 'accessory', category: 'backpack',attributes: '',size: '2/10',weight: '8 oz',dropBy: 'Goblin',buyFrom: 'Blacksmith',sellTo: '50 gp'  },

];
