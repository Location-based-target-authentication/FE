import { refreshAccessToken } from "@/features/auth/api/auth";
import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  Method
} from "axios";
import { Axios, AxiosError } from "axios";
import { get, isArray } from "es-toolkit/compat";

import { Nullable } from "@/types/common";
import { useAuthStore } from "@/stores/auth-store";
import { ENDPOINT_URL, MEDIUM_REQUEST_TIMEOUT } from "@/config/envs";
import { paths } from "@/config/paths";
import { generateQueryParams } from "@/lib/axios/utils";

interface Interceptor<V> {
  onFulfilled?: Nullable<(value: V) => V | Promise<V>>;
  onRejected?: Nullable<(error: any) => any>;
}

// Axios Initialize
export const config: AxiosRequestConfig = {
  baseURL: ENDPOINT_URL,
  timeout: 300000,
  paramsSerializer: generateQueryParams,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json"
  },
  transformRequest: (data, headers) => {
    if (
      data &&
      headers["Content-Type"]?.toString().includes("application/json")
    ) {
      return JSON.stringify(data || {});
    } else if (
      data &&
      headers["Content-Type"]?.toString().includes("multipart/form-data")
    ) {
      const formData = new FormData();
      for (const key in data) formData.append(key, get(data, key));
      return formData;
    } else return data;
  }
};

export const handleTokenExpiration = async (
  refreshToken: string,
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  try {
    const response = await refreshAccessToken(refreshToken);
    useAuthStore.setState({
      accessToken: response.data.accessToken,
      refreshToken: response.data.refreshToken
    });

    axios.defaults.headers.common["Authorization"] =
      `Bearer ${response.data.accessToken}`;
    return axios.request(config);
  } catch (error) {
    window.location.href = paths.auth.login.path;
    throw new Error("유효하지 않은 토큰입니다.");
  }
};

const requestInterceptor: Interceptor<InternalAxiosRequestConfig> = {
  onFulfilled: (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  onRejected: (error) => error
};

const responseInterceptor: Interceptor<AxiosResponse> = {
  onFulfilled: (config) => {
    if (
      config.data &&
      config.headers["content-type"]?.toString().includes("application/json")
    ) {
      try {
        config.data = JSON.parse(config.data);
      } catch {
        throw new Error("Axios Parse Error");
      }
    }

    if (
      typeof config.data === "string" &&
      config.data.includes("<!doctype html>")
    ) {
      throw new AxiosError("Not Found", "404", undefined, undefined, config);
    }

    if (config.status >= 400) {
      const code = config.data?.code || config.statusText;
      const messageInConfig =
        config.data.message || config.data?.error?.message;

      const message =
        typeof messageInConfig === "string"
          ? messageInConfig
          : isArray(messageInConfig)
            ? messageInConfig.find((v) => v) || config.statusText
            : config.statusText || messageInConfig;

      throw new AxiosError(message, code, undefined, undefined, config);
    }

    return config;
  },
  onRejected: async (error) => {
    const { response, config } = error;
    if (
      response &&
      response.status === 401 &&
      response.data?.error?.code === "TOKEN_EXPIRED" /**확인 필요 */
    ) {
      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        window.location.href = paths.auth.login.path;
        return;
      }

      return handleTokenExpiration(refreshToken, config);
    }

    return Promise.reject(error);
  }
};

const axios = new Axios(config);

axios.interceptors.request.use(
  requestInterceptor.onFulfilled,
  requestInterceptor.onRejected
);
axios.interceptors.response.use(
  responseInterceptor.onFulfilled,
  responseInterceptor.onRejected
);

//
const curringMethod =
  (method: Method) =>
  async ({
    timeout = MEDIUM_REQUEST_TIMEOUT,
    ...requestConfig
  }: Omit<AxiosRequestConfig, "method">) => {
    return axios
      .request({ ...requestConfig, timeout, method })
      .then((response) => response.data);
  };

// Usually use Method
export const GET = curringMethod("get");
export const POST = curringMethod("post");
export const PUT = curringMethod("put");
export const DELETE = curringMethod("delete");
export const OPTIONS = curringMethod("options");
export const PATCH = curringMethod("patch");
