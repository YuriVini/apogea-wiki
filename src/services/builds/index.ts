import { useMutation, useQuery } from '@tanstack/react-query'
 
import { Api, ApiNoAuth } from '../../@api/axios'

export const BUILDS_QUERY_KEY = 'builds'
export const BUILD_BY_ID_QUERY_KEY = 'buildById'

export const useBuilds = () => {
  return useQuery({
    queryKey: [BUILDS_QUERY_KEY],
    queryFn: async (): Promise<BuildsApiTypes.BuildData[]> => {
        const { data } = await ApiNoAuth.get<BuildsApiTypes.BuildData[]>('/builds')
        return data
      }
  })
}

export const fetchBuildById = async (buildId: string) => {
  const { data } = await ApiNoAuth.get<BuildsApiTypes.BuildData>(`/builds/${buildId}`)
  return data
}


export const useUpdateBuild = () => {
  return useMutation({
    mutationFn: async (build: BuildsApiTypes.BuildSchemaRequest): Promise<BuildsApiTypes.BuildData> => {
        const { data } = await Api.put<BuildsApiTypes.BuildData>(`/builds/${build.id}`, build)
        return data
      }
  })
}

export const useCreateBuild = () => {
  return useMutation({
    mutationFn: async (build: BuildsApiTypes.BuildSchemaRequest): Promise<BuildsApiTypes.BuildData> => {
        const { data } = await Api.post<BuildsApiTypes.BuildData>(`/builds`, build)
        return data
      }
  })
}
