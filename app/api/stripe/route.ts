import { stripe } from '@/lib/stripe' // Ensure this is the correct path for your stripe instance
import prisma from '@/lib/database' // Ensure correct prisma import
import { redis } from '@/lib/redis' // Ensure correct redis import
import Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = req.headers.get('Stripe-Signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_SECRET_WEBHOOK as string
    )
  } catch (error) {
    console.error(`⚠️  Webhook signature verification failed.`, error)
    return new Response('Webhook Error', { status: 400 })
  }

  // Handle Stripe events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Ensure all session fields are safely accessed
      if (
        !session.amount_total ||
        !session.status ||
        !session.metadata?.userId
      ) {
        console.error('Missing session data')
        return new Response('Missing session data', { status: 400 })
      }

      // Create an order in the database
      await prisma.order.create({
        data: {
          amount: session.amount_total as number,
          status: session.status as string,
          userId: session.metadata.userId,
        },
      })

      // Clear the user's cart from Redis
      await redis.del(`cart-${session.metadata.userId}`)

      break
    }
    default: {
      console.log(`Unhandled event type ${event.type}`)
      break
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response(null, { status: 200 })
}
