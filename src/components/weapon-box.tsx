interface WeaponBoxProps {
  title: string
  imageUrl: string
}

export const WeaponBox = ({ title, imageUrl }: WeaponBoxProps) => {
  return (
    <div className='p-4 hover:bg-gray-700/30 cursor-pointer rounded-lg'>
      <img
        src={imageUrl}
        alt={title}
        className='w-16 h-16 mx-auto mb-2'
      />
      <p className='text-white text-center'>{title}</p>
    </div>
  )
}
