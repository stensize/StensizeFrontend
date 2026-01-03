import React from "react";
import Services from "./components/Services";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

export default function App() {
  
  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
    hover: { y: -4, scale: 1.06 },
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white">
      <Header />
      <Home />      
      <Services cardVariants={cardVariants} />
      <Work cardVariants={cardVariants} />
      <About cardVariants={cardVariants} />
      <Contact />
      <Footer />
    </div>
  );
}
