// UserInfo.jsx
import React from "react";

function UserInfo({ name, username }) {
  return (
    <div className="user-info">
      <h3>@{username}</h3>
      <p>Name: {name}</p>
    </div>
  );
}

export default UserInfo;
