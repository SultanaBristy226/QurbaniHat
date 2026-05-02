import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">🐮 QurbaniHat</Link>
        <div>
          <Link to="/">Home</Link>
          <Link to="/animals">Animals</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="btn" style={{background: 'red', marginLeft: '10px'}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;