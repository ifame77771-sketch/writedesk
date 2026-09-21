"use client"
import { useState, useRef } from "react"

export default function Page(){
  const [mode,setMode]=useState<"quill"|"omni"|"info">("quill")
  const [prompt,setPrompt]=useState("")
  const [omniInput,setOmniInput]=useState("")
  const [loading,setLoading]=useState(false)
  const [fontFamily,setFontFamily]=useState("Times New Roman")
  const [fontSize,setFontSize]=useState(14)
  const [omniMessages,setOmniMessages]=useState<{user:string, ai:string}[]>([])
  const editorRef=useRef<HTMLDivElement>(null)

  const fontFamilies=["Times New Roman","Arial","Arial Black","Verdana","Helvetica","Tahoma","Trebuchet MS","Georgia","Garamond","Courier New","Brush Script MT","Palatino","Comic Sans MS","Impact","Lucida Sans","Century Gothic","Calibri","Cambria","Candara","Consolas","Constantia","Corbel","Segoe UI","Optima","Futura","Geneva","Gill Sans","Baskerville","Bodoni","Didot","Copperplate","Papyrus","Monaco","DejaVu Sans","Noto Sans","Noto Serif","Roboto","Open Sans","Lato","Montserrat","Poppins","Raleway","Ubuntu","Merriweather","Playfair Display","Source Sans Pro","Inter","Nunito","Lora","Oswald","PT Sans","Ubuntu Mono","Libre Baskerville","Arimo","Titillium Web","Mukta","Heebo","Work Sans","Quicksand"]
  const fontSizes=Array.from({length:93},(_,i)=>8+i)
  const exec=(cmd:string,val?:string)=>{ document.execCommand(cmd,false,val); editorRef.current?.focus() }

  const handleQuill=async()=>{
    if(!prompt.trim()) return alert("Please describe what you want to write!")
    setLoading(true)
    try{
      const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})})
      const data=await res.json()
      if(editorRef.current) editorRef.current.innerHTML=(data.text||"No response").replace(/\n/g,"<br/>")
    }catch(e:any){alert(e.message)}finally{setLoading(false)}
  }
  const handleOmni=async()=>{
    const q=omniInput||prompt
    if(!q.trim()) return
    setLoading(true)
    try{
      const res=await fetch("/api/omni",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:q})})
      const data=await res.json()
      setOmniMessages([...omniMessages,{user:q, ai:data.text||"No response"}])
      setOmniInput(""); setPrompt("")
    }catch(e:any){alert(e.message)}finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen bg-[#eef2ff] flex flex-col">
      <style>{`@media print {.no-print{display:none!important}} #editor{font-family:${fontFamily}; font-size:${fontSize}px}`}</style>

      <div className="no-print bg-[#2e2a6b] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><span className="font-black">WRITEDESK</span><span className="bg-white text-[#2e2a6b] px-2 py-0.5 rounded text-xs font-bold">PRO</span></div>
        <div className="flex gap-1 bg-black/30 p-1 rounded-full">
          <button onClick={()=>setMode("quill")} className={`px-4 py-1.5 rounded-full text-xs font-bold ${mode==="quill"?"bg-white text-[#2e2a6b]":"text-white/70"}`}>QUILL</button>
          <button onClick={()=>setMode("omni")} className={`px-4 py-1.5 rounded-full text-xs font-bold ${mode==="omni"?"bg-white text-[#2e2a6b]":"text-white/70"}`}>OMNI</button>
          <button onClick={()=>setMode("info")} className={`px-4 py-1.5 rounded-full text-xs font-bold ${mode==="info"?"bg-white text-[#2e2a6b]":"text-white/70"}`}>ⓘ INFO</button>
        </div>
      </div>

      {mode==="quill" && (
      <>
        <div className="no-print bg-white border-b px-4 py-2 flex flex-wrap gap-2 items-center">
          <select value={fontFamily} onChange={e=>{setFontFamily(e.target.value); exec("fontName",e.target.value)}} className="border rounded px-3 py-1.5 text-sm min-w-[140px]">{fontFamilies.map(f=><option key={f}>{f}</option>)}</select>
          <select value={fontSize} onChange={e=>setFontSize(Number(e.target.value))} className="border rounded px-2 py-1.5 text-sm">{fontSizes.map(s=><option key={s}>{s}px</option>)}</select>
          <div className="flex gap-1 ml-2">
            <button onClick={()=>exec("bold")} className="w-8 h-8 border rounded font-bold">B</button>
            <button onClick={()=>exec("italic")} className="w-8 h-8 border rounded italic">I</button>
            <button onClick={()=>exec("underline")} className="w-8 h-8 border rounded underline">U</button>
            <button onClick={()=>exec("strikeThrough")} className="w-8 h-8 border rounded"><s>S</s></button>
            <button onClick={()=>exec("justifyLeft")} className="w-8 h-8 border rounded">L</button>
            <button onClick={()=>exec("justifyCenter")} className="w-8 h-8 border rounded">C</button>
            <button onClick={()=>exec("justifyRight")} className="w-8 h-8 border rounded">R</button>
          </div>
          <div className="flex gap-2 ml-auto">
            <button onClick={()=>window.print()} className="border px-3 py-1.5 rounded text-sm">🖨️ Print</button>
            <button onClick={()=>window.print()} className="bg-[#3b5bff] text-white px-4 py-1.5 rounded-full text-sm font-bold">Export PDF (A4)</button>
          </div>
        </div>
        <div className="flex flex-1">
          <div className="no-print w-[380px] bg-[#eef2ff] p-6 flex flex-col gap-4">
            <div><h2 className="font-bold">QUILL - AI Writer</h2><p className="text-xs text-gray-500">Letters, CV, dissertations, A4 ready</p></div>
            <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Describe what you want QUILL to write... e.g., Write a formal application letter for a teaching position, or a business proposal..." className="w-full h-[200px] border rounded-lg p-4 text-sm"/>
            <button onClick={handleQuill} disabled={loading} className="bg-[#3b5bff] text-white w-full py-3 rounded-full font-bold">{loading?"Generating...":"✨ Generate with QUILL"}</button>
          </div>
          <div className="flex-1 bg-[#f0f3ff] p-8 flex justify-center"><div ref={editorRef} contentEditable suppressContentEditableWarning id="editor" className="bg-white w-[794px] min-h-[1123px] p-[80px] shadow outline-none">Your document will appear here...</div></div>
        </div>
      </>
      )}

      {mode==="omni" && (
      <div className="flex-1 max-w-4xl mx-auto w-full p-6 flex flex-col">
        <div className="bg-white rounded-xl p-4 border mb-4"><h2 className="font-bold">OMNI - AI Tutor</h2><p className="text-xs text-gray-500">Ask anything to get help - all subjects, all levels</p></div>
        <div className="flex-1 bg-white rounded-xl border p-4 space-y-3 min-h-[400px] overflow-auto">
          {omniMessages.length===0 && <p className="text-center text-gray-400 mt-20 text-sm">Ask OMNI anything you need help with...</p>}
          {omniMessages.map((m,i)=><div key={i}><div className="bg-[#2e2a6b] text-white p-3 rounded-lg text-sm mb-2">You: {m.user}</div><div className="bg-[#eef2ff] p-3 rounded-lg text-sm whitespace-pre-wrap">{m.ai}</div></div>)}
        </div>
        <div className="mt-4 flex gap-2 no-print"><input value={omniInput} onChange={e=>setOmniInput(e.target.value)} placeholder="Ask OMNI anything you need help with..." className="flex-1 border rounded-full px-4 py-3 text-sm"/><button onClick={handleOmni} className="bg-[#2e2a6b] text-white px-6 py-3 rounded-full text-sm font-bold">{loading?"...":"Ask OMNI"}</button></div>
      </div>
      )}

      {mode==="info" && (
      <div className="flex-1 bg-white p-8 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black">WRITEDESK <span className="bg-[#2e2a6b] text-white px-3 py-1 rounded text-lg">PRO</span></h1>
          <p className="text-[#3b5bff] font-bold mt-1">Built to help everyone who desires assistance with writing and learning</p>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="border rounded-xl p-4 bg-[#eef2ff]"><h3 className="font-bold">✒️ QUILL - AI Writer</h3><ul className="text-sm mt-2 list-disc ml-4 text-gray-600"><li>Professional letters & applications</li><li>CV, Cover letters, Dissertations</li><li>Business proposals & reports</li><li>A4 ready, Export PDF, Print</li><li>60+ fonts, 8-100px, formatting tools</li></ul></div>
            <div className="border rounded-xl p-4 bg-[#fff7ed]"><h3 className="font-bold">🧠 OMNI - AI Tutor</h3><ul className="text-sm mt-2 list-disc ml-4 text-gray-600"><li>All subjects, all levels</li><li>Math, Science, English, Business</li><li>Step-by-step explanations</li><li>24/7 assistance for everyone</li></ul></div>
          </div>
          <div className="mt-8 bg-[#2e2a6b] text-white rounded-xl p-6 flex justify-between items-center">
            <div><p className="text-xs opacity-60">Built by</p><p className="text-xl font-bold">Famiyeh Godswill</p><p className="text-sm opacity-80">Accounting Student</p><p className="text-xs mt-2 opacity-60">www.writedesks.xyz | © 2026 - Created to serve all who desire assistance</p></div>
          </div>
          <div className="mt-6 text-center"><button onClick={()=>setMode("quill")} className="bg-[#3b5bff] text-white px-8 py-3 rounded-full font-bold">Start Writing with QUILL →</button></div>
        </div>
      </div>
      )}
    </div>
  )
}