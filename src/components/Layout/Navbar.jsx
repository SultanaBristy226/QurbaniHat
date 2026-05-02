import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaSheep, FaCow } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="text-4xl"
            >
              🐮
            </motion.div>
            <div>
              <span className="text-2xl font-bold text-primary">Qurbani</span>
              <span className="text-2xl font-bold text-secondary">Hat</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/animals" className="text-gray-700 hover:text-primary transition-colors font-medium">All Animals</Link>
            
            {user ? (
              <>
                <Link to="/my-profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary">
                  <img src={user.photo} alt={user.name} className="w-9 h-9 rounded-full border-2 border-primary" />
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login" className="btn-primary">Login</Link>
                <Link to="/register" className="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-white transition-all">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-primary py-2" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="/animals" className="text-gray-700 hover:text-primary py-2" onClick={() => setIsOpen(false)}>All Animals</Link>
                
                {user ? (
                  <>
                    <Link to="/my-profile" className="flex items-center space-x-2 text-gray-700 py-2" onClick={() => setIsOpen(false)}>
                      <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full" />
                      <span>{user.name}</span>
                    </Link>
                    <button onClick={handleLogout} className="text-red-600 text-left py-2">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-primary text-center" onClick={() => setIsOpen(false)}>Login</Link>
                    <Link to="/register" className="border-2 border-primary text-primary px-6 py-2 rounded-lg text-center" onClick={() => setIsOpen(false)}>Register</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;