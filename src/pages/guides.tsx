import { useParams } from 'react-router'

export const Guides = () => {
  const { guideId } = useParams()

  return <div>FeaturedGuides {guideId}</div>
}
