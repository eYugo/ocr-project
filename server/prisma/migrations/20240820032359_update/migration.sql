/*
  Warnings:

  - You are about to drop the `LineItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_invoiceId_fkey";

-- DropTable
DROP TABLE "LineItem";

-- CreateTable
CREATE TABLE "line_items" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "quantity" TEXT,
    "unitPrice" TEXT,
    "totalPrice" TEXT,
    "invoiceId" BIGINT NOT NULL,

    CONSTRAINT "line_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "line_items" ADD CONSTRAINT "line_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
