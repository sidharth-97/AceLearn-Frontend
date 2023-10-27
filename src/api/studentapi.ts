import studentRoutes from "../services/endpoints/studentEndpoints";
import Api from "../services/api";

export const signup = async (student:Object) => {
    try {
        const response = await Api.post(studentRoutes.signup, student)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export const signupfinal = async (student: Object)=>{
    try {
        const response = await Api.post(studentRoutes.verifyOTP, student)
        return response
    } catch (error) {
        console.log(error);
        
    }
}