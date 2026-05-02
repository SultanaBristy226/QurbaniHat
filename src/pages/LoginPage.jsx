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

  return (
    <div className="form-container">
      <h2 className="text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
      </form>
      <p className="text-center mt-20">No account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginPage;