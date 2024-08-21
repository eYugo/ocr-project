import React, { useState } from "react";
import { queryInvoice } from "../../services/api-invoices";

interface InvoiceQueryFieldProps {
  id: string;
  accessToken: string;
}

const InvoiceQueryField = ({ id, accessToken }: InvoiceQueryFieldProps) => {
  const [query, setQuery] = useState<{ Text: string }>({ Text: "" });
  const [response, setResponse] = useState<any>();
  const handleSearch = async () => {
    const apiResponse = await queryInvoice(id, query, accessToken);
    console.log("Query response: ", apiResponse);
    setResponse(apiResponse);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery({ Text: event.target.value });
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <p className="text-gray-500 mb-4">
          Enter a query to search within this invoice
        </p>
        <input
          type="text"
          name="query"
          value={query.Text}
          onChange={handleInputChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
          placeholder="Enter your query"
        />
        <button
          onClick={handleSearch}
          className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full max-w-md"
        >
          Search
        </button>
        {response ? (
          <>
            <p className="text-gray-500 mb-4 font-semibold">Answer:</p>
            <div className="p-4 bg-gray-100 border border-gray-300 rounded w-full max-w-md">
              {JSON.stringify(response.Answer)}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default InvoiceQueryField;
