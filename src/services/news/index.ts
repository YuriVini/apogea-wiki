import { useQuery } from '@tanstack/react-query'
import { ApiNoAuth } from '../../@api/axios'

export const NEWS_QUERY_KEY = 'news'

export const useNews = () => {
  return useQuery({
    queryKey: [NEWS_QUERY_KEY],
    queryFn: async () => {
      const { data } = await ApiNoAuth.get<NewsApiTypes.News[]>('/news')
      return data
    },
  })
}
