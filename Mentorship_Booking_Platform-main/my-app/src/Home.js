import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [animated, setAnimated] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroTextRef = useRef(null);
  const middleTextRef = useRef(null);
  const lastTextRef = useRef(null);

  const sectionsRef = useRef([]);
  const missionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (heroTextRef.current) {
      observer.observe(heroTextRef.current);
    }

    if (middleTextRef.current) {
      observer.observe(middleTextRef.current);
    }

    if (lastTextRef.current) {
      observer.observe(lastTextRef.current);
    }

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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
  

  const handleDropdownClick = () => {
    setPopupText("Please log in to access this feature.");
    setShowPopup(true);
  };

  const AnimatedNumber = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (animated) {
        let start = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / value));

        const timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === value) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);
      }
    }, [animated, value]);
    

    return <span>{count}</span>;
  };
  const mentors = [
    { name: "John Doe", expertise: "Finance & Investment", image: "/human.png" },
    { name: "Sarah Smith", expertise: "Career & Job Guidance", image: "/woman1.jpg" },
    { name: "Michael Brown", expertise: "Business ", image: "/human2.png" },
    { name: "Emily Johnson", expertise: "Personal Growth", image: "/woman2.jpg" },
    { name: "David Lee", expertise: "Technology & Software", image: "/human3.jpg" },
    { name: "Sophia Miller", expertise: "Academics", image: "/woman3.jpg" },
  ];

  const handleNext = () => {
    if (currentIndex + 3 < mentors.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <a href="/">
            <img src="/logo.png" alt="MentorSpark Logo" />
          </a>
        </div>

        <div className="nav-links">
          <Link to="/AboutUsBefore">
            <button className="explore-btn"><strong>About Us</strong></button>
          </Link>

          <Link to="/ContactBefore">
            <button className="explore-btn"><strong>Contact</strong></button>
          </Link>

          <div 
            className="explore-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="explore-btn"><strong>Explore</strong></button>
            {showDropdown && (
              <div className="dropdown-menu">
                <a href="#" onClick={handleDropdownClick}>Finance & Investment</a>
                <a href="#" onClick={handleDropdownClick}>Career & Job Guidance</a>
                <a href="#" onClick={handleDropdownClick}>Business & Entrepreneurship</a>
                <a href="#" onClick={handleDropdownClick}>Personal Growth & Productivity</a>
                <a href="#" onClick={handleDropdownClick}>Technology & Software Development</a>
                <a href="#" onClick={handleDropdownClick}>Academics & Study Abroad Guidance</a>
              </div>
            )}
          </div>

          <Link to="/signin">
            <button className="login-btn"><strong>Get Started</strong></button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero animate-on-scroll fade-in" ref={(el) => sectionsRef.current[0] = el}>
        <div className="hero-text" ref={heroTextRef}>
          <h1>"Unlock Your Potential with Expert Mentorship"</h1>
          <h4>Ready to grow?</h4>
          <strong>Find Your Mentor Today</strong>
          <h5 className="highlight">• A simple 3-step process</h5>
          <div className="steps">
            <strong>
              <span>Find a Mentor → </span>
              <span>Book a Session → </span>
              <span>Grow Your Career</span>
            </strong>
          </div>
        </div>
        <div className="hero-image">
          <img src="/hero.png" alt="Mentorship illustration" />
        </div>
      </section>

      {/* Our Mission & Values Section */}
      <section className="mission-values animate-on-scroll" ref={missionRef}>
        <h2>Our Mission & Values</h2>
        <p>Empowering individuals through expert mentorship and knowledge-sharing.</p>

        <div className="values-container">
          <div className="value-box">
            <img src="/personal-development.png" alt="Commitment" />
            <h3>Commitment to Growth</h3>
            <p>We have empowered <AnimatedNumber value={1000} />+ mentees worldwide.</p>
          </div>
          <div className="value-box">
            <img src="/man.png" alt="Mentors" />
            <h3>Expert Mentors</h3>
            <p>Our platform connects you with <AnimatedNumber value={30} /> skilled professionals.</p>
          </div>
          <div className="value-box">
            <img src="/success.png" alt="Success" />
            <h3>Proven Success</h3>
            <p>Over <AnimatedNumber value={95} />% mentees achieved their goals.</p>
          </div>
        </div>
      </section>
      {/* Middle Section */}
      <section className="middle">
        <div className="middle-image">
          <img src="/mid.png" alt="Mentorship process" />
        </div>
        <div className="middle-text" ref={middleTextRef}>
          <h2>Why Choose Us?</h2>
          <ul>
            <li>✔ Get Personalized Mentorship</li>
            <li>✔ Verified & experienced mentors</li>
            <li>✔ Flexible scheduling</li>
          </ul>
        </div>
      </section>
      

      {/* Last Section */}
      <section className="last">
        <div className="last-text" ref={lastTextRef}>
          <h2>"Transform Your Career. With the Right Guidance."</h2>
        </div>
        <div className="last-image">
          <img src="/last.png" alt="Career growth illustration" />
        </div>
      </section>
      <section className="our-mentors">
        <h2>Meet Our Mentors</h2>
        <div className="mentorcard-container">
          {mentors.slice(currentIndex, currentIndex + 3).map((mentor, index) => (
            <div key={index} className="mentor-card-home">
              <img src={mentor.image} alt={mentor.name} />
              <h3>{mentor.name}</h3>
              <p>{mentor.expertise}</p>
            </div>
          ))}
        </div>

        <div className="carousel-buttons">
          {currentIndex > 0 && <button onClick={handlePrev} className="prev-btn">◄</button>}
          {currentIndex + 3 < mentors.length && <button onClick={handleNext} className="next-btn">►</button>}
        </div>
      </section>
      <div className="qote">
        <p><span>
            "From exploration to achievement, we're here to support you. Find mentors
            in any field and unlock your full potential."
            </span></p>
      </div>
      <footer className="footer animate-on-scroll" ref={(el) => sectionsRef.current[4] = el}>
  <div className="footer-content">
    <div className="footer-top">
      <div className="footer-left">
        <Link to="/AboutUsBefore">About Us</Link>
      </div>
      <div className="footer-center">
        <Link to="/ContactBefore">Contact Us</Link>
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
        <Link to="/TermsOfServiceBefore">Terms and Conditions</Link>
      </div>
      <div className="footer-right-privacy">
        <Link to="/PrivacyPolicyBefore">Privacy Policy</Link>
      </div>
    </div>
  </div>
</footer>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>{popupText}</h2>
            <button className="close-btn" onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
