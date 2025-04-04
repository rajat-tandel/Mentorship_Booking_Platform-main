import React, { useState,useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePageDashboard.css";

function Finance() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [confirmationMsg, setConfirmationMsg] = useState("");
  const [loading, setLoading] = useState(false);
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

  const mentors = [
    {
      name: "John Doe",
      title: "Investment Analyst",
      experience: "5+ years",
      rating: "⭐⭐⭐⭐⭐",
      bio: "Expert in stock market investments and wealth management.",
      image: "/man.png",
    },
    {
      name: "Jane Smith",
      title: "Financial Advisor",
      experience: "7+ years",
      rating: "⭐⭐⭐⭐",
      bio: "Helping individuals achieve their financial goals.",
      image: "/woman.png",
    },
    {
      name: "David Johnson",
      title: "Wealth Manager",
      experience: "10+ years",
      rating: "⭐⭐⭐⭐⭐",
      bio: "Specialist in financial planning and asset management.",
      image: "/man.png",
    },
    {
      name: "Emily Brown",
      title: "Risk Analyst",
      experience: "6+ years",
      rating: "⭐⭐⭐⭐",
      bio: "Expert in financial risk assessment and market trends.",
      image: "/woman.png",
    },
    {
      name: "Michael Wilson",
      title: "Hedge Fund Manager",
      experience: "8+ years",
      rating: "⭐⭐⭐⭐⭐",
      bio: "Specialized in hedge fund strategies and portfolio management.",
      image: "/man.png",
    },
  ];

  const handleScheduleClick = (mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
  };

  const handleConfirmSchedule = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.id || !user.email) {
      alert("User not logged in or missing user ID/email");
      return;
    }
    if (!selectedMentor) {
      alert("No mentor selected");
      return;
    }

    const meetingData = {
      user_id: user.id,
      mentor_name: selectedMentor.name,
      mentee_email: user.email,
      meeting_time: selectedDate.toISOString(),
      zoom_link: "https://meet.google.com/txj-bpfu-osd",
    };

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/auth/add-meeting/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meetingData),
      });

      const data = await response.json();

      if (response.ok) {
        setConfirmationMsg(
          `✅ Meeting scheduled with ${selectedMentor.name} on ${selectedDate.toLocaleString()}`
        );
        setShowModal(false);
        setTimeout(() => setConfirmationMsg(""), 4000);
      } else {
        alert("❌ Unable to schedule meeting: " + data.message);
      }
    } catch (error) {
      console.error("Error scheduling meeting:", error);
      alert("❌ Failed to schedule meeting. Please check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <Link to="/homepagedashboard">
            <img src="/logo.png" alt="MentorSpark Logo" />
          </Link>
        </div>

        <div className="nav-links">
          <div
            className="explore-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="explore-btn"><strong>Explore</strong></button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/Finance">Finance & Investment</Link>
                <Link to="/Career">Career & Job Guidance</Link>
                <Link to="/Business">Business & Entrepreneurship</Link>
                <Link to="/PersonalGrowth">Personal Growth & Productivity</Link>
                <Link to="/Technology">Technology & Software Development</Link>
                <Link to="/Academic">Academics & Study Abroad Guidance</Link>
              </div>
            )}
          </div>

          <Link to="/Dashboard">
            <button className="dashboard-btn">
              <img src="/man.gif" alt="Dashboard Logo" className="dashboard-logo" />
            </button>
          </Link>
        </div>
      </nav>

      <section className="finance-content">
        <h1>Finance & Investment</h1>
      </section>

      {confirmationMsg && <div className="confirmation-message">{confirmationMsg}</div>}

      <div className="mentor-list">
        {mentors.map((mentor, index) => (
          <div className="mentor-card" key={index}>
            <div className="mentor-image">
              <img src={mentor.image} alt={mentor.name} />
            </div>
            <div className="mentor-details">
              <h2>{mentor.name}</h2>
              <p><strong>{mentor.title}</strong></p>
              <p>Experience: {mentor.experience}</p>
              <p>Ratings: {mentor.rating}</p>
              <p>{mentor.bio}</p>
            </div>
            <button className="schedule-btn" onClick={() => handleScheduleClick(mentor)}>
              Schedule Meeting
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Schedule Meeting with {selectedMentor.name}</h2>
            <p>Select date and time:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
            />
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleConfirmSchedule} disabled={loading}>
                {loading ? "Scheduling..." : "Confirm"}
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Finance;
