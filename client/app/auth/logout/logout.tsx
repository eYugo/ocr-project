"use client";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  // Remove access token from local storage
  const logout = async () => {
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return logout;
};
