import { AxiosResponse } from "axios";
import { projectRequestModel } from "../../Models/Projects/projectsRequestModel";
import axios from "../../axiosInstance/axiosInstance";


export const editProject = async (
  projectId: string,
  project: projectRequestModel,
): Promise<AxiosResponse<void>> => {
  try {

    // Corrected axios request with headers included in the options parameter
    return await axios.put<void>(`/projects/${projectId}`, project, {

    });
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      // Redirect to unauthorized page if status is 401
      window.location.href = "/unauthorized";
    } else {
      console.error("Error in editArticle API call:", error);
    }
    throw error;
  }
};
