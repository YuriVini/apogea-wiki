import { useState } from 'react'
import { SkillSlot } from './skill-slot'

interface SkillsGridProps {
  initialBuildGrid: BuildsApiTypes.BuildEquipmentData
}

export const SkillsGrid = ({ initialBuildGrid }: SkillsGridProps) => {
  const [buildGrid, setBuildGrid] = useState(initialBuildGrid)

  const updateEquipment = (slot: keyof typeof buildGrid, equipment: EquipmentsApiTypes.Equipment) => {
    setBuildGrid((prev) => ({
      ...prev,
      [slot]: equipment,
    }))
  }

  return (
    <div className='relative'>
      <div className='rounded-lg bg-gray-900/50 p-3 relative'>
        <div className='flex justify-center gap-6'>
          <div className='space-y-4 self-center'>
            <SkillSlot type='armor' category='ring' equipment={buildGrid.ring} onChange={(equipment) => updateEquipment('ring', equipment)} />
            <SkillSlot
              type='weapon'
              equipment={buildGrid.leftHand}
              category='weapon-staff-bow-dagger-shield-glove'
              onChange={(equipment) => updateEquipment('leftHand', equipment)}
            />
            <SkillSlot type='armor' category='necklace' equipment={buildGrid.necklace} onChange={(equipment) => updateEquipment('chest', equipment)} />
          </div>

          <div className='space-y-4 self-center'>
            <SkillSlot type='armor' category='helmet' equipment={buildGrid.helmet} onChange={(equipment) => updateEquipment('helmet', equipment)} />
            <SkillSlot type='armor' category='chest' equipment={buildGrid.chest} onChange={(equipment) => updateEquipment('chest', equipment)} />
            <SkillSlot type='armor' category='legs' equipment={buildGrid.legs} onChange={(equipment) => updateEquipment('legs', equipment)} />
            <SkillSlot type='armor' category='boots' equipment={buildGrid.boots} onChange={(equipment) => updateEquipment('boots', equipment)} />
          </div>

          <div className='space-y-4 self-center'>
            <SkillSlot type='accessory' category='backpack' equipment={buildGrid.backpack} onChange={(equipment) => updateEquipment('backpack', equipment)} />
            <SkillSlot
              type='weapon'
              equipment={buildGrid.rightHand}
              category='weapon-staff-bow-dagger-shield-glove'
              onChange={(equipment) => updateEquipment('rightHand', equipment)}
            />
            <SkillSlot type='armor' category='ring' equipment={buildGrid.accessory} onChange={(equipment) => updateEquipment('accessory', equipment)} />
          </div>
        </div>
      </div>
    </div>
  )
}
