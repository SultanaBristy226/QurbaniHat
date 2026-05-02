import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { FaMapMarkerAlt, FaWeightHanging, FaCalendarAlt, FaRupeeSign, FaStar, FaUser, FaEnvelope, FaPhone, FaMapPin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AnimalDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    // Fetch animal data from JSON file
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        const foundAnimal = data.find(a => a.id === parseInt(id));
        setAnimal(foundAnimal);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading animal:', error);
        setLoading(false);
      });
  }, [id]);

  // Auto-fill booking form if user is logged in
  useEffect(() => {
    if (user) {
      setBookingData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast.error('Please login to book an animal');
      navigate('/login');
      return;
    }

    // Validate form fields
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    // Validate phone number (Bangladeshi format)
    const phoneRegex = /^(01[3-9]\d{8})$/;
    if (!phoneRegex.test(bookingData.phone)) {
      toast.error('Please enter a valid Bangladeshi phone number (e.g., 017xxxxxxxx)');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Show success message
    toast.success(`Successfully booked ${animal.name}! We'll contact you within 24 hours.`);
    
    // Reset form (keep name and email if user is logged in)
    setBookingData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '',
      address: ''
    });
  };

  if (loading) return <LoadingSpinner />;
  
  if (!animal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Animal Not Found</h2>
          <button onClick={() => navigate('/animals')} className="btn-primary">
            Browse Animals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image & Details */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="relative h-96 overflow-hidden">
                <img 
                  src={animal.image} 
                  alt={animal.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white px-4 py-2 rounded-full font-semibold">
                  {animal.type}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-dark mb-2">{animal.name}</h1>
                    <p className="text-gray-600 text-lg">{animal.breed}</p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="font-semibold">{animal.rating}</span>
                    <span className="text-gray-500 ml-1">({animal.reviews} reviews)</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
                  <div className="flex items-center text-gray-600">
                    <FaMapMarkerAlt className="text-secondary mr-3 text-lg" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold">{animal.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaWeightHanging className="text-secondary mr-3 text-lg" />
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-semibold">{animal.weight} kg</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="text-secondary mr-3 text-lg" />
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-semibold">{animal.age} years</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaRupeeSign className="text-secondary mr-3 text-lg" />
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-semibold">{animal.category}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3 text-dark">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{animal.description}</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary to-secondary text-white p-6 rounded-xl">
                  <p className="text-sm opacity-90 mb-2">Price</p>
                  <p className="text-4xl font-bold">৳{animal.price.toLocaleString()}</p>
                  <p className="text-sm opacity-90 mt-2">✓ Free health checkup included</p>
                  <p className="text-sm opacity-90">✓ Delivery available within 7 days</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Booking Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-dark mb-6 flex items-center">
                <span className="bg-primary w-1 h-8 rounded-full mr-3"></span>
                Book This Animal
              </h2>
              
              {!user ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🔒</div>
                  <p className="text-gray-600 mb-6">Please login to book this animal</p>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="btn-primary w-full"
                  >
                    Login to Book
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => navigate('/register')} 
                      className="text-primary font-semibold hover:underline"
                    >
                      Register here
                    </button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold flex items-center">
                      <FaUser className="mr-2 text-secondary" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold flex items-center">
                      <FaEnvelope className="mr-2 text-secondary" /> Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold flex items-center">
                      <FaPhone className="mr-2 text-secondary" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      required
                      placeholder="017xxxxxxxx"
                    />
                    <p className="text-xs text-gray-500 mt-1">Enter a valid Bangladeshi phone number</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold flex items-center">
                      <FaMapPin className="mr-2 text-secondary" /> Delivery Address
                    </label>
                    <textarea
                      name="address"
                      value={bookingData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      rows="4"
                      required
                      placeholder="House #, Road #, Area, City"
                    ></textarea>
                  </div>
                  
                  <div className="bg-light p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600">📋 Booking Summary</p>
                    <p className="font-semibold text-dark">{animal.name}</p>
                    <p className="text-primary font-bold">৳{animal.price.toLocaleString()}</p>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full btn-primary py-3 text-lg font-semibold"
                  >
                    Confirm Booking
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By confirming, you agree to our terms and conditions. 
                    We'll contact you within 24 hours to confirm your booking.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailsPage;