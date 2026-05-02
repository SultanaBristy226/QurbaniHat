import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <img src="/logo.png" alt="Logo" className="logo-img" onError={(e) => e.target.style.display = 'none'} />
        <span>🐮 QurbaniHat</span>
      </Link>
      <div className="nav-links">
        <Link to="/">হোম</Link>
        <Link to="/animals">সকল পশু</Link>
        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <button onClick={handleLogout}>লগআউট</button>
          </>
        ) : (
          <>
            <Link to="/login">লগইন</Link>
            <Link to="/register">রেজিস্টার</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;