import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="text-3xl mr-2">🐮</span>
              QurbaniHat
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Your trusted platform for Qurbani animal bookings. We connect buyers with premium quality livestock across Bangladesh since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">How to Book</a></li>
              <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">Qurbani Guidelines</a></li>
              <li><a href="#" className="text-gray-300 hover:text-secondary transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center space-x-3">
                <FaPhone className="text-secondary" />
                <span>+880 1234 567890</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaWhatsapp className="text-secondary" />
                <span>+880 1234 567891</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaEnvelope className="text-secondary" />
                <span>info@qurbanihat.com</span>
              </p>
              <p className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-secondary" />
                <span>Dhaka, Bangladesh</span>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <motion.a whileHover={{ y: -5 }} href="#" className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-secondary transition-all">
                <FaFacebookF />
              </motion.a>
              <motion.a whileHover={{ y: -5 }} href="#" className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-secondary transition-all">
                <FaTwitter />
              </motion.a>
              <motion.a whileHover={{ y: -5 }} href="#" className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-secondary transition-all">
                <FaInstagram />
              </motion.a>
              <motion.a whileHover={{ y: -5 }} href="#" className="bg-white bg-opacity-20 p-3 rounded-full hover:bg-secondary transition-all">
                <FaYoutube />
              </motion.a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-400">Subscribe to our newsletter</p>
              <div className="flex mt-2">
                <input type="email" placeholder="Your email" className="px-3 py-2 rounded-l-lg text-dark flex-1" />
                <button className="bg-secondary px-4 py-2 rounded-r-lg hover:bg-opacity-90">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 QurbaniHat. All rights reserved. | Made with ❤️ for Qurbani</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;