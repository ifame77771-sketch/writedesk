import {cookies} from 'next/headers'; import {SignJWT,jwtVerify} from 'jose';
const secret=new TextEncoder().encode(process.env.SESSION_SECRET||'development-secret-change-me');
export async function setSession(userId:string){const token=await new SignJWT({userId}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('30d').sign(secret); (await cookies()).set('writedesk_session',token,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*30});}
export async function getSessionUserId(){const token=(await cookies()).get('writedesk_session')?.value; if(!token)return null; try{return (await jwtVerify(token,secret)).payload.userId as string}catch{return null}}
export async function clearSession(){(await cookies()).delete('writedesk_session')}
