/*
  Warnings:

  - You are about to drop the column `title` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "title",
ADD COLUMN     "dueDate" TIMESTAMP(3),
ADD COLUMN     "invoiceDate" TIMESTAMP(3),
ADD COLUMN     "invoiceID" TEXT,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "poNumber" TEXT,
ADD COLUMN     "receiverAddress" TEXT,
ADD COLUMN     "receiverName" TEXT,
ADD COLUMN     "receiverPhone" TEXT,
ADD COLUMN     "subtotal" TEXT,
ADD COLUMN     "tax" TEXT,
ADD COLUMN     "totalAmount" TEXT,
ADD COLUMN     "vendorAddress" TEXT,
ADD COLUMN     "vendorName" TEXT,
ADD COLUMN     "vendorPhone" TEXT,
ADD COLUMN     "vendorURL" TEXT;

-- CreateTable
CREATE TABLE "LineItem" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "quantity" TEXT,
    "unitPrice" TEXT,
    "totalPrice" TEXT,
    "invoiceId" BIGINT NOT NULL,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
