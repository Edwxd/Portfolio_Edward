import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import CommentForm from "../CommentsForm/commentsForm";  
import Login from "../../AuthService/login"; 
import { useNavigate } from "react-router-dom";
import GoogleTranslateLoader from "../Translation/googleTranslation"
import { protectWords } from "../Translation/utils";


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

  const handleTranslate = (language: string) => {
    let attempts = 0;
    const maxAttempts = 10;
  
    const interval = setInterval(() => {
      const selectElement = document.querySelector("select.goog-te-combo");
  
      if (selectElement) {
        (selectElement as HTMLSelectElement).value = language;
        selectElement.dispatchEvent(new Event("change"));
        console.log(`Language switched to ${language}`);
        clearInterval(interval); // Stop retrying
      } else if (++attempts >= maxAttempts) {
        clearInterval(interval); // Stop after max attempts
        console.warn("Google Translate dropdown not found. Retrying...");
      }
    }, 500); // Retry every 500ms
  };

  return (
    <nav className="navbar">
      <div className="logo">Greetings Everyone</div>

      <div className={`dropdown ${dropdownOpen ? "open" : ""}`} ref={dropdownRef}>
        <div className="navbar-buttons">
          <button className="leave-comments-button" onClick={() => setShowForm(true)}>
            <span className="button-text">Leave a Comment</span>
            <span className="button-icon">💬</span>
          </button>
          <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="button-text">{dropdownOpen ? "Close" : "Menu"}</span>
            <span className="button-icon">{dropdownOpen ? "▲" : "▼"}</span>
          </button>
        </div>

        <div className="dropdown-menu">
          <button className="menu-button" onClick={() => navigate("/")}>
            Home
          </button>

          <div id="google_translate_element" className="translate-container"></div>
          <GoogleTranslateLoader />
          
          <div className="language-buttons">
            <button className="menu-button lang-button" onClick={() => handleTranslate("fr")}>
              {protectWords("Fr")}
            </button>
            
            <button className="menu-button lang-button" onClick={() => handleTranslate("en")}>
              {protectWords("En")}
            </button>
          </div>

          {/* Admin Controls - Only visible when authenticated */}
          {isAuthenticated && (
            <>
              <button className="menu-button" onClick={() => navigate("/manage-projects")}>
                Manage Projects
              </button>
              <button className="menu-button" onClick={() => navigate("/manage-biography")}>
                Manage Biography
              </button>
              <button className="menu-button" onClick={() => navigate("/manage-contact-info")}>
                Manage Contact Information
              </button>
              <button className="menu-button" onClick={() => navigate("/comments")}>
                Review Comments
              </button>
            </>
          )}

          <a href="/OfficialCv.pdf" download="OfficialCv.pdf" className="menu-link">
            <button className="menu-button">English CV</button>
          </a>

          <a href="/OfficialCvFrench.pdf" download="OfficialCvFrench.pdf" className="menu-link">
            <button className="menu-button">French CV</button>
          </a>

          <div className="login-container">
            <Login />
          </div>

          <button className="close-menu-button" onClick={() => setDropdownOpen(false)}>
            ✖
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