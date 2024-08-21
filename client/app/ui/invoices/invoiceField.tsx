import React from "react";
import InvoiceFormField from "./invoiceFormField";
import InvoiceTextField from "./invoiceTextField";
import InvoiceQueryField from "./invoiceQueryField";

interface InvoiceFormProps {
  accessToken: string;
  isQuerying: boolean;
  isEditing: boolean;
  fieldData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLineItemChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const InvoiceField = ({
  accessToken,
  isQuerying,
  isEditing,
  fieldData,
  handleInputChange,
  handleLineItemChange,
}: InvoiceFormProps) => {
  return (
    <>
      {isEditing ? (
        <>
          <InvoiceFormField
            fieldData={fieldData}
            handleInputChange={handleInputChange}
            handleLineItemChange={handleLineItemChange}
          />
        </>
      ) : isQuerying ? (
        <>
          <InvoiceQueryField id={fieldData.id} accessToken={accessToken} />
        </>
      ) : (
        <>
          <InvoiceTextField fieldData={fieldData} />
        </>
      )}
    </>
  );
};

export default InvoiceField;
