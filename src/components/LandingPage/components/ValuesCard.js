import React from "react";
import { FaHeart, FaMedkit, FaShieldAlt, FaComments } from "react-icons/fa";

const iconMap = {
  "heart-outline": FaHeart,
  "medkit-outline": FaMedkit,
  "shield-checkmark-outline": FaShieldAlt,
  "chatbubble-ellipses-outline": FaComments,
};

const Card = ({ icon, title, color, text }) => {
  const IconComponent = iconMap[icon];

  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl"
      style={{ backgroundColor: color }}
    >
      <div className="text-default text-4xl mb-4">
        <IconComponent />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default Card;
