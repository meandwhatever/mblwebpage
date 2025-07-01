/*
  Warnings:

  - The `containers` column on the `Shipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `freightCharges` column on the `Shipment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "containers",
ADD COLUMN     "containers" JSONB[],
DROP COLUMN "freightCharges",
ADD COLUMN     "freightCharges" JSONB[];
