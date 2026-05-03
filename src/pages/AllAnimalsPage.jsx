import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/Animals/AnimalCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';

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
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 className="section-title">All Animals for Qurbani</h1>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="default">Default Order</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="grid">
        {filteredAnimals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No animals found.</p>
        </div>
      )}
    </div>
  );
};

export default AllAnimalsPage;