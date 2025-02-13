import axiosInstance from "../../axiosInstance/axiosInstance";
import { projectRequestModel } from "../../Models/Projects/projectsRequestModel";

export const addProject = async (project: projectRequestModel): Promise<void> => {
  try {
    await axiosInstance.post("/projects", project);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/unauthorized";
    } else {
      console.error("Error in addComment API call:", error);
    }
    throw error;
  }
};
