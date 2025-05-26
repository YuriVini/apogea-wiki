/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from "axios";
import { USER_TOKEN, USER_TOKEN_REFRESH } from "./storage";

export interface HttpResponse<Data = any, MetaData = any> {
  data: Data;
  status: string;
  meta?: MetaData;
  reason?: string;
  message?: string;
  statusCode: number;
}

export const getEnvironment = () => {
  return {
    envName: "DEVELOPMENT",
    API_URL: "http://localhost:3000",
  };
};

export const createInstanceNoAuth = () => {
  return axios.create({
  timeout: 30000,
  baseURL: getEnvironment().API_URL,
  headers: { "Content-Type": "application/json" },
});
};

export class ApiNoAuth {
  static clientApiNoAuth: AxiosInstance = createInstanceNoAuth();

  static async get<Data = any, MetaData = any>(
    path: string,
    params?: any
  ): Promise<HttpResponse<Data, MetaData>> {
    const response = await this.clientApiNoAuth
      .get(path, { params })
      .then((res: { data: any }) => res.data)
      .catch((err: { response: { data: any } }) => {
        const data = err?.response;
        throw data || "Ocorreu um erro ao processar a solicitação";
      });

    return {
      data: response,
      meta: response?.meta,
      reason: response?.reason,
      statusCode: response?.statusCode || 500,
      status: response?.status || "Server Error",
      message: response?.message || "Ocorreu um erro ao processar a solicitação",
    };
  }

  static getConfigs(body: any) {
    if (body instanceof FormData) {
      return {
        transformRequest: (formData: any) => formData,
        headers: { "Content-Type": "multipart/form-data" },
      };
    }
  }

  static async post<Data = any, MetaData = any>(
    path: string,
    body: any = {},
    params?: any
  ): Promise<HttpResponse<Data, MetaData>> {
    const response = await this.clientApiNoAuth
      .post(path, body, { ...(Api.getConfigs(body) || {}), params })
      .then((res: { data: any }) => res.data)
      .catch((err: { response: { data: any } }) => {
        const data = err;
        throw data.response;
      });

    return {
      data: response,
      meta: response?.meta,
      reason: response?.reason,
      statusCode: response?.statusCode || 500,
      status: response?.status || "Server Error",
      message: response?.message || "Ocorreu um erro ao processar a solicitação",
    };
  }
}

const refreshToken = async (refreshToken: string) =>
  ApiNoAuth.post<GlobalApiTypes.RefreshTokenResponse>("token/refresh/", {
    refresh: refreshToken,
  });

export const createInstance = () => {
  const client = axios.create({
    timeout: 30000,
    baseURL: getEnvironment().API_URL,
    headers: { "Content-Type": "application/json" },
  });

  client.interceptors.request.use(
    async (config) => {
      const newInstance = config;

      try {
        const token = localStorage.getItem(USER_TOKEN);

        if (token && newInstance.headers) {
          newInstance.headers.Authorization = `Bearer ${token}`;
        } else {
          localStorage.removeItem(USER_TOKEN);

          throw new Error("No credentials");
        }
      } catch {
        throw new Error("No credentials");
      }

      return newInstance;
    },
    (error: any) => {
      return error;
    }
  );

  client.interceptors.response.use(
    async (response: any) => response,
    async (err: {
      code: string;
      response: {
        status: number;
        config: { isRetryRequest: boolean; headers: { Authorization: string } };
      };
    }) => {
      const tokenRefresh = localStorage.getItem(USER_TOKEN_REFRESH);

      if (err.code === "ECONNABORTED") {
        const newClient = createInstance();
        return newClient(err.response.config);
      }

      if (
        err &&
        err.response?.status === 401 &&
        !err.response.config.isRetryRequest &&
        !!tokenRefresh
      ) {
        err.response.config.isRetryRequest = true;

        localStorage.removeItem(USER_TOKEN_REFRESH);

        try {
          const { data } = await refreshToken(tokenRefresh);

          const accessToken = data?.access;
          if (accessToken) {
            localStorage.setItem(USER_TOKEN, accessToken);
            localStorage.setItem(USER_TOKEN_REFRESH, data?.refresh);
            err.response.config.isRetryRequest = true;
            err.response.config.headers.Authorization = `Bearer ${accessToken}`;
            return await Api.clientApi(err.response.config);
          } else {
            localStorage.removeItem(USER_TOKEN);
            localStorage.removeItem(USER_TOKEN_REFRESH);

            throw new Error("Necessário realizar login novamente");
          }
        } catch (error: any) {
          err.response.config.isRetryRequest = false;
          localStorage.removeItem(USER_TOKEN);
          localStorage.removeItem(USER_TOKEN_REFRESH);

          throw new Error(`${error}`);
        }
      }

      if (err && (err.response?.status === 504 || err.response?.status === 500)) {
        return new Error("Ocorreu um erro interno mas o suporte técnico já foi acionado!");
      }

      return await Promise.reject(err);
    }
  );

  return client;
};

export class Api {
  static clientApi: AxiosInstance = createInstance();

  static async delete(path: string): Promise<HttpResponse> {
    const response = await this.clientApi
      .delete(path)
      .then((res: { data: any }) => res.data)
      .catch((err: { response: { data: any } }) => {
        const data = err?.response?.data;
        const message =
          data?.reason || data?.message || "Ocorreu um erro ao processar a solicitação";
        throw new Error(message);
      });

    return {
      data: response,
      meta: response?.meta,
      reason: response?.reason,
      statusCode: response?.statusCode || 500,
      status: response?.status || "Server Error",
      message: response?.message || "Ocorreu um erro ao processar a solicitação",
    };
  }

  static async get<Data = any, MetaData = any>(
    path: string,
    params?: any
  ): Promise<HttpResponse<Data, MetaData>> {
    const response = await this.clientApi
      .get(path, { params })
      .then((res: { data: any }) => res.data)
      .catch((err: { response: { data: any } }) => {
        const data = err?.response;
        throw data || "Ocorreu um erro ao processar a solicitação";
      });

    return {
      data: response,
      meta: response?.meta,
      reason: response?.reason,
      statusCode: response?.statusCode || 500,
      status: response?.status || "Server Error",
      message: response?.message || "Ocorreu um erro ao processar a solicitação",
    };
  }

  static getConfigs(body: any) {
    if (body instanceof FormData) {
      return {
        transformRequest: (formData: any) => formData,
        headers: { "Content-Type": "multipart/form-data" },
      };
    }
  }

  static async patch<Data = any, MetaData = any>(
    path: string,
    body: any = {}
  ): Promise<HttpResponse<Data, MetaData>> {
    const response = await this.clientApi
      .patch(path, body, Api.getConfigs(body))
      .then((res: { data: any }) => res.data)
      .catch((err: { response: { data: any } }) => {
        const data = err?.response?.data;
        throw data || "Ocorreu um erro ao processar a solicitação";
      });

    return {
      data: response,
      meta: response?.meta,
      reason: response?.reason,
      statusCode: response?.statusCode || 500,
      status: response?.status || "Server Error",
      message: response?.message || "Ocorreu um erro ao processar a solicitação",
    };
  }

  static async post<Data = any, MetaData = any>(
    path: string,
    body: any = {},
    params?: any
  ): Promise<HttpResponse<Data, MetaData>> {
    const response = await this.clientApi
      .post(path, body, { ...(Api.getConfigs(body) || {}), params })
      .then((res: { data: any }) => res.data)
      .catch((err: { response: { data: any } }) => {
        const data = err;
        throw data.response;
      });

    return {
      data: response,
      meta: response?.meta,
      reason: response?.reason,
      statusCode: response?.statusCode || 500,
      status: response?.status || "Server Error",
      message: response?.message || "Ocorreu um erro ao processar a solicitação",
    };
  }

  static async put<Data = any, MetaData = any>(
    path: string,
    body: any = {}
  ): Promise<HttpResponse<Data, MetaData>> {
    const response = await this.clientApi
      .put(path, body, Api.getConfigs(body))
      .then((res: { data: any }) => res.data)
      .catch((err: { response: { data: any } }) => {
        const data = err?.response?.data;
        const message =
          data?.reason || data?.message || "Ocorreu um erro ao processar a solicitação";
        throw new Error(message);
      });

    return {
      data: response?.data,
      meta: response?.meta,
      reason: response?.reason,
      statusCode: response?.statusCode || 500,
      status: response?.status || "Server Error",
      message: response?.message || "Ocorreu um erro ao processar a solicitação",
    };
  }
}
