import prisma from '@/lib/database'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user || user.email === null || !user.id) {
    throw new Error('Something aint right...')
  }
  let databaseUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })
  if (!databaseUser) {
    databaseUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? '',
        lastName: user.family_name ?? '',
        email: user.email ?? '',
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    })
  }
  return NextResponse.redirect('http://localhost:3000/')
}
