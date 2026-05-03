import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>QurbaniHat</h3>
            <p>Your trusted platform for Qurbani animal bookings</p>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <p>📞 +880 1837499226</p>
            <p>✉️ info@qurbanihat.com</p>
            <p>📍 Dhaka, Bangladesh</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p><a href="/">Home</a></p>
            <p><a href="/animals">All Animals</a></p>
            <p><a href="/login">Login</a></p>
          </div>
          
          <div className="footer-section">
            <h3>Social Media</h3>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 QurbaniHat | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;