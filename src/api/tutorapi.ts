import tutorRoutes from "../services/endpoints/tutorEndpoints";
import Api from "../services/api";
import { toast } from "react-toastify";


export const signup = async (tutor: Object) => {
    try {
        const response = await Api.post(tutorRoutes.signup, tutor)
        return response
    } catch (error) {
        console.log(error)
        toast.error(error.response.data)
    }
}

export const signupFinal = async (tutor: Object)=>{
    try {
        const response = await Api.post(tutorRoutes.otpverify, tutor)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }
}

export const Tutorlogin = async (data: Object)=>{
    try {
        const response = await Api.post(tutorRoutes.login, data)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }
}

export const TutorDetails = async (id: string) => {

    try {
        const response = await Api.get(`${tutorRoutes.tutorDetails}/${id}`)
        return response
    } catch (error) {
        console.log(error);
    
        
        toast.error(error.response.data)
    }
}

export const TutorEditProfile = async (data: Object) => {
    try {
        const response = await Api.post(tutorRoutes.editProfile, data)
        return response
    } catch (error) {
        console.log(error); 
        toast.error(error.response.data)
    }
}

export const tutorLogout = async ()=>{
    try {
        const response = await Api.post(tutorRoutes.logout)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }
}

export const getalltutors = async () => {
    try {
        const response = await Api.get(tutorRoutes.getalltutors)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }
}

export const scheduledate = async (data) => {
    try {
        const response = await Api.post(tutorRoutes.scheduleTime,data)
        return response
    } catch (error) {
        toast.error(error.response.data)
    }
}