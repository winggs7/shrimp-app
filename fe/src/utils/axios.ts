import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import jwt_decode from "jwt-decode";
import { JwtPayload } from "../Model/user";
import { AuthApi } from "../Apis/auth.api";

export const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiAxios.interceptors.request.use(async (config: AxiosRequestConfig) => {
  let accessToken = localStorage.getItem("access_token");
  config.timeout = 300000;
  if (accessToken) {
    config.headers = {
      Authorization: "Bearer " + accessToken,
    };
  }
  return config;
});

apiAxios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status !== 401) {
      const errMessage = error.response?.data || error?.response || error;
      return Promise.reject(errMessage);
    }
    try {
      let accessToken = localStorage.getItem("access_token");
      let refreshToken = localStorage.getItem("refresh_token");
      if (accessToken && refreshToken) {
        const decodedToken = jwt_decode<JwtPayload>(accessToken);
        if (decodedToken?.exp * 1000 < new Date().getTime()) {
          accessToken = await AuthApi.refreshToken(refreshToken);
          localStorage.setItem("accessToken", accessToken);
        }
        if (error.config) {
          error.config.headers = {
            Authorization: "Bearer " + accessToken,
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
    const errMessage = error.response?.data || error?.response || error;
    return Promise.reject(errMessage);
  }
);
