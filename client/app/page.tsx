import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import AppLogo from "./ui/app-logo";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AppLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p
            className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            {/* Welcome message */}
            <strong>Welcome to OCR App.</strong>
            <br></br>
            This is a simple app that allows you to upload invoice images and
            extract text from them.
          </p>
          {/* Login link */}
          <Link
            href="/auth/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          {/* Register link */}
          <div className="flex items-center gap-2">
            <p>Don&apos;t have an account yet?</p>
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
