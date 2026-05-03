import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <img 
            src="/logo.png" 
            alt="QurbaniHat Logo" 
            className="logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'inline';
            }}
          />
          <span className="logo-text" style={{ display: 'inline' }}>Qurbani<span>Hat</span></span>
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/animals" className="nav-link">All Animals</Link>
          
          {user ? (
            <>
              <Link to="/profile" className="nav-link profile-link">
                <img 
                  src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&background=d4a373&color=0d3b2a`} 
                  alt={user.name} 
                  className="nav-avatar"
                />
                <span className="user-name">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          )}
        </div>
        
        <button className="mobile-menu-btn">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;