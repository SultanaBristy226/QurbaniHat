import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import toast from 'react-hot-toast';

const AnimalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    fetch('/animals.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(a => a.id === parseInt(id));
        if (found) {
          setAnimal(found);
        } else {
          navigate('/not-found');
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/not-found');
      });
  }, [id, navigate]);

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
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to book an animal');
      navigate('/login');
      return;
    }

    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.address) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success(`Successfully booked ${animal.name}! We'll contact you soon.`);
    
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
      <div className="container" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Animal Not Found</h2>
        <button onClick={() => navigate('/animals')} className="btn btn-primary">Browse Animals</button>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="animal-details-grid">
        {/* Left Column - Image & Details */}
        <div className="animal-details-left">
          <img src={animal.image} alt={animal.name} className="animal-details-img" />
          <div className="animal-info">
            <h1>{animal.name}</h1>
            <p><strong>Breed:</strong> {animal.breed}</p>
            <p><strong>Type:</strong> {animal.type}</p>
            <p><strong>Location:</strong>  {animal.location}</p>
            <p><strong>Weight:</strong>  {animal.weight} kg</p>
            <p><strong>Age:</strong>  {animal.age} years</p>
            <p><strong>Category:</strong> {animal.category}</p>
            <p><strong>Rating:</strong> ⭐ {animal.rating}/5 ({animal.reviews} reviews)</p>
            <p><strong>Description:</strong> {animal.description}</p>
            <div className="animal-price">Price: ৳{animal.price.toLocaleString()}</div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="booking-form">
          <h2>Book This Animal</h2>
          
          {!user ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Please login to book this animal</p>
              <button onClick={() => navigate('/login')} className="btn btn-primary">Login to Book</button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={bookingData.name} onChange={handleInputChange} required />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={bookingData.email} onChange={handleInputChange} required />
              </div>
              
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" value={bookingData.phone} onChange={handleInputChange} placeholder="01XXXXXXXXX" required />
              </div>
              
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea name="address" rows="4" value={bookingData.address} onChange={handleInputChange} placeholder="House #, Road #, Area, City" required></textarea>
              </div>
              
              <button type="submit" className="form-btn">Confirm Booking</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailsPage;