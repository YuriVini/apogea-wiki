import { useState } from 'react'
import { SkillSlot } from './skill-slot'

import { EQUIPMENT_DATABASE, Equipment } from './equipment'

export const SkillsGrid = ({ initialBuildGrid }: { initialBuildGrid: Record<string, Equipment> }) => {
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
