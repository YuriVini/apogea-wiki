export const HighlightBuilds = ({ title, overview }: BuildsApiTypes.BuildData) => {
  return (
    <div className='p-6 rounded-xl hover:bg-gray-700/30 cursor-pointer transition-all duration-300 hover:scale-105'>
      <h3 className='text-xl text-white font-semibold'>{title}</h3>
      <p className='text-gray-300 mt-1'>{overview}</p>
    </div>
  )
}
