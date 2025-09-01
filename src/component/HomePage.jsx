import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import "../style/homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = ApiService.getToken();
    const userRole = ApiService.getRole();
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    ApiService.clearAuth();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          🎓 Online Test
        </Link>
        <div className="nav-links">
          <Link to="/availabletests">📝 Available Tests</Link>
          <Link to="/leaderboard">🏆 Leaderboard</Link>
          <Link to="/profile">👤 Profile</Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Banner Section */}
      <div className="homepage-banner">
        <img src="src/assets/images/tpic.webp" alt="Online Test Banner" />
        <div className="banner-text">
          <h1>🎓 Online Test Platform</h1>
          <p>Practice · Learn · Improve</p>
        </div>
      </div>

      {/* Info Section */}
      <section className="homepage-info">
  <h2>✨ Why use this platform?</h2>
  <div className="info-grid">
    <div className="info-card">✔️ Take subject-wise tests</div>
    <div className="info-card">📊 Track your progress</div>
    <div className="info-card">🏆 Compete with friends on the leaderboard</div>
    <div className="info-card">⚡ Get instant results & insights</div>
    <div className="info-card">📈 Personalized performance analytics</div>
    <div className="info-card">💡 Practice with detailed explanations</div>
  </div>
</section>


      <footer className="homepage-footer">
        <p>© {new Date().getFullYear()} Online Test Platform. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;


