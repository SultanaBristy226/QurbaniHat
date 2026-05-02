import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>কোরবানিহাট</h3>
            <p>আপনার বিশ্বস্ত কোরবানির পশু সংগ্রহের প্ল্যাটফর্ম</p>
          </div>
          
          <div className="footer-section">
            <h3>যোগাযোগ</h3>
            <p>📞 +880 1234 567890</p>
            <p>✉️ info@qurbanihat.com</p>
            <p>📍 ঢাকা, বাংলাদেশ</p>
          </div>
          
          <div className="footer-section">
            <h3>লিংক</h3>
            <p><a href="/">হোম</a></p>
            <p><a href="/animals">সকল পশু</a></p>
            <p><a href="/login">লগইন</a></p>
          </div>
          
          <div className="footer-section">
            <h3>সোশ্যাল মিডিয়া</h3>
            <p>ফেসবুক</p>
            <p>টুইটার</p>
            <p>ইনস্টাগ্রাম</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 কোরবানিহাট | সর্বস্বত্ব সংরক্ষিত</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;