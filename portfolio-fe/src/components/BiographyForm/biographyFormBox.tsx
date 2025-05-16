import React, { useEffect, useState } from "react";
import { fetchBiography } from "../../api/Biography/getBiography";
import { biographyRequestModel } from "../../Models/Biography/biographyRequestModel";
import "./biographyFormBox.css";
import { protectWords } from "../Translation/utils";

export default function BiographyPage() {
  const [biography, setBiography] = useState<biographyRequestModel[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

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

  if (loading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="error-state">{error}</div>;
  if (!biography) return <div className="error-state">No biography data available.</div>;

  return (
    <div className="biography-wrapper">
      <div
        className={`biography-container ${expanded ? "expanded" : ""}`}
        onClick={() => setExpanded(!expanded)}
      >
        <h1 className="biography-name">{protectWords(biography[0].name)}</h1>

        {!expanded && <p className="click-to-see-more">Click to see more</p>}

        <div className="profile-image-container">
          <img src={biography[0].imageUrl} alt="Biography" className="profile-image" />
        </div>

        <div className="biography-content">
          <div className="divider"></div>
          <div className="biography-description">
            <p>{biography[0].description}</p>
          </div>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
}