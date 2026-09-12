export default function Home() {
  return (
    <div style={{minHeight:"100vh", background:"#f5f5f7", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Arial"}}>
      <div style={{background:"white", width:"420px", padding:"40px", borderRadius:"16px", boxShadow:"0 10px 40px rgba(0,0,0,0.1)"}}>
        <h1 style={{fontSize:"32px", fontWeight:"bold", marginBottom:"8px"}}>WriteDesk</h1>
        <p style={{color:"#666", fontSize:"18px", marginBottom:"24px"}}>Write beautifully</p>
        <p style={{fontSize:"20px", fontWeight:"600", marginBottom:"16px"}}>Welcome back</p>
        <p style={{color:"#888", marginBottom:"20px"}}>Sign in to your documents</p>
        
        <input placeholder="Email" style={{width:"100%", padding:"14px", fontSize:"16px", border:"1px solid #ddd", borderRadius:"8px", marginBottom:"12px"}} />
        <input placeholder="Password" type="password" style={{width:"100%", padding:"14px", fontSize:"16px", border:"1px solid #ddd", borderRadius:"8px", marginBottom:"20px"}} />
        
        <button style={{width:"100%", padding:"14px", background:"black", color:"white", fontSize:"16px", borderRadius:"8px", border:"none", cursor:"pointer"}}>Sign in</button>
        
        <p style={{marginTop:"20px", textAlign:"center", color:"#888"}}>New to WriteDesk? Create an account</p>
      </div>
    </div>
  )
}