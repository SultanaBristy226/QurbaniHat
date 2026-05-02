import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password && password.length >= 6) {
      toast.success('রেজিস্ট্রেশন সফল! এখন লগইন করুন');
      navigate('/login');
    } else if (password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
    } else {
      toast.error('সব তথ্য পূরণ করুন');
    }
  };

  const handleGoogleLogin = () => {
    const user = { name: 'গুগল ব্যবহারকারী', email: 'user@gmail.com' };
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('গুগল লগইন সফল!');
    navigate('/');
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>নতুন অ্যাকাউন্ট</h2>
        <p className="form-subtitle">রেজিস্টার করে কোরবানির পশু বুকিং করুন</p>
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>পূর্ণ নাম</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="আপনার নাম"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>ইমেইল ঠিকানা</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="আপনার ইমেইল"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>পাসওয়ার্ড</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="কমপক্ষে ৬ অক্ষর"
              required 
            />
          </div>
          
          <button type="submit" className="form-btn">রেজিস্টার করুন</button>
        </form>
        
        <button onClick={handleGoogleLogin} className="google-btn">
           গুগল দিয়ে রেজিস্টার করুন
        </button>
        
        <div className="form-footer">
          <p>ইতিমধ্যে অ্যাকাউন্ট আছে? <Link to="/login">লগইন করুন</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;