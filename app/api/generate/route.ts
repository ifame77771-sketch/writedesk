import { NextRequest, NextResponse } from "next/server"
export async function POST(req: NextRequest){
try{
const b=await req.json()
const p=b.prompt||b.question||""
const k=process.env.GROQ_API_KEY
if(!k) return NextResponse.json({text:"ERROR: No GROQ_API_KEY in Vercel", result:"ERROR: No GROQ_API_KEY"})
const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+k,"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"You are QUILL professional Ghanaian writer for WriteDesk Pro"},{role:"user",content:p}]})})
const d=await r.json()
console.log("QUILL GROQ RESPONSE:", JSON.stringify(d).substring(0,500))
const t=d.choices?.[0]?.message?.content||d.error?.message||JSON.stringify(d)
return NextResponse.json({text:t,result:t,answer:t})
}catch(e:any){return NextResponse.json({text:"Server Error: "+e.message, result:"Server Error: "+e.message})}
}