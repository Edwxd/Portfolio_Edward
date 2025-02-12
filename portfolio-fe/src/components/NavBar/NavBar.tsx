import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import CommentForm from "../CommentsForm/commentsForm";  
import Login from "../../AuthService/login";  

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);  // Control the visibility of CommentForm
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to close the overlay when clicking outside
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setShowForm(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Greetings Everyone</div>

      <div className={`dropdown ${dropdownOpen ? "open" : ""}`} ref={dropdownRef}>
        <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          Menu ▼
        </button>

        <div className="dropdown-menu">
          <Login />
          <button className="comments-button" onClick={() => setShowForm(true)}>
            Leave a Comment
          </button>
        </div>
      </div>

      {/* Comment Form Overlay */}
      {showForm && (
        <div className="comment-form-overlay" onClick={handleOverlayClick}>
          <CommentForm onClose={() => setShowForm(false)} /> 
        </div>
      )}
    </nav>
  );
}
