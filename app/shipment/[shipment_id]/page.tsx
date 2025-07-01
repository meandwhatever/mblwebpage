// app/shipment/[shipment_id].tsx
// this page is used to view a specific shipment from the database
"use client"; 
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

export default function ShipmentDetailPage() {
  const params = useParams();
  const shipmentId = params?.shipment_id as string;
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shipmentId) return;
    async function fetchShipment() {
      try {
        const res = await fetch(`/api/shipment/${shipmentId}`);
        const data = await res.json();
        if (data.success) {
          setShipment(data.shipment);
        } else {
          setError(data.message || 'Failed to load shipment');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchShipment();
  }, [shipmentId]);

  if (loading) return <div className="p-4">Loading shipment...</div>;
  if (error) return <div className="p-4 text-red-600">Error jgkhj: {error}</div>;
  if (!shipment) return <div className="p-4">Shipment not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shipment {shipment.shipmentId}</h1>
      <div className="mb-4">
        <strong>Mode:</strong> {shipment.mode}
      </div>
      <div className="mb-4">
        <strong>MBL Number:</strong> {shipment.mbl_Number || '-'}
        {shipment.mbl_url && (
          <a
            href={shipment.mbl_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 underline"
          >
            View MBL
          </a>
        )}
      </div>
      <div className="mb-4">
        <strong>HBLs:</strong>
        <ul className="list-disc list-inside">
          {shipment.hbl_Number.map((num, idx) => (
            <li key={num} className="mb-1">
              {num}{' '}
              {shipment.hbl_url[idx] && (
                <a
                  href={shipment.hbl_url[idx]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View HBL
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong>Containers:</strong>{' '}
        {shipment.containers.join(', ') || '-'}
      </div>
      <div className="mb-4">
        <strong>Freight Charges:</strong>{' '}
        {shipment.freightCharges.join(', ') || '-'}
      </div>
      <div className="mb-4">
        <strong>Created At:</strong>{' '}
        {new Date(shipment.created_at).toLocaleString()}
      </div>
      <div className="mb-4">
        <strong>Updated At:</strong>{' '}
        {new Date(shipment.updated_at).toLocaleString()}
      </div>
      <Link href="/shipment">
        <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
          Back to List
        </button>
      </Link>
    </div>
  );
}
