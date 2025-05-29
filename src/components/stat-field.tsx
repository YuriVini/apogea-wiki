import { Minus } from 'lucide-react'

import { Plus } from 'lucide-react'

export const StatField = ({
  label,
  value,
  onIncrement,
  onDecrement,
  isEditing,
}: {
  label: string
  value: number | string
  onIncrement?: () => void
  onDecrement?: () => void
  isEditing: boolean
}) => (
  <div className='flex justify-between items-center py-1 border-b border-gray-700'>
    <span className='text-white font-semibold'>{label}:</span>
    <div className='flex items-center gap-2'>
      <span className='text-white'>{value}</span>
      {isEditing && (
        <>
          <button onClick={onIncrement} className='bg-green-600 hover:bg-green-700 text-white rounded px-2 py-1 text-sm flex items-center'>
            <Plus size={14} />
          </button>
          <button onClick={onDecrement} className='bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 text-sm flex items-center'>
            <Minus size={14} />
          </button>
        </>
      )}
    </div>
  </div>
)
