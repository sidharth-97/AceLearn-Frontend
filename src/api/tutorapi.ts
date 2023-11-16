import tutorRoutes from "../services/endpoints/tutorEndpoints";
import Api from "../services/api";
import { toast } from "react-toastify";
import { handleErrors } from "../middleware/ErrorHandler";


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
    
        
        handleErrors(error)
    }
}

export const TutorEditProfile = async (data: Object) => {
    try {
        const response = await Api.post(tutorRoutes.editProfile, data)
        return response
    } catch (error) { 
        handleErrors(error)
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

export const changeSchedule = async (data) => {
    try {
        const response = await Api.post(tutorRoutes.changeSchedule, data)
        return response
    } catch {
        toast.error(error.response.data)
    }
}

export const bookTutor = async (data) => {
    try {
        const response = await Api.post(tutorRoutes.bookTutor, data)
        return response
    } catch (error) {
        toast.error(error.response.data)
    }
}

export const getTutorSchedule = async (id) => {
    try {
        const response = await Api.get(`${tutorRoutes.getTutorSchedule}/${id}`)
        return response
    } catch (error) {
        toast.error(error.response.data)
    }
}

export const getAllJobs = async () => {
    try {
        const response = await Api.get(tutorRoutes.getAllJobs)
        return response
    } catch (error) {
        toast.error(error.response.data)
    }
}

export const applyTutorJobs = async (data: {
    id:string
    tutor: string,
    fee: string,
    date: Date,
  }) => {
    try {
        const response = await Api.post(tutorRoutes.applyTutorJobs, data)
        return response
    } catch (error) {
        toast.error(error.response.data)
    }
}

export const addReview = async (data) => {
    try {
        const response = await Api.post(tutorRoutes.addReview, data)
        return response
    } catch (error) {
       toast.error(error)
    }
}

export const getTutorReview = async (id) => {
    try {
        const response = await Api.post(`${tutorRoutes.getTutorReview}/${id}`)
        return response
    } catch (error) {
        toast.error(error)
    }
}

export const getOldReview = async (id) => {
    try {
        const response=await Api.get(`${tutorRoutes.getOldReview}/${id}`)
        return response
    } catch (error) {
        toast.error(error)
    }
}
