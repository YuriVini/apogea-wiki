import { useQuery, useMutation } from "@tanstack/react-query";
import { Api } from "../../@api/axios";
import { ApiNoAuth } from "../../@api/axios";

export const OTHER_QUERY_KEY = "other";

const fetchOther = async (): Promise<OtherApiTypes.OtherListResponse> => {
  const { data } = await ApiNoAuth.get("/other");
  return data;
};

export const useUpdateOther = () => {
  return useMutation({
    mutationFn: async (
      other: OtherApiTypes.Other,
    ): Promise<OtherApiTypes.Other> => {
      const { data } = await Api.put<OtherApiTypes.Other>(
        `/other/${other.id}`,
        other,
      );
      return data;
    },
  });
};

export const useCreateOther = () => {
  return useMutation({
    mutationFn: async (
      other: Omit<OtherApiTypes.Other, "name">,
    ): Promise<{ id: string }> => {
      const { data } = await Api.post<{ id: string }>(`/other`, other);
      return data;
    },
  });
};

export const useDeleteOther = () => {
  return useMutation({
    mutationFn: async (otherId: string) => {
      await Api.delete(`/other/${otherId}`);
    },
  });
};

export const useOther = () => {
  return useQuery({
    queryKey: [OTHER_QUERY_KEY],
    queryFn: fetchOther,
  });
};
