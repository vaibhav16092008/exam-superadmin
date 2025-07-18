import Cookies from "js-cookie";

export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
};

export const tokenTitle = "Super_Admin_Token";

export const token = () => Cookies.get(tokenTitle);

export const setToken = (token = "") => {
  Cookies.set(tokenTitle, token);
};

export const removeToken = () => {
  Cookies.remove(token);
};
