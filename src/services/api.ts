import Cookie from "js-cookie";
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
} from "axios";
import { ACCESS_TOKEN, ACCESS_TOKEN_ADMIN } from "@/constants/variables";
import Cookies from "js-cookie";

import Router from "next/router";

const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
  },
});
const adminApiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    "Content-Type": "application/json",
  },
});

apiConfig.interceptors.request.use(
  (config) => {
    const token = Cookie.get(ACCESS_TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handle 401 , 500 ...
apiConfig.interceptors.response.use(
  (res: AxiosResponse) => {
    const status: number = res.status;
    if (status === HttpStatusCode.Unauthorized) console.log("unauthorized");
    if (status === HttpStatusCode.InternalServerError)
      console.log("server error");
    return res;
  },
  (error) => {
    if (
      error.response &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      // Check if we are on the client side before redirecting
      if (typeof window !== "undefined") {
        console.log("window.location.pathname", window.location.pathname);

        if (window.location.pathname === "/analysis-results/") {
        } else {
          Cookies.remove(ACCESS_TOKEN);
          console.log("Unauthorized error. Redirecting to /auth/login");
          window.location.href = "/auth/login?redirect=" + window.location.href;
        }
      }
    }
    return Promise.reject(error);
  }
);

adminApiConfig.interceptors.request.use(
  (config) => {
    const token = Cookie.get(ACCESS_TOKEN_ADMIN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handle 401 , 500 ...
adminApiConfig.interceptors.response.use(
  (res: AxiosResponse) => {
    const status: number = res.status;
    if (status === HttpStatusCode.Unauthorized) console.log("unauthorized");
    if (status === HttpStatusCode.InternalServerError)
      console.log("server error");
    return res;
  },
  (error) => {
    if (
      error.response &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      // Check if we are on the client side before redirecting
      if (typeof window !== "undefined") {
        Cookies.remove(ACCESS_TOKEN_ADMIN);
        window.location.href = "/admin/sign-in";
        window.location.href =
          "/admin/sign-in?redirect=" + window.location.href;
      }
    }
    return Promise.reject(error);
  }
);

const apiServices = {
  post(urlApi: string, params?: any, config?: any) {
    return apiConfig.post(urlApi, params, config);
  },
  put(urlApi: string, params?: any) {
    return apiConfig.put(urlApi, params);
  },
  patch(urlApi: string, params?: any) {
    return apiConfig.patch(urlApi, params);
  },
  get(urlApi: string, params?: any) {
    return apiConfig.get(urlApi, { params });
  },
  getBlob(urlApi: string, params?: any) {
    return apiConfig.get(urlApi, { params, responseType: "blob" });
  },
  delete(urlApi: string, params?: any) {
    return apiConfig.delete(urlApi, { data: params });
  },
};
const apiServicesAdmin = {
  post(urlApi: string, params?: any) {
    return adminApiConfig.post(urlApi, params);
  },
  put(urlApi: string, params?: any) {
    return adminApiConfig.put(urlApi, params);
  },
  patch(urlApi: string, params?: any) {
    return adminApiConfig.patch(urlApi, params);
  },
  get(urlApi: string, params?: any) {
    return adminApiConfig.get(urlApi, { params });
  },
  delete(urlApi: string, params?: any) {
    return adminApiConfig.delete(urlApi, { data: params });
  },
};

const apiServicesGCP = {
  post(urlApi: string, params?: any) {
    return axios.post(urlApi, params);
  },
  put(urlApi: string, params?: any, config?: AxiosRequestConfig<any>) {
    return axios.put(urlApi, params, config);
  },
  patch(urlApi: string, params?: any) {
    return axios.patch(urlApi, params);
  },
  get(urlApi: string, params?: any) {
    return axios.get(urlApi, { params });
  },
  delete(urlApi: string, params?: any) {
    return axios.delete(urlApi, { data: params });
  },
};

export { apiServices, apiServicesAdmin, apiServicesGCP };
