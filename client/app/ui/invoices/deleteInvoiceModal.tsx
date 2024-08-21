import React from "react";
import { Modal, useDisclosure } from "@nextui-org/react";

interface DeleteInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

function DeleteInvoiceModal({
  isOpen,
  onClose,
  handleDelete,
}: DeleteInvoiceModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <header className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">
              Delete Invoice
            </h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              X
            </button>
          </header>

          <main className="my-4">
            <p className="text-gray-500">
              Are you sure you want to delete this invoice?
            </p>
          </main>

          <footer className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
              onClick={handleDelete}
            >
              Confirm
            </button>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteInvoiceModal;
