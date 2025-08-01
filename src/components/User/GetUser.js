"use client";
import { clearUser, setUser } from "@/redux/slices/userSlice";
import { getCall } from "@/utils/apiCall";
import { token } from "@/utils/connection";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function GetUser({ children }) {
  const tokenValue = token();
  const dispatch = useDispatch();

  const getUserData = useCallback(async () => {
    const response = await getCall("users/get-profile");
    dispatch(setUser(response.data.user));
    if (response.status === 200) {
      dispatch(setUser(response.data.user));
    } else {
      console.error("Failed to get user data:", response.data.message);
      dispatch(clearUser(response.data.user));
    }
  }, []);

  useEffect(() => {
    if (tokenValue) {
      // console.log("token", token);
      getUserData();
    }
  }, [tokenValue]);

  return <div>{children}</div>;
}
