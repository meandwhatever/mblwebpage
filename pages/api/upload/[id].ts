// pages/api/upload/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = parseInt(req.query.id as string, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid document ID" });
  }

  if (req.method === "GET") {
    const doc = await prisma.mbl_Document.findUnique({ where: { id } });
    if (!doc) return res.status(404).json({ error: "Not found" });
    return res.status(200).json({ success: true, data: doc });
  }

  if (req.method === "POST") {
    // Expecting { rawJson: { … } } in the body
    const { rawJson, fileType } = req.body;

    if (typeof rawJson !== "object") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    try {
      if(fileType === 'mbl'){
        console.log("Updating mbl document of id: ", id);
        const updated = await prisma.mbl_Document.update({
          where: { id },
          data: { rawJson: rawJson, file_id: rawJson.shipment.mbl_number },

        }
      );
      console.log("mbl updated in [id].ts");
      return res.status(200).json({ success: true, data: updated });

      }else if(fileType === 'hbl'){
        console.log("Updating hbl document of id: ", id);
        const updated = await prisma.hbl_Document.update({
          where: { id },
          data: { rawJson: rawJson, file_id: rawJson.shipment.hbl_number, mbl_Number: rawJson.shipment.mbl_number },

        }
      );
      console.log("hbl updated in [id].ts");
      return res.status(200).json({ success: true, data: updated });

      } else {
        return res.status(400).json({ error: "Invalid file type, not mbl or hbl" });
      }
    } catch (error: any) {
      console.error("Prisma update error:", error);
      return res.status(500).json({ error: "Database update failed" });
    }
  }

  // Method not allowed
  res.setHeader("Allow", ["GET", "POST"]);

  return res.status(405).end();
}