import React, { useEffect, useState } from "react";
import { fetchBiography } from "../../api/Biography/getBiography";
import { biographyRequestModel } from "../../Models/Biography/biographyRequestModel";
import "./biographyFormBox.css";


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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!biography) return <p>No biography data available.</p>;

  return (
    <div
      className={`biography-container ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(!expanded)}
    >
      <h1>{biography[0].name}</h1>

      {!expanded && <p className="click-to-see-more">Click to see more</p>}

      <img src={biography[0].imageUrl} alt="Biography" className="profile-picture-container" />

      <div className="biography-text-container">
        <div className="biography-text">
          <div className="divider"></div>
          <p>{biography[0].description}</p>
          <div className="divider"></div>



        </div>
      </div>
    </div>
  );
}
