"use client";
import { useState } from "react";
export default function Page(){
  const [clue,setClue]=useState("");
  const [result,setResult]=useState("");
  const [loading,setLoading]=useState(false);
  async function generate(){
    setLoading(true);
    const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({clue})});
    const data=await res.json();
    setResult(data.text||data.error);
    setLoading(false);
  }
  return(
    <div style={{maxWidth:700,margin:"40px auto",padding:20}}>
      <h1>WriteDesk - AI Writer</h1>
      <textarea value={clue} onChange={e=>setClue(e.target.value)} placeholder="e.g. Kofi wants teaching job" style={{width:"100%",height:100}} />
      <br/>
      <button onClick={generate} style={{padding:12,background:"black",color:"white",marginTop:10}}>{loading?"Writing...":"Generate"}</button>
      <pre style={{whiteSpace:"pre-wrap",background:"#eee",padding:15,marginTop:20}}>{result}</pre>
    </div>
  )
}