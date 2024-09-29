import prisma from '@/lib/database'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  // Check if the user object is valid
  if (!user || !user.email || !user.id) {
    return NextResponse.json(
      { message: 'User authentication failed.' },
      { status: 401 }
    )
  }

  // Fetch user from database or create a new one if not found
  let databaseUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  })

  // If user does not exist in the database, create it
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

  // Redirect the user
  return NextResponse.redirect(
    process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3000/'
  )
}
