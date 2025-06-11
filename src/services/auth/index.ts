import { useMutation } from "@tanstack/react-query";
import { ApiNoAuth } from "../../@api/axios";

export const useLogin = () => {
  return useMutation<
    { token: string },
    GlobalApiTypes.ErrorResponse,
    { email: string; password: string }
  >({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const { data } = await ApiNoAuth.post<{ token: string }>(
        "/login",
        loginData,
      );
      return data;
    },
  });
};

export const useRegister = () => {
  return useMutation<
    { token: string },
    GlobalApiTypes.ErrorResponse,
    { email: string; password: string }
  >({
    mutationFn: async (registerData: { email: string; password: string }) => {
      const { data } = await ApiNoAuth.post<{ token: string }>(
        "/register",
        registerData,
      );
      return data;
    },
  });
};
