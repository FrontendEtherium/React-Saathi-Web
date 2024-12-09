import React, { useState } from "react";
import { FaStar, FaMedal, FaTrophy, FaRibbon } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import {load} from '@cashfreepayments/cashfree-js';
// Icon mapping
const iconMap = {
  "star-outline": FaStar,
  "medal-outline": FaMedal,
  "trophy-outline": FaTrophy,
  "ribbon-outline": FaRibbon,
};

// Subscription Card Component
// Subscription Card Component


// Main Page Component
const SubscriptionPage = () => {

  const packages = [
    {
      id: "1",
      title: "Basic",
      description: `• 1 hour phone call every week.\n• 1 monthly visit to the house.`,
      price: "Rs. 1575/m",
      icon: "star-outline",
      colors: ["rgba(186, 220, 188, 0.8)", "#4CAF50"], // Light mint green with dark green border
    },
    {
      id: "2",
      title: "Bronze",
      description: `• 1 hour phone call every week.\n• 2 monthly visits to the house.\n• 2 hours of running errands.`,
      price: "Rs. 2975/m",
      icon: "medal-outline",
      colors: ["rgba(255, 224, 178, 0.8)", "#FFA726"], // Soft peach with deep orange border
    },
    {
      id: "3",
      title: "Silver",
      description: `• 1 hour phone call every week.\n• 1 weekly visit to the house.\n• 4 hours of running errands.\n• 1 Destination drive (up to 4 hours).`,
      price: "Rs. 5100/m",
      icon: "trophy-outline",
      colors: ["rgba(178, 235, 242, 0.8)", "#00ACC1"], // Light aqua with dark teal border
    },
    {
      id: "4",
      title: "Gold",
      description: `• 1 hour phone call every week.\n• 1 weekly visit to the house.\n• 8 hours of running errands.\n• 2 Destination drives (up to 4 hours).`,
      price: "Rs. 8250/m",
      icon: "ribbon-outline",
      colors: ["rgba(244, 213, 178, 0.8)", "#FF9800"], // Light sand with burnt orange border
    },
  ];
const [session,setSession]=useState()
  const handlePayment =async ()=>{
    const cashfree = await load({
      mode: "sandbox" //or production
    });
    let checkoutOptions = {
      paymentSessionId: "session_epLxZlA8XOn4hXPh0vq0RWbXbq1zHX9c0g9Qmmd_UNDzyn9gEKLfpVV7jSwKX9QZgOLyxoPw2cISdc6QjdJNXu3BQQGtnKQuZGj0WPry4GWk",
      redirectTarget: "_self" //optional ( _self, _blank, or _top)
  }
  cashfree.checkout(checkoutOptions)  
  }
const SubscriptionCard = ({ title, description, price, icon, colors }) => {
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      className="rounded-md overflow-hidden shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-default hover:text-white group border-default border"
      style={{
        minHeight: "350px", // Set a minimum height to control card size
      }}
      whileHover={{ scale: 1.05 }} // Scale up on hover
      whileTap={{ scale: 0.95 }} // Scale down on tap/click
    >
      <div className="p-6 flex flex-col items-center text-center h-full">
        {" "}
        {/* Reduce padding */}
        <motion.div
          className="flex items-center justify-center mb-4 bg-white p-4 rounded-full shadow-lg" // Reduced padding
          whileHover={{ rotate: 360 }} // Rotate icon on hover
          transition={{ duration: 1 }}
        >
          <IconComponent className="text-5xl text-default" />{" "}
          {/* Reduce icon size */}
        </motion.div>
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white">
          {" "}
          {/* Adjust font size */}
          {title}
        </h3>
        <p className="text-sm text-default opacity-90 mb-4 whitespace-pre-line leading-relaxed group-hover:text-white">
          {description}
        </p>
        <div className="text-2xl font-bold mb-4 whitespace-pre-line text-default group-hover:text-white">
          {price}
        </div>
        <motion.button
          className="mt-auto px-6 py-2 bg-white text-default font-semibold rounded-full hover:bg-default hover:text-white transition-all duration-300 ease-in-out"
          whileHover={{ scale: 1.1 }} // Slightly enlarge button on hover
          whileTap={{ scale: 0.95 }} // Slightly reduce button size on tap
          onClick={handlePayment}
        >
         Subscribe Now
        </motion.button>
      </div>
    </motion.div>
  );
};
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-8 py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <motion.h1
        className="text-5xl font-serif text-center text-gray-800 mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Subscription Plans
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-7xl">
        {packages.map((pkg, index) => (
          <SubscriptionCard
            key={pkg.id}
            title={pkg.title}
            description={pkg.description}
            price={pkg.price}
            icon={pkg.icon}
            colors={pkg.colors}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
