import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import InvoiceDetails from "@/app/ui/invoices/details";

export default async function Page() {
  return (
    <div className="w-full">
      <div className="inline-block">
        <Link
          href="/invoices/list"
          className="flex items-center text-gray-500 hover:text-gray-900 underline"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to invoices
        </Link>
      </div>
      <InvoiceDetails />
    </div>
  );
}
