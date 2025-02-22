import axiosInstance from "../../axiosInstance/axiosInstance";

export const deleteCommentById = async (commentId: string) => {
    try {
        const response = await axiosInstance.delete(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comment by ID:", error);
        throw error;
    }
};
