-- DropForeignKey
ALTER TABLE "line_items" DROP CONSTRAINT "line_items_invoiceId_fkey";

-- AddForeignKey
ALTER TABLE "line_items" ADD CONSTRAINT "line_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
