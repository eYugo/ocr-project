import React from "react";
import { Modal, ModalContent } from "@nextui-org/react";

interface InvoiceImageModalProps {
  imageUrl: string;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const InvoiceImageModal = ({
  imageUrl,
  isOpen,
  onOpen,
  onOpenChange,
}: InvoiceImageModalProps) => {
  return (
    <>
      <img
        src={imageUrl}
        alt="Invoice Image"
        className="mt-4 md:mt-0 w-96 h-96 object-contain cursor-pointer rounded-lg shadow-md border-gray-300"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-full max-w-lg">
          <div className="flex justify-center items-center p-4">
            <img
              src={imageUrl}
              alt="Invoice Image"
              className="max-w-full max-h-full rounded-lg shadow-md  border-gray-300 object-contain"
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvoiceImageModal;
