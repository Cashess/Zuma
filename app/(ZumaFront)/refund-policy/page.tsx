import React from 'react';

const RefundPolicyPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">1. Overview</h2>
        <p className="text-gray-600">
          At Zuma Ecommerce, we are committed to ensuring the satisfaction of our customers. If you are not satisfied with your purchase, you have 10 days from the date of purchase to request a refund, subject to the terms outlined below.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">2. Eligibility for Refund</h2>
        <p className="text-gray-600">
          To be eligible for a refund, the following conditions must be met:
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>The item must be unused and in the same condition that you received it.</li>
          <li>The item must be in its original packaging.</li>
          <li>A valid proof of purchase (receipt or order confirmation) must be provided.</li>
          <li>The request for a refund must be made within 10 days from the date of purchase.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">3. Non-Refundable Items</h2>
        <p className="text-gray-600">
          Certain items are non-refundable. These include:
        </p>
        <ul className="list-disc pl-6 text-gray-600">
          <li>Perishable goods (e.g., food, flowers, newspapers, magazines).</li>
          <li>Custom-made or personalized products.</li>
          <li>Gift cards.</li>
          <li>Items on sale or marked as final sale.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">4. Refund Process</h2>
        <p className="text-gray-600">
          To initiate a refund, please contact our customer service team at <strong>support@zumaecommerce.com</strong> or call <strong>(123) 456-7890</strong>. You will be required to provide proof of purchase and details of the product you wish to return.
        </p>
        <p className="text-gray-600">
          Once your refund request is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within 7-10 business days.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">5. Late or Missing Refunds</h2>
        <p className="text-gray-600">
          If you haven’t received your refund within the estimated timeframe, please first check with your bank or credit card provider, as processing times can vary. If you have done this and still have not received your refund, please contact us at <strong>support@zumaecommerce.com</strong>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">6. Exchanges</h2>
        <p className="text-gray-600">
          If you need to exchange an item for the same product due to defect or damage, please contact us at <strong>support@zumaecommerce.com</strong> within 10 days of receiving the product. We will replace the item once it has been returned and inspected.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">7. Shipping Costs</h2>
        <p className="text-gray-600">
          You will be responsible for covering the shipping costs for returning your item, unless the item was defective or damaged upon receipt. Shipping costs are non-refundable.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">8. Contact Information</h2>
        <p className="text-gray-600">
          If you have any questions about our refund policy, please contact us at:
        </p>
        <p className="text-gray-600">
          Email: <strong>support@zumaecommerce.com</strong><br />
          Phone: <strong>(123) 456-7890</strong><br />
          Address: <strong>123 Zuma St, Delaware, Us</strong>
        </p>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
