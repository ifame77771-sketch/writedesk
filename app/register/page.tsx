"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage(){
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const router = useRouter()

  const handleRegister = async () => {
    if(!name || !email || !password){ alert("Fill all fields"); return }
    setLoading(true)
    try{
      const res = await fetch("/api/register", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name,email,password})
      })
      const data = await res.json()
      if(res.ok){
        localStorage.setItem("user", JSON.stringify({email, name}))
        alert("Account created! Login now")
        router.push("/login")
      }else{
        // Demo fallback - let you use app even if DB not working
        localStorage.setItem("user", JSON.stringify({email, name}))
        alert("Demo account created! (Real DB fix later) - Now click Log In")
        router.push("/login")
      }
    }catch(e){
      localStorage.setItem("user", JSON.stringify({email, name}))
      alert("Demo account created! Go to login")
      router.push("/login")
    }
    setLoading(false)
  }

  return(
    <div style={{minHeight:"100vh", background:"#f5f7ff", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"system-ui"}}>
      <div style={{display:"flex", width:"100%", maxWidth:1100, background:"white", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.15)", minHeight:600}}>
        
        <div style={{flex:1.2, background:"linear-gradient(135deg,#1d4ed8,#1e3a8a)", color:"white", padding:50, display:"flex", flexDirection:"column"}}>
          <div style={{fontWeight:900, fontSize:22}}>WRITEDESK <span style={{background:"white", color:"#1d4ed8", padding:"3px 10px", borderRadius:6, marginLeft:6}}>PRO</span></div>
          <div style={{marginTop:70, fontSize:44, fontWeight:900, lineHeight:1}}>CREATE<br/>ACCOUNT</div>
          <div style={{marginTop:20, opacity:0.9, fontSize:15}}>Join professional AI writing platform. A4 format, ready to export for Ghana universities.</div>
          <div style={{marginTop:40, background:"white", width:"90%", height:260, borderRadius:10, padding:18}}>
            <div style={{height:8, background:"#dbeafe", width:"50%", borderRadius:4, marginBottom:12}}></div>
            <div style={{height:6, background:"#e5e7eb", width:"90%", borderRadius:4, marginBottom:8}}></div>
            <div style={{height:6, background:"#e5e7eb", width:"85%", borderRadius:4, marginBottom:8}}></div>
            <div style={{height:6, background:"#e5e7eb", width:"95%", borderRadius:4}}></div>
          </div>
        </div>

        <div style={{flex:1, padding:50, display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <h2 style={{fontSize:26, fontWeight:800, marginBottom:6}}>Create your account</h2>
          <p style={{color:"#6b7280", marginBottom:28, fontSize:14}}>Your documents, available anywhere.</p>
          
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" style={{width:"100%", padding:"14px 16px", borderRadius:12, border:"1px solid #d1d5db", marginBottom:14, fontSize:15}}/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" style={{width:"100%", padding:"14px 16px", borderRadius:12, border:"1px solid #d1d5db", marginBottom:14, fontSize:15}}/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%", padding:"14px 16px", borderRadius:12, border:"1px solid #d1d5db", marginBottom:24, fontSize:15}}/>
          
          <button onClick={handleRegister} disabled={loading} style={{width:"100%", background: loading ? "#93c5fd" : "#2563eb", color:"white", padding:14, borderRadius:12, border:"none", fontWeight:700, fontSize:16, cursor:"pointer"}}>{loading ? "Creating..." : "Create account"}</button>
          
          <p style={{marginTop:20, textAlign:"center", fontSize:13, color:"#6b7280"}}>Already have an account? <a href="/login" style={{color:"#2563eb", fontWeight:700, textDecoration:"none"}}>Sign in</a></p>
        </div>

      </div>
    </div>
  )
}