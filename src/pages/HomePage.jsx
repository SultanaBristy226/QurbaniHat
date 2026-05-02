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
    { title: "স্বাস্থ্য পরীক্ষা", desc: "পশুটি সুস্থ এবং টিকা দেওয়া আছে কিনা নিশ্চিত করুন" },
    { title: "আগাম বুকিং", desc: "কোরবানির অন্তত ৭ দিন আগে বুকিং দিন" },
    { title: "বিনামূল্যে ডেলিভারি", desc: "৫০ কিমি এর মধ্যে বিনামূল্যে ডেলিভারি" }
  ];

  const topBreeds = [
    { name: "দেশী গরু", region: "বগুড়া", rating: 5 },
    { name: "ফ্রিজিয়ান ক্রস", region: "ঢাকা", rating: 5 },
    { name: "ব্ল্যাক বেঙ্গল", region: "রাজশাহী", rating: 5 },
    { name: "শাহওয়াল গরু", region: "পাবনা", rating: 5 }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1>পবিত্র কোরবানির জন্য সেরা পশু</h1>
          <p>সুস্থ, পরিচর্যাকৃত এবং কোরবানির জন্য উপযোগী পশু সংগ্রহ করুন</p>
          <Link to="/animals" className="btn btn-outline">পশু ব্রাউজ করুন</Link>
        </div>
      </div>

      {/* Featured Animals */}
      <div className="container">
        <h2 className="section-title">বিশেষ পশুসমূহ</h2>
        <div className="grid">
          {animals.map(animal => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to="/animals" className="btn btn-primary">সব পশু দেখুন</Link>
        </div>
      </div>

      {/* Qurbani Tips Section */}
      <div className="tips-section">
        <div className="container">
          <h2 className="section-title">কোরবানির টিপস ও নির্দেশনা</h2>
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

      {/* Top Breeds Section */}
      <div className="container">
        <h2 className="section-title">বাংলাদেশের জনপ্রিয় জাত</h2>
        <div className="breeds-grid">
          {topBreeds.map((breed, index) => (
            <div key={index} className="breed-card">
              <div className="breed-rating">★★★★★</div>
              <h3>{breed.name}</h3>
              <p>{breed.region}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-section">
        <div className="container">
          <div className="why-choose-card">
            <h2>কেন কোরবানিহ্যাট?</h2>
            <div className="features-grid">
              <div>✓ ১০০% সুস্থ ও টিকা দেওয়া পশু</div>
              <div>✓ বিনামূল্যে ভেটেরিনারি চেকআপ</div>
              <div>✓ হোম ডেলিভারি সুবিধা</div>
              <div>✓ সেরা দামের গ্যারান্টি</div>
              <div>✓ ২৪/৭ কাস্টমার সাপোর্ট</div>
            </div>
            <div className="quran-quote">
              "আর প্রত্যেক উম্মতের জন্য কোরবানি নির্ধারণ করেছি, যাতে তারা আল্লাহর নাম উচ্চারণ করে"
              <br />
              <span>- সূরা আল-হজ্জ, ২২:৩৪</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;