import { useQuery, useMutation } from '@tanstack/react-query'
import { Api } from '../../@api/axios'
import { ApiNoAuth } from '../../@api/axios'

export const EQUIPMENTS_QUERY_KEY = 'equipments'

const fetchEquipments = async (): Promise<EquipmentsApiTypes.Equipment[]> => {
  const { data } = await ApiNoAuth.get('/equipments')
  return data
}

  export const useUpdateEquipment = () => {
  return useMutation({
    mutationFn: async (equipment: EquipmentsApiTypes.Equipment): Promise<EquipmentsApiTypes.Equipment> => {
      const { data } = await Api.put<EquipmentsApiTypes.Equipment>(`/equipments/${equipment.id}`, equipment)
      return data
    },
  })
}

export const useCreateEquipment = () => {
  return useMutation({
    mutationFn: async (equipment: Omit<EquipmentsApiTypes.Equipment, 'id'>): Promise<{ equipmentId: string }> => {
      const { data } = await Api.post<{ equipmentId: string }>(`/equipments`, equipment)
      return data
    },
  })
}

export const useDeleteEquipment = () => {
  return useMutation({
    mutationFn: async (equipmentId: string) => {
      await Api.delete(`/equipments/${equipmentId}`)
    },
  })
}


export const useEquipments = () => {
  return useQuery({
    queryKey: [EQUIPMENTS_QUERY_KEY],
    queryFn: fetchEquipments
  })
}
