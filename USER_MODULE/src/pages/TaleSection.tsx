import React from "react";

export default function ZoTalesCard() {
  return (
    <div className="relative px-6 md:px-20 py-16">
      <div
        className="relative w-full h-[450px] rounded-3xl bg-[#c5f0ff] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12"
        style={{ transform: "skewY(-3deg)" }}
      >
        {/* Skew fix for internal content */}
        <div
          className="absolute inset-0 rounded-3xl z-0"
          style={{ transform: "skewY(3deg)", backgroundColor: "#c5f0ff" }}
        />

        {/* Image - positioned outside the bounds */}
        <div className="absolute left-0 bottom-0 z-10">
          <img
            src="/png3.png" // Replace with actual path
            alt="Selfie Girls"
            className="h-[500px] md:h-[580px]  object-contain"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full md:w-1/2 ml-auto text-center md:text-left mt-10 md:mt-0">
          <h2 className="text-3xl md:text-4xl text-gray-700 font-light">
            Let’s make some
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold text-sky-500 mt-2">
            Memories!
          </h1>
          <button className="mt-6 bg-sky-500 text-white text-xl font-semibold px-6 py-2 rounded-lg">
            Zo-Tales
          </button>
        </div>
      </div>
    </div>
  );
}
