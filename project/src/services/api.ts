import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Token from './token';
import { processErrorHandle } from './process-error-handle';
import { AUTH_TOKEN_KEY_NAME } from 'src/services/token';

class StatusCode {
  static ALL_GOOD = 200;

  static ALLOWED_STATUSED = [StatusCode.ALL_GOOD];

  static isError(statisCode: number) {
    return !StatusCode.ALLOWED_STATUSED.includes(statisCode);
  }
}

const shouldDisplayError = (response: AxiosResponse) => StatusCode.isError(response.status);

const BACKEND_URL = 'https://10.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = Token.get(AUTH_TOKEN_KEY_NAME);

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        processErrorHandle(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
