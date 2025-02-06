import  axiosInstance  from "../axiosInstance/axiosInstance"
import { biographyRequestModel } from "../Models/biographyRequestModel";


export const fetchBiography = async (
): Promise<biographyRequestModel[]> => {

    try{
        const response = await axiosInstance.get<biographyRequestModel[]>(`/biography`);
        console.log(response.data);

        return response.data;
        
    }catch (err){
        console.log(err);
        throw err;
    }
}