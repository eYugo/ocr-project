// Buttons components

"use client";

import { useState } from "react";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { generateInvoicePdf } from "../../services/api-pdf";
import { deleteInvoice } from "../../services/api-invoices";
import DeleteInvoiceModal from "./deleteInvoiceModal";
import { useNotification } from "../notificationContext";

export function UploadInvoiceButton() {
  return (
    <Link
      href="/invoices/upload"
      className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Upload Invoice</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function QueryInvoiceButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <MagnifyingGlassIcon className="w-4 h-4" />
    </button>
  );
}

export function UpdateInvoiceButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-4 h-4" />
    </button>
  );
}

export function DeleteInvoiceButton({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { showNotification } = useNotification();

  const handleInfo = () => {
    showNotification("Invoice was deleted!", "info");
  };

  const handleError = (error: any) => {
    showNotification(`Something went wrong ${error}`, "error");
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteInvoice(id, accessToken);
      console.log(`Deleting invoice with id: ${id}`);
      router.push("/invoices/list");
      handleInfo();
    } catch (error) {
      handleError(error);
      console.error("Error deleting invoice:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="rounded-md border p-2 hover:bg-gray-100"
        onClick={onOpen}
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4 h-4" />
      </button>

      <DeleteInvoiceModal
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleDelete}
        loading={loading}
      />
    </>
  );
}

export function DownloadInvoiceButton({
  id,
  accessToken,
}: {
  id: string;
  accessToken: string;
}) {
  const handleDownload = async () => {
    try {
      const pdfBlob = await generateInvoicePdf(id, accessToken); // Generate the PDF
      const url = window.URL.createObjectURL(new Blob([pdfBlob])); // Create a URL for the PDF
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`); // Specify the file name
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="rounded-md border p-2 hover:bg-gray-100"
      title="Download PDF with invoice details"
    >
      <ArrowDownIcon className="w-4 h-4" />
    </button>
  );
}
