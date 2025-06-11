import { useMutation, useQuery } from "@tanstack/react-query";

import { Api, ApiNoAuth } from "../../@api/axios";

export const GUIDES_QUERY_KEY = "guides";
export const GUIDE_BY_ID_QUERY_KEY = "guideById";

export const useGuides = () => {
  return useQuery({
    queryKey: [GUIDES_QUERY_KEY],
    queryFn: async () => {
      const { data } = await ApiNoAuth.get<{ guides: GuidesApiTypes.Guide[] }>(
        "/guides",
      );
      return data?.guides;
    },
  });
};

export const useGuideById = (guideId: string) => {
  return useQuery({
    queryKey: [GUIDE_BY_ID_QUERY_KEY, guideId],
    queryFn: async () => {
      const { data } = await ApiNoAuth.get<{ guide: GuidesApiTypes.Guide }>(
        `/guides/${guideId}`,
      );
      return data?.guide;
    },
  });
};

export const useCreateGuide = () => {
  return useMutation({
    mutationFn: async (guide: GuidesApiTypes.GuideCreate) => {
      const { data } = await Api.post<{ guide: GuidesApiTypes.Guide }>(
        "/guides",
        guide,
      );
      return data?.guide;
    },
  });
};

export const useUpdateGuide = () => {
  return useMutation({
    mutationFn: async (guide: GuidesApiTypes.GuideCreate) => {
      const { data } = await Api.put<{ guide: GuidesApiTypes.Guide }>(
        `/guides/${guide.id}`,
        guide,
      );
      return data?.guide;
    },
  });
};
