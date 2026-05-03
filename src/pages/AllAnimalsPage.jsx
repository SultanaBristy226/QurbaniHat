import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/Animals/AnimalCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const AllAnimalsPage = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');

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
    let filtered = [...animals];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(animal => animal.category === selectedCategory);
    }
    
    // Sort by price
    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setFilteredAnimals(filtered);
  }, [sortOrder, selectedCategory, animals]);

  if (loading) return <LoadingSpinner />;

  const largeCount = animals.filter(a => a.category === 'Large Animal').length;
  const smallCount = animals.filter(a => a.category === 'Small Animal').length;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 className="section-title">All Animals for Qurbani</h1>
      <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#666' }}>
        Total {filteredAnimals.length} Animals Available
      </p>
      
      {/* Filter and Sort Controls */}
      <div className="filter-sort-container">
        <div className="filter-group">
          <label>Category: </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories ({animals.length})</option>
            <option value="Large Animal"> Large Animal ({largeCount})</option>
            <option value="Small Animal"> Small Animal ({smallCount})</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by: </label>
          <select 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="default">Default Order</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category Summary */}
      <div className="category-summary">
        <span className="category-badge large"> Large Animals: {largeCount}</span>
        <span className="category-badge small"> Small Animals: {smallCount}</span>
      </div>

      {/* Animals Grid */}
      <div className="grid">
        {filteredAnimals.map(animal => (
          <AnimalCard key={animal.id} animal={animal} />
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No animals found in this category.</p>
          <button 
            onClick={() => setSelectedCategory('all')} 
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            View All Animals
          </button>
        </div>
      )}
    </div>
  );
};

export default AllAnimalsPage;