"use server";
import { cookies } from "next/headers";

export const getCookie = async (name: string, defaultVal: string = "") => {
  let cookie = cookies().get(name);
  return cookie?.value ? cookie.value : defaultVal;
};

export const setCookie = async (name: string, value: string) => {
  cookies().set(name, value, {
    path: "/",
  });
};
