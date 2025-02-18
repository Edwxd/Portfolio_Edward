import axiosInstance from "../../axiosInstance/axiosInstance";


export const deleteProject = async (
    projectId: string) => {
    try {
        const response = await axiosInstance.delete(`/projects/${projectId}`);
        console.log("Project deleted successfully", response.status);
        return response; // Return response in case you need it
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error; // Rethrow for handling in UI
    }
};
