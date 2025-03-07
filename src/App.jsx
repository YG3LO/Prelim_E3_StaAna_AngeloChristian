import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

function App() {
  // Load dark mode
  const [user, setUser] = useState(() => {
    const savedSettings = JSON.parse(localStorage.getItem("userSettings"));
    return (
      savedSettings || {
        name: "John Doe",
        settings: { darkMode: false },
      }
    );
  });

  // Save to localStorage when changes
  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <div className={user.settings.darkMode ? "dark-mode" : "light-mode"}>
        {/* Navbar with Background */}
        <nav
          className={`navbar navbar-expand-lg ${
            user.settings.darkMode ? "bg-dark" : "bg-primary"
          } p-3`}
        >
          <Link className="navbar-brand text-white" to="/">
            Home
          </Link>
          <Link className="nav-link text-white" to="/profile">
            Profile
          </Link>
          <Link className="nav-link text-white" to="/settings">
            Settings
          </Link>
        </nav>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />
            <Route
              path="/settings"
              element={<Settings user={user} setUser={setUser} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
