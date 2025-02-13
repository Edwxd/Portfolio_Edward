import  axiosInstance  from "../../axiosInstance/axiosInstance"
import { projectRequestModel } from "../../Models/Projects/projectsRequestModel";


export const fetchProjects = async (
    projectId: string,
): Promise<projectRequestModel> => {

    try{
        const response = await axiosInstance.get<projectRequestModel>(`/projects/${projectId}`);
        console.log(response.data);

        return response.data;
        
    }catch (err){
        console.log(err);
        throw err;
    }
}