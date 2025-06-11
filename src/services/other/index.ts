import { useQuery, useMutation } from "@tanstack/react-query";
import { Api } from "../../@api/axios";
import { ApiNoAuth } from "../../@api/axios";

export const OTHER_QUERY_KEY = "other";
export const OTHER_ITEMS_ID_QUERY_KEY = "other-items-id";
export const OTHER_ITEMS_TYPE_QUERY_KEY = "other-items-type";

const fetchOther = async (): Promise<OtherApiTypes.OtherListResponse> => {
  const { data } = await ApiNoAuth.get("/other-items");
  return data;
};

export const fetchOtherItemsType = async (
  type: string,
): Promise<OtherApiTypes.OtherListResponse> => {
  const { data } = await ApiNoAuth.get(`/other-items/type/${type}`);
  return data;
};

export const fetchOtherById = async (
  id: string,
): Promise<OtherApiTypes.Other> => {
  const { data } = await ApiNoAuth.get(`/other-items/item/${id}`);
  return data;
};

export const useUpdateOther = () => {
  return useMutation({
    mutationFn: async (
      other: OtherApiTypes.Other,
    ): Promise<OtherApiTypes.Other> => {
      const { data } = await Api.put<OtherApiTypes.Other>(
        `/other-items/${other.id}`,
        other,
      );
      return data;
    },
  });
};

export const useCreateOther = () => {
  return useMutation({
    mutationFn: async (
      other: Omit<OtherApiTypes.Other, "id">,
    ): Promise<{ id: string }> => {
      const { data } = await Api.post<{ id: string }>(`/other-items`, other);
      return data;
    },
  });
};

export const useDeleteOther = () => {
  return useMutation({
    mutationFn: async (otherId: string): Promise<void> => {
      await Api.delete(`/other-items/${otherId}`);
    },
  });
};

export const useOther = () => {
  return useQuery({
    queryKey: [OTHER_QUERY_KEY],
    queryFn: fetchOther,
  });
};

export const useOtherById = (id: string) => {
  return useQuery({
    queryKey: [OTHER_ITEMS_ID_QUERY_KEY, id],
    queryFn: () => fetchOtherById(id),
  });
};

export const useOtherByType = (type: string) => {
  return useQuery({
    queryKey: [OTHER_ITEMS_TYPE_QUERY_KEY, type],
    queryFn: () => fetchOtherItemsType(type),
  });
};
