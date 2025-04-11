import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import AlternatingCardSection from "./MemoriesSection";
import ZoTalesCard from "./TaleSection";
import FeaturedListings from "./Features";
import PGShowcase from "./PgShowcase";

const carouselItems = [
  {
    heading: "Live close, live better.",
    subheading:
      "Find homes near your college or office. Say goodbye to traffic and hello to comfort.",
    description:
      "Choose from premium, fully-managed co-living spaces designed for young professionals and students. Affordable, stylish, and stress-free.",
    placeholder: "Search your location...",
    image: "/heroImage.jpg",
  },
  {
    heading: "Zero brokerage. Zero headache.",
    subheading:
      "Move into fully-managed homes without paying a bomb. No hidden charges. No middlemen.",
    description:
      "Transparent pricing, all-inclusive amenities, and a vibrant community—your new life begins here.",
    placeholder: "Start your search...",
    image: "/heroImage1.jpg",
  },
  {
    heading: "Your perfect co-living space.",
    subheading:
      "Find a place that fits your vibe. From studios to shared pads, we’ve got it all.",
    description:
      "Modern interiors, dedicated support, and all the space you need to grow and connect.",
    placeholder: "Enter your city...",
    image: "/heroImage2.jpg",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { heading, subheading, description, placeholder, image } =
    carouselItems[currentIndex];

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#F0F9FF] overflow-hidden px-4 md:px-20 py-16">
        {/* Background Circle */}
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-[#00BFFF]/20 rounded-full z-0 blur-2xl" />

        {/* Hero Section Container */}
        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-16">
          {/* Text Section */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] leading-tight">
              {heading}
            </h1>
            <p className="text-xl text-gray-700">{subheading}</p>
            <p className="text-base text-gray-600">{description}</p>
          </div>

          <div className="w-full md:max-w-lg bg-white border border-gray-200 rounded-full flex items-center px-6 py-4 shadow-md focus-within:ring-2 ring-[#00BFFF]">
            <FiSearch className="text-gray-400 text-xl mr-3" />
            <input
              type="text"
              className="flex-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder={placeholder}
            />
          </div>
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-[500px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={image}
              alt="Hero"
              className="object-cover w-full h-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Bottom Area: Search & Dots */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 mt-10 md:mt-16">
          {/* Search Bar */}

          {/* Carousel Dots */}
          <div className="flex gap-2 mt-4 md:mt-0">
            {carouselItems.map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#00BFFF]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-4 z-50 bg-[#25D366] p-3 rounded-full shadow-lg"
        >
          <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
        </a>
      </div>
      <div>
        <AlternatingCardSection />
        <PGShowcase/>
        <ZoTalesCard />
        {/* <FeaturedListings/> */}
      </div>
    </>
  );
}
