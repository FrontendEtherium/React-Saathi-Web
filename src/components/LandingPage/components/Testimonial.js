"use client"
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ name, feedback, avatar, rating }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center text-center transform hover:scale-105 hover:shadow-2xl transition-transform duration-500"
      style={{
        transform: `translateY(${Math.random() * 20 - 10}px)`,
      }}
    >
      <img
        src={avatar}
        alt={name}
        className="w-24 h-24 rounded-full mb-4 shadow-md"
      />
      <h3 className="text-3xl font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-lg text-gray-600 mb-4">{feedback}</p>
      <div className="flex justify-center">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <FaStar key={i} className="text-yellow-400 text-xl" />
          ))}
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: "1",
      name: "John Doe",
      feedback: "This app has transformed the way I learn. The content is top-notch!",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      rating: 5,
    },
    {
      id: "2",
      name: "Jane Smith",
      feedback: "Absolutely love the interface. So easy to navigate and use!",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
    },
    {
      id: "3",
      name: "Michael Johnson",
      feedback: "The customer service is excellent. Highly recommend this app.",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
    },
    {
      id: "4",
      name: "Emily Davis",
      feedback: "A wonderful experience! The team is very supportive and helpful.",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      rating: 5,
    },
    {
      id: "5",
      name: "William Brown",
      feedback: "I really appreciate the quick responses and the attention to detail.",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      rating: 4,
    },
    {
      id: "6",
      name: "Sophia Wilson",
      feedback: "Fantastic! This app has everything I need, and the support is great.",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6 md:px-16 lg:px-24">
      <h2 className="text-5xl font-serif text-center text-gray-800 mb-16">
        What Our Users Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            style={{
              zIndex: testimonials.length - index, // Higher index testimonials overlap lower ones slightly
            }}
          >
            <TestimonialCard
              name={testimonial.name}
              feedback={testimonial.feedback}
              avatar={testimonial.avatar}
              rating={testimonial.rating}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
