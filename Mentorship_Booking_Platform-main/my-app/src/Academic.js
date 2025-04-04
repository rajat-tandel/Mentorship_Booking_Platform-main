import React, { useState,useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./HomePageDashboard.css";

function Academic() {
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
      name: "Dr. Alice Williams",
      title: "Education Consultant",
      experience: "12+ years",
      rating: "⭐⭐⭐⭐⭐",
      bio: "Guiding students in academic success and research projects.",
      image: "/woman.png",
      zoom_link: "https://zoom.us/academic-alice"
    },
    {
      name: "Michael Lee",
      title: "Scholarship Advisor",
      experience: "8+ years",
      rating: "⭐⭐⭐⭐",
      bio: "Helping students secure top scholarships and funding.",
      image: "/man.png",
      zoom_link: "https://zoom.us/academic-michael"
    },
    {
      name: "Sophia Martinez",
      title: "Study Skills Coach",
      experience: "10+ years",
      rating: "⭐⭐⭐⭐⭐",
      bio: "Improving study techniques for better academic performance.",
      image: "/woman.png",
      zoom_link: "https://zoom.us/academic-sophia"
    },
    {
      name: "Daniel Kim",
      title: "Test Prep Expert",
      experience: "7+ years",
      rating: "⭐⭐⭐⭐",
      bio: "Specialist in SAT, GRE, and competitive exam preparation.",
      image: "/man.png",
      zoom_link: "https://zoom.us/academic-daniel"
    },
    {
      name: "Jessica Brown",
      title: "Research Mentor",
      experience: "9+ years",
      rating: "⭐⭐⭐⭐⭐",
      bio: "Helping students conduct research and publish papers.",
      image: "/woman.png",
      zoom_link: "https://zoom.us/academic-jessica"
    },
  ];

  const handleScheduleClick = (mentor) => {
    setSelectedMentor(mentor);
    setShowModal(true);
  };

  const handleConfirmSchedule = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("http://localhost:8000/api/auth/add-meeting/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userData.id,
          mentor_name: selectedMentor.name,
          mentor_section: "Academic",
          mentee_email: userData.email,
          meeting_time: selectedDate.toISOString(),
          zoom_link: selectedMentor.zoom_link,
        }),
      });

      if (response.ok) {
        setConfirmationMsg(
          `✅ Meeting scheduled with ${selectedMentor.name} on ${selectedDate.toLocaleString()}`
        );
      } else {
        setConfirmationMsg("❌ Failed to schedule meeting. Please try again.");
      }
    } catch (error) {
      setConfirmationMsg("❌ Error occurred while scheduling meeting.");
    }
    setShowModal(false);
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

      <section className="academic-content">
        <h1>Academic & Study Abroad Guidance</h1>
      </section>

      {confirmationMsg && <p style={{ color: "green", textAlign: "center" }}>{confirmationMsg}</p>}

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
              <button className="confirm-btn" onClick={handleConfirmSchedule}>Confirm</button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
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

export default Academic;
