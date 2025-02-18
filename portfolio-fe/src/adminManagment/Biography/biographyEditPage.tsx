import React, { useEffect, useState } from "react";
import { fetchBiography } from "../../api/Biography/getBiography";
import { biographyRequestModel } from "../../Models/Biography/biographyRequestModel";
import EditBiography from "./EditBiography/EditBiography";

import "./biography.css";

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
    <div className="biography-managment-container">
      {isEditing ? (
        <EditBiography
          biography={biography}
          setIsEditing={setIsEditing}
          setBiography={setBiography} // Pass the setBiography function to update state
        />
      ) : (
        <>
          <h1>{biography.name}</h1>
          <img src={biography.imageUrl} alt="Biography" className="profile-managment-picture-container" />
          
          <div className="biography-managment-text-container">
            <div className="biography-managment-text">
              <div className="divider"></div>
              <p>{biography.description}</p>
              <div className="divider"></div>

              <div className="edit-managment-button-container">
                <button className="edit-managment-button" onClick={handleEditClick}>
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
