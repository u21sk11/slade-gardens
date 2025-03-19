import { React } from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-600 mb-6">
        Welcome to <strong>Slade Gardens!</strong> Your privacy is important to us, and we want to be
        transparent about how we collect, use, and protect your information when you sign in and out of our facilities.
      </p>

      {/* Section 1 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>1. What Information We Collect</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 pl-5">
          <li>Name of the child or participant</li>
          <li>Parent/guardian name (if applicable)</li>
          <li>Contact details (phone number, email, emergency contact)</li>
          <li>Age or date of birth (for eligibility purposes)</li>
          <li>Time and date of sign-in and sign-out</li>
          <li>Any relevant medical or accessibility needs (optional)</li>
        </ul>
      </details>

      {/* Section 2 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>2. Why We Collect This Information</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 pl-5">
          <li>Keep all visitors safe and secure.</li>
          <li>Maintain accurate attendance records.</li>
          <li>Contact parents/guardians in case of emergency.</li>
          <li>Improve our services and ensure a great experience for everyone.</li>
          <li>Meet legal and safeguarding requirements.</li>
        </ul>
      </details>

      {/* Section 3 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>3. How We Protect Your Data</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 pl-5">
          <li>Secure digital storage with restricted access.</li>
          <li>Safe handling of paper records (if applicable).</li>
          <li>Training for our staff and volunteers on data protection.</li>
        </ul>
      </details>

      {/* Section 4 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>4. How Long We Keep Your Information</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <p className="text-gray-600 mt-2 pl-5">
          We only keep your data for as long as necessary for safety, legal, and operational reasons.
          Once it's no longer needed, we securely delete or dispose of it.
        </p>
      </details>

      {/* Section 5 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>5. Who We Share Your Information With</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 pl-5">
          <li>We never sell your data.</li>
          <li>We only share it if required by law or safeguarding authorities.</li>
          <li>In an emergency.</li>
          <li>With authorized staff or volunteers who need the information to keep everyone safe.</li>
        </ul>
      </details>

      {/* Section 6 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>6. Your Rights</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <p className="text-gray-600 mt-2 pl-5">
          You have control over your personal information. You can:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-1 mt-2 pl-5">
          <li>Request to see the data we hold about you.</li>
          <li>Ask us to correct any mistakes.</li>
          <li>Request deletion of your data (where possible).</li>
          <li>Withdraw consent for optional data collection.</li>
        </ul>
        <p className="text-gray-600 mt-2 pl-5">
          To make any requests, just get in touch using the details below.
        </p>
      </details>

      {/* Section 7 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>7. Updates to This Policy</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <p className="text-gray-600 mt-2 pl-5">
          We may update this Privacy Policy from time to time. Any changes will be posted here,
          so feel free to check back.
        </p>
      </details>

      {/* Section 8 */}
      <details className="group mb-4">
        <summary className="flex justify-between items-center cursor-pointer text-2xl font-semibold text-gray-700">
          <span>8. Contact Us</span>
          <span className="text-gray-500 group-open:hidden">+</span>
          <span className="text-gray-500 hidden group-open:inline">−</span>
        </summary>
        <p className="text-gray-600 mt-2 pl-5">
          If you have any questions or concerns, please reach out:
        </p>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <p className="font-semibold">Slade Gardens Adventure Playground & Community Hub</p>
          <p>73A & 73B Stockwell Park Road, London SW9 0DA</p>
          <p>Email: <a href="mailto:sladeadventure@btinternet.com" className="text-blue-500 hover:underline">sladeadventure@btinternet.com</a></p>
          <p>Phone: <a href="tel:02077373829" className="text-blue-500 hover:underline">0207 737 3829</a></p>
        </div>
      </details>

      <p className="text-center text-gray-600 mt-6">
        Thank you for being part of our community and helping us create a safe, welcoming space for everyone!
      </p>
    </div>
  );
};

export default PrivacyPolicy;