import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import CommentForm from "../CommentsForm/commentsForm";  
import Login from "../../AuthService/login"; 
import {useNavigate } from "react-router-dom";


export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("accessToken"));
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close comment form when clicking outside
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
        <button className="home-button" onClick={() => navigate("/")}>
            Home
        </button>
          

          {/* Admin Controls - Only visible when authenticated */}
          {isAuthenticated && (
            <>
              <button className="admin-button" onClick={() => navigate("/manage-projects")}>
                Manage Projects
              </button>
              <button className="admin-button" >
                Manage Biography
              </button>
              <button className="admin-button" >
                Manage Contact Information
              </button>
              <button className="admin-button" onClick={() => navigate("/comments")}>
                Review Comments
              </button>
            </>
          )}

          <button className="comments-button" onClick={() => setShowForm(true)}>
            Leave a Comment
          </button>
          <Login />


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
