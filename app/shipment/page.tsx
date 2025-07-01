// app/shipment/page.tsx
// this page is used to view all shipments from the database
"use client"; 
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Shipment {
  id: number;
  shipmentId: string;
  mode: string;
  rawJson: any;
  mbl_Number: string | null;
  mbl_url: string | null;
  containers: string[];
  freightCharges: string[];
  hbl_Number: string[];
  hbl_url: string[];
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  updated_reason?: string;
}

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchShipments() {
      try {
        const res = await fetch(`/api/shipment/viewallshipent`);
        const data = await res.json();
        if (data.success) {
          setShipments(data.shipments);
        } else {
          setError(data.message || 'Failed to load shipments');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchShipments();
  }, []);

  if (loading) return <div className="p-4">Loading shipments...</div>;
  if (error)   return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Shipments</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Shipment ID</th>
              <th className="px-4 py-2 border">Mode</th>
              <th className="px-4 py-2 border">MBL Number</th>
              <th className="px-4 py-2 border">HBL Count</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((s) => (
              <tr key={s.shipmentId} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{s.id}</td>
                <td className="px-4 py-2 border">{s.shipmentId}</td>
                <td className="px-4 py-2 border">{s.mode}</td>
                <td className="px-4 py-2 border">{s.mbl_Number ?? '-'}</td>
                <td className="px-4 py-2 border">{s.hbl_Number.length}</td>
                <td className="px-4 py-2 border">
                  {new Date(s.created_at).toLocaleString()}
                </td>
                <td className="px-4 py-2 border">
                  <Link href={`/shipment/${s.shipmentId}`}>
                    <button className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                      View
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
