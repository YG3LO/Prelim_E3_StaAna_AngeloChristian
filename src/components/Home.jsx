import React, { useState, useEffect } from "react";
import "../styles.css";
import {
  FaHome,
  FaUserEdit,
  FaCog,
  FaArrowLeft,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const defaultProfilePic = <FaUserCircle className="default-profile-icon" />; // Default profile

  const [profilePic, setProfilePic] = useState(null);
  const [tempProfilePic, setTempProfilePic] = useState(null);
  const [username, setUsername] = useState("USERNAME");
  const [name, setName] = useState("Full Name");
  const [tempUsername, setTempUsername] = useState(username);
  const [tempName, setTempName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  //Restriction
  const handleOpenEditProfile = () => {
    if (showSettings || showProfile) {
      alert("You must return to Home before editing your profile.");
      setShowSettings(false);
      setShowProfile(false);
      return;
    }
    setIsEditing(true);
  };

  const handleOpenProfile = () => {
    if (showSettings) {
      alert("Close Settings first before viewing the profile.");
      return;
    }
    setShowProfile(true);
  };

  const handleOpenSettings = () => {
    if (showProfile) {
      alert("Close Profile View first before opening Settings.");
      return;
    }
    setShowSettings(true);
  };

  useEffect(() => {
    setIsEditing(false);
  }, [location.pathname]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempProfilePic(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setTempProfilePic(null);
  };

  const handleUpdate = () => {
    setProfilePic(tempProfilePic);
    setUsername(tempUsername);
    setName(tempName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfilePic(profilePic);
    setTempUsername(username);
    setTempName(name);
    setIsEditing(false);
  };

  // Home
  const handleHomeClick = () => {
    setIsEditing(false);
    setShowProfile(false);
    setShowSettings(false);
    navigate("/");
  };

  return (
    <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="home-icon-container" onClick={handleHomeClick}>
          <FaHome className="home-icon" />
        </div>

        {!isEditing && (
          <div className="profile-container">
            <p className="username">{username}</p>
            <div className="profile-picture" onClick={handleOpenProfile}>
              {profilePic ? (
                <img src={profilePic} alt="Profile" />
              ) : (
                defaultProfilePic
              )}
            </div>
            <div className="profile-actions">
              <button
                className="edit-profile-btn"
                onClick={handleOpenEditProfile}
              >
                <FaUserEdit /> Edit Profile
              </button>
              <button className="settings-btn" onClick={handleOpenSettings}>
                <FaCog /> Settings
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Settings */}
      {showSettings && (
        <div className="settings-modal">
          <h2>Settings</h2>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider round"></span>
          </label>
          <p>{darkMode ? "Dark Mode" : "Light Mode"}</p>
          <button
            className="close-settings"
            onClick={() => setShowSettings(false)}
          >
            Close
          </button>
        </div>
      )}

      {/* Profile Preview */}
      {showProfile && (
        <div className="profile-preview">
          <button className="back-btn" onClick={() => setShowProfile(false)}>
            <FaArrowLeft /> Back
          </button>
          <div className="profile-info">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile"
                className="profile-preview-img large"
              />
            ) : (
              defaultProfilePic
            )}
            <h2>{name}</h2>
            <p>@{username}</p>
          </div>
        </div>
      )}

      {/* Edit Profile */}
      {isEditing && (
        <div className="edit-profile-modal">
          <h2>Edit Profile</h2>
          <label>Upload Profile Picture:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className="profile-picture-preview">
            {tempProfilePic ? (
              <img src={tempProfilePic} alt="Preview" />
            ) : (
              defaultProfilePic
            )}
          </div>
          <button className="remove-photo-btn" onClick={handleRemovePhoto}>
            <FaTrash /> Remove Photo
          </button>

          <label className="form-label">USERNAME</label>
          <input
            type="text"
            className="form-control dark-input"
            value={tempUsername}
            onChange={(e) => setTempUsername(e.target.value)}
          />
          <label className="form-label">FULLNAME</label>
          <input
            type="text"
            className="form-control dark-input"
            value={tempName}
            onChange={(e) => {
              const value = e.target.value;
              if (/^[A-Za-z\s]*$/.test(value)) {
                setTempName(value); // ✅ Only updates state if input is valid (no numbers)
              }
            }}
            placeholder="Enter your full name"
          />
          <div className="btn-container">
            <button className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn-update" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      )}

      {/* Welcome Text */}
      {!showProfile && !isEditing && !showSettings && (
        <div className="welcome-container">
          <h1>Welcome Users!</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
