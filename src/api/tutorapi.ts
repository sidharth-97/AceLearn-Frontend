import tutorRoutes from "../services/endpoints/tutorEndpoints";
import Api from "../services/api";

export const signup = async (tutor: Object) => {
    try {
        const response = await Api.post(tutorRoutes.signup, tutor)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const signupFinal = async (tutor: Object)=>{
    try {
        const response = await Api.post(tutorRoutes.otpverify, tutor)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export const Tutorlogin = async (data: Object)=>{
    try {
        const response = await Api.post(tutorRoutes.login, data)
        return response
    } catch (error) {
        console.log(error);
        
    }
}