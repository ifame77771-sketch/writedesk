export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
import {NextResponse} from 'next/server'; import {db} from '@/lib/db'; import {getSessionUserId} from '@/lib/auth'; export async function GET(){const id=await getSessionUserId(); if(!id)return NextResponse.json({user:null}); const user=await db.user.findUnique({where:{id},select:{id:true,name:true,email:true}}); return NextResponse.json({user})}
