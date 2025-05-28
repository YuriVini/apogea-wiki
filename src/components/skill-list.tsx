import { Trash2 } from 'lucide-react'

export const SkillList = ({
  title,
  skills,
  onAdd,
  onDelete,
  onEdit,
  isEditing,
}: {
  title: string
  skills: string[]
  onAdd: () => void
  onDelete: (index: number) => void
  onEdit: (index: number, value: string) => void
  isEditing: boolean
}) => (
  <div>
    <div className='flex justify-between items-center mb-2'>
      <h4 className='font-semibold text-yellow-400'>{title}</h4>
      {isEditing && (
        <button onClick={onAdd} className='text-green-400 hover:text-green-300 text-sm'>
          ➕
        </button>
      )}
    </div>
    <ul className='space-y-1 text-gray-300'>
      {skills.map((skill, index) => (
        <li key={index} className='flex items-center justify-between'>
          <div className='flex-1'>
            {isEditing ? (
              <input type='text' value={skill} onChange={(e) => onEdit(index, e.target.value)} className='bg-gray-700 border border-gray-600 rounded px-2 py-1 w-full' />
            ) : (
              <span>• {skill}</span>
            )}
          </div>
          {isEditing && (
            <button onClick={() => onDelete(index)} className='ml-2 text-red-400 hover:text-red-300 text-sm'>
              <Trash2 />
            </button>
          )}
        </li>
      ))}
    </ul>
  </div>
)
