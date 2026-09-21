import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try {
    const { clue } = await req.json();
    if(!process.env.GROQ_API_KEY) return NextResponse.json({ text: "ERROR: No GROQ_API_KEY in.env.local - restart server" });
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: "You are WriteDesk, professional document writer. Write very long detailed document." },
          { role: "user", content: clue }
        ]
      })
    });
    const data = await groqRes.json();
    if(data.error) return NextResponse.json({ text: "GROQ ERROR: " + data.error.message });
    return NextResponse.json({ text: data.choices?.[0]?.message?.content || "Empty response" });
  } catch(e:any){ return NextResponse.json({ text: "SERVER ERROR: "+e.message }); }
}