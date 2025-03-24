import { React } from "react";
import Accordian from "../../components/ui/Accordian";

const PrivacyPolicy = () => {
  const policyItems = [
    {
      section: "1. What Information We Collect",
      details: [
        "Name of the child or participant",
        "Parent/guardian name (if applicable)",
        "Contact details (phone number, email, emergency contact)",
        "Age or date of birth (for eligibility purposes)",
        "Time and date of sign-in and sign-out",
        "Any relevant medical or accessibility needs (optional)",
      ],
    },
    {
      section: "2. Why We Collect This Information",
      details: [
        "Keep all visitors safe and secure.",
        "Maintain accurate attendance records.",
        "Contact parents/guardians in case of emergency.",
        "Improve our services and ensure a great experience for everyone.",
        "Meet legal and safeguarding requirements.",
      ],
    },
    {
      section: "3. How We Protect Your Data",
      details: [
        "Secure digital storage with restricted access.",
        "Safe handling of paper records (if applicable).",
        "Training for our staff and volunteers on data protection.",
      ],
    },
    {
      section: "4. How Long We Keep Your Information",
      details: [
        "We only keep your data for as long as necessary for safety, legal, and operational reasons. Once it's no longer needed, we securely delete or dispose of it.",
      ],
    },
    {
      section: "5. Who We Share Your Information With",
      details: [
        "We never sell your data.",
        "We only share it if required by law or safeguarding authorities.",
        "In an emergency.",
        "With authorized staff or volunteers who need the information to keep everyone safe.",
      ],
    },
    {
      section: "6. Your Rights",
      details: [
        "You have control over your personal information. You can:",
        "Request to see the data we hold about you.",
        "Ask us to correct any mistakes.",
        "Request deletion of your data (where possible).",
        "Withdraw consent for optional data collection.",
        "To make any requests, just get in touch using the details below.",
      ],
    },
    {
      section: "7. Updates to This Policy",
      details: [
        "We may update this Privacy Policy from time to time. Any changes will be posted here, so feel free to check back.",
      ],
    },
    {
      section: "8. Contact Us",
      details: [
        "If you have any questions or concerns, please reach out:",
        "Slade Gardens Adventure Playground & Community Hub",
        "73A & 73B Stockwell Park Road, London SW9 0DA",
        "Email: sladeadventure@btinternet.com",
        "Phone: 0207 737 3829",
      ],
    },
  ];

  return (
    <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center bg-[url(./src/assets/user-login-bg.webp)] bg-cover bg-top bg-blend-luminosity">
      <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-5 mb-5">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Privacy Policy
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to <strong>Slade Gardens!</strong> Your privacy is important
          to us, and we want to be transparent about how we collect, use, and
          protect your information when you sign in and out of our facilities.
        </p>

        <div className="container mx-auto p-4">
          <Accordian items={policyItems} />
        </div>

        <p className="text-center text-gray-600 mt-6">
          Thank you for being part of our community and helping us create a
          safe, welcoming space for everyone!
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
