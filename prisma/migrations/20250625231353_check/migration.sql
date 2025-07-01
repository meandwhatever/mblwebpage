/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Shipment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Shipment` table. All the data in the column will be lost.
  - Added the required column `rawJson` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" TEXT,
ADD COLUMN     "rawJson" JSONB NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_by" TEXT,
ADD COLUMN     "updated_reason" TEXT;
