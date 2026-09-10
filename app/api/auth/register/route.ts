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
      return NextResponse.json({ error: 'Invalid details' }, { status: 400 })
    }
    const { name, email, password } = parsed.data
    const exists = await db.user.findUnique({ where: { email: email.toLowerCase() } })
    if (exists) {
      return NextResponse.json({ error: 'Email already registered.' }, { status: 400 })
    }
    const hashedpassword = await bcrypt.hash(password, 12)
    const user = await db.user.create({
      data: { name, email: email.toLowerCase(), password: hashedpassword },
    })
    await setSession(user.id)
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}