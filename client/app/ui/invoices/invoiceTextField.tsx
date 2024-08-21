interface InvoiceTextFieldProps {
  fieldData: any;
}

const invoiceTextField = ({ fieldData }: InvoiceTextFieldProps) => {
  return (
    <>
      <p className="text-sm text-gray-500 mt-5 mb-2">
        <strong>Receiver: </strong>
        {fieldData?.receiverName || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Amount: </strong>
        {fieldData?.totalAmount || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Subtotal: {fieldData?.subtotal || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Tax: {fieldData?.tax || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Invoice Date: </strong>
        {fieldData?.invoiceDate || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Due Date: {fieldData?.dueDate || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        <strong>Vendor: </strong>
        {fieldData?.vendorName || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Vendor Address: {fieldData?.vendorAddress || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Vendor Phone: {fieldData?.vendorPhone || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Vendor URL: {fieldData?.vendorURL || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Invoice File ID: {fieldData?.invoiceFileID || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        PO Number: {fieldData?.poNumber || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mb-2">
        Note: {fieldData?.note || "N/A"}
      </p>
      <p className="text-sm text-gray-500 mt-4 font-semibold">Line Items:</p>
      <table className="w-full mt-2.5">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="py-1">Description</th>
            <th className="py-1">Quantity</th>
            <th className="py-1">Unit Price</th>
            <th className="py-1">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {fieldData?.lineItems?.map((item: any) => (
            <tr key={item.id} className="text-sm text-gray-500">
              <td className="py-1">{item.description}</td>
              <td className="py-1">{item.quantity}</td>
              <td className="py-1">{item.unitPrice}</td>
              <td className="py-1">{item.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default invoiceTextField;
