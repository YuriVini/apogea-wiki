import { useQuery } from '@tanstack/react-query'
import { Equipment } from '../../constants/equipment'
import { ApiNoAuth } from '../../@api/axios'

export const EQUIPMENTS_QUERY_KEY = 'equipments'

const fetchEquipments = async (): Promise<Equipment[]> => {
  const { data } = await ApiNoAuth.get('/equipments')
  return data
}

export const useEquipments = () => {
  return useQuery({
    queryKey: [EQUIPMENTS_QUERY_KEY],
    queryFn: fetchEquipments
  })
}
