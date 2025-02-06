  import React, { JSX, useEffect, useState } from "react";
  import { fetchBiography } from "../api/getBiography"; // Import the fetchBiography method
  import { biographyRequestModel } from "../Models/biographyRequestModel";

  export default function BiographyPage(): JSX.Element {
    const [biography, setBiography] =   useState<biographyRequestModel[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const loadBiography = async () => {
        try {
          const data = await fetchBiography();
          if(data){
            


            setBiography(data);
            console.log("Biography data:", data);

          }

        } catch (err) {
          console.error("Error fetching biography:", err); // Log the error
          setError("Failed to fetch the biography");
        } finally {
          setLoading(false);
        }
      };

      loadBiography(); // Trigger the API call on mount
    }, []); // Empty dependency array to run this only on mount

    // Conditionally render loading or error states
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!biography) {
      console.log("Biography is null");
      return <p>No biography data available.</p>;
    }

    console.log("Biography data:", biography);

    console.log("Biography data in render:", biography); 
    
    console.log(biography[0].name)


    return (
      <div>
        
        <h1>{biography[0].name}</h1>
        <p>{biography[0].description}</p>
        <img src={biography[0].imageUrl} alt="Biography" />
        <p>{biography[0].githubUrl}</p>
        <p>{biography[0].linkedinUrl}</p>
        <p>{biography[0].email}</p>
        <p>{biography[0].phoneNumber}</p>
        <p>{biography[0].address}</p>
      </div>
    );
  }