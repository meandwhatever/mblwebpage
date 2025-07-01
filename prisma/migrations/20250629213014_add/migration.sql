/*
  Warnings:

  - The `rawJson` column on the `Shipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[hbl_Number]` on the table `Shipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hbl_url]` on the table `Shipment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Shipment_mbl_Number_key";

-- DropIndex
DROP INDEX "Shipment_mbl_url_key";

-- AlterTable
ALTER TABLE "Shipment" ALTER COLUMN "mode" DROP NOT NULL,
ALTER COLUMN "hbl_Number" DROP NOT NULL,
ALTER COLUMN "hbl_Number" SET DATA TYPE TEXT,
ALTER COLUMN "hbl_url" DROP NOT NULL,
ALTER COLUMN "hbl_url" SET DATA TYPE TEXT,
DROP COLUMN "rawJson",
ADD COLUMN     "rawJson" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_hbl_Number_key" ON "Shipment"("hbl_Number");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_hbl_url_key" ON "Shipment"("hbl_url");
