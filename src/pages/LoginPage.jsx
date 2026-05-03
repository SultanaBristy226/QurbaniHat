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
      toast.success('Login successful!');
      navigate('/');
    } else {
      toast.error('Please enter email and password');
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
        <h2>Welcome Back</h2>
        <p className="form-subtitle">Login to your account</p>
        
        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
              required 
            />
          </div>
          
          <button type="submit" className="form-btn">Login</button>
        </form>
        
        <button onClick={handleGoogleLogin} className="google-btn">
           Login with Google
        </button>
        
        <div className="form-footer">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;