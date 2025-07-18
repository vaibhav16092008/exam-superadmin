import axios from "axios";
import { apiConfig, token } from "@/utils/connection";

const apiInstance = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: 10000,
  headers: {
    Authorization: token(),
    "Content-Type": "Application/json",
  },
});

const apiInstanceWA = axios.create({
  baseURL: apiConfig.baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "Application/json",
  },
});

export const postCall = async (url = "", data = "") => {
  try {
    const response = await apiInstance.post(url, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const putCall = async (url = "", data = "") => {
  try {
    const response = await apiInstance.put(url, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCall = async (url = "") => {
  try {
    const response = await apiInstance.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteCall = async (url = "") => {
  try {
    const response = await apiInstance.delete(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const postCallWA = async (url = "", data = "") => {
  try {
    const response = await apiInstanceWA.post(url, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const putCallWA = async (url = "", data = "") => {
  try {
    const response = await apiInstanceWA.put(url, data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCallWA = async (url = "") => {
  try {
    const response = await apiInstanceWA.get(url);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteCallWA = async (url = "") => {
  try {
    const response = await apiInstanceWA.delete(url);
    return response;
  } catch (error) {
    return error.response;
  }
};
