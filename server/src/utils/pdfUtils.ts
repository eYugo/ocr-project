import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function embedFile(
  pdfDoc: PDFDocument,
  fileBytes: Buffer,
  extension: string,
  pageSize: [number, number],
  logger: any,
  imageUrl: string,
) {
  if (extension === 'jpg' || extension === 'jpeg') {
    const image = await pdfDoc.embedJpg(fileBytes);
    const page = pdfDoc.addPage(pageSize);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: pageSize[0],
      height: pageSize[1],
    });
  } else if (extension === 'png') {
    const image = await pdfDoc.embedPng(fileBytes);
    const page = pdfDoc.addPage(pageSize);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: pageSize[0],
      height: pageSize[1],
    });
  } else if (extension === 'pdf') {
    const embeddedPdf = await PDFDocument.load(fileBytes);
    const [embeddedPage] = await pdfDoc.copyPages(embeddedPdf, [0]);
    pdfDoc.addPage(embeddedPage);
  } else {
    logger.error(`Unsupported file format for URL: ${imageUrl}`);
    throw new Error('Unsupported file format');
  }
}

export async function formatInvoicePdf(
  pdfDoc: PDFDocument,
  invoice: any,
): Promise<void> {
  const pageSize: [number, number] = [600, 800]; // Define a consistent page size as a tuple
  let textPage = pdfDoc.addPage(pageSize);
  let currentY = 750; // Start position for the first line of text
  const lineHeight = 20; // Height of each line of text
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  textPage.drawText(`Invoice Details`, {
    x: 50,
    y: currentY,
    size: 20,
    color: rgb(0, 0, 0),
  });

  currentY -= lineHeight * 2; // Move down for the next section

  const details = [
    `Receiver: ${invoice.receiverName?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Amount: ${invoice.totalAmount?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Subtotal: ${invoice.subtotal?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Tax: ${invoice.tax?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Invoice Date: ${invoice.invoiceDate || 'N/A'}`,
    `Due Date: ${invoice.invoiceDate || 'N/A'}`,
    `Vendor: ${invoice.vendorName?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Vendor Address: ${invoice.vendorAddress?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Vendor Phone: ${invoice.vendorPhone?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Vendor URL: ${invoice.vendorURL?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Invoice File ID: ${invoice.invoiceFileID?.replace(/\n/g, ' | ') || 'N/A'}`,
    `PO Number: ${invoice.poNumber?.replace(/\n/g, ' | ') || 'N/A'}`,
    `Note: ${invoice.note?.replace(/\n/g, ' | ') || 'N/A'}`,
  ];

  details.forEach((detail) => {
    textPage.drawText(detail, {
      x: 50,
      y: currentY,
      size: 12,
      color: rgb(0, 0, 0),
    });
    currentY -= lineHeight; // Move down for the next line
  });

  // Add line itemss
  currentY -= lineHeight * 2; // Add some space before line items

  textPage.drawText(`Line Items:`, {
    x: 50,
    y: currentY,
    size: 14,
    color: rgb(0, 0, 0),
    font: font,
  });

  currentY -= lineHeight * 2;

  // Table headers
  const headers = ['Description', 'Quantity', 'Unit Price', 'Total Price'];
  headers.forEach((header, index) => {
    if (index === 0) {
      textPage.drawText(header, {
        x: 50,
        y: currentY,
        size: 12,
        color: rgb(0, 0, 0),
      });
    } else {
      textPage.drawText(header, {
        x: 150 + index * 100,
        y: currentY,
        size: 12,
        color: rgb(0, 0, 0),
      });
    }
  });

  currentY -= lineHeight * 2;

  // Table rows
  invoice.lineItems?.forEach((item: any) => {
    const descriptionHeight = measureTextHeight(
      item.description,
      12,
      200,
      font,
    );
    const quantityHeight = measureTextHeight(
      item.quantity.toString(),
      12,
      100,
      font,
    );
    const unitPriceHeight = measureTextHeight(
      item.unitPrice.toString(),
      12,
      100,
      font,
    );
    const totalPriceHeight = measureTextHeight(
      item.totalPrice.toString(),
      12,
      100,
      font,
    );

    const maxHeight = Math.max(
      descriptionHeight,
      quantityHeight,
      unitPriceHeight,
      totalPriceHeight,
    );

    textPage.drawText(item.description, {
      x: 50,
      y: currentY,
      size: 12,
      color: rgb(0, 0, 0),
      font: font,
    });
    textPage.drawText(item.quantity.toString(), {
      x: 250,
      y: currentY,
      size: 12,
      color: rgb(0, 0, 0),
      font: font,
    });
    textPage.drawText(item.unitPrice.toString(), {
      x: 350,
      y: currentY,
      size: 12,
      color: rgb(0, 0, 0),
      font: font,
    });
    textPage.drawText(item.totalPrice.toString(), {
      x: 450,
      y: currentY,
      size: 12,
      color: rgb(0, 0, 0),
      font: font,
    });

    currentY -= maxHeight + lineHeight; // Move down for the next row
  });
}

// Function to measure text height
function measureTextHeight(
  text: string,
  size: number,
  maxWidth: number,
  font: any,
): number {
  const lines = text.split('\n');
  let height = 0;
  lines.forEach((line) => {
    const textWidth = font.widthOfTextAtSize(line, size);
    const lineCount = Math.ceil(textWidth / maxWidth);
    height += lineCount * size;
  });
  return height;
}
