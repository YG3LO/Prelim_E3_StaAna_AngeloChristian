import React, { useState, useEffect } from "react";
import "../styles.css";
import defaultProfilePic from "../assets/default-profile.png"; 

function Profile({ user, setUser }) {
  const [newUser, setNewUser] = useState(user);
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tempProfilePic, setTempProfilePic] = useState(
    user.profilePicture || defaultProfilePic
  );

  // ✅ Load dark mode setting from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "enabled";
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
  }, []);

  // ✅ Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
    document.body.classList.toggle("dark-mode", newMode);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempProfilePic(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setTempProfilePic(defaultProfilePic); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...newUser, profilePicture: tempProfilePic });
    localStorage.setItem(
      "userSettings",
      JSON.stringify({ ...newUser, profilePicture: tempProfilePic })
    );
    setIsEditing(false);
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : ""}`}>
      {/* TOGGLE */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {!isEditing && (
        <div className="top-right-buttons">
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            <i className="fas fa-user-edit"></i> Edit Profile
          </button>
          <button className="btn-settings">
            <i className="fas fa-cog"></i> Settings
          </button>
        </div>
      )}

      {/* Profile View */}
      {!isEditing ? (
        <div className="profile-info">
          <img className="profile-picture" src={tempProfilePic} alt="Profile" />
          <p className="username">@{user.username || "No Username"}</p>
          <h3 className="full-name">{user.name || "No Name"}</h3>
        </div>
      ) : (
        <>
          <h2 className="text-center">Edit Profile</h2>

          <form onSubmit={handleSubmit}>
            <label>Upload Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />

            <div className="profile-picture-preview">
              <img className="preview-img" src={tempProfilePic} alt="Preview" />
            </div>

            <button
              type="button"
              className="btn-remove"
              onClick={handleRemovePhoto}
            >
              🗑 Remove Photo
            </button>

            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={newUser.username}
              onChange={handleChange}
            />

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
            />

            <div className="btn-container">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setIsEditing(false)}
              >
                ⬅ Cancel
              </button>
              <button type="submit" className="btn-update">
                Update
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Profile;
