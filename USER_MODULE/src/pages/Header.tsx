import React, { useState } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown
} from "react-icons/fi";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        {/* <div className="text-2xl font-bold text-indigo-600">PGSoftware</div> */}

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Features</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Pricing</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">About</a>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-gray-700 hover:text-indigo-600 font-medium focus:outline-none"
            >
              More <FiChevronDown className="ml-1" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Help Center</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Careers</a>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Home</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Features</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Pricing</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">About</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Help Center</a>
          <a href="#" className="block text-gray-700 hover:text-indigo-600 font-medium">Careers</a>
        </div>
      )}
    </header>
  );
};

export default Header;
