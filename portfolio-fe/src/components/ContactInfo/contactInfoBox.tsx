import React, { useEffect, useState } from "react";
import { fetchBiography } from "../../api/Biography/getBiography";
import { biographyRequestModel } from "../../Models/Biography/biographyRequestModel";

import "./contactInfoBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function BiographyPage() {
  const [biography, setBiography] = useState<biographyRequestModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
            <strong>If you wish to contact me,</strong>
            <br />
            <strong>here is my eamil</strong>
          </p>
          <div className="divider"></div>
          <p>
            <strong>Email:</strong> {biography[0].email}
             {/* New Email Icon */}
             <a href={`mailto:${biography[0].email}`} className="email-icon">
              <FontAwesomeIcon icon={faEnvelope} className="social-icon" />
            </a>
          </p>

          <div className="divider"></div>
          <strong>Learn more about my projects and experience</strong>

          <div className="social-links">
            <a href={biography[0].githubUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} className="social-icon" />
            </a>
            <a href={biography[0].linkedinUrl} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
            </a>
           
          </div>
        </div>
      </div>
    </div>
  );
}
