import React, { useState, useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const pastMeetings = ["Meeting with Alex", "Project Review", "Career Coaching"]; // static for now
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

  useEffect(() => {
    const userDataString = localStorage.getItem("user");

    if (!userDataString) {
      navigate("/"); // Redirect if not logged in
      return;
    }

    try {
      const userData = JSON.parse(userDataString);
      const firstName = userData?.first_name || userData?.firstName;

      if (firstName) {
        const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        setUserName(formattedName);
        fetchMeetings(userData.id);
      }
    } catch (error) {
      localStorage.removeItem("user");
      navigate("/");
    }
  }, []);

  const fetchMeetings = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/auth/get-meetings/${userId}/`);
      if (response.ok) {
        const meetings = await response.json();
        setUpcomingMeetings(meetings);
      } else {
        console.error("Failed to fetch meetings");
      }
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/homepagedashboard">
            <img src="/logo.png" alt="MentorSpark Logo" />
          </Link>
        </div>

        <div className="nav-links">
          <Link to="/HomePageDashboard">
              <button className="home-btn"><strong>Home</strong></button>
          </Link>
          <button className="logout-btn" onClick={handleLogout}>
            <strong>Logout</strong>
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <section className="dashboard-content">
        <h1>Welcome, {userName}!</h1>

        <div className="meeting-section">
          <h2>Upcoming Meetings</h2>
          <ul>
            {upcomingMeetings.length > 0 ? (
              upcomingMeetings.map((meeting, index) => (
                <li key={index} className="meeting-item">
                  <strong>{meeting.mentor_name}</strong> on{" "}
                  {new Date(meeting.meeting_time).toLocaleString()}
                  <br />
                  <a
                    href={meeting.zoom_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="join-meeting-btn"
                  >
                    ➡️ Join Meeting
                  </a>
                </li>
              ))
            ) : (
              <li>No upcoming meetings</li>
            )}
          </ul>
        </div>
      </section>
      <section>
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
            </section>
    </div>
    
  );
}

export default Dashboard;
