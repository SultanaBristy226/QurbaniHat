import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const user = { name: email.split('@')[0], email: email };
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('লগইন সফল!');
      navigate('/');
    } else {
      toast.error('ইমেইল এবং পাসওয়ার্ড দিন');
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
        <h2>স্বাগতম</h2>
        <p className="form-subtitle">আপনার অ্যাকাউন্টে লগইন করুন</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>ইমেইল ঠিকানা</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="আপনার ইমেইল দিন"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>পাসওয়ার্ড</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="পাসওয়ার্ড দিন"
              required 
            />
          </div>
          
          <button type="submit" className="form-btn">লগইন করুন</button>
        </form>
        
        <button onClick={handleGoogleLogin} className="google-btn">
           গুগল দিয়ে লগইন করুন
        </button>
        
        <div className="form-footer">
          <p>অ্যাকাউন্ট নেই? <Link to="/register">রেজিস্টার করুন</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;