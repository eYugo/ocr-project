import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { TextractService } from '../textract/textract.service';
import { LineItemsRepository } from '../line-items/repository/line-items.repository';
import { InvoicesRepository } from './repository/invoices.repository';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly invoicesRepository: InvoicesRepository,
    private readonly lineItemsRepository: LineItemsRepository,
    private readonly s3Service: S3Service,
  ) {}

  // Get all invoices for a user
  async getInvoices(userId: bigint) {
    return await this.invoicesRepository.getInvoices(userId);
  }

  // Create an invoice and its line items
  async createInvoice(invoiceData: any) {
    const { lineItems, ...createInvoiceData } = invoiceData;

    // create the Invoice
    const invoice =
      await this.invoicesRepository.createInvoice(createInvoiceData);

    // create the LineItems and link them to the Invoice
    for (const item of lineItems) {
      await this.lineItemsRepository.createLineItem({
        ...item,
        invoiceId: invoice.id,
      });
    }

    return invoice;
  }

  // Delete an invoice, its S3 file and its line items
  async deleteInvoice(id: number, userId: bigint) {
    const invoice = await this.invoicesRepository.getInvoiceById(id);
    if (invoice.userId !== userId) {
      throw new Error('Unauthorized: Invoice does not belong to the user');
    }

    // delete the file from S3
    await this.s3Service.deleteFile(invoice.fileKey);

    // delete the invoice and its line items
    return await this.invoicesRepository.deleteInvoice(id);
  }

  // Get an invoice and its S3 file URL
  async getInvoiceAndUrlById(id: number, userId: bigint) {
    // get the invoice by id
    const invoice = await this.invoicesRepository.getInvoiceById(id);
    if (invoice.userId !== userId) {
      throw new Error('Unauthorized: Invoice does not belong to the user');
    }
    try {
      // get the pre-signed URL for the invoice file
      const imageUrl = await this.s3Service.getPreSignedUrl(invoice.fileKey);
      return { ...invoice, imageUrl };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Get an invoice by id
  async getInvoiceById(id: number, userId: bigint) {
    const invoice = await this.invoicesRepository.getInvoiceById(id);
    if (invoice.userId !== userId) {
      throw new Error('Unauthorized: Invoice does not belong to the user');
    }
    return invoice;
  }

  // Update an invoice and its line items
  async updateInvoice(id: number, updateData: any) {
    const { lineItems, ...updateInvoiceData } = updateData;
    // call updateInvoice method from InvoicesRepository
    const updatedInvoice = await this.invoicesRepository.updateInvoice(
      id,
      updateInvoiceData,
    );

    // update the line items
    for (const item of lineItems) {
      await this.lineItemsRepository.updateLineItem(item.id, item);
    }
    return updatedInvoice;
  }
}
