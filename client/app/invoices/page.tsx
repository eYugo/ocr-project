// Invoice home page

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { lusitana } from "../ui/fonts";

export default async function Page() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("No access token found, redirecting to login...");
      router.push("/auth/login");
    } else {
      console.log("Access token found!");
    }
  }, [router]);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <p>Under construction...</p>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
    </main>
  );
}
