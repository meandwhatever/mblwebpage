// pages/api/upload/updateprisma.ts
//this will be called from the main upload page.
//this will take id and rawJson and update the prisma document with the new rawJson
//dont use



import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Initialize a PrismaClient instance (you can also import a shared client from lib/prisma)
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { id, rawJson } = req.body;

    if (typeof id === 'undefined' || typeof rawJson === 'undefined') {
      return res
        .status(400)
        .json({ success: false, message: 'Missing `id` or `rawJson` in request body' });
    }

    // Update the document's rawJson field in Prisma
    const updated = await prisma.mbl_Document.update({
      where: { id: Number(id) },
      data: { rawJson },
    });

    return res.status(200).json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating document:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while updating document',
    });
  } finally {
    await prisma.$disconnect();
  }
}
