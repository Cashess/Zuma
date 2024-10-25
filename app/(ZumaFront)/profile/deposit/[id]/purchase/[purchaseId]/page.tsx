"use client";
import React, { useState } from 'react';
import { CheckOutForm } from '../_components/CheckOutForm'; // Adjust the path if needed

export default function Page() {
  const [deposit, setDeposit] = useState<string>(''); // State to handle deposit input
  const [clientSecret, setClientSecret] = useState<string>(''); // State to store client secret from Stripe

  // Function to handle input changes
  const handleDepositChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeposit(e.target.value); // Update deposit input value
  };

  // Function to handle deposit submission
  const handleDepositSubmit = async () => {
    if (!deposit || isNaN(Number(deposit))) {
      alert('Please enter a valid deposit amount.');
      return;
    }

    try {
      // Call your backend to create a payment intent using the deposit amount
      const response = await fetch('/api/payments/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deposit }), // Send the dynamic deposit state as a string
      });

      const data = await response.json(); // Await the JSON response

      if (data.clientSecret) {
        setClientSecret(data.clientSecret); // Set client secret for Stripe
      } else {
        console.error('Failed to create payment intent.');
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Deposit</h1>

      {/* Input for deposit */}
      <div className="mb-4">
        <label htmlFor="deposit" className="block text-sm font-medium text-gray-700">
          Enter Deposit Amount (in USD)
        </label>
        <input
          type="text"
          id="deposit"
          value={deposit}
          onChange={handleDepositChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      {/* Button to initiate deposit and create payment intent */}
      <button
        onClick={handleDepositSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit Deposit
      </button>

      {/* Render CheckOutForm if clientSecret is available */}
      {clientSecret && <CheckOutForm amount={deposit} clientSecret={clientSecret} />}
    </div>
  );
}
