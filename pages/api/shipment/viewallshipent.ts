//pages/api/shipment/viewallshipent.ts
//this file is used to view all shipments from the database

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      // Fetch all shipments from the database, ordered by creation date
      const shipments = await prisma.shipment.findMany({
        orderBy: { created_at: 'desc' },
      });

      return res.status(200).json({ success: true, shipments });
    }

    // Only GET is allowed
    res.setHeader('Allow', ['GET']);
    return res
      .status(405)
      .json({ success: false, message: `Method ${req.method} Not Allowed` });
  } catch (error: any) {
    console.error('Error fetching shipments:', error);
    return res
      .status(500)
      .json({ success: false, error: error.message });
  }
}
