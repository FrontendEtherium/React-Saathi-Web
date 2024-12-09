import React from "react";
import YoungBoy from "../../../assets/images/YoungBoy.webp";
function SaathiServices() {
  return (
    <section className="relative bg-cover bg-center py-16 px-6 md:px-16 lg:px-24 flex items-center justify-center text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={YoungBoy} // Replace with the actual path to your image
          alt="Happy Family"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-default opacity-30 rounded-lg"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center md:text-left">
        <div className="mb-8 md:mb-0 md:max-w-2xl mx-auto">
          <p className="text-xl tracking-wider text-white mb-6 leading-relaxed font-serif mt-52 text-center animate-fade-in">
            Saathi provides a wide range of services to make life easier for
            your loved ones and give you peace of mind. Whether it&apos;s
            providing emotional support, managing daily tasks, or making sure
            health needs are met, we are here to help.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SaathiServices;
