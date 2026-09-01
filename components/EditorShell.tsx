"use client";
import { useRef, useEffect, useState } from "react";

export default function EditorShell() {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("My Document");
  const [prevContent, setPrevContent] = useState("");
  const [fontSize, setFontSize] = useState("16");
  const [selectedWord, setSelectedWord] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [popupPos, setPopupPos] = useState({x:0, y:0});
  const [showPopup, setShowPopup] = useState(false);
  const [contextMenu, setContextMenu] = useState({show: false, x:0, y:0, word:""});
  const [isDark, setIsDark] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [wordCount, setWordCount] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [todayVisits, setTodayVisits] = useState(0);

  const dictionary: any = { "EMNENT": "EMINENT", "EMPLOYMENT": "EMPLOYMENT" };
  const allFonts = ["Calibri","Arial","Helvetica","Times New Roman"];
  const allSizes = ["8","9","10","11","12","14","16","18"];

  useEffect(() => {
    const w = localStorage.getItem("fullWord");
    if (w && editorRef.current) {
      editorRef.current.innerText = w;
    }
    // Safe local-only visit counter - no external API
    const count = parseInt(localStorage.getItem("total_visits") || "0");
    const newCount = count + 1;
    localStorage.setItem("total_visits", String(newCount));
    setTotalVisits(newCount);
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem("last_visit_date");
    let tCount = parseInt(localStorage.getItem("today_visits") || "0");
    if (lastDate !== today) {
      tCount = 1;
    } else {
      tCount = tCount + 1;
    }
    localStorage.setItem("today_visits", String(tCount));
    localStorage.setItem("last_visit_date", today);
    setTodayVisits(tCount);
  }, []);

  const cmd = (c: string, v: any = null) => document.execCommand(c, false, v);
  const applyFont = (name: string) => { cmd("fontName", name); };
  const applyFontSize = (size: string) => { setFontSize(size); cmd("fontSize", "3"); };
  const toggleDark = () => { const nd = !isDark; setIsDark(nd); };
  const save = () => { localStorage.setItem("fullWord", editorRef.current?.innerText || ""); };
  const openPreview = () => { if (editorRef.current) window.open("", "_blank")?.document.write(editorRef.current.innerHTML); };
  const doPrint = () => { if (editorRef.current) window.print(); };
  const DOWNLOAD = () => { if (editorRef.current) { const blob = new Blob([editorRef.current.innerText], {type:"text/plain"}); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = fileName+".txt"; a.click(); }};
  const SHARE = () => setShowPopup(true);

  return (
    <div style={{padding:"20px"}}>
      <div style={{marginBottom:"10px"}}>Total Visits: {totalVisits} | Today: {todayVisits}</div>
      <div ref={editorRef} contentEditable style={{minHeight:"400px", border:"1px solid #ccc", padding:"10px", background:isDark?"#333":"white", color:isDark?"white":"black"}} />
      <div style={{marginTop:"10px"}}>
        <button onClick={save}>Save</button>
        <button onClick={doPrint}>Print</button>
        <button onClick={DOWNLOAD}>Download</button>
      </div>
    </div>
  );
}