import { useMutation } from "@tanstack/react-query";
import { Api } from "../../@api/axios";

export const usePresignedUrl = () =>  useMutation({
    mutationFn: async (fileName: string) => {
        const response = await Api.post('/presigned-url', {
            fileName
        });
        return response.data;
    },
    
  });

