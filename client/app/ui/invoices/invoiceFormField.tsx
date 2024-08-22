interface InvoiceFormFieldProps {
  fieldData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLineItemChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const invoiceFormField = ({
  fieldData,
  handleInputChange,
  handleLineItemChange,
}: InvoiceFormFieldProps) => {
  return (
    <>
      <div className="mt-5 flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          <strong>Receiver: </strong>
        </label>
        <input
          type="text"
          name="receiverName"
          value={fieldData.receiverName || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>

      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          <strong>Total Amount: </strong>
        </label>
        <input
          type="text"
          name="totalAmount"
          value={fieldData.totalAmount || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">Subtotal:</label>
        <input
          type="text"
          name="subtotal"
          value={fieldData.subtotal || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">Tax:</label>
        <input
          type="text"
          name="tax"
          value={fieldData.tax || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          <strong>Invoice Date: </strong>
        </label>
        <input
          type="text"
          name="invoiceDate"
          value={fieldData.invoiceDate || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">Due Date:</label>
        <input
          type="text"
          name="dueDate"
          value={fieldData.dueDate || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          <strong>Vendor: </strong>
        </label>
        <input
          type="text"
          name="vendorName"
          value={fieldData.vendorName || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          Vendor Address:
        </label>
        <input
          type="text"
          name="vendorAddress"
          value={fieldData.vendorAddress || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          Vendor Phone:
        </label>
        <input
          type="text"
          name="vendorPhone"
          value={fieldData.vendorPhone || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          Vendor URL:
        </label>
        <input
          type="text"
          name="vendorURL"
          value={fieldData.vendorURL || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>
      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          Invoice File ID:
        </label>
        <input
          type="text"
          name="invoiceFileID"
          value={fieldData.invoiceFileID || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>

      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">
          PO Number:
        </label>
        <input
          type="text"
          name="poNumber"
          value={fieldData.poNumber || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>

      <div className="flex items-center mb-2">
        <label className="text-sm text-gray-500 flex-shrink-0">Note:</label>
        <input
          type="text"
          name="note"
          value={fieldData.note || ""}
          onChange={handleInputChange}
          className="text-sm text-gray-500 ml-2 border border-gray-300 rounded-md flex-grow"
        />
      </div>

      <p className="text-sm text-gray-500 mt-4 font-semibold">Line Items:</p>
      <table className="w-full mt-2">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="py-1">Description</th>
            <th className="py-1">Quantity</th>
            <th className="py-1">Unit Price</th>
            <th className="py-1">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {fieldData?.lineItems?.map((item: any, index: number) => (
            <tr key={item.id} className="text-sm text-gray-500">
              <td className="py-1">
                <input
                  type="text"
                  name="description"
                  value={item.description}
                  onChange={(e) => handleLineItemChange(index, e)}
                  className="text-sm text-gray-500 border border-gray-300 rounded-md w-full"
                />
              </td>
              <td className="py-1">
                <input
                  type="text"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleLineItemChange(index, e)}
                  className="text-sm text-gray-500 border border-gray-300 rounded-md w-full"
                />
              </td>
              <td className="py-1">
                <input
                  type="text"
                  name="unitPrice"
                  value={item.unitPrice}
                  onChange={(e) => handleLineItemChange(index, e)}
                  className="text-sm text-gray-500 border border-gray-300 rounded-md w-full"
                />
              </td>
              <td className="py-1">
                <input
                  type="text"
                  name="totalPrice"
                  value={item.totalPrice}
                  onChange={(e) => handleLineItemChange(index, e)}
                  className="text-sm text-gray-500 border border-gray-300 rounded-md w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default invoiceFormField;
