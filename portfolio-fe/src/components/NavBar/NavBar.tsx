import React, { useState } from "react";
import "./NavBar.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">Greatings Everyone</div>

      <div className={`dropdown ${dropdownOpen ? "open" : ""}`}>
        <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          Menu ▼
        </button>

        <div className="dropdown-menu">
          <button className="login-button">Login</button>
          <button className="comments-button">Leave comments</button>
        </div>
      </div>
    </nav>
  );
}
