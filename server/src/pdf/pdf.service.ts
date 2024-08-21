import { Injectable, Logger } from '@nestjs/common';
import { PDFDocument, rgb } from 'pdf-lib';
import axios from 'axios';
import * as url from 'url';
import { formatInvoicePdf, embedFile } from '../utils/pdfUtils';

@Injectable()
export class PdfService {
  async generateInvoicePdf(invoice: any): Promise<Buffer> {
    const logger = new Logger('PdfService');

    try {
      // Fetch the file
      const fileResponse = await axios.get(invoice.imageUrl, {
        responseType: 'arraybuffer',
      });
      const fileBytes = fileResponse.data;

      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const pageSize: [number, number] = [600, 800]; // Define a consistent page size as a tuple

      // Parse the URL to get the file extension
      const parsedUrl = url.parse(invoice.imageUrl);
      const pathname = parsedUrl.pathname || '';
      const extension = pathname.split('.').pop()?.toLowerCase();

      // Embed the file into the PDF document
      await embedFile(
        pdfDoc,
        fileBytes,
        extension,
        pageSize,
        logger,
        invoice.imageUrl,
      );

      // Format the invoice PDF
      await formatInvoicePdf(pdfDoc, invoice);

      // Serialize the PDF document to bytes
      const pdfBytes = await pdfDoc.save();

      return Buffer.from(pdfBytes);
    } catch (error) {
      logger.error('Error generating PDF', error.stack);
      throw new Error('Failed to generate PDF');
    }
  }
}
