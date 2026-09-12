"use client";
import { useState, useRef, useEffect } from "react";

export default function EditorShell() {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  return (
    <div className="min-h-screen bg-[#e8e8e8] flex flex-col items-center py-6">
      <div className="mb-4 text-sm text-gray-600">Page 1 - A4 • WriteDesk</div>

      <div className="bg-white w-[850px] min-h-[1123px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] rounded-sm">
        <div className="p-[96px]">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing here... Your page will grow as you type..."
            className="w-full min-h-[900px] resize-none outline-none border-none text-[14pt] leading-[1.8] text-black bg-transparent overflow-hidden"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          />
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-400">The page expands automatically as you type</div>
    </div>
  );
}