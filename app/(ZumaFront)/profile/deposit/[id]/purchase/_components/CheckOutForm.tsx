import React, { FormEvent, useState } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

type CheckOutFormProps = {
  amount: string; // Deposit amount passed as a prop
  clientSecret: string; // Client secret from Stripe
};

export function CheckOutForm({ amount, clientSecret }: CheckOutFormProps) {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form amount={amount} />
    </Elements>
  );
}

type FormProps = {
  amount: string;
};

function Form({ amount }: FormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('Stripe or Elements not loaded');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

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
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Deposit Amount: ${amount}</h2>
      {errorMessage && <div className="text-red-600">{errorMessage}</div>}
      <PaymentElement />
      <button disabled={!stripe || isLoading} className="mt-4 px-4 py-2 bg-blue-600 text-white">
        {isLoading ? 'Processing...' : `Submit Payment`}
      </button>
    </form>
  );
}
