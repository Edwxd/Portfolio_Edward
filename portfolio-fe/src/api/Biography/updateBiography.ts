import { AxiosResponse } from "axios";

import axios from "../../axiosInstance/axiosInstance";
import { biographyRequestModel } from "../../Models/Biography/biographyRequestModel";


export const editBiography = async (
    bioId: string,
    biography: biographyRequestModel // Pass the object, not an array
  ): Promise<AxiosResponse<void>> => {
    try {
      return await axios.put<void>(`/biography/${bioId}`, biography, {
        // Optionally add headers here if needed
      });
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        window.location.href = "/unauthorized";
      } else {
        console.error("Error in editBiography API call:", error);
      }
      throw error;
    }
  };
  
