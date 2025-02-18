import  axiosInstance  from "../../axiosInstance/axiosInstance"
import { commentsRequestModel } from "../../Models/Comments/commentsRequestModel";


export const fetchAllCommentsToReview = async (
): Promise<commentsRequestModel[]> => {

    try{
        const response = await axiosInstance.get<commentsRequestModel[]>(`/comments`);
        console.log(response.data);

        return response.data;
        
    }catch (err){
        console.log(err);
        throw err;
    }
}