"use client"
import { useState, useEffect, useRef } from "react"

export default function WriteDeskPro(){
  const [mode,setMode]=useState<"quill"|"omni">("quill")
  const [prompt,setPrompt]=useState("")
  const [output,setOutput]=useState("")
  const [loading,setLoading]=useState(false)
  const [fontSize,setFontSize]=useState("14px")
  const [fontFamily,setFontFamily]=useState("Times New Roman")
  const [subject,setSubject]=useState("English")
  const editorRef = useRef<HTMLDivElement>(null)
  const subjects = ["English","Maths","Elective Maths","I.T","Geography","Science","Social Studies","Business","General"]
  const handleGenerate = async ()=>{
    if(!prompt) return alert("Type something")
    setLoading(true)
    try{
      const endpoint = mode === "quill" ? "/api/generate" : "/api/omni"
      const body = mode === "quill" ? {prompt, type:"professional"} : {question:prompt, subject}
      let res = await fetch(endpoint, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(body)})
      if(!res.ok && mode==="omni"){
        res = await fetch("/api/generate", {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({prompt: `[${subject} Expert - OMNI AI] Answer this ${subject} question clearly, step-by-step, for Ghana SHS/WASSCE level: ${prompt}`, type:"omni"})})
      }
      const data = await res.json()
      const text = data.text || data.result || data.answer || "No response"
      setOutput(text)
      if(editorRef.current) editorRef.current.innerText = text
    }catch(e:any){ alert("GROQ Error: Check GROQ_API_KEY - " + e.message) }
    setLoading(false)
  }
  const handleSave = ()=>{ localStorage.setItem("writedesk_doc", editorRef.current?.innerText || output); alert("Saved!") }
  const handleDownload = ()=>{ const c = editorRef.current?.innerText || output; const blob = new Blob([c], {type:"text/plain"}); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href=url; a.download=`WriteDesk-${mode}-${Date.now()}.doc`; a.click() }
  const handlePrint = ()=> window.print()
  const exec = (cmd:string, val?:string)=> document.execCommand(cmd,false,val)
  return(
    <div style={{minHeight:"100vh", background:"#f1f5f9", fontFamily:"Segoe UI, system-ui"}}>
      <div style={{background:"#1e3a8a", color:"white", padding:"8px 20px", display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{fontWeight:900}}>WRITEDESK <span style={{background:"white", color:"#1e3a8a", padding:"2px 8px", borderRadius:4, marginLeft:6}}>PRO</span> <span style={{fontWeight:400, fontSize:12, marginLeft:12, opacity:0.8}}>{mode==="quill" ? "QUILL • Professional Writer" : "OMNI • All Subjects AI"}</span></div>
        <div style={{display:"flex", gap:10}}>
          <button onClick={()=>setMode("quill")} style={{background: mode==="quill" ? "white" : "#2d4ab5", color: mode==="quill" ? "#1e3a8a" : "white", border:"none", padding:"6px 16px", borderRadius:6, fontWeight:700, cursor:"pointer"}}>QUILL</button>
          <button onClick={()=>setMode("omni")} style={{background: mode==="omni" ? "white" : "#2d4ab5", color: mode==="omni" ? "#1e3a8a" : "white", border:"none", padding:"6px 16px", borderRadius:6, fontWeight:700, cursor:"pointer"}}>OMNI</button>
        </div>
      </div>
      <div style={{background:"white", borderBottom:"1px solid #e2e8f0", padding:"10px 20px", display:"flex", gap:18, alignItems:"center", flexWrap:"wrap"}}>
        <select value={fontFamily} onChange={e=>setFontFamily(e.target.value)} style={{padding:"6px 10px", borderRadius:6, border:"1px solid #cbd5e1"}}><option>Times New Roman</option><option>Arial</option><option>Calibri</option><option>Georgia</option></select>
        <select value={fontSize} onChange={e=>setFontSize(e.target.value)} style={{padding:"6px", borderRadius:6, border:"1px solid #cbd5e1"}}><option>12px</option><option>14px</option><option>16px</option><option>18px</option><option>20px</option></select>
        <div style={{display:"flex", gap:6, borderRight:"1px solid #e2e8f0", paddingRight:12}}><button onClick={()=>exec("bold")} style={{fontWeight:900, width:32, height:32, border:"1px solid #e2e8f0", borderRadius:6, background:"white"}}>B</button><button onClick={()=>exec("italic")} style={{fontStyle:"italic", width:32, height:32, border:"1px solid #e2e8f0", borderRadius:6, background:"white"}}>I</button><button onClick={()=>exec("underline")} style={{textDecoration:"underline", width:32, height:32, border:"1px solid #e2e8f0", borderRadius:6, background:"white"}}>U</button></div>
        <button onClick={handleSave} style={{padding:"6px 12px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:6}}>💾 Save</button>
        <button onClick={handleDownload} style={{padding:"6px 12px", background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:6}}>⬇️ Download</button>
        <button onClick={handlePrint} style={{padding:"6px 12px", background:"#2563eb", color:"white", border:"none", borderRadius:6, fontWeight:700}}>🖨️ Export PDF (A4)</button>
        <span style={{fontSize:11, color:"#22c55e", fontWeight:700, marginLeft:"auto"}}>● Grammarly Active • GROQ</span>
      </div>
      <div style={{display:"flex", maxWidth:1400, margin:"0 auto", gap:20, padding:20}}>
        <div style={{width:340, background:"white", borderRadius:12, padding:18, height:"fit-content", boxShadow:"0 2px 10px rgba(0,0,0,0.05)"}}>
          {mode==="quill" ? <><h3 style={{fontWeight:800}}>QUILL - AI Writer</h3><p style={{fontSize:12, color:"#64748b", marginBottom:14}}>Letters, CV, dissertations, A4 ready</p></> : <><h3 style={{fontWeight:800}}>OMNI - All Subjects</h3><p style={{fontSize:12, color:"#64748b", marginBottom:14}}>English, Maths, IT, Geography...</p><select value={subject} onChange={e=>setSubject(e.target.value)} style={{width:"100%", padding:10, borderRadius:8, border:"1px solid #cbd5e1", marginBottom:12}}>{subjects.map(s=><option key={s}>{s}</option>)}</select></>}
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder={mode==="quill" ? "e.g. Kofi wants teaching job application..." : "e.g. Solve: 2x+5=15 for Elective Maths"} style={{width:"100%", height:130, padding:12, borderRadius:10, border:"1px solid #cbd5e1", fontSize:13}}/>
          <button onClick={handleGenerate} disabled={loading} style={{width:"100%", marginTop:12, background: loading ? "#93c5fd" : "#1e3a8a", color:"white", padding:12, borderRadius:10, border:"none", fontWeight:800, cursor:"pointer"}}>{loading ? "AI Thinking..." : mode==="quill" ? "✨ Generate with QUILL" : "🧠 Ask OMNI"}</button>
        </div>
        <div style={{flex:1, display:"flex", justifyContent:"center"}}>
          <div ref={editorRef} contentEditable style={{width:"100%", maxWidth:800, minHeight:900, background:"white", boxShadow:"0 20px 60px rgba(0,0,0,0.12)", padding:"70px 65px", fontFamily:fontFamily, fontSize:fontSize, lineHeight:1.7, outline:"none", whiteSpace:"pre-wrap"}} suppressContentEditableWarning>{output || (mode==="quill" ? "Your A4 document will appear here...\nQUILL will generate professional format." : "OMNI will answer any subject here...")}</div>
        </div>
      </div>
    </div>
  )
}