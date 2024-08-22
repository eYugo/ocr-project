import Table from "@/app/ui/invoices/table";
import { UploadInvoiceButton } from "@/app/ui/invoices/buttons";
import { lusitana } from "@/app/ui/fonts";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
        <UploadInvoiceButton />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8"></div>
      <Table />
    </div>
  );
}
