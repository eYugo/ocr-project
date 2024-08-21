"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { login } from "../../services/api-auth";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import AppLogo from "@/app/ui/app-logo";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("accessToken", data.result.token);
      //   localStorage.setItem('refreshToken', data.refreshToken);
      router.push("/invoices");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <AppLogo />
      <div className="mt-4 flex flex-col gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        <p
          className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
        >
          Please log in to continue.<br></br>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="rounded-lg border border-gray-300 p-2"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="rounded-lg border border-gray-300 p-2"
          />
          <button
            type="submit"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </button>
        </form>
        <div className="flex items-center gap-2">
          <p>Don't have an account?</p>
          <Link href="/auth/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
