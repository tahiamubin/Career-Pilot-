"use server"
import { headers } from "next/headers";
import { auth } from "./auth.";

export const getTokenServer = async () => {
  const res = await auth.api.getToken({
    headers: await headers(),
  });
  return res || { token: null };
};