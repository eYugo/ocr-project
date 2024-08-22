"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { getInvoiceById, updateInvoice } from "../../services/api-invoices";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  DeleteInvoiceButton,
  DownloadInvoiceButton,
  QueryInvoiceButton,
  UpdateInvoiceButton,
} from "./buttons";
import InvoiceField from "./invoiceField";
import InvoiceImageModal from "./invoiceImageModal";
import { InvoiceDetailsSkeleton } from "../skeletons";
import { useNotification } from "../notificationContext";

export default function InvoiceDetails({}: {}) {
  const router = useRouter();
  const { id } = useParams();
  const invoiceId = Array.isArray(id) ? id[0] : id;
  const [invoice, setInvoice] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [fieldData, setFieldData] = useState<any>({});
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [isPdf, setIsPdf] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchInvoice = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("No access token found, redirecting to login...");
        router.push("/auth/login");
        return;
      }
      setAccessToken(accessToken);
      const invoiceData = await getInvoiceById(invoiceId, accessToken);
      setInvoice(invoiceData);
      setFieldData(invoiceData);

      // Extract file extension before query parameters and check if the invoice is a PDF
      const url = new URL(invoiceData.imageUrl);
      const pathname = url.pathname;
      const extension = pathname.split(".").pop();
      setIsPdf(extension === "pdf");
      console.log("Is PDF: ", extension === "pdf");
    };
    fetchInvoice();
  }, [router]);

  if (!invoice) {
    return <InvoiceDetailsSkeleton />;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFieldData(invoice);
  };

  const handleQuery = () => {
    setIsQuerying(true);
  };

  const handleGoBack = () => {
    setIsQuerying(false);
  };

  const handleInfo = () => {
    showNotification("Invoice was updated!", "info");
  };

  const handleError = (error: any) => {
    showNotification(`Something went wrong ${error}`, "error");
  };

  const handleSave = async () => {
    try {
      await updateInvoice(fieldData, accessToken);
      handleInfo();
    } catch (error) {
      console.error("Error saving invoice:", error);
      handleError(error);
    } finally {
      setInvoice(fieldData);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFieldData({ ...fieldData, [name]: value });
  };

  const handleLineItemChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const updatedLineItems = [...fieldData.lineItems];
    updatedLineItems[index] = { ...updatedLineItems[index], [name]: value };
    setFieldData({ ...fieldData, lineItems: updatedLineItems });
  };

  const handleOpenInNewTab = () => {
    if (invoice?.imageUrl) {
      window.open(invoice.imageUrl, "_blank");
    }
  };

  return (
    <div className=" flex flex-col md:flex-row items-center justify-between gap-4 md:mt-8">
      <div className="p-4 bg-white rounded-lg shadow-md w-full md:w-1/2">
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-semibold text-gray-700">Invoice Details</p>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  className="bg-blue-500 text-white text-sm px-3.5 rounded-md hover:bg-blue-600"
                >
                  Edit
                </Button>
                <Button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white text-sm px-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </Button>
              </>
            ) : isQuerying ? (
              <Button
                onClick={handleGoBack}
                className="bg-gray-500 text-white text-sm px-2 rounded-md hover:bg-gray-600"
              >
                Go back
              </Button>
            ) : (
              <>
                <DownloadInvoiceButton
                  id={invoice?.id}
                  accessToken={accessToken}
                />
                <QueryInvoiceButton onClick={handleQuery} />
                <UpdateInvoiceButton onClick={handleEdit} />
                <DeleteInvoiceButton
                  id={invoice?.id}
                  accessToken={accessToken}
                />
              </>
            )}
          </div>
        </div>
        <InvoiceField
          accessToken={accessToken}
          isEditing={isEditing}
          isQuerying={isQuerying}
          fieldData={fieldData}
          handleInputChange={handleInputChange}
          handleLineItemChange={handleLineItemChange}
        />
      </div>
      {invoice?.imageUrl &&
        (isPdf ? (
          <div className="fixed right-40 top-1/2 transform -translate-y-1/2 flex items-center justify-center">
            <button
              onClick={handleOpenInNewTab}
              className="flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <span className="hidden md:block">Open Invoice PDF</span>
            </button>
          </div>
        ) : (
          <InvoiceImageModal
            imageUrl={invoice.imageUrl}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
        ))}
    </div>
  );
}
