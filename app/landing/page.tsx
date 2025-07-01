// app/landing/page.tsx (List View)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type MblDocument = {
  id: number;
  filename: string;
  fileUrl: string;
  uploadedAt: string;
  fileid: string;
};

export default function MblListPage() {
  const [docs, setDocs] = useState<MblDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/upload")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((response) => {
    // response is { success: boolean, data: MblDocument[] }
       if (Array.isArray(response.data)) {
          setDocs(response.data);
          } else {
          console.error("Unexpected data format:", response);
          setError("Failed to load documents");
          }
          setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load documents");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!docs.length) return <p>No documents found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">MBL Documents</h1>
      <ul className="space-y-2">
        {docs.map((doc) => (
          <li key={doc.id}>
            <Link href={`/landing/${doc.id}`}> {/* adjust path if needed */}
              <a className="block p-4 \rder rounded hover:bg-gray-50">
                <div className="font-semibold">{doc.filename}</div>
                <div>Date: {new Date(doc.uploadedAt).toLocaleDateString()}</div>
                <div>B/L #: {doc.fileid}</div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}