import React, { useState,useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import "./HomePageDashboard.css";

function Contact() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [animated, setAnimated] = useState(false);
            const missionRef = useRef(null);
            const sectionsRef = useRef([]);
            useEffect(() => {
                  const observer = new IntersectionObserver(
                    (entries) => {
                      if (entries[0].isIntersecting && !animated) {
                        setAnimated(true);
                      }
                    },
                    { threshold: 0.5 }
                  );
              
                  if (missionRef.current) {
                    observer.observe(missionRef.current);
                  }
              
                  return () => {
                    if (missionRef.current) {
                      observer.unobserve(missionRef.current);
                    }
                  };
                }, [animated]);

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/homepagedashboard">
            <img src="/logo.png" alt="MentorSpark Logo" />
          </Link>
        </div>

      </nav>

      {/* About Us Section */}
      <section className="aboutus-content">
      <h1>Contact Us</h1>
<p>
  Get in touch with MentorSpark! Whether you have questions, feedback, or partnership 
  inquiries, we’d love to hear from you.
</p>
<p>
  📧 Email: support@mentorspark.com  
  📞 Phone: +1 234 567 890  
  📍 Address: 123 Mentor Lane, Knowledge City, 456789  
</p>
<p>
  Our support team is available Monday – Friday, 9 AM – 6 PM (EST).  
  You can also connect with us on LinkedIn, Facebook, Instagram, and YouTube.
</p>
      </section>

{/* Footer from Home.js */}
      <footer className="footer animate-on-scroll" ref={(el) => sectionsRef.current[4] = el}>
              <div className="footer-content">
                <div className="footer-top">
                  <div className="footer-left">
                    <Link to="/AboutUs">About Us</Link>
                  </div>
                  <div className="footer-center">
                    <Link to="/Contact">Contact Us</Link>
                  </div>
                  <div className="footer-right">
                    <div className="footer-social">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin.png" alt="LinkedIn" />
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <img src="/youtube.png" alt="YouTube" />
                      </a>
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="/facebook.png" alt="Facebook" />
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="/instagram.png" alt="Instagram" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="footer-divider"></div>
                
                <div className="footer-bottom">
                  <div className="footer-left-mentorspark">
                    <p>© 2025 MentorSpark. All rights reserved</p>
                  </div>
                  <div className="footer-center-terms">
                    <Link to="/TermsOfService">Terms and Conditions</Link>
                  </div>
                  <div className="footer-right-privacy">
                    <Link to="/PrivacyPolicy">Privacy Policy</Link>
                  </div>
                </div>
              </div>
            </footer>
    </div>
  );
}

export default Contact;
