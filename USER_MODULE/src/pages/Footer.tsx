import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaEnvelope,
  } from "react-icons/fa";
  
  export default function Footer() {
    return (
      <footer className="bg-slate-800 text-slate-200 px-6 md:px-16 py-12">
        <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">PG Software</h2>
            <p className="text-slate-400 text-md leading-relaxed">
            Streamline your PG experience with seamless rent management, verified listings, and tenant tools—all in one place.
          </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-blue-500 transition"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
              <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
              <a href="#" className="hover:text-blue-600 transition"><FaLinkedinIn /></a>
            </div>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Services</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>
  
          {/* For Tenants */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">For Tenants</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-blue-400 transition">Browse PGs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Pay Rent</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">FAQs</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Support</a></li>
            </ul>
          </div>
  
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> Bangalore, India</li>
              <li className="flex items-center gap-2"><FaPhoneAlt /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><FaEnvelope /> support@pgsoftware.com</li>
            </ul>
          </div>
        </div>
  
        <div className="mt-10 border-t border-slate-700 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PGSoftware. All rights reserved.
        </div>
      </footer>
    );
  }
  