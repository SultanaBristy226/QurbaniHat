import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/Animals/AnimalCard';
import SortControls from '../components/Animals/SortControls';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { motion } from 'framer-motion';

const AllAnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        setAnimals(data);
        setFilteredAnimals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let sorted = [...animals];
    if (sortOrder === 'lowToHigh') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredAnimals(sorted);
  }, [sortOrder, animals]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">All Animals for Qurbani</h1>
          <p className="text-gray-600 text-lg">Browse our complete collection of healthy livestock</p>
        </motion.div>

        <SortControls sortOrder={sortOrder} onSortChange={setSortOrder} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>

        {filteredAnimals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No animals found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllAnimalsPage;