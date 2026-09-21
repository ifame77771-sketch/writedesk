"use client"
import { useState } from "react"

export default function LoginPage(){
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  return(
    <div style={{minHeight:"100vh", background:"#f5f7ff", display:"flex", alignItems:"center", justifyContent:"center", padding:20}}>
      <div style={{display:"flex", width:"100%", maxWidth:1100, background:"white", borderRadius:24, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
        
        {/* LEFT - A4 Sheet */}
        <div style={{flex:1.2, background:"linear-gradient(135deg,#2563eb,#1e40af)", color:"white", padding:50, position:"relative"}}>
          <div style={{fontWeight:900, fontSize:28, letterSpacing:2}}>WRITEDESK <span style={{background:"white", color:"#2563eb", padding:"2px 8px", borderRadius:6}}>PRO</span></div>
          <div style={{marginTop:60, fontSize:42, fontWeight:900, lineHeight:1.1}}>WRITE<br/>BEAUTIFULLY</div>
          <div style={{marginTop:20, opacity:0.9, fontSize:16}}>Professional AI writing platform for dissertations, projects & history. A4 format, ready to export.</div>
          
          {/* A4 Paper Preview */}
          <div style={{marginTop:40, background:"white", width:"85%", height:280, borderRadius:8, padding:20, color:"#111", boxShadow:"0 10px 30px rgba(0,0,0,0.3)"}}>
            <div style={{height:8, background:"#e5e7eb", width:"60%", borderRadius:4, marginBottom:12}}></div>
            <div style={{height:6, background:"#e5e7eb", width:"90%", borderRadius:4, marginBottom:8}}></div>
            <div style={{height:6, background:"#e5e7eb", width:"85%", borderRadius:4, marginBottom:8}}></div>
            <div style={{height:6, background:"#e5e7eb", width:"95%", borderRadius:4, marginBottom:20}}></div>
            <div style={{height:6, background:"#f3f4f6", width:"100%", borderRadius:4, marginBottom:8}}></div>
            <div style={{height:6, background:"#f3f4f6", width:"100%", borderRadius:4, marginBottom:8}}></div>
            <div style={{height:6, background:"#f3f4f6", width:"80%", borderRadius:4}}></div>
          </div>
          <div style={{position:"absolute", bottom:30, fontSize:12, opacity:0.7}}>© 2026 WriteDesk Ghana</div>
        </div>

        {/* RIGHT - Login Column */}
        <div style={{flex:1, padding:50, display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <h2 style={{fontSize:28, fontWeight:800, marginBottom:6}}>Welcome back</h2>
          <p style={{color:"#6b7280", marginBottom:30}}>Login to continue writing</p>
          
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" style={{width:"100%", padding:"14px 16px", borderRadius:12, border:"1px solid #d1d5db", marginBottom:16, fontSize:15}}/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{width:"100%", padding:"14px 16px", borderRadius:12, border:"1px solid #d1d5db", marginBottom:24, fontSize:15}}/>
          
          <button onClick={()=>window.location.href="/"} style={{width:"100%", background:"#2563eb", color:"white", padding:14, borderRadius:12, border:"none", fontWeight:700, fontSize:16, cursor:"pointer"}}>Log In</button>
          
          <p style={{marginTop:20, textAlign:"center", fontSize:14}}>New to WriteDesk? <a href="/register" style={{color:"#2563eb", fontWeight:700}}>Create an account</a></p>
        </div>

      </div>
    </div>
  )
}