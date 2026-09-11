import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { setSession } from '@/lib/auth'
import { z } from 'zod'

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = registerSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }
    const { name, email, password } = parsed.data
    
    const existing = await db.user.findUnique({ 
      where: { email: email.toLowerCase() } 
    }) as any
    
    if (existing) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await (db.user.create as any)({
      data: { 
        name, 
        email: email.toLowerCase(), 
        password: hashedPassword 
      },
    })
    
    await setSession(user.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}