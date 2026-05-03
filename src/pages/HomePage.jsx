import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimalCard from '../components/Animals/AnimalCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const HomePage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        setAnimals(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const tips = [
    { title: "Health Check", desc: "Ensure the animal is healthy and vaccinated" },
    { title: "Book Early", desc: "Book at least 7 days before Qurbani" },
    { title: "Free Delivery", desc: "Free delivery within 50km radius" }
  ];

  const topBreeds = [
    { 
      name: "Deshi Cow", 
      region: "Bogura", 
      rating: 5,
      image: "/images/cow-deshi.jpg",
      description: "Local deshi cow, excellent meat quality"
    },
    { 
      name: "Frisian Cross", 
      region: "Dhaka", 
      rating: 5,
      image: "/images/cow-frisian.jpg",
      description: "High milk and meat production"
    },
    { 
      name: "Black Bengal", 
      region: "Rajshahi", 
      rating: 5,
      image: "/images/goat-black.jpg",
      description: "Famous for tender meat"
    },
    { 
      name: "Shahwal Cow", 
      region: "Pabna", 
      rating: 5,
      image: "/images/cow-shahwal.jpg",
      description: "Premium large sized cow"
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Mohammad Rahim",
      rating: 5,
      text: "Excellent service! The cow was very healthy and well maintained.",
      date: "January 15, 2024",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      location: "Dhaka"
    },
    {
      id: 2,
      name: "Fatema Begum",
      rating: 5,
      text: "Great experience. The goat was exactly as described. Very professional.",
      date: "January 10, 2024",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      location: "Chittagong"
    },
    {
      id: 3,
      name: "Karim Ullah",
      rating: 4,
      text: "Good quality animal at reasonable price. Will recommend.",
      date: "January 5, 2024",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      location: "Rajshahi"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Best Animals for<br />Sacred Qurbani</h1>
          <p>Healthy, well-cared, and ready for Qurbani. Best price, best quality.</p>
          <Link to="/animals" className="hero-btn">Browse Animals →</Link>
        </div>
      </div>

      {/* Featured Animals */}
      <div className="container">
        <h2 className="section-title">Featured Animals</h2>
        <div className="grid">
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to="/animals" className="btn btn-primary">View All 15 Animals →</Link>
        </div>
      </div>

      {/* Qurbani Tips Section */}
      <div className="tips-section">
        <div className="container">
          <h2 className="section-title">Qurbani Tips & Guidelines</h2>
          <div className="tips-grid">
            {tips.map((tip, index) => (
              <div key={index} className="tip-card">
                <h3>{tip.title}</h3>
                <p>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Breeds Section - ইমেজ সহ */}
      <div className="container">
        <h2 className="section-title">Top Breeds in Bangladesh</h2>
        <div className="breeds-grid">
          {topBreeds.map((breed, index) => (
            <div key={index} className="breed-card">
              <img src={breed.image} alt={breed.name} className="breed-image" />
              <div className="breed-rating">★★★★★</div>
              <h3>{breed.name}</h3>
              <p className="breed-region">{breed.region}</p>
              <p className="breed-description">{breed.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Testimonials Section */}
      <div className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Customer Testimonials</h2>
          <p className="section-subtitle">What our customers say about us</p>

          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                {/* Profile */}
                <div className="review-profile">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="review-avatar"
                  />
                  <div>
                    <h3 className="review-name">{review.name}</h3>
                    <p className="review-location">📍 {review.location}</p>
                  </div>
                </div>

                {/* Text */}
                <p className="review-text">“{review.text}”</p>

                {/* Stars */}
                <div className="review-stars">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="container">
          <div className="why-choose-card">
            <h2>Why Choose QurbaniHat?</h2>
            <div className="features-grid">
              <div>✓ 100% Healthy & Vaccinated Animals</div>
              <div>✓ Free Veterinary Checkup</div>
              <div>✓ Home Delivery Available</div>
              <div>✓ Best Price Guarantee</div>
              <div>✓ 24/7 Customer Support</div>
            </div>
            <div className="quran-quote">
              "And for every nation we have appointed a rite [of sacrifice] that they may mention the name of Allah"
              <br />
              <span>- Surah Al-Hajj, 22:34</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;