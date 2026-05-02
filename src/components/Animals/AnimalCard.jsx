import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaWeightHanging, FaCalendarAlt, FaRupeeSign, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AnimalCard = ({ animal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg card-hover"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={animal.image} 
          alt={animal.name} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {animal.type}
        </div>
        <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          {animal.rating} ({animal.reviews})
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-dark mb-2">{animal.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{animal.breed}</p>
        
        <div className="space-y-2 mb-4">
          <p className="flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-secondary mr-2" />
            {animal.location}
          </p>
          <p className="flex items-center text-gray-600 text-sm">
            <FaWeightHanging className="text-secondary mr-2" />
            {animal.weight} kg
          </p>
          <p className="flex items-center text-gray-600 text-sm">
            <FaCalendarAlt className="text-secondary mr-2" />
            {animal.age} years
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-primary">
            ৳{animal.price.toLocaleString()}
          </p>
        </div>
        
        <Link 
          to={`/animal/${animal.id}`}
          className="block text-center bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-all"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default AnimalCard;