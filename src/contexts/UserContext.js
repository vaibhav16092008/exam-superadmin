"use client";
import { removeUserData, setUserData, userData } from "@/utils/connection";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const setUser = (userData) => {
    if (userData) {
      setUserData(userData);
    } else {
      removeUserData();
    }
    setUserState(userData);
  };
  console.log(user?.role);

  useEffect(() => {
    const cookieUser = userData();
    console.log("ff ", cookieUser);

    if (cookieUser) {
      setUserState(cookieUser);
    } else {
      setUserState(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
