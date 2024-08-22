"use client";

import { useState } from "react";
import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import AppLogo from "@/app/ui/app-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import SignoutModal from "@/app/ui/signoutModal";
import { useLogout } from "@/app/auth/logout/logout";

export default function SideNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logout = useLogout();

  const handleSignOutClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmSignOut = () => {
    setIsModalOpen(false);
    logout();
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-500 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AppLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={handleSignOutClick}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
      <SignoutModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSignOut}
        title="Confirm Sign Out"
      >
        Are you sure you want to sign out?
      </SignoutModal>
    </div>
  );
}
