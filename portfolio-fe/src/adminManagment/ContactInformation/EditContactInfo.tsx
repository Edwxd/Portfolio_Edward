import React, { useEffect, useState } from "react";
import { fetchBiography } from "../../api/Biography/getBiography";
import { biographyRequestModel } from "../../Models/Biography/biographyRequestModel";
import EditContactInfo from "./EditContactInfoForm/EditContactInfo";
import "./EditContactInfo.css";

export default function BiographyPage() {
  const [biography, setBiography] = useState<biographyRequestModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const loadBiography = async () => {
      try {
        const data = await fetchBiography();
        if (data && data.length > 0) {
          setBiography(data[0]);
        }
      } catch (err) {
        setError("Failed to fetch the biography");
      } finally {
        setLoading(false);
      }
    };

    loadBiography();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // Switch to edit mode
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!biography) return <p>No biography data available.</p>;

  return (
    <div className="contact-info-edit-container">
      {isEditing ? (
        <EditContactInfo
          biography={biography}
          setIsEditing={setIsEditing}
          setBiography={setBiography} // Pass the setBiography function to update state
        />
      ) : (
        <>
          <h1 className="contact-info-name">{biography.name}</h1>
          <img
            src={biography.imageUrl}
            alt="Biography"
            className="contact-info-profile-picture"
          />
          <div className="contact-info-content">
            <div className="contact-info-details">
              <div className="contact-info-divider"></div>
              <p>{biography.email}</p>
              <p>{biography.address}</p>
              <p>{biography.linkedinUrl}</p>
              <p>{biography.githubUrl}</p>
              <div className="contact-info-divider"></div>
              <div className="contact-info-edit-button-container">
                <button
                  className="contact-info-edit-button"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
