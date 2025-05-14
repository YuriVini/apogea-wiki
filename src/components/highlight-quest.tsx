interface HighlightQuestProps {
  title: string
  rewards: string
  description: string
}

export const HighlightQuest = ({
  title,
  rewards,
  description,
}: HighlightQuestProps) => {
  return (
    <div className='p-6 rounded-xl hover:bg-gray-700/30 cursor-pointer transition-all duration-300 hover:scale-105'>
      <a href='#' className='block'>
        <h3 className='text-xl text-white font-semibold'>{title}</h3>
        <p className='text-gray-300 mt-2'>Nível Recomendado: 30+</p>
        <p className='text-gray-300 mt-1'>Recompensas: {rewards}</p>
        <p className='text-gray-400 mt-2'>{description}</p>
      </a>
    </div>
  )
}
