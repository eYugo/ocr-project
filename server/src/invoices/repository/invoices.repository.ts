import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InvoicesRepository {
  private readonly logger = new Logger(InvoicesRepository.name);

  constructor(private prisma: PrismaService) {}

  async getInvoices(userId: bigint) {
    return await this.prisma.invoices.findMany({
      where: { userId: userId },
    });
  }

  async createInvoice(data: any) {
    this.logger.log(`Creating invoice with data: ${JSON.stringify(data)}`);

    const { userId, ...rest } = data;

    const invoiceData: any = {
      ...rest,
      user: {
        connect: { id: userId },
      },
    };

    try {
      const invoice = await this.prisma.invoices.create({
        data: invoiceData,
      });
      return invoice;
    } catch (error) {
      this.logger.error('Error creating invoice', error);
      throw error;
    }
  }

  async deleteInvoice(id: number) {
    return await this.prisma.invoices.delete({
      where: { id: BigInt(id) },
    });
  }

  async getInvoiceById(id: number) {
    return await this.prisma.invoices.findUnique({
      where: { id: BigInt(id) },
      include: { lineItems: true },
    });
  }

  async updateInvoice(id: number, data: any) {
    return await this.prisma.invoices.update({
      where: { id: BigInt(id) },
      data,
    });
  }
}
