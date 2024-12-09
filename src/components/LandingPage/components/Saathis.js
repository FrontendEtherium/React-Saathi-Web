import React from "react";

const SaathiCard = ({ name, role, description, Image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-50">
      <div className="relative w-32 h-32 mb-4">
        <img
          src={Image}
          alt={name}
          className="w-full h-full rounded-full object-cover border-4 border-gray-300"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
      <p className="text-sm text-indigo-600 font-medium mb-3">{role}</p>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </div>
  );
};

const SaathisSection = () => {
  const saathis = [
    {
      id: "1",
      name: "Rajesh Kumar",
      role: "Healthcare Assistant",
      description:
        "Rajesh is dedicated to providing top-notch healthcare services with compassion and care.",
      Image: "https://randomuser.me/api/portraits/men/75.jpg",
    },
    {
      id: "2",
      name: "Anita Singh",
      role: "Emotional Support Specialist",
      description:
        "Anita offers a friendly ear and emotional support, helping clients navigate life's challenges.",
      Image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      id: "3",
      name: "Suresh Patil",
      role: "Errands Helper",
      description:
        "Suresh assists with daily errands, ensuring that your tasks are completed on time, every time.",
      Image: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      id: "4",
      name: "Geeta Sharma",
      role: "Housekeeping Assistant",
      description:
        "Geeta keeps your home clean and organized, providing a stress-free living environment.",
      Image: "https://randomuser.me/api/portraits/women/85.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-6 md:px-16 lg:px-24">
      <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
        Meet Our Saathis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {saathis.map((saathi) => (
          <SaathiCard
            key={saathi.id}
            name={saathi.name}
            role={saathi.role}
            description={saathi.description}
            Image={saathi.Image}
          />
        ))}
      </div>
    </section>
  );
};

export default SaathisSection;
