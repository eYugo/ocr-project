"use client";

import { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "info" | "error";
  onClose: () => void;
}

const Notification = ({ message, type, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 left-1/2 z-50 p-4 rounded-md shadow-lg ${
        type === "info" ? "bg-blue-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
