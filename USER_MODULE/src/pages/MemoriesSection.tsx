import React from "react";

const sections = [
  {
    title: "FIND",
    highlight: "EASY",
    bgColor: "bg-[#ffe9cc]",
    image: "/png2.png",
    heading: "Discover your space",
    highlightText: "in just a few clicks, stress-free.",
    features: [
      "Filtered Listings",
      "Virtual Tours",
      "Location-Based Results",
      "Verified PGs",
      "Instant Booking",
    ],
  },
  {
    title: "BOND",
    highlight: "EASY",
    image: "/png4.png", // Make sure to place this image in your public folder
    bgColor: "bg-[#b4dad8]",
    heading: "Join & vibe",
    highlightText: "with a vibrant colourful community.",
    features: [
      "Choose Your Coliving Mates",
      "Social Calendar",
      "Events, Celebrations & Pop Ups",
      "Network & Collaborate",
      "Get Mentored",
    ],
  },
  {
    title: "LIVE",
    highlight: "EASY",
    image: "/png.png",
    bgColor: "bg-[#ffd3e0]",
    heading: "Feel at home",
    highlightText: "with comfy & modern living spaces.",
    features: [
      "Fully Furnished Rooms",
      "Wi-Fi, TV & AC",
      "24/7 Support",
      "Daily Cleaning",
      "Power Backup",
    ],
  },
];

export default function AlternatingCardSection() {
  return (
    <div className="bg-white px-6 md:px-20 py-20 space-y-28 ">
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;

        return (
          <div
            key={index}
            className={`flex flex-col ${
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            } items-center gap-10 md:gap-20`}
          >
            {/* Card Section */}
            <div
              className={`relative w-full md:w-1/2 h-[300px] md:h-[350px] rounded-[20px] ${section.bgColor} flex items-end px-8 py-6 hover:-skew-y-2 shadow-xl transition-all duration-100`}
            >
              
              {/* Text on Card */}
              <div className="z-10">
                <h2 className="text-5xl font-extralight text-white md:text-gray-800">
                  {section.title}
                </h2>
                <h2 className="text-5xl font-bold text-white md:text-gray-800">
                  {section.highlight}
                </h2>
              </div>

              {/* Image in Card */}
              <img
                src={section.image}
                alt={section.title}
                className="absolute h-[120%] drop-shadow-2xl object-contain bottom-0 right-10"
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                {section.heading}{" "}
                <span className="text-sky-500 font-bold">
                  {section.highlightText}
                </span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-gray-700 text-sm md:text-base">
                {section.features.map((feature, i) => (
                  <div key={i}>{feature}</div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
