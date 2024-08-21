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

  async getInvoices(userId: bigint) {
    return await this.invoicesRepository.getInvoices(userId);
  }

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

  async deleteInvoice(id: number, userId: bigint) {
    const invoice = await this.invoicesRepository.getInvoiceById(id);
    if (invoice.userId !== userId) {
      throw new Error('Unauthorized: Invoice does not belong to the user');
    }
    await this.s3Service.deleteFile(invoice.fileKey);
    return await this.invoicesRepository.deleteInvoice(id);
  }

  async getInvoiceAndUrlById(id: number, userId: bigint) {
    const invoice = await this.invoicesRepository.getInvoiceById(id);
    if (invoice.userId !== userId) {
      throw new Error('Unauthorized: Invoice does not belong to the user');
    }
    try {
      const imageUrl = await this.s3Service.getPreSignedUrl(invoice.fileKey);
      return { ...invoice, imageUrl };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getInvoiceById(id: number, userId: bigint) {
    const invoice = await this.invoicesRepository.getInvoiceById(id);
    if (invoice.userId !== userId) {
      throw new Error('Unauthorized: Invoice does not belong to the user');
    }
    return invoice;
  }

  async updateInvoice(id: number, updateData: any) {
    const { lineItems, ...updateInvoiceData } = updateData;
    // call updateInvoice method from InvoicesRepository
    const updatedInvoice = await this.invoicesRepository.updateInvoice(
      id,
      updateInvoiceData,
    );

    // call update line items method from LineItemsRepository
    // Update or create line items
    for (const item of lineItems) {
      await this.lineItemsRepository.updateLineItem(item.id, item);
    }
    return updatedInvoice;
  }
}
