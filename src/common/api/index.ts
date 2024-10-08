import axios from "axios";

const devUrl = "http://localhost:9000";
const baseUrl = import.meta.env.VITE_BASE_URL || devUrl;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

type Request = {
  url: string;
  data?: Record<string, unknown> | FormData;
  method?: string;
  headers?: Record<string, string>;
};

export const request = (
  { url, data, method, headers }: Request,
  controller?: AbortController,
) => {
  return api({
    method: method ?? "get",
    url,
    data,
    signal: controller?.signal,
    withCredentials: true,
    headers,
  });
};
