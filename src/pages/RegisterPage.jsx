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
      toast.success('Registration successful! Please login');
      navigate('/login');
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
    } else {
      toast.error('Please fill all fields');
    }
  };

  const handleGoogleLogin = () => {
    const user = { name: 'Google User', email: 'user@gmail.com' };
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Google login successful!');
    navigate('/');
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Create Account</h2>
        <p className="form-subtitle">Register to book Qurbani animals</p>
        
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your name"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Minimum 6 characters"
              required 
            />
          </div>
          
          <button type="submit" className="form-btn">Register</button>
        </form>
        
        <button onClick={handleGoogleLogin} className="google-btn">
           Register with Google
        </button>
        
        <div className="form-footer">
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;