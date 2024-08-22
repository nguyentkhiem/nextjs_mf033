"use client";
import { ACCESS_TOKEN } from "@/constants/variables";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export function useAuth() {
  const [auth, setAuth] = useState<string | null>("");
  let authenticated: string | null = "";

  if (typeof window !== "undefined")
    authenticated = Cookie.get(ACCESS_TOKEN) || "";

  useEffect(() => {
    setAuth(authenticated);
  }, [authenticated]);

  return auth;
}
