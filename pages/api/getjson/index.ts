import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end('Method Not Allowed');
  }

  const dir = path.join(process.cwd(), 'mbl_json');

  try {
    // Remove all existing files
    await fs.rm(dir, { recursive: true, force: true });
    // Recreate the directory
    await fs.mkdir(dir, { recursive: true });

    // Fetch all documents from Prisma
    const docs = await prisma.document.findMany();

    // Write each rawJson to a file named after its filename column
    await Promise.all(
        docs.map(async (doc) => {
        const withoutPrefix = doc.filename.replace(/^[^-]+-/, '');

          // Strip .pdf extension if present
          const baseName = doc.filename.toLowerCase().endsWith('.pdf')
            ? doc.filename.slice(0, -4)
            : doc.filename;
          // Ensure end wit .json 
          const fileName = baseName.toLowerCase().endsWith('.json')
            ? baseName
            : `${baseName}.json`;

          const finalFileName = fileName.replace(/^[^-]+-/, '');

          const filePath = path.join(dir, finalFileName);
          await fs.writeFile(filePath, JSON.stringify(doc.rawJson, null, 2), 'utf8');
        })
      );

    return res.status(200).json({ success: true, count: docs.length });
  } catch (error: any) {
    console.error('Error exporting JSON files:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
