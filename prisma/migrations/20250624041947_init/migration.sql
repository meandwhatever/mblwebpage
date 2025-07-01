/*
  Warnings:

  - You are about to drop the `UploadedDocument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UploadedDocument";

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rawJson" JSONB NOT NULL,
    "filetype" TEXT NOT NULL,
    "fileid" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_fileid_key" ON "Document"("fileid");
