import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./Loginpage.css";
import logo from "./Logo.png";
import bgImage from "./Image1.png";

function Loginpage() {
  const navigate = useNavigate();

  const [LoginpageForm, setLoginpageForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    
  });

  const [errorMessage, setErrorMessage] = useState("");

  const isLoginpageFormValid = Object.values(LoginpageForm).every(
    (field) => field.trim() !== ""
  );

  const handleLoginpageChange = (e) => {
    setLoginpageForm({ ...LoginpageForm, [e.target.name]: e.target.value });
  };

  const handleLoginpageRegister = async () => {
    if (!isLoginpageFormValid) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginpageForm),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/signin"); // Redirect after successful registration
      } else {
        setErrorMessage(data.message || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="Loginpage-container">
      <div className="Loginpage-left">
        {/* Logo with Home Page Link */}
        <Link to="/">
          <img src={logo} alt="Logo" className="Loginpage-logo cursor-pointer" />
        </Link>

        <div className="Loginpage-form-container">
          <div className="Loginpage-form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              onChange={handleLoginpageChange}
            />
          </div>

          <div className="Loginpage-form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              onChange={handleLoginpageChange}
            />
          </div>

          <div className="Loginpage-form-group">
  <label>Email</label>
  <input
    type="email"
    name="email"
    placeholder="Enter your email"
    onChange={(e) => {
      const email = e.target.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

      if (emailRegex.test(email)) {
        handleLoginpageChange(e); // Only call the function if email is valid
      } else {
        console.log("Invalid email format"); // You can show an error message instead
      }
    }}
  />
</div>


          <div className="Loginpage-form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleLoginpageChange}
            />
          </div>


          {errorMessage && <p className="Loginpage-error">{errorMessage}</p>}

          <button
            className="Loginpage-login-btn"
            disabled={!isLoginpageFormValid}
            onClick={handleLoginpageRegister}
          >
            Register
          </button>
        </div>
      </div>

      <div className="Loginpage-right">
        <img src={bgImage} alt="Background" className="Loginpage-background-image" />
      </div>
    </div>
  );
}

export default Loginpage;
