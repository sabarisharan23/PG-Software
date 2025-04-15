import React, { useState, useEffect } from "react";
import { FiSearch, FiPenTool, FiMonitor, FiZap } from "react-icons/fi";
import AlternatingCardSection from "./MemoriesSection";
import ZoTalesCard from "./TaleSection";
import PGShowcase from "./PgShowcase";

const carouselItems = [
  {
    heading: "Live close, live better.",
    subheading:
      "Find homes near your college or office. Say goodbye to traffic and hello to comfort.",
    description:
      "Choose from premium, fully-managed co-living spaces designed for young professionals and students. Affordable, stylish, and stress-free.",
    placeholder: "Search your location...",
    image: "/heroImage9.png",
    features: [
      { label: "Illustration", position: "top-96 right-16 " },
      { label: "Graphic Design", position: "top-1/2 right-0" },
      { label: "Creative Branding", position: "bottom-80 right-16" },
    ],
  },
  {
    heading: "Zero brokerage. Zero headache.",
    subheading:
      "Move into fully-managed homes without paying a bomb. No hidden charges. No middlemen.",
    description:
      "Transparent pricing, all-inclusive amenities, and a vibrant community—your new life begins here.",
    placeholder: "Start your search...",
    image: "/heroImage8.png",
    features: [
      { label: "Flexible Terms", position: "top-96 right-16" },
      { label: "All-inclusive Bills", position: "top-1/2 right-0" },
      { label: "Prime Locations", position: "bottom-80 right-16" },
    ],
  },
  {
    heading: "Your perfect co-living space.",
    subheading:
      "Find a place that fits your vibe. From studios to shared pads, we’ve got it all.",
    description:
      "Modern interiors, dedicated support, and all the space you need to grow and connect.",
    placeholder: "Enter your city...",
    image: "/heroImage11.png",
    features: [
      { label: "Studio Units", position: "top-96 right-16" },
      { label: "Shared Rooms", position: "top-1/2 right-0" },
      { label: "Social Spaces", position: "bottom-80 right-16" },
    ],
  },
];

// Icon selector
const getFeatureIcon = (label: string) => {
  switch (label) {
    case "Illustration":
      return <FiPenTool />;
    case "Graphic Design":
      return <FiMonitor />;
    case "Creative Branding":
      return <FiZap />;
    default:
      return <FiZap />;
  }
};

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const { heading, subheading, description, placeholder, image, features } =
    carouselItems[currentIndex];

  return (
    <>
      <section className="relative w-full overflow-hidden px-6 md:px-20">
        {/* Background glow effect */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#00BFFF]/10 rounded-full z-0 blur-2xl"></div>
        <div className="absolute top-[30%] right-[5%] w-[400px] h-[400px] bg-purple-300/20 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-cyan-200/30 rounded-full blur-2xl z-0"></div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between ">
          {/* Text Section */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#111827] leading-tight">
              {heading}
            </h1>
            <p className="text-xl text-gray-700">{subheading}</p>
            <p className="text-base text-gray-600">{description}</p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center md:justify-start">
              <button className="px-6 py-3 bg-[#6366f1] text-white rounded-full font-medium shadow-md hover:bg-[#4f46e5] transition">
                Let’s Talk
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium shadow-sm hover:bg-gray-100 transition">
                Start Project
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-6 mt-10 justify-center md:justify-start">
              <div>
                <h3 className="text-2xl font-bold text-[#111827]">15+</h3>
                <p className="text-sm text-gray-500">years experience</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#111827]">26K</h3>
                <p className="text-sm text-gray-500">projects success</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#111827]">98%</h3>
                <p className="text-sm text-gray-500">satisfied rate</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl  mt-14">
              <div className="flex items-center bg-white px-6 py-4 rounded-full shadow-md border border-gray-200">
                <FiSearch className="text-gray-400 text-xl mr-3" />
                <input
                  type="text"
                  className="flex-1 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder={placeholder}
                />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-start items-start  w-full md:w-1/2  min-h-[500px] md:min-h-[1000px]">
            <div className=" w-full max-w-5xl aspect-square ">
              <img
                src={image}
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover drop-shadow-2xl transition-all duration-700"
              />

              {/* Floating feature tags with icons */}
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`absolute ${feature.position} flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg text-sm font-medium text-gray-700`}
                >
                  <div className="w-6 h-6 bg-[#d1fae5] text-[#10b981] rounded-full flex items-center justify-center text-base">
                    {getFeatureIcon(feature.label)}
                  </div>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        {/* <div className="flex justify-center mt-6">
          {carouselItems.map((_, index) => (
            <span
              key={index}
              className={`h-3 w-3 mx-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-[#00BFFF]" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div> */}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-4 z-50 bg-[#25D366] p-3 rounded-full shadow-lg"
        >
          <img src="/whatsapp.svg" alt="WhatsApp" className="w-6 h-6" />
        </a>
      </section>

      {/* Other Sections */}
      <div>
        <AlternatingCardSection />
        <PGShowcase />
        <ZoTalesCard />
      </div>
    </>
  );
}
