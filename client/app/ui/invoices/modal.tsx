// General modal component

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-4 rounded-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={imageUrl}
          alt="Invoice Image"
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
};

export default Modal;
