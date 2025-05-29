import { useState } from 'react'
import { SkillSelector } from './skill-selector'
import { SlotType, Equipment, CategoryType } from '../constants/equipment'

interface SkillSlotProps {
  type: SlotType
  size?: 'normal' | 'small'
  equipment?: Equipment
  category?: CategoryType
  onChange: (equipment: Equipment) => void
}

export const SkillSlot = ({ type = 'weapon', category = 'chest', size = 'normal', equipment, onChange }: SkillSlotProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(equipment || null)

  const sizeClasses = size === 'small' ? 'w-8 h-8' : 'w-16 h-16'

  const slotLabel = category
    ? category === 'weapon-staff-bow-dagger-shield-glove'
      ? category?.split('-')?.join(' ')
      : `${category.charAt(0).toUpperCase() + category.slice(1)} Slot`
    : 'Equipment Slot'

  const categoryToSort = category === 'weapon-staff-bow-dagger-shield-glove' ? (category?.split('-') as CategoryType[]) : [category]

  const imageUrl = selectedEquipment?.imageUrl

  const handleEquipmentSelect = (newEquipment: Equipment) => {
    setSelectedEquipment(newEquipment)
    onChange(newEquipment)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`
          ${sizeClasses} 
          rounded-lg 
          border-2 
          flex 
          items-center 
          justify-center 
          transition-all 
          duration-200 
          hover:brightness-125
          cursor-pointer
          relative
          group
        `}
      >
        <div>
          <img src={imageUrl} alt={selectedEquipment?.name} className='h-10 w-10' />
        </div>
        <div className='absolute -top-8 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-xs text-gray-300 px-2 py-1 rounded whitespace-nowrap'>{slotLabel}</div>
      </button>

      <SkillSelector isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleEquipmentSelect} slotType={type} category={categoryToSort} />
    </>
  )
}
