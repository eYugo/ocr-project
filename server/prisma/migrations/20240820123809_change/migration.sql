/*
  Warnings:

  - You are about to drop the column `invoiceID` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "invoiceID",
ADD COLUMN     "invoiceFileID" TEXT;
