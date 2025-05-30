import { useQuery } from "@tanstack/react-query"

import { ApiNoAuth } from "../../@api/axios"

export const GUIDES_QUERY_KEY = 'guides'
export const GUIDE_BY_ID_QUERY_KEY = 'guideById'

export const useGuides = () => {
  return useQuery({
    queryKey: [GUIDES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await ApiNoAuth.get<GuidesApiTypes.Guide[]>('/guides')
      return data
    },
  })
}

export const useGuideById = (guideId: string) => {
  return useQuery({
    queryKey: [GUIDE_BY_ID_QUERY_KEY, guideId],
    queryFn: async () => {
      const { data } = await ApiNoAuth.get<GuidesApiTypes.Guide>(`/guides/${guideId}`)
      return data
    },
  })
}
