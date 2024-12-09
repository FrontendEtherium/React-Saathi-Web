import React from "react";
import NavBar from "./components/NavBar";
import SaathiServices from "./components/SaathiService";
import SaathisSection from "./components/Saathis";
import SubscriptionPage from "./components/Subscription";
import TestimonialsSection from "./components/Testimonial";
import FAQSection from "./components/FaqSection";
import CardsSection from "./components/CardSection";
import Footer from "./components/Footer";
function HomePage() {
  return (
    <div>
      <NavBar />
      <SaathiServices />
      <CardsSection />
      <SaathisSection />
      <SubscriptionPage />
      {/* <TestimonialsSection/> */}
      <FAQSection />
      <Footer />
    </div>
  );
}

export default HomePage;
