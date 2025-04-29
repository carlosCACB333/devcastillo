"use server";
import { cookies } from "next/headers";

export const getCookie = async (name: string, defaultVal: string = "") => {
  const cookieStore = await cookies();
  let cookie = cookieStore.get(name);
  return cookie?.value ? cookie.value : defaultVal;
};

export const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    path: "/",
  });
};
