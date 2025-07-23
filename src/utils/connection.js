import Cookies from "js-cookie";

export const apiConfig = {
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL,
};

export const tokenTitle = "Super_Admin_Token";
export const userTitle = "User_Data";

export const token = () => Cookies.get(tokenTitle);

export const setToken = (token = "") => {
  Cookies.set(tokenTitle, token);
};

export const removeToken = () => {
  Cookies.remove(tokenTitle);
};

export const userData = () => {
  const data = Cookies.get(userTitle);
  return data ? JSON.parse(data) : null;
};

export const setUserData = (data = null) => {
  if (data) {
    Cookies.set(userTitle, JSON.stringify(data));
  } else {
    Cookies.remove(userTitle);
  }
};

export const removeUserData = () => {
  Cookies.remove(userTitle);
};
