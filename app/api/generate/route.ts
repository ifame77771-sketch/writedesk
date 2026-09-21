import { NextRequest, NextResponse } from "next/server"
export async function POST(req: NextRequest){
try{
const b=await req.json()
const p=b.prompt||b.question||""
const k=process.env.GROQ_API_KEY
if(!k) return NextResponse.json({text:"ERROR: GROQ_API_KEY missing in Vercel - add it!", result:"ERROR: GROQ_API_KEY missing"})
const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+k,"Content-Type":"application/json"},body:JSON.stringify({model:"llama-3.1-8b-instant",messages:[{role:"system",content:"You are QUILL professional Ghanaian writer"},{role:"user",content:p}],temperature:0.7})})
const d=await r.json()
const t=d.choices?.[0]?.message?.content||"GROQ ERROR: "+JSON.stringify(d)
return NextResponse.json({text:t,result:t,answer:t})
}catch(e:any){return NextResponse.json({text:"Server Error: "+e.message, result:"Server Error: "+e.message})}
}