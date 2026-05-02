import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import AnimalCard from '../components/Animals/AnimalCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { FaMosque, FaHandsHelping, FaQuran, FaStar, FaShieldAlt, FaTruck, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HomePage = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        setAnimals(data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch('https://assets2.lottiefiles.com/packages/lf20_kxsd2yfq.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => console.log('Animation not loaded'));
  }, []);

  const tips = [
    { icon: <FaShieldAlt />, title: "Health Check", desc: "Ensure animal is healthy and vaccinated" },
    { icon: <FaClock />, title: "Book Early", desc: "Book at least 7 days before Qurbani" },
    { icon: <FaTruck />, title: "Delivery", desc: "Free delivery within 50km radius" },
  ];

  const topBreeds = [
    { name: "Deshi Cow", region: "Bogura", rating: 4.9 },
    { name: "Frisian Cross", region: "Dhaka", rating: 4.8 },
    { name: "Black Bengal Goat", region: "Rajshahi", rating: 4.9 },
    { name: "Shahwal Cow", region: "Pabna", rating: 5.0 },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="container-custom py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-4 font-arabic">
                🐮 QurbaniHat
              </h1>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Find Your Perfect Qurbani Animal
              </h2>
              <p className="text-lg mb-8 opacity-90 leading-relaxed">
                Choose from our selection of premium quality cows and goats for Qurbani. 
                Healthy, well-fed, and ready for sacrifice with guaranteed satisfaction.
              </p>
              <Link to="/animals" className="inline-block bg-accent text-dark px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105">
                Browse Animals →
              </Link>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block"
            >
              {animationData && <Lottie animationData={animationData} loop={true} style={{ height: 400 }} />}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Animals */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Featured Animals</h2>
            <p className="text-gray-600 text-lg">Handpicked premium livestock for your Qurbani</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {animals.map(animal => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/animals" className="btn-primary text-lg px-8 py-3">
              View All Animals
            </Link>
          </div>
        </div>
      </section>

      {/* Qurbani Tips Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Qurbani Tips & Guidelines</h2>
            <p className="text-gray-600">Essential tips for a blessed Qurbani</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-light p-6 rounded-xl text-center"
              >
                <div className="text-4xl text-secondary mb-4 flex justify-center">{tip.icon}</div>
                <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Breeds Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Top Breeds in Bangladesh</h2>
            <p className="text-gray-600">Most popular and trusted breeds for Qurbani</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {topBreeds.map((breed, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(breed.rating) ? "text-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-dark mb-2">{breed.name}</h3>
                <p className="text-gray-600">{breed.region}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section - Why Choose Us */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose QurbaniHat?</h2>
                <ul className="space-y-3">
                  <li className="flex items-center">✓ 100% Healthy & Vaccinated Animals</li>
                  <li className="flex items-center">✓ Free Veterinary Checkup</li>
                  <li className="flex items-center">✓ Home Delivery Available</li>
                  <li className="flex items-center">✓ Best Price Guarantee</li>
                  <li className="flex items-center">✓ 24/7 Customer Support</li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-4">🕌</div>
                <p className="text-lg">"And for every nation we have appointed a rite [of sacrifice] that they may mention the name of Allah"</p>
                <p className="text-sm mt-2">- Surah Al-Hajj, 22:34</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;