import React, { useState } from "react";
import "../styles.css";

function ProfilePicture() {
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150"
  );

  // Handle file upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  return (
    <div className="profile-picture-container">
      <div className="profile-picture">
        <img src={profilePic} alt="Profile" className="rounded-circle" />
      </div>

      {/* Upload Button */}
      <label className="upload-btn">
        Change Profile
        <input type="file" onChange={handleFileChange} hidden />
      </label>
    </div>
  );
}

export default ProfilePicture;
