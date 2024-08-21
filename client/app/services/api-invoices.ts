import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Create a new invoice
export const createInvoice = async (
  file: File,
  token: string
): Promise<any> => {
  try {
    console.log("Creating invoice");
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/invoices", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error generating Invoice:", error);
    throw error;
  }
};

// Get invoices
export const getInvoices = async (token: string): Promise<any[]> => {
  console.log("Getting invoices");
  const response = await api.get("/invoices/all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Get invoice by ID
export const getInvoiceById = async (
  id: string,
  token: string
): Promise<any> => {
  const response = await api.get(`/invoices/?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Update an existing invoice
export const updateInvoice = async (
  invoice: any,
  token: string
): Promise<any> => {
  console.log("Updating invoice");
  const response = await api.put(`/invoices`, invoice, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Delete an invoice by ID
export const deleteInvoice = async (
  id: string,
  token: string
): Promise<any> => {
  const response = await api.delete(`/invoices/?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Send a query to the invoice API
export const queryInvoice = async (
  id: string,
  query: any,
  token: string
): Promise<any> => {
  const response = await api.post(`/invoices/query?id=${id}`, query, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
