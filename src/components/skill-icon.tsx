interface SkillIconProps {
  className?: string
  equipment?: EquipmentsApiTypes.Equipment
}

export const SkillIcon = ({ className = '', equipment }: SkillIconProps) => {
  const imageUrl = equipment?.imageUrl

  return (
    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full border ${className}`}>
      <img src={imageUrl} alt={equipment?.name} className='w-full h-full object-cover' />
    </span>
  )
}
