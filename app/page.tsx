"use client"
import { useState, useRef, useEffect } from "react"

export default function Page(){
  const [mode,setMode]=useState<"quill"|"omni">("quill")
  const [prompt,setPrompt]=useState("")
  const [subject,setSubject]=useState("English")
  const [tone,setTone]=useState("Professional")
  const [loading,setLoading]=useState(false)
  const [showAbout,setShowAbout]=useState(false)
  const [fontFamily,setFontFamily]=useState("Arial")
  const [fontSize,setFontSize]=useState(16)
  const [wordCount,setWordCount]=useState(0)
  const editorRef=useRef<HTMLDivElement>(null)
  const [omniMessages,setOmniMessages]=useState<any[]>([])
  const [omniInput,setOmniInput]=useState("")

  // EXPANDED TO 50 FONTS - keeps your same dropdown style
  const fontFamilies=["Arial","Arial Black","Verdana","Helvetica","Tahoma","Trebuchet MS","Times New Roman","Georgia","Garamond","Courier New","Brush Script MT","Palatino","Bookman","Comic Sans MS","Impact","Lucida Sans","Lucida Console","Century Gothic","Franklin Gothic","Calibri","Cambria","Candara","Consolas","Constantia","Corbel","Segoe UI","Optima","Futura","Geneva","Gill Sans","Helvetica Neue","Avant Garde","Baskerville","Big Caslon","Bodoni","Didot","Copperplate","Papyrus","Monaco","Andale Mono","DejaVu Sans","DejaVu Serif","Liberation Sans","Liberation Serif","Noto Sans","Noto Serif","Roboto","Open Sans","Lato","Montserrat","Poppins","Raleway","Ubuntu","Merriweather","Playfair Display","Source Sans Pro","Inter","Nunito"]
  // EXPANDED TO 8-100
  const fontSizes=Array.from({length:93},(_,i)=>8+i)
  const subjects=["English","Mathematics","Science","Social Studies","Business","General","Accounting","Economics","Geography","History","I.T.","Biology","Chemistry","Physics"]

  const updateCount=()=>{
    const txt=editorRef.current?.innerText||""
    setWordCount(txt.trim()?txt.trim().split(/\s+/).length:0)
  }

  const exec=(cmd:string,val?:string)=>{
    document.execCommand(cmd,false,val)
    editorRef.current?.focus()
  }

  const handleGenerate=async()=>{
    if(!prompt.trim()) return
    setLoading(true)
    try{
      const endpoint= mode==="quill"? "/api/generate" : "/api/omni"
      const body= mode==="quill"
       ? {prompt, subject, tone, mode:"quill"}
        : {prompt: `${subject} Expert - OMNI AI: ${prompt}`, subject}
      const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})
      const data=await res.json()
      const text=data.text||data.result||"No response"
      if(mode==="quill" && editorRef.current){
        editorRef.current.innerHTML=text.replace(/\n/g,"<br/>")
        updateCount()
      } else {
        setOmniMessages([...omniMessages,{user:prompt, ai:text}])
        setPrompt("")
      }
    }catch(e:any){alert(e.message)} finally{setLoading(false)}
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <style>{`@media print {.no-print{display:none!important} #editor{box-shadow:none!important; border:none!important}}`}</style>

      {/* KEEPS YOUR ORIGINAL HEADER STYLE */}
      <div className="no-print bg-black text-white p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Writedesks.xyz</h1>
        <div className="flex gap-2">
          <button onClick={()=>setMode("quill")} className={`px-4 py-1 rounded-full text-sm ${mode==="quill"?"bg-white text-black":"bg-zinc-800"}`}>QUILL</button>
          <button onClick={()=>setMode("omni")} className={`px-4 py-1 rounded-full text-sm ${mode==="omni"?"bg-white text-black":"bg-zinc-800"}`}>OMNI</button>
        </div>
        <div className="flex gap-2">
          <button onClick={()=>window.print()} className="bg-white text-black px-3 py-1 rounded text-sm">🖨️ Print</button>
          <button onClick={()=>window.print()} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Export PDF</button>
        </div>
      </div>

      {/* PROMPT AREA - YOUR STYLE */}
      <div className="no-print bg-white p-4 shadow-sm flex flex-wrap gap-2 items-center">
        <select value={subject} onChange={e=>setSubject(e.target.value)} className="border p-2 rounded">
          {subjects.map(s=><option key={s}>{s}</option>)}
        </select>
        {mode==="quill" && (
          <select value={tone} onChange={e=>setTone(e.target.value)} className="border p-2 rounded">
            <option>Professional</option><option>Friendly</option><option>Academic</option><option>Formal</option>
          </select>
        )}
        <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder={mode==="quill"?"What should QUILL write?":"Ask OMNI anything..."} className="flex-1 min-w-[200px] border p-2 rounded"/>
        <button onClick={handleGenerate} disabled={loading} className="bg-black text-white px-6 py-2 rounded font-bold">{loading?"Generating...": mode==="quill"?"Generate with QUILL":"Ask OMNI"}</button>
      </div>

      {mode==="quill"? (
        <>
          {/* TOOLBAR - YOUR STYLE + ADDED STRIKETHROUGH */}
          <div className="no-print bg-white border-y p-2 flex flex-wrap gap-2 items-center">
            <select value={fontFamily} onChange={e=>{setFontFamily(e.target.value); exec("fontName",e.target.value)}} className="border p-1 rounded text-sm w-[120px]">
              {fontFamilies.map(f=><option key={f} value={f}>{f}</option>)}
            </select>
            <select value={fontSize} onChange={e=>setFontSize(Number(e.target.value))} className="border p-1 rounded text-sm">
              {fontSizes.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
            <button onClick={()=>exec("bold")} className="w-8 h-8 border rounded font-bold">B</button>
            <button onClick={()=>exec("italic")} className="w-8 h-8 border rounded italic">I</button>
            <button onClick={()=>exec("underline")} className="w-8 h-8 border rounded underline">U</button>
            {/* NEW - STRIKETHROUGH */}
            <button onClick={()=>exec("strikeThrough")} className="w-8 h-8 border rounded"><s>S</s></button>
            <button onClick={()=>exec("justifyLeft")} className="w-8 h-8 border rounded">L</button>
            <button onClick={()=>exec("justifyCenter")} className="w-8 h-8 border rounded">C</button>
            <button onClick={()=>exec("justifyRight")} className="w-8 h-8 border rounded">R</button>
            <button onClick={()=>exec("justifyFull")} className="w-8 h-8 border rounded">J</button>
          </div>
          <div className="flex-1 flex justify-center p-6">
            <div id="editor" ref={editorRef} contentEditable suppressContentEditableWarning onInput={updateCount}
              style={{fontFamily, fontSize:fontSize+"px", background:"white", width:"100%", maxWidth:"850px", minHeight:"700px", padding:"60px", boxShadow:"0 0 15px rgba(0,0,0,0.08)", outline:"none"}}
            />
          </div>
          <div className="no-print bg-white p-2 text-xs text-gray-500 border-t">{wordCount} words | {Math.ceil(wordCount/200)} min</div>
        </>
      ) : (
        <div className="flex-1 p-4 max-w-3xl mx-auto w-full">
          {omniMessages.map((m,i)=>(
            <div key={i} className="mb-4">
              <div className="bg-black text-white p-3 rounded-lg mb-2">You: {m.user}</div>
              <div className="bg-white p-3 rounded-lg border whitespace-pre-wrap">{m.ai}</div>
            </div>
          ))}
        </div>
      )}

      {/* NEW - ABOUT SWITCH WITH YOUR NAME */}
      <button onClick={()=>setShowAbout(!showAbout)} className="no-print fixed bottom-5 right-5 bg-black text-white px-5 py-3 rounded-full shadow-xl z-50 text-sm">
        {showAbout?"✕":"ⓘ About"}
      </button>
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-end justify-end p-6 no-print" onClick={()=>setShowAbout(false)}>
          <div className="bg-white rounded-2xl p-6 w-[350px]" onClick={e=>e.stopPropagation()}>
            <h3 className="font-bold text-xl">Writedesks.xyz</h3>
            <p className="text-xs bg-black text-white inline-block px-2 py-1 rounded mt-1">QUILL + OMNI AI - PRO</p>
            <p className="text-sm mt-3 text-gray-600">QUILL writes letters, CVs, proposals. OMNI tutors all subjects. Now with 50+ fonts, 8-100px sizes, Strikethrough, Print & Export PDF A4.</p>
            <div className="mt-4 border-t pt-3">
              <p className="text-xs text-gray-400">Built by</p>
              <p className="font-bold text-lg">Famiyeh Godswill</p>
              <p className="text-xs">Accounting Student, University of Ghana - L200</p>
              <p className="text-[10px] mt-2 text-gray-400">© 2026 writedesks.xyz</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}