import { redis } from '@/lib/redis';
import { notFound } from 'next/navigation';
import { CheckOutForm } from '../_components/CheckOutForm';
import { Cart } from '@/lib/interface';
import Stripe from 'stripe';

// Initialize Stripe with the API key
const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

// Main purchase page component
// Main purchase page component
export default async function PurchasePage({
  params: { id },
  searchParams, // Capture query params like cartId
}: {
  params: { id: string }
  searchParams: { cartId?: string } // Destructure cartId from query params
}) {
  const cartId = searchParams.cartId;

  // Check if cartId is provided
  if (!cartId) {
    return notFound(); // Handle missing cartId
  }

  // Retrieve the cart from Redis using cartId
  const cart: Cart | null = await redis.get(cartId);

  // Check if the cart is valid and has items
  if (!cart || !cart.items.length) {
    return notFound(); // Handle empty or not found cart
  }

  // Calculate total amount in cents
  const totalAmountInCents = cart.items.reduce(
    (acc: number, item: { priceStat: number; quantity: number }) =>
      acc + item.priceStat * item.quantity,
    0
  ) * 100;

  // Validate that total amount is greater than zero
  if (totalAmountInCents < 50) { // Changed from 0.50 to 50 to avoid confusion
    return (
      <div>
        <h1>Error</h1>
        <p>Total amount must be at least $0.50 USD.</p>
      </div>
    ); // Return an error message instead of an object
  }

  // Create a payment intent for Stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmountInCents,
    currency: 'usd',
    metadata: { userId: id },
  });

  // Check if the client secret was successfully created
  if (!paymentIntent.client_secret) {
    throw new Error('Failed to create payment intent.');
  }

  // Return the checkout form with Stripe client secret and cart info
  return <CheckOutForm cart={cart} clientSecret={paymentIntent.client_secret} />;
}
