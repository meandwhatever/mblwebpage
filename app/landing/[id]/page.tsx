// app/landing/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
type RawJson = { [key: string]: any };

interface Document {
  id: number;
  fileUrl: string;
  filename: string;
  uploadedAt: string;
  rawJson: RawJson;
  filetype: string;
  fileid: string;
}


export default function Landing() {
  const { id } = useParams() as { id: string }; 
  const [doc, setDoc] = useState<Document | null>(null);

  useEffect(() => {
    fetch(`/api/upload/${id}`)
      .then((res) => res.json())
      .then((json) => setDoc(json.data as Document));
  }, [id]);



  if (!doc) return <div>Loading…</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Raw JSON</h1>

      {/* iframe will now type-check because doc.fileUrl exists on Document */}
      <iframe src={doc.fileUrl} width="100%" height="600" />
      <RawJsonForm data={doc.rawJson} docId={doc.id}  />
    </div>
  );
}




interface RawJsonFormProps {
    data: RawJson;
    docId: number;
  }

  function RawJsonForm({ data, docId }: RawJsonFormProps)  {
    const [jsonData, setJsonData] = useState<RawJson>(data);
    const [loading, setLoading] = useState(false);

    const handleChange = (section: string, key: string) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
      setJsonData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    };
  
    const handleArrayChange = (arrayKey: string, index: number, key: string) => (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
      setJsonData((prev) => {
        const updated = [...prev[arrayKey]];
        updated[index] = { ...updated[index], [key]: value };
        return { ...prev, [arrayKey]: updated };
      });
    };
  
    const handleUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Updated JSON:", jsonData);
      // Send jsonData to your API or parent component
    };




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/upload/${docId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rawJson: jsonData }),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Document updated!");
    } catch (err: any) {
      console.error(err);
      alert("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleAddFreightCharge = () => {
    setJsonData((prev) => ({
      ...prev,
      freight_charges: Array.isArray(prev.freight_charges)
        ? [...prev.freight_charges, { charge_type: '', amount: 0, currency: '' }]
        : [{ charge_type: '', amount: 0, currency: '' }],
    }));
  };

  const handleDeleteFreightCharge = (index: number) => {
    setJsonData((prev) => ({
      ...prev,
      freight_charges: prev.freight_charges.filter((_: any, i: number) => i !== index),
    }));
  };

  const handleAddContainer = () => {
    setJsonData((prev) => ({
      ...prev,
      containers: Array.isArray(prev.containers)
        ? [...prev.containers, {
            container_number: '',
            seal_number: '',
            container_type: '',
            number_of_packages: 0,
            package_uom: '',
            weight: 0,
            weight_uom: '',
            volume: 0,
            volume_uom: '',
            product_item_description: '',
            product_item_hscode: '',
          }]
        : [{
            container_number: '',
            seal_number: '',
            container_type: '',
            number_of_packages: 0,
            package_uom: '',
            weight: 0,
            weight_uom: '',
            volume: 0,
            volume_uom: '',
            product_item_description: '',
            product_item_hscode: '',
          }],
    }));
  };
  const handleDeleteContainer = (index: number) => {
    setJsonData((prev) => ({
      ...prev,
      containers: prev.containers.filter((_: any, i: number) => i !== index),
    }));
  };

  
    return (
      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Shipper Information */}
        <section>
          <h2 className="text-xl font-semibold">Shipper Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["name", "Name"],
              ["address", "Address"],

            ].map(([key, label]) => (
              <label key={key} className="block">
                {label}:
                <input
                  type="text"
                  value={jsonData.shipper[key] || ''}
                  onChange={handleChange("shipper", key)}
                  className="border rounded p-1 w-full"
                />
              </label>
            ))}
          </div>
        </section>
  
        {/* Consignee Information */}
        <section>
          <h2 className="text-xl font-semibold">Consignee Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["name", "Name"],
              ["address", "Address"],

            ].map(([key, label]) => (
              <label key={key} className="block">
                {label}:
                <input
                  type="text"
                  value={jsonData.consignee[key] || ''}
                  onChange={handleChange("consignee", key)}
                  className="border rounded p-1 w-full"
                />
              </label>
            ))}
          </div>
        </section>
  
        {/* Notify Party Information */}
        <section>
          <h2 className="text-xl font-semibold">Notify Party Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["name", "Name"],
              ["address", "Address"],

            ].map(([key, label]) => (
              <label key={key} className="block">
                {label}:
                <input
                  type="text"
                  value={jsonData.notify_party[key] || ''}
                  onChange={handleChange("notify_party", key)}
                  className="border rounded p-1 w-full"
                />
              </label>
            ))}
          </div>
        </section>
  
        {/* Shipment & Vessel Information */}
        <section>
          <h2 className="text-xl font-semibold">Shipment & Vessel Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["mbl_number", "MBL Number dont change", "text"],
              ["carrier_scac_code", "Carrier SCAC", "text"],
              ["carrier_booking_number", "Booking Number", "text"],
              ["vessel_name", "Vessel Name", "text"],
              ["voyage_number", "Voyage Number", "text"],
              ["port_of_loading", "Port of Loading", "text"],
              ["port_of_discharge", "Port of Discharge", "text"],
              ["place_of_receipt", "Place of Receipt", "text"],
              ["place_of_delivery", "Place of Delivery", "text"],
              ["place_of_release", "Place of Release", "text"],
              ["mode", "Mode", "text"],
              ["freight_term", "Freight Term", "text"],
              ["freight_service", "Service", "text"],
              ["total_number_of_containers", "# Containers", "number"],
              ["total_weight", "Total Weight", "number"],
              ["total_volume", "Total Volume", "number"],
              ["total_package", "Total Packages", "number"],

            ].map(([key, label, type]) => (
              <label key={key} className="block">
                {label}:
                <input
                  type={type}
                  value={jsonData.shipment[key] || ''}
                  onChange={handleChange("shipment", key)}
                  className="border rounded p-1 w-full"
                />
              </label>
            ))}
            {[
              ["date_of_release", "Date of Release"],
              ["shipped_on_board_date", "On Board Date"],
            ].map(([key, label]) => (
              <label key={key} className="block">
                {label}:
                <input
                  type="date"
                  value={jsonData.shipment[key] || ''}
                  onChange={handleChange("shipment", key)}
                  className="border rounded p-1 w-full"
                />
              </label>
            ))}
          </div>
        </section>
  {/*
        {/* Logistics & Freight Details 
        <section>
          <h2 className="text-xl font-semibold">Logistics & Freight Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              ["mode", "Mode", "text"],
              ["freight_term", "Freight Term", "text"],
              ["freight_service", "Service", "text"],
            ].map(([key, label, type]) => (
              <label key={key} className="block">
                {label}:
                <input
                  type={type}
                  value={jsonData.logistics_and_freight_details[key] || ''}
                  onChange={handleChange("logistics_and_freight_details", key)}
                  className="border rounded p-1 w-full"
                />
              </label>
            ))}
          </div>
        </section>
        {/*


        */}
        
        {/* Summary Metrics 
        <section>
          <h2 className="text-xl font-semibold">Summary Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              ["total_number_of_containers", "# Containers"],
              ["total_weight", "Total Weight"],
              ["total_volume", "Total Volume"],
              ["total_package", "Total Packages"],
            ].map(([key, label]) => (
              <label key={key} className="block">
                {label}:
                <input
                  type="number"
                  value={jsonData.summary_metrics[key] ?? ''}
                  onChange={handleChange("summary_metrics", key)}
                  className="border rounded p-1 w-full"
                />
              </label>
            ))}
          </div>
        </section>
  

        */}



        {/* Freight Charges (all items) */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Freight Charges</h2>

          {Array.isArray(jsonData.freight_charges) &&
            jsonData.freight_charges.map((charge: any, idx: number) => (
              <div key={idx} className="mb-4 p-4 border rounded">
                {/* Header with delete button */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Item {idx + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleDeleteFreightCharge(idx)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>

                {/* Charge fields */}
                {[
                  ["charge_type", "Charge Type", "text"],
                  ["rate",        "Rate",        "number"],
                  ["quantity",    "Quantity",    "number"],
                  ["unit",        "Unit (Currency)", "text"],
                  ["amount",      "Amount",      "number"],
                ].map(([key, label, type]) => (
                  <label key={key} className="block mb-2">
                    {label}:
                    <input
                      type={type}
                      value={charge[key] ?? ""}
                      onChange={handleArrayChange(
                        "freight_charges",
                        idx,
                        key
                      )}
                      className="ml-2 border px-2 py-1 rounded"
                    />
                  </label>
                ))}

                {/* ─── Payment Terms Radios ─── */}
                <div className="mt-4">
                  <h4 className="font-medium mb-1">Payment Terms</h4>
                  <div className="flex items-center space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`prepaidOrCollect-${idx}`}   // unique per item
                        value="prepaid"
                        checked={charge["prepaid or collect"] === "prepaid"}
                        onChange={handleArrayChange(
                          "freight_charges",
                          idx,
                          "prepaid or collect"
                        )}
                        className="form-radio h-4 w-4"
                      />
                      <span className="ml-2">Prepaid</span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name={`prepaidOrCollect-${idx}`}
                        value="collect"
                        checked={charge["prepaid or collect"] === "collect"}
                        onChange={handleArrayChange(
                          "freight_charges",
                          idx,
                          "prepaid or collect"
                        )}
                        className="form-radio h-4 w-4"
                      />
                      <span className="ml-2">Collect</span>
                    </label>
                  </div>
                </div>
              </div>
            ))
          }

          <button
            type="button"
            onClick={handleAddFreightCharge}
            className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
          >
            Add Freight Charge
          </button>
        </section>

      {/* Containers (all items) */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Containers</h2>
        {Array.isArray(jsonData.containers) &&
          jsonData.containers.map((container: any, idx: number) => (
            <div key={idx} className="mb-4 p-4 border rounded">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Container {idx + 1}</h3>
                <button
                  type="button"
                  onClick={() => handleDeleteContainer(idx)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
              {[
                ["container_number", "Container Number", "text"],
                ["seal_number", "Seal Number", "text"],
                ["container_type", "Type", "text"],
                ["number_of_packages", "# Packages", "number"],
                ["package_uom", "UOM", "text"],
                ["weight", "Weight", "number"],
                ["weight_uom", "Weight UOM", "text"],
                ["volume", "Volume", "number"],
                ["volume_uom", "Volume UOM", "text"],
                ["product_item_description", "Description", "text"],
                ["product_item_hscode", "HS Code", "text"],
              ].map(([key, label, type]) => (
                <label key={key} className="block mb-2">
                  {label}:
                  <input
                    type={type}
                    value={container[key] ?? ''}
                    onChange={handleArrayChange("containers", idx, key)}
                    className="ml-2 border px-2 py-1 rounded"
                  />
                </label>
              ))}
            </div>
          ))}
        <button
          type="button"
          onClick={handleAddContainer}
          className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
        >
          Add Container
        </button>
      </section>


      {/* Update Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Updating…" : "Update"}
      </button>
  
        </form>
      );
    }