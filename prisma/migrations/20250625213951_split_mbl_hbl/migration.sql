/*
  Warnings:

  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Document";

-- CreateTable
CREATE TABLE "mbl_Document" (
    "id" SERIAL NOT NULL,
    "file_Url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawJson" JSONB NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "mbl_Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hbl_Document" (
    "id" SERIAL NOT NULL,
    "file_Url" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawJson" JSONB NOT NULL,
    "file_id" TEXT NOT NULL,
    "mbl_Number" TEXT NOT NULL,

    CONSTRAINT "hbl_Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "mbl_Number" TEXT,
    "mbl_url" TEXT,
    "hbl_Number" TEXT[],
    "hbl_url" TEXT[],
    "containers" TEXT[],
    "freightCharges" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mbl_Document_file_id_key" ON "mbl_Document"("file_id");

-- CreateIndex
CREATE UNIQUE INDEX "hbl_Document_file_id_key" ON "hbl_Document"("file_id");

-- CreateIndex
CREATE UNIQUE INDEX "hbl_Document_mbl_Number_key" ON "hbl_Document"("mbl_Number");

-- CreateIndex
CREATE UNIQUE INDEX "Shipment_shipmentId_key" ON "Shipment"("shipmentId");
