import axiosInstance from "../../axiosInstance/axiosInstance";
import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";

export const addComment = async (comment: commentsRequestModel): Promise<void> => {
  try {
    await axiosInstance.post("/comments", comment);
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/unauthorized";
    } else {
      console.error("Error in addComment API call:", error);
    }
    throw error;
  }
};
