"use client"
import { useState, useRef, useEffect } from "react"

const FONT_FAMILIES = [
"Arial","Arial Black","Verdana","Helvetica","Tahoma","Trebuchet MS","Times New Roman","Georgia","Garamond","Courier New","Brush Script MT","Palatino","Bookman","Comic Sans MS","Impact","Lucida Sans","Lucida Console","Century Gothic","Franklin Gothic","Calibri","Cambria","Candara","Consolas","Constantia","Corbel","Segoe UI","Optima","Futura","Geneva","Gill Sans","Helvetica Neue","Avant Garde","Baskerville","Big Caslon","Bodoni","Didot","Copperplate","Papyrus","Monaco","Andale Mono","DejaVu Sans","DejaVu Serif","Liberation Sans","Liberation Serif","Noto Sans","Noto Serif","Roboto","Open Sans","Lato","Montserrat","Poppins","Raleway","Ubuntu","Merriweather","Playfair Display","Source Sans Pro","Inter","Nunito"
]

const FONT_SIZES = Array.from({length: 93}, (_, i) => 8 + i)

export default function WritedeskPage(){
  const [prompt, setPrompt] = useState("")
  const [fontFamily, setFontFamily] = useState("Arial")
  const [fontSize, setFontSize] = useState(16)
  const [textColor, setTextColor] = useState("#000000")
  const [showAbout, setShowAbout] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  const updateWordCount = () => {
    const text = editorRef.current?.innerText || ""
    const words = text.trim()? text.trim().split(/\s+/).length : 0
    setWordCount(text.trim()? words : 0)
  }

  const exec = (cmd:string, val?:string)=> {
    document.execCommand(cmd,false,val)
    editorRef.current?.focus()
  }

  const handleGenerate = async () => {
    if(!prompt.trim()) return alert("Type something!")
    setLoading(true)
    try{
      const res = await fetch("/api/generate",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({prompt, mode:"quill"})
      })
      const data = await res.json()
      const text = data.text || data.result || "No response"
      if(editorRef.current){
        editorRef.current.innerHTML = text.replace(/\n/g,"<br/>")
        updateWordCount()
      }
    }catch(e:any){ alert(e.message) } finally{ setLoading(false)}
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <style>{`@media print {.no-print{display:none!important} body{background:white!important} #editor{border:none!important;box-shadow:none!important}}`}</style>

      <header className="no-print bg-white border-b p-3 flex justify-between items-center sticky top-0 z-10">
        <h1 className="font-bold text-xl">Writedesks.xyz - QUILL</h1>
        <div className="flex gap-2">
          <button onClick={()=>window.print()} className="bg-gray-800 text-white px-4 py-2 rounded text-sm">🖨️ Print</button>
          <button onClick={()=>window.print()} className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Export PDF (A4)</button>
        </div>
      </header>

      <div className="no-print bg-white p-4 border-b flex gap-2">
        <input value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="What should QUILL write?" className="flex-1 border p-3 rounded-lg"/>
        <button onClick={handleGenerate} disabled={loading} className="bg-black text-white px-6 py-3 rounded-lg font-bold">{loading?"...":"Generate with QUILL"}</button>
      </div>

      <div className="no-print bg-white p-2 border-b flex flex-wrap gap-2 items-center">
        <select value={fontFamily} onChange={e=>{setFontFamily(e.target.value); exec("fontName",e.target.value)}} className="border p-2 rounded text-sm max-w-[130px]">
          {FONT_FAMILIES.map(f=><option key={f} value={f}>{f}</option>)}
        </select>
        <select value={fontSize} onChange={e=>setFontSize(Number(e.target.value))} className="border p-2 rounded text-sm">
          {FONT_SIZES.map(s=><option key={s} value={s}>{s}px</option>)}
        </select>
        <input type="color" value={textColor} onChange={e=>{setTextColor(e.target.value); exec("foreColor",e.target.value)}} className="w-8 h-8"/>

        <button onClick={()=>exec("bold")} className="font-bold px-3 py-1 border rounded">B</button>
        <button onClick={()=>exec("italic")} className="italic px-3 py-1 border rounded">I</button>
        <button onClick={()=>exec("underline")} className="underline px-3 py-1 border rounded">U</button>
        <button onClick={()=>exec("strikeThrough")} className="px-3 py-1 border rounded"><s>S</s></button>

        <button onClick={()=>exec("justifyLeft")} className="px-2 py-1 border rounded">⬅</button>
        <button onClick={()=>exec("justifyCenter")} className="px-2 py-1 border rounded">↔</button>
        <button onClick={()=>exec("justifyRight")} className="px-2 py-1 border rounded">➡</button>
        <button onClick={()=>exec("justifyFull")} className="px-2 py-1 border rounded">☰</button>
        <button onClick={()=>exec("undo")} className="px-2 py-1 border rounded">↩️</button>
        <button onClick={()=>exec("redo")} className="px-2 py-1 border rounded">↪️</button>
      </div>

      <div className="flex-1 flex justify-center p-4 bg-gray-100">
        <div id="editor" ref={editorRef} contentEditable suppressContentEditableWarning onInput={updateWordCount}
          style={{fontFamily, fontSize:fontSize+"px", color:textColor, width:"100%", maxWidth:"800px", minHeight:"600px", background:"white", padding:"60px", boxShadow:"0 0 10px rgba(0,0,0,0.1)", outline:"none"}}
        />
      </div>

      <div className="no-print bg-white border-t p-2 text-xs text-gray-500 flex justify-between">
        <span>{wordCount} words | {Math.ceil(wordCount/200)} min read</span><span>A4</span>
      </div>

      <button onClick={()=>setShowAbout(!showAbout)} className="no-print fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-full text-sm shadow-2xl">
        {showAbout?"✕ Close":"ⓘ About"}
      </button>

      {showAbout && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40 p-4 no-print" onClick={()=>setShowAbout(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={e=>e.stopPropagation()}>
            <h2 className="text-2xl font-bold">Writedesks.xyz</h2>
            <p className="text-xs bg-black text-white inline-block px-2 py-1 rounded mt-1 mb-3">QUILL + OMNI AI</p>
            <p className="text-sm text-gray-700">AI writing platform. QUILL writes letters, CVs, proposals in seconds. OMNI tutors you. 60+ fonts, 8-100px, Print, PDF, Strikethrough, Word Count.</p>
            <div className="border-t mt-4 pt-4">
              <p className="text-xs text-gray-500">Developed by</p>
              <p className="text-xl font-bold">Famiyeh Godswill</p>
              <p className="text-xs text-gray-600">Accounting Student, University of Ghana L200<br/>Creator of Writedesks.xyz - Making pro writing accessible for every student.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}