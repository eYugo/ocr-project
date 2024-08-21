export const organizeExpenseResponse = (
  response: AWS.Textract.AnalyzeExpenseResponse,
): any => {
  const expenseDocuments = response.ExpenseDocuments || [];
  const organizedData = {
    lineItems: [],
    vendorName: '',
    vendorAddress: '',
    vendorPhone: '',
    vendorURL: '',
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    invoiceDate: '',
    invoiceFileID: '',
    dueDate: '',
    poNumber: '',
    totalAmount: '',
    subtotal: '',
    tax: '',
  };

  expenseDocuments.forEach((doc) => {
    // Extract line items
    doc.LineItemGroups?.forEach((group) => {
      group.LineItems?.forEach((item) => {
        const lineItem = {
          description: '',
          quantity: '',
          unitPrice: '',
          totalPrice: '',
        };

        item.LineItemExpenseFields?.forEach((field) => {
          if (field.Type?.Text === 'ITEM') {
            lineItem.description = field.ValueDetection?.Text || '';
          }
          if (field.Type?.Text === 'QUANTITY') {
            lineItem.quantity = field.ValueDetection?.Text || '';
          }
          if (field.Type?.Text === 'UNIT_PRICE') {
            lineItem.unitPrice = field.ValueDetection?.Text || '';
          }
          if (field.Type?.Text === 'PRICE') {
            lineItem.totalPrice = field.ValueDetection?.Text || '';
          }
        });

        organizedData.lineItems.push(lineItem);
      });
    });

    // Extract summary fields
    doc.SummaryFields?.forEach((field) => {
      switch (field.Type?.Text) {
        case 'VENDOR_NAME':
          organizedData.vendorName = field.ValueDetection?.Text || '';
          break;
        case 'VENDOR_ADDRESS':
          organizedData.vendorAddress = field.ValueDetection?.Text || '';
          break;
        case 'VENDOR_PHONE':
          organizedData.vendorPhone = field.ValueDetection?.Text || '';
          break;
        case 'VENDOR_URL':
          organizedData.vendorURL = field.ValueDetection?.Text || '';
          break;
        case 'RECEIVER_NAME':
          organizedData.receiverName = field.ValueDetection?.Text || '';
          break;
        case 'RECEIVER_ADDRESS':
          organizedData.receiverAddress = field.ValueDetection?.Text || '';
          break;
        case 'RECEIVER_PHONE':
          organizedData.receiverPhone = field.ValueDetection?.Text || '';
          break;
        case 'INVOICE_RECEIPT_DATE':
          organizedData.invoiceDate = field.ValueDetection?.Text || '';
          break;
        case 'INVOICE_RECEIPT_ID':
          organizedData.invoiceFileID = field.ValueDetection?.Text || '';
          break;
        case 'DUE_DATE':
          organizedData.dueDate = field.ValueDetection?.Text || '';
          break;
        case 'PO_NUMBER':
          organizedData.poNumber = field.ValueDetection?.Text || '';
          break;
        case 'TOTAL':
          organizedData.totalAmount = field.ValueDetection?.Text || '';
          break;
        case 'SUBTOTAL':
          organizedData.subtotal = field.ValueDetection?.Text || '';
          break;
        case 'TAX':
          organizedData.tax = field.ValueDetection?.Text || '';
          break;
      }
    });
  });

  return organizedData;
};

export function extractQueryResults(
  response: AWS.Textract.AnalyzeDocumentResponse,
): any {
  // Find the QUERY_RESULT block
  const queryResultBlock = response.Blocks.find(
    (block) => block.BlockType === 'QUERY_RESULT' && block.Text,
  );

  if (!queryResultBlock) {
    return { Answer: 'No answer for this query' };
  }

  // Extract the query text from the QUERY block
  const queryBlock = response.Blocks.find(
    (block) => block.BlockType === 'QUERY' && block.Query,
  );

  return {
    Query: queryBlock.Query.Text,
    Alias: queryBlock.Query.Alias,
    Answer: queryResultBlock.Text,
  };
}
