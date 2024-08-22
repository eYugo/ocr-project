// Invoices upload page

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { createInvoice } from "@/app/services/api-invoices";
import LoadingSpinner from "@/app/ui/loadingSpinner";
import { useNotification } from "@/app/ui/notificationContext";

export default function UploadPage() {
  const { showNotification } = useNotification();

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInfo = () => {
    showNotification("Invoice was uploaded!", "info");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setMessage("Please log in to upload a file.");
        return;
      }
      setLoading(true);
      const response = await createInvoice(file, accessToken); // Upload the file
      router.push(`/invoices/${response.id}`); // Redirect to the new invoice details page
      handleInfo();
    } catch (error) {
      if (error instanceof Error) {
        setMessage("Error uploading file: " + error.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Upload
      </h1>

      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-full max-w-lg">
          {/* Upload form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <h1 className="text-xl mb-6 text-center">Upload new invoice</h1>
            <div className="mb-10">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="file"
              >
                File
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
              >
                {loading ? (
                  <>
                    <span>Uploading...</span>
                    <LoadingSpinner />
                  </>
                ) : (
                  <>
                    <span>Upload</span>
                    <ArrowUpIcon className="w-5 md:w-6" />
                  </>
                )}
              </button>
            </div>
          </form>
          {message && (
            <p className="text-center text-red-500 text-xs italic">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}
