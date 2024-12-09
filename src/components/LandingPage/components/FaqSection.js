"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0 ">
      <button
        className="w-full py-6 text-left flex items-center justify-between text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors duration-300 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span
          className={`ml-4 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-base text-gray-600 leading-relaxed px-4">{answer}</p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: "What is Saathi?",
      answer:
        "Saathi is a service that provides emotional support, manages daily tasks, and ensures that health needs are met for your loved ones.",
    },
    {
      question: "How do I subscribe to a plan?",
      answer:
        "You can subscribe to a plan by selecting the plan that suits your needs on our subscription page and clicking the 'Subscribe' button.",
    },
    {
      question: "What services are included in the Basic plan?",
      answer:
        "The Basic plan includes a weekly 1-hour call, one house visit, and access to digital media in 'My Feed'.",
    },
    {
      question: "Can I change my plan later?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time through your account settings or by contacting our support team.",
    },
    {
      question: "What if I need more personalized care?",
      answer:
        "We offer personalized plans tailored to your specific needs. Please contact us directly to discuss a customized plan.",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-5xl font-serif text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
