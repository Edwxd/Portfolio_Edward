import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import CommentForm from "../CommentsForm/commentsForm";  // Make sure this path is correct
import Login from "../../AuthService/login";  // Make sure this path is correct

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [showForm, setShowForm] = useState(false);  // Add state to control the visibility of CommentForm

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Function to toggle the visibility of the comment form
  const handleCommentButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <nav className="navbar">
      <div className="logo">Greetings Everyone</div>

      <div className={`dropdown ${dropdownOpen ? "open" : ""}`} ref={dropdownRef}>
        <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          Menu ▼
        </button>

        <div className="dropdown-menu">
          <button className="login-button">Login</button>
          <Login/>
          

          {/* Comment Button inside the Dropdown */}
          <button className="comments-button" onClick={handleCommentButtonClick}>
            Leave a Comment
          </button>
        </div>
      </div>

      {/* Comment Form Modal */}
      {showForm && (
        <div className="comment-form-overlay">
          <div className="comment-form-container">
            <CommentForm />
            <button className="close-button" onClick={handleCommentButtonClick}>
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
