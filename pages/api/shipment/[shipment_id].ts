// pages/api/shipment/[shipment_id].ts
// this file is used to view a specific shipment from the database
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    console.log("passing shipment_id to shipment/[shipment_id].ts");

const { shipment_id: shipmentId } = req.query as { shipment_id: string };

  if (req.method === 'GET') {
    try {
      const shipment = await prisma.shipment.findUnique({
        where: { shipmentId: shipmentId },
      });
      if (!shipment) {
        return res
          .status(404)
          .json({ success: false, message: 'Shipment not found' });
      }
      return res.status(200).json({ success: true, shipment });
    } catch (error: any) {
      console.error('Error fetching shipment:', error);
      return res
        .status(500)
        .json({ success: false, error: error.message });
    }
  }

  res.setHeader('Allow', ['GET']);
  res
    .status(405)
    .json({ success: false, message: `Method ${req.method} Not Allowed` });
}

