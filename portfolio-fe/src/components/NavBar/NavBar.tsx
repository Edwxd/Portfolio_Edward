import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import CommentForm from "../CommentsForm/commentsForm";  
import Login from "../../AuthService/login"; 
import {useNavigate } from "react-router-dom";
import GoogleTranslateLoader from "../Translation/googleTranslation";
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
        <button className="dropdown-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
          Menu ▼
        </button>


        <div className="dropdown-menu">
        <button className="home-button" onClick={() => navigate("/")}>
            Home
        </button>

        <div id="google_translate_element" style={{ display: "none" }}></div>
        <GoogleTranslateLoader /> 
        <button className="comments-button" onClick={() => handleTranslate("fr")}>{protectWords("Fr")}</button>
        <button className="comments-button" onClick={() => handleTranslate("en")}>{protectWords("En")}</button>
          

          {/* Admin Controls - Only visible when authenticated */}
          {isAuthenticated && (
            <>
              <button className="admin-button" onClick={() => navigate("/manage-projects")}>
                Manage Projects
              </button>
              <button className="admin-button" onClick={() => navigate("/manage-biography")} >
                Manage Biography
              </button>
              <button className="admin-button" onClick={() => navigate("/manage-contact-info")}>
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

          <a href="/OfficialCv.pdf" download="OfficialCv.pdf">
            <button className="comments-button">English CV</button>
            </a>

            <a href="/OfficialCvFrench.pdf" download="OfficialCvFrench.pdf">
            <button className="comments-button">French CV</button>
            </a>



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
