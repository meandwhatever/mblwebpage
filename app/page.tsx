// pages/index.tsx
"use client";

import { useState, ChangeEvent, FormEvent, useCallback } from "react";
import RawJsonForm from "@/components/RawJsonForm";


type PDFResult = {
  name: string;
  fileUrl: string;
  rawJson: any;
  fileType: string;
  fileId:   string | number;
  id:       number;
};

export default function HomePage() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [pdfResults, setPdfResults] = useState<PDFResult[]>([]);
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  //const [jsonMap, setJsonMap]             = useState<Map<number, any>>(new Map());
  //const [savingId, setSavingId]           = useState<number|null>(null); // id currently being saved

  


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const files = e.target.files ? Array.from(e.target.files) : [];
    // Reject any non‐PDF files
    const bad = files.find((f) => f.type !== "application/pdf");
    if (bad) {
      setErrorMsg(`“${bad.name}” isn’t a PDF.`);
      setSelectedFiles([]);
      return;
    }
    setSelectedFiles(files);
  };
// for uploading the files 
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setErrorMsg("No files selected.");
      return;
    }

    setStatus("uploading");
    setErrorMsg(null);

    try {
      const uploads = selectedFiles.map(async (file) => {
        const fd = new FormData();
        fd.append("file", file); //key is "file", value is the file
        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(txt || `Upload failed for ${file.name}`);
        }
        const json = await res.json();
        if (!json.success) {
          throw new Error(json.message || `Upload failed for ${file.name}`);
        }

        return {
          name: file.name,
          fileUrl: json.fileUrl,
          rawJson: json.rawJson,
          fileType: json.fileType,
          fileId: json.fileId,
          id: json.id,
        } as PDFResult;
        
      });

      const results = await Promise.all(uploads);
      setPdfResults(results);
      // build the Map<id, rawJson>
      //setJsonMap(new Map(results.map(r => [r.id, r.rawJson])));
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

    /**
   * POST updated JSON back to the backend for a single document.
   

    const handleSave = async (id: number) => {
      const jsonToSave = jsonMap.get(id);
      if (!jsonToSave) return;
  
      setSavingId(id);
      try {
        const res = await fetch("/api/upload/updateprisma", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, rawJson: jsonToSave }),
        });
        if (!res.ok) throw new Error(await res.text());
        const { success, data, message } = await res.json();
        if (!success) throw new Error(message || "Unknown error");
  
        // Replace pdfResults entry so UI stays in sync with DB
        setPdfResults(prev => prev.map(r => r.id === id ? { ...r, rawJson: data.rawJson } as PDFResult : r));
      } catch (err: any) {
        alert(`Failed to save document ${id}: ${err.message}`);
      } finally {
        setSavingId(null);
      }
    };
*/

   /**
   * When RawJsonForm mutates its copy, bubble the change up into jsonMap.
   
   const handleJsonChange = useCallback((id: number, updated: any) => {
    setJsonMap(prev => {
      const next = new Map(prev);
      next.set(id, updated);
      return next;
    });
  }, []);
*/


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Upload & Edit MBL PDFs</h1>

      {/* Upload Form -------------------------------------------------*/}
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="block mb-4"
        />
        {errorMsg && (
          <p className="text-red-600 mb-4">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === "uploading"}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {status === "uploading" ? "Uploading…" : "Upload"}
        </button>
      </form>

      {/* Display each uploaded PDF & editable JSON -------------------*/}
      {pdfResults.map((doc) => {
        const editableJson = doc.rawJson;
        const fileType = doc.fileType;
        return (
          <div key={doc.id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Document: {doc.name}</h2>
            <div className="flex flex-col md:flex-row gap-6 h-[70vh]">
              {/* PDF preview */}
              <div className="md:w-1/2 bg-white shadow rounded overflow-auto">
                <embed src={doc.fileUrl} type="application/pdf" className="w-full h-full" />
              </div>
              {/* Editable JSON */}
              <div className="md:w-1/2 bg-white shadow rounded p-4 overflow-auto">
                <RawJsonForm
                  data={editableJson}
                  docId={doc.id}                    
                  //onChange={(newJson: any) => handleJsonChange(doc.id, newJson)}
                  fileType={fileType}
                  
                />
                
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
