import React from "react";
import "../styles.css";

function Settings({ user, setUser }) {
  const toggleDarkMode = () => {
    const newDarkMode = !user.settings.darkMode;
    setUser({ ...user, settings: { darkMode: newDarkMode } });

    // APPLY DARK MODE
    document.body.classList.toggle("dark-mode", newDarkMode);
  };

  return (
    <div className="settings-container text-center">
      <h2>Settings</h2>

      {/* Dark Mode Toggle Switch */}
      <div className="toggle-switch" onClick={toggleDarkMode}>
        <div className={`slider ${user.settings.darkMode ? "dark" : "light"}`}>
          <div className="circle"></div> {/* Circle */}
        </div>
      </div>
    </div>
  );
}

export default Settings;
