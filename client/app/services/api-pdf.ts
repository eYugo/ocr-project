import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function generateInvoicePdf(
  invoiceId: string,
  token: string
): Promise<Blob> {
  try {
    const response = await api.get(`/pdf/invoice?id=${invoiceId}`, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}
