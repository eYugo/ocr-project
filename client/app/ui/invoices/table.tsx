"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { getInvoices } from "../../services/api-invoices";
import { InvoicesTableSkeleton } from "../skeletons";

export default function InvoicesTable({}: {}) {
  const router = useRouter();
  const [invoices, setInvoices] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("No access token found, redirecting to login...");
        router.push("/auth/login");
        return;
      }
      const invoicesData = await getInvoices(accessToken);
      setInvoices(invoicesData);
    };

    fetchInvoices();
  }, [router]);

  if (!invoices) {
    return <InvoicesTableSkeleton />;
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Vendor
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Upload Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  {/* Details */}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">{invoice.id}</div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.vendorName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.totalAmount}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {new Date(invoice.uploadDate).toLocaleDateString("en-GB")}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/invoices/${invoice.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
