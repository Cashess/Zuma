import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
        <p className="text-gray-600">
          We may collect and process the following data about you:
        </p>
        <ul className="list-disc list-inside text-gray-600">
          <li><strong>Personal Identification Information:</strong> Name, email address, phone number, etc.</li>
          <li><strong>Technical Data:</strong> IP address, browser type, time zone settings, etc.</li>
          <li><strong>Transaction Data:</strong> Details of products purchased, purchase history.</li>
          <li><strong>Marketing Data:</strong> Preferences in receiving marketing communications.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
        <p className="text-gray-600">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside text-gray-600">
          <li>Process your orders and manage payments.</li>
          <li>Provide customer support and manage your account.</li>
          <li>Send marketing communications (with your consent).</li>
          <li>Improve our website and prevent fraud.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">3. How We Share Your Information</h2>
        <p className="text-gray-600">
          We may share your information with third parties such as service providers for payment processing, order fulfillment, and legal compliance. We may also share information in the event of a business transfer or if required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">4. Data Retention</h2>
        <p className="text-gray-600">
          We will retain your data only for as long as necessary to fulfill the purposes we collected it for.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">5. Cookies and Tracking</h2>
        <p className="text-gray-600">
          We use cookies and tracking technologies to enhance your experience. You can disable cookies via your browser settings.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">6. Your Rights</h2>
        <p className="text-gray-600">
          You may have rights under data protection laws such as access, correction, deletion, and portability of your data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">7. Security of Your Information</h2>
        <p className="text-gray-600">
          We take steps to ensure the security of your data, but no system is 100% secure. We strive to protect your data but cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">8. Children’s Privacy</h2>
        <p className="text-gray-600">
          We do not knowingly collect personal data from children under the age of 13.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">9. Third-Party Links</h2>
        <p className="text-gray-600">
          Our site may contain links to third-party websites. We are not responsible for their privacy practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">10. Changes to Our Privacy Policy</h2>
        <p className="text-gray-600">
          We may update this policy from time to time. Please review it periodically for changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">11. Contact Us</h2>
        <p className="text-gray-600">
          If you have any questions, contact us at: <br />
          Email: support@zumaecommerce.com <br />
          Phone: (123) 456-7890 <br />
          Address: 123 Zuma St, Delaware, us
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
