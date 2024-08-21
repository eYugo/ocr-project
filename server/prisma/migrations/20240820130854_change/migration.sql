/*
  Warnings:

  - You are about to drop the column `file_key` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `file_name` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `upload_date` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `invoices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fileKey]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileKey` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_user_id_fkey";

-- DropIndex
DROP INDEX "invoices_file_key_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "file_key",
DROP COLUMN "file_name",
DROP COLUMN "upload_date",
DROP COLUMN "user_id",
ADD COLUMN     "fileKey" TEXT NOT NULL,
ADD COLUMN     "fileName" TEXT NOT NULL,
ADD COLUMN     "uploadDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invoices_fileKey_key" ON "invoices"("fileKey");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
