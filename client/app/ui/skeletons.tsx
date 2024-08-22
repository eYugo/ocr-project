// Components for loading skeleton animations

// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function InvoiceDetailsSkeleton() {
  return (
    <div
      className={` ${shimmer} flex flex-col md:flex-row items-center justify-between gap-4 md:mt-8`}
    >
      <div className="p-4 bg-white rounded-lg shadow-md w-full md:w-1/2">
        <div className="flex justify-between items-center mt-2">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="flex gap-2">
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-lg shadow-md w-full md:w-1/2">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-20 bg-gray-200 rounded"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
      </td>
      <td className="whitespace-nowrap px-3 py-3">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
      </td>
    </tr>
  );
}

function InvoicesMobileSkeleton() {
  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-16 bg-gray-200 rounded"></div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div className={`${shimmer} mt-6 flow-root `}>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
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
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
