/*
  Warnings:

  - You are about to drop the column `createdDate` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `raw_text` on the `invoices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[file_key]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_key` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_name` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_id` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_user_id_fkey";

-- DropIndex
DROP INDEX "invoices_name_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "createdDate",
DROP COLUMN "name",
DROP COLUMN "raw_text",
ADD COLUMN     "file_key" TEXT NOT NULL,
ADD COLUMN     "file_name" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "upload_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "user_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invoices_file_key_key" ON "invoices"("file_key");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
