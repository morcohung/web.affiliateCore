// TODO: Rename this file from axios-instance.ts to http.ts
import { HttpStatus } from "@/models/httpStatus";
import axios, { AxiosInstance } from "axios";
import { timeout } from "@/constants/request.constant";
import eventBus from "@/utils/event-bus";

const baseRequestData = {
  // authToken: ''
};

const instance: AxiosInstance = axios.create({
  timeout,
});

instance.interceptors.request.use((config) => {
  const httpMethod = config.method?.toUpperCase();
  switch (httpMethod) {
    case "POST":
    case "PUT":
      config.data = config.data || {};
      // Object.assign(config.data, baseRequestData);
      break;
    case "GET":
    default:
      config.params = config.params || {};
      // Object.assign(config.params, baseRequestData);
      break;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    afterLoadingRequest(error.config.url);
    const responseStatus = HttpStatus[error.response?.status];
    if (responseStatus) {
      eventBus.$emit(responseStatus);
    }
    return error;
  }
);

export function setDefaultHeader(key: string, value: string) {
  if (instance.defaults.headers[key]) {
    instance.defaults.headers[key] = value;
  } else {
    instance.defaults.headers[
      key
    ] = `${instance.defaults.headers[key]}, ${value}`;
  } 
}

// export function setAuthToken(token: string) {
//   baseRequestData.authToken = token;
// }

const requestQueue: Array<string> = [];

export async function httpGet(
  url: string,
  config: any = {},
  showLoading = true
) {
  let response: any = undefined;
  try {
    if (showLoading) {
      beforeLoadingRequest(url);
    }
    response = await instance.get(url, config);
  } finally {
    if (showLoading) {
      afterLoadingRequest(url);
    }
  }
  return response;
}

export async function httpPost(
  url: string,
  data: any = {},
  config: any = {},
  showLoading = true
) {
  let response: any = undefined;
  try {
    if (showLoading) {
      beforeLoadingRequest(url);
    }
    response = await instance.post(url, data, config);
  } finally {
    if (showLoading) {
      afterLoadingRequest(url);
    }
  }
  return response;
}

export async function httpPut(
  url: string,
  data: any = {},
  config: any = {},
  showLoading = true
) {
  let response: any = undefined;
  try {
    if (showLoading) {
      beforeLoadingRequest(url);
    }
    response = await instance.put(url, data, config);
  } finally {
    if (showLoading) {
      afterLoadingRequest(url);
    }
  }
  return response;
}

function beforeLoadingRequest(url: string) {
  requestQueue.push(url);
  eventBus.$emit("show-loading-mask");
}

function afterLoadingRequest(url: string) {
  const index = requestQueue.findIndex((x) => x === url);
  requestQueue.splice(index, 1);
  if (requestQueue.length === 0) {
    eventBus.$emit("hide-loading-mask");
  }
}

const axiosInstance = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
};

export default axiosInstance;
