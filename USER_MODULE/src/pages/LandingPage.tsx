import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

export default function LandingPage() {
  return (
    <section className="bg-[#f5f7fa] text-gray-800 py-20 px-4 sm:px-8 md:px-16">
      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900">
            Discover Your <span className="text-blue-600">Perfect PG</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
            A seamless platform to explore verified PGs, manage your stay, and
            pay rent with ease — all from one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors text-lg font-semibold px-6 py-3 rounded-2xl shadow-md flex items-center justify-center">
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="border border-gray-400 text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-2xl text-lg transition-all">
              Learn More
            </button>
          </div>
          <div className="pt-10">
            <div className="w-full  max-w-2xl bg-white  rounded-lg px-6 py-4 shadow-lg flex items-center space-x-4 transition-all focus-within:ring-2 focus-within:ring-blue-400">
              <Search className="text-blue-600 w-6 h-6" />
              <input
                type="text"
                placeholder="Enter your city or location to find PGs..."
                className="w-full text-lg text-gray-800 placeholder-gray-500 focus:outline-none"
              />
              <button className="bg-gray-600 text-white px-7 py-2 rounded-full text-base font-semibold hover:bg-blue-700 transition-all">
                Search
              </button>
            </div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <img
            src="/img2.jpg"
            alt="PG Illustration"
            className="w-full h-auto rounded-3xl shadow-2xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
