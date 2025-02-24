import React, { useEffect, useState } from "react";
import { fetchBiography } from "../../api/Biography/getBiography";
import { biographyRequestModel } from "../../Models/Biography/biographyRequestModel";

import "./contactInfoBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import EmailSender from "../Emailing/emailForm"; 

export default function BiographyPage() {
  const [biography, setBiography] = useState<biographyRequestModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false);

  useEffect(() => {
    const loadBiography = async () => {
      try {
        const data = await fetchBiography();
        if (data) {
          setBiography(data);
          console.log("Biography data:", data);
        }
      } catch (err) {
        console.error("Error fetching biography:", err);
        setError("Failed to fetch the biography");
      } finally {
        setLoading(false);
      }
    };

    loadBiography();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!biography) return <p>No biography data available.</p>;

  return (
    <div>
      <div className="contact-info-container">
        <h1>Contact Information</h1>
        <div className="contact-info-text">
          <p>
            <strong>Here is my contact information</strong>
          </p>
          <div className="divider"></div>
          <p>
            <strong>Email:</strong> {biography[0].email}
            <div className="social-links">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="social-icon"
                onClick={() => setShowEmailForm(true)}
              />
            </div>
          </p>

          <div className="divider"></div>

          <p>
            <strong>Learn more about my projects and experience:</strong>
          </p>
          <div className="social-links">
            <a href={biography[0].githubUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="social-icon" />
            </a>
            <a href={biography[0].linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
          </div>
          <div className="divider"></div>
        </div>
      </div>

      {showEmailForm && <EmailSender biography={biography} onClose={() => setShowEmailForm(false)} />}
    </div>
  );
}
