import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSignIn = async () => {
    if (!isFormValid) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📥 Full API Response:", data);

      if (response.ok) {
        console.log("✅ Login successful!");

        if (data.user) {
          console.log("📦 Storing user data:", data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          console.warn("⚠️ No user data in API response!");
        }

        navigate("/homepagedashboard");
      } else {
        setErrorMessage(data.message || "Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      console.error("❌ Error:", error);
    }
  };

  // ✅ Handle Google Sign-In with immediate user fetch
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      let firstName = user.displayName
        ? user.displayName.split(" ")[0]
        : prompt("Enter your first name:");
      let lastName = user.displayName
        ? user.displayName.split(" ").slice(1).join(" ") || prompt("Enter your last name:")
        : prompt("Enter your last name:");

      // ✅ Register Google user to Django backend
      await fetch("http://127.0.0.1:8000/api/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: user.email,
          password: "google_oauth",
        }),
      });

      // ✅ Immediately fetch the user with ID after registration
      const userResponse = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, password: "google_oauth" }),
      });

      const userData = await userResponse.json();
      console.log("📥 Fetched user after registration:", userData);

      if (userData.user) {
        localStorage.setItem("user", JSON.stringify(userData.user));
        navigate("/homepagedashboard");
      } else {
        setErrorMessage("Could not fetch user data after Google sign-in.");
      }
    } catch (error) {
      console.error("❌ Google Sign-In Error:", error);
      setErrorMessage("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <div className="logo-container">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="logo" />
          </Link>
        </div>

        <div className="signin-box">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          {errorMessage && <p className="signin-error">{errorMessage}</p>}

          <button
            className={`signin-button ${isFormValid ? "active" : "disabled"}`}
            disabled={!isFormValid}
            onClick={handleSignIn}
          >
            Sign In
          </button>

          <div className="divider">
            <hr />
            <span>OR</span>
            <hr />
          </div>

          {/* ✅ Google Sign-In Button */}
          <button className="google-button" onClick={handleGoogleSignIn}>
            <img src="/google-icon.png" alt="Google" className="google-icon" />
            Sign in with Google
          </button>

          <p className="signup-link">
            Don’t have an account?
            <Link to="/signup"> Sign up</Link>
          </p>
        </div>
      </div>

      <div className="signin-right">
        <img
          src="/background-image.png"
          alt="Background"
          className="background-image"
        />
      </div>
    </div>
  );
}

export default Signin;
