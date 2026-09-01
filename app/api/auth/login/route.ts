import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { db } from '@/lib/db'
import { setSession } from '@/lib/auth'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 400 })
    }

    const user = await db.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() }
    })

    if (!user ||!user.passwordHash) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash)

    if (!isValid) {
      return NextResponse.json({ error: 'Incorrect email or password' }, { status: 401 })
    }

    await setSession(user.id)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}