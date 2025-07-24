"use client";
import React, { useState } from "react";

export default function FAQs() {
  const [openItems, setOpenItems] = useState({});

  const toggleFAQ = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqData = [
    {
      id: 1,
      question: "What documents are required to rent a car?",
      answer:
        "You’ll need a valid national or international driver’s license, a government-issued ID (like a CNIC or passport), and a valid credit or debit card for security deposit purposes.",
    },
    {
      id: 2,
      question: "Is there a minimum age requirement to rent a car?",
      answer:
        "Yes, renters must be at least 21 years old. Some premium or high-performance vehicles may require drivers to be 25 or older.",
    },
    {
      id: 3,
      question: "Are fuel charges included in the rental price?",
      answer:
        "No, fuel charges are not included. Vehicles must be returned with the same fuel level as when picked up. Additional charges apply for short refills.",
    },
    {
      id: 4,
      question: "Do you offer delivery and pick-up services?",
      answer:
        "Yes! We offer doorstep delivery and pick-up in select areas for an additional fee. You can select this option during checkout.",
    },
    {
      id: 5,
      question: "Is insurance included in the rental price?",
      answer:
        "Basic coverage is included, but we highly recommend upgrading to our full insurance package for maximum peace of mind. Details are provided at checkout.",
    },
    {
      id: 6,
      question: "Can I book a car for someone else?",
      answer:
        "Yes, you can book on behalf of someone else, but they must present valid ID and a driver’s license at the time of delivery or pickup.",
    },
    {
      id: 7,
      question: "What happens if I return the car late?",
      answer:
        "A grace period of 30 minutes is allowed. After that, late fees will be charged per hour. Please inform our support team if you expect delays.",
    },
    {
      id: 8,
      question: "How can I contact GentleWheel for support?",
      answer:
        "Our support team is available daily from 9 AM to 9 PM via WhatsApp, live chat, or email. We're here to help with bookings, extensions, or any issues during your rental.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-white mb-8 text-center">
        <span className="text-green-500">Frequently Asked</span> Questions?
      </h1>

      <div className="space-y-4">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm border border-gray-600/30"
          >
            <button
              className="w-full p-4 text-left hover:bg-green-500 focus:bg-green-500 focus:outline-none transition-colors duration-200"
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                <span
                  className={`text-green-500 text-xl font-bold transition-transform duration-300 ${
                    openItems[faq.id] ? "rotate-45" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </div>
            </button>

            <div
              className={`bg-white border-t border-green-400 transition-all duration-300 ease-in-out ${
                openItems[faq.id] ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{
                overflow: "hidden",
              }}
            >
              <div
                className={`p-4 transform transition-transform duration-300 ${
                  openItems[faq.id] ? "translate-y-0" : "-translate-y-2"
                }`}
              >
                <p className="text-gray-800 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
