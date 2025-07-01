/*
  Warnings:

  - A unique constraint covering the columns `[mbl_Number]` on the table `Shipment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mbl_url]` on the table `Shipment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shipment_mbl_Number_key" ON "Shipment"("mbl_Number");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_mbl_url_key" ON "Shipment"("mbl_url");
