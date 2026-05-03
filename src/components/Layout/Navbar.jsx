import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link" style={{ textDecoration: 'none', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.8rem' }}>🐮</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            Qurbani<span style={{ color: '#C49A6C' }}>Hat</span>
          </span>
        </div>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/animals">All Animals</Link>
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;