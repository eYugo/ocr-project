import { PrismaClient, LineItems } from '@prisma/client';

const prisma = new PrismaClient();

export class LineItemsRepository {
  async createLineItem(data: Omit<LineItems, 'id'>): Promise<LineItems> {
    return prisma.lineItems.create({
      data,
    });
  }

  async getLineItemsByUser(): Promise<LineItems[]> {
    return prisma.lineItems.findMany();
  }

  async updateLineItem(
    id: number,
    data: Partial<LineItems>,
  ): Promise<LineItems> {
    return prisma.lineItems.update({
      where: { id },
      data,
    });
  }
}
