import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';

// POST method handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse the JSON input
    const { deposit } = body;

    // Validate the deposit input
    if (typeof deposit !== 'string' || isNaN(parseFloat(deposit))) {
      return NextResponse.json({ error: 'Deposit must be a valid number.' }, { status: 400 });
    }

    // Create a payment intent for the deposit amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(parseFloat(deposit) * 100), // Convert deposit amount to cents
      currency: 'usd',
    });

    // Return the client secret from Stripe
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Type assertion to access the message property
    const errorMessage = (error as Error).message || 'Failed to create payment intent.';
    console.error('Error creating payment intent:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
