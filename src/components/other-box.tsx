interface OtherBoxProps {
  title: string
  imageUrl: string
}

export const OtherBox = ({ title, imageUrl }: OtherBoxProps) => {
  return (
    <div className='p-4 hover:bg-gray-700/30 cursor-pointer rounded-lg transition-all duration-300 hover:scale-105'>
      <img src={imageUrl} alt={title} className='w-16 h-16 mx-auto mb-2 object-contain' />
      <p className='text-white text-center text-sm font-medium'>{title}</p>
    </div>
  )
}
