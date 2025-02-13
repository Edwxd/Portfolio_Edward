import axios from "axios";

export const fetchCommentById = async (commentId: string) => {
    try {
        const response = await axios.get(`/api/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comment by ID:", error);
        throw error;
    }
};
