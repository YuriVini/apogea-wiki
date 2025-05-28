import { useState } from 'react'
import { SkillSlot } from './skill-slot'
import Helme3 from '/helmet/Helmet3.webp'
import RingIcon from '/ring/Crystal_Ring.webp'
import LegsIcon from '/legs/Leather_Cuisse.webp'
import BootsIcon from '/boots/Boots1.webp'
import ChestIcon from '/armor/Brass_armor.webp'
import BackpackIcon from '/backpack/Backpack_blue.webp'
import AccessoryIcon from '/necklace/Silver_amulet.webp'
import LeftHandIcon from '/swords/Broadsword.webp'
import RightHandIcon from '/swords/Broadsword.webp'
import { EQUIPMENT_DATABASE, Equipment } from './equipment'

const initialBuildGrid = {
  accessory: {
    name: 'Accessory',
    imageUrl: AccessoryIcon,
    type: 'accessory',
    category: 'ring',
  } as Equipment,
  leftHand: {
    name: 'Left Hand',
    imageUrl: LeftHandIcon,
    type: 'weapon',
    category: 'sword',
  } as Equipment,
  rightHand: {
    name: 'Right Hand',
    imageUrl: RightHandIcon,
    type: 'weapon',
    category: 'sword',
  } as Equipment,
  chest: {
    name: 'Chest',
    imageUrl: ChestIcon,
    type: 'armor',
    category: 'chest',
  } as Equipment,
  legs: {
    name: 'Legs',
    imageUrl: LegsIcon,
    type: 'armor',
    category: 'leg',
  } as Equipment,
  boots: {
    name: 'Boots',
    imageUrl: BootsIcon,
    type: 'armor',
    category: 'boot',
  } as Equipment,
  helmet: {
    name: 'Helmet',
    imageUrl: Helme3,
    type: 'armor',
    category: 'helmet',
  } as Equipment,
  ring: {
    name: 'Ring',
    imageUrl: RingIcon,
    type: 'accessory',
    category: 'ring',
  } as Equipment,
  backpack: {
    name: 'Backpack',
    imageUrl: BackpackIcon,
    type: 'accessory',
    category: 'backpack',
  } as Equipment,
}

export const SkillsGrid = () => {
  const [buildGrid, setBuildGrid] = useState(initialBuildGrid)
  const initialEquipment = {
    sword: EQUIPMENT_DATABASE.find((e) => e.name === 'Sword'),
    cutlass: EQUIPMENT_DATABASE.find((e) => e.name === 'Cutlass Sword'),
  }

  const updateEquipment = (slot: keyof typeof buildGrid, equipment: Equipment) => {
    setBuildGrid((prev) => ({
      ...prev,
      [slot]: equipment,
    }))
  }

  return (
    <div className='relative'>
      <div className='rounded-lg bg-gray-900/50 p-3 relative'>
        <div className='absolute top-5 right-8 text-4xl text-gray-400 font-medieval'></div>

        <div className='flex justify-center gap-6'>
          <div className='space-y-4 self-center'>
            <SkillSlot type='armor' category='ring' equipment={buildGrid.ring} onChange={(equipment) => updateEquipment('ring', equipment)} />
            <SkillSlot
              type='weapon'
              category='weapon-staff-bow-dagger-shield-glove'
              equipment={initialEquipment.sword}
              onChange={(equipment) => updateEquipment('leftHand', equipment)}
            />
            <SkillSlot type='armor' category='chest' equipment={buildGrid.chest} onChange={(equipment) => updateEquipment('chest', equipment)} />
          </div>

          <div className='space-y-4 self-center'>
            <SkillSlot type='armor' category='helmet' equipment={buildGrid.helmet} onChange={(equipment) => updateEquipment('helmet', equipment)} />
            <SkillSlot type='armor' category='chest' equipment={buildGrid.chest} onChange={(equipment) => updateEquipment('chest', equipment)} />
            <SkillSlot type='armor' category='leg' equipment={buildGrid.legs} onChange={(equipment) => updateEquipment('legs', equipment)} />
            <SkillSlot type='armor' category='boot' equipment={buildGrid.boots} onChange={(equipment) => updateEquipment('boots', equipment)} />
          </div>

          <div className='space-y-4 self-center'>
            <SkillSlot type='accessory' category='backpack' equipment={buildGrid.backpack} onChange={(equipment) => updateEquipment('backpack', equipment)} />
            <SkillSlot
              type='weapon'
              category='weapon-staff-bow-dagger-shield-glove'
              equipment={initialEquipment.cutlass}
              onChange={(equipment) => updateEquipment('rightHand', equipment)}
            />
            <SkillSlot type='armor' category='ring' equipment={buildGrid.accessory} onChange={(equipment) => updateEquipment('accessory', equipment)} />
          </div>
        </div>
      </div>
    </div>
  )
}
