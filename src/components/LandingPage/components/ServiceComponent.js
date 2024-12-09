"use client";
import React from "react";
import { FaCar, FaHome, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion"; // Importing Framer Motion for animations

// Icon mapping for services
const iconMap = {
  "car-outline": FaCar,
  "home-outline": FaHome,
  "cart-outline": FaShoppingCart,
};

// Service Card Component
const ServiceCard = ({ service, icon, cost, details }) => {
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-8 m-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-default opacity-20 rounded-full"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary opacity-20 rounded-full"></div>

      {/* Icon and Content */}
      <div className="relative z-10 flex items-center justify-center mb-4">
        <IconComponent className="text-6xl text-default mb-4" />
      </div>
      <h3 className="relative z-10 text-3xl font-semibold text-gray-800 mb-2">
        {service}
      </h3>
      <p className="relative z-10 text-lg text-indigo-600 mb-4 font-medium">
        {cost}
      </p>
      <p className="relative z-10 text-gray-600 text-sm leading-relaxed">
        {details}
      </p>
    </motion.div>
  );
};

// Main Services Component
const ServicesComponent = () => {
  const availableServices = [
    {
      id: "1",
      service: "Destination Drive",
      icon: "car-outline",
      cost: "$40/m (Rs. 3000)",
      details:
        "Each Destination Drive provided at $40 (Rs. 3000) – Total of less than 3 hours and limited to 2 patrons; Driving done in a small sedan so luggage should be appropriate. No more than 2 people allowed. Each extra person will be a $10 (Rs. 800) extra charge; Driving hours between 7 am and 10 pm. Surge pricing (1.5x basic charge applied outside the normal driving hours); For larger cars, an extra fixed levy of $20 (Rs. 1600) applied. Each extra hour of driving will be charged at $15 (Rs. 1200).",
    },
    {
      id: "2",
      service: "House Check",
      icon: "home-outline",
      cost: "$10/m (Rs. 800)",
      details:
        "Each extra house check provided at $10 (Rs. 800). House checks will be done during normal business hours (between 10 am and 6 pm only). Any house check done outside of business hours will incur a Surge pricing charge (1.5x basic charge).",
    },
    {
      id: "3",
      service: "Errand Run",
      icon: "cart-outline",
      cost: "$20/m (Rs. 1500)",
      details:
        "Each errand run provided at $20 (Rs. 1500) – Total of less than 2 hours.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6 md:px-16 lg:px-24">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-serif text-gray-800 mb-4">
          Services We Offer
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
          We offer a range of services designed to meet your needs and ensure
          your comfort. Explore our offerings below.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {availableServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service.service}
            icon={service.icon}
            cost={service.cost}
            details={service.details}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesComponent;
