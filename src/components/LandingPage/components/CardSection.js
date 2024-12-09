import React from "react";
import Card from "./ValuesCard";

const CardsSection = () => {
  const keyValues = [
    {
      icon: "heart-outline",
      title: "Companionship",
      color: "rgba(161, 214, 178, 0.4)",
      text: "Saathis are more than assistants – they're friends who reduce loneliness.",
    },
    {
      icon: "medkit-outline",
      title: "Professional Care",
      color: "rgba(206, 223, 159, 0.4)",
      text: "Our companions assist with conversations, tasks, and appointments.",
    },
    {
      icon: "shield-checkmark-outline",
      title: "Trust and Reliability",
      color: "rgba(241, 243, 194, 0.4)",
      text: "We keep you informed so you know your family is in good hands.",
    },
    {
      icon: "chatbubble-ellipses-outline",
      title: "Effective Communication",
      color: "rgba(232, 180, 184, 0.4)",
      text: "Clear, compassionate communication in every interaction.",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-gradient-to-r from-blue-50 to-indigo-50">
      {/* <h2 className="text-5xl font-serif text-center text-gray-800 mb-12">
        Our Core Values
      </h2> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {keyValues.map((item, index) => (
          <Card
            key={index}
            icon={item.icon}
            title={item.title}
            color={item.color}
            text={item.text}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsSection;
