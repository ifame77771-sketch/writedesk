"use client";
import { useEffect, useState } from "react";

export default function EditorShell({ documentId }: { documentId?: string }) {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function load() {
      try {
        if (!documentId) return;
        const res = await fetch(`/api/documents/${documentId}`);
        const data = await res.json();
        setContent(data.content || "");
      } catch (e) {}
    }
    load();
  }, [documentId]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex justify-center p-8">
      <div className="bg-white w-[210mm] min-h-[297mm] shadow-xl p-[20mm] rounded-sm">
        {documentId && <h1 className="text-xl font-bold mb-4">{documentId}</h1>}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-[80vh] border p-4 rounded focus:outline-none"
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
}