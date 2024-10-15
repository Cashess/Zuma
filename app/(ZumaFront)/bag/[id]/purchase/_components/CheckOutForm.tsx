"use client"
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice } from '@/lib/priceformat';
import { Cart } from '@/lib/interface';
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent,  SetStateAction,  useState } from 'react';

// Load Stripe public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);


// Props for the Checkout form
type CheckOutFormProps = {
  cart: Cart; // Cart contains items
  clientSecret: string; // Client secret from Stripe
};

// Checkout form component
export function CheckOutForm({ cart, clientSecret }: CheckOutFormProps) {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Review Your Cart</h1>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form cart={cart} />
      </Elements>
    </div>
  );
}

type FormProps = {
  cart: Cart; // Passing the cart items
};

function Form({ cart }: FormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  // Check if Stripe and Elements are loaded
  const isStripeInitialized = stripe !== null && elements !== null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!isStripeInitialized || !email) {
      console.log('Stripe or Elements not loaded or email is missing');
      return;
    }

    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.priceStat * item.quantity,
      0
    );

    const totalPriceCents = Math.round(totalPrice * 100);

    if (totalPriceCents < 50) {
      setErrorMessage('The total amount must be at least $0.50 to proceed.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(''); // Clear previous error messages

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/payment/success`,
      },
    });

    if (error) {
      console.error('Stripe Payment Error:', error);
      setErrorMessage(error.message || 'An unknown error occurred.');
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isStripeInitialized ? (
            <>
              <PaymentElement />
              <p>PaymentElement rendered successfully!</p>
            </>
          ) : (
            <p>Loading payment options...</p>
          )}
          <div className="mt-4">
            <LinkAuthenticationElement onChange={(e: { value: { email: SetStateAction<string | undefined>; }; }) => setEmail(e.value.email)} />
          </div>
        </CardContent>
        <CardFooter>
      <Button
        className="w-full"
        size="lg"
        disabled={!isStripeInitialized || isLoading}
      >
        {isLoading ? 'Purchasing...' : `Purchase - ${formatPrice(Math.round(cart.items.reduce((acc, item) => acc + item.priceStat * item.quantity, 0) * 100))}`}
      </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
