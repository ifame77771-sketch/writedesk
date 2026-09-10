import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { setSession } from '@/lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = loginSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 400 })
    }
    const { email, password } = parsed.data
    const user = await db.user.findUnique({ where: { email: email.toLowerCase() } })
    if (!user) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 400 })
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 400 })
    }
    await setSession(user.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 })
  }
}