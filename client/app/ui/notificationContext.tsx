"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import Notification from "./notification";

interface NotificationContextProps {
  showNotification: (message: string, type: "info" | "error") => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: "info" | "error";
  } | null>(null);

  const showNotification = (message: string, type: "info" | "error") => {
    setNotification({ message, type });
  };

  const handleClose = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleClose}
        />
      )}
    </NotificationContext.Provider>
  );
};
