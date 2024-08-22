import { PrismaClient, LineItems } from '@prisma/client';

const prisma = new PrismaClient();

export class LineItemsRepository {
  async createLineItem(data: Omit<LineItems, 'id'>): Promise<LineItems> {
    return prisma.lineItems.create({
      data,
    });
  }

  // Get all line items for a user
  async getLineItemsByUser(): Promise<LineItems[]> {
    return prisma.lineItems.findMany();
  }

  // Get a line item by id
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
