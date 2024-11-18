import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
const API_BASE_URL = "https://para-vpn-api.onrender.com/api/v1" ;
const axiosInstance: AxiosInstance = axios.create({
  timeout: 10000,
});

const getAuthToken = () => {
  return localStorage.getItem("_random");
};

const configureAxios = (baseURL?: string, token?: string) => {
  axiosInstance.defaults.baseURL = baseURL || API_BASE_URL;

  // if (token) {
  //   axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  // } else {
  //   delete axiosInstance.defaults.headers["Authorization"];
  // }
};

type ApiMethod = "POST" | "GET" | "PATCH" | "PUT" | "DELETE";

interface RequestParams<T> {
  method?: ApiMethod;
  baseURL?: string;
  url: string;
  data?: T;
  contentType?: string;
}

const apiClient = async <T>({
  method = "GET",
  baseURL ,
  url,
  data,
  contentType,
}: RequestParams<T>) => {
  try {
    // const token = getAuthToken();
    configureAxios(baseURL,  undefined);

    console.log("BASEURL: ",  API_BASE_URL)
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: {
        "Content-Type": contentType || "application/json",
      },
    };
    const response = await axiosInstance.request(config);
    // console.log(response.data)

    if (response.data.status !== "Success"){
      throw new Error(response.data)
    }


    return response.data;
  } catch (err) {
    if (err && err instanceof AxiosError) {
      if (err.response?.data.message === null || err.response === undefined)
        throw new Error("gateway : " + err.message);
      else throw new Error("gateway : " + err.response?.data.message);
    } else if (err && err instanceof Error)
      throw new Error("gateway : " + err.message);
  }
};

export default apiClient;
