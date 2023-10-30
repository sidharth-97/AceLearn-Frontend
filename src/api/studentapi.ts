import studentRoutes from "../services/endpoints/studentEndpoints";
import Api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const signup = async (student:Object) => {
    try {
        const response = await Api.post(studentRoutes.signup, student)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }
}

export const signupfinal = async (student: Object)=>{
    try {
        const response = await Api.post(studentRoutes.verifyOTP, student)
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }
}

export const login = async (loginData: Object)=>{
    try {
        const response = await Api.post(studentRoutes.login, loginData) 
        return response
    } catch (error) {
        console.log(error);
        toast.error(error.response.data)
    }
}

export const editStudent = async (data: Object)=>{
    try {
        const response = await Api.post(studentRoutes.editProfile, data)
        return response
    } catch (error) {
        console.log(error)
        toast.error(error.response.data)
    }
}

export const studentDetails = async (id: string)=>{
    try {
        const response = await Api.get(`${studentRoutes.studentDetails}/${id}`)
        return response
    } catch (error) {
        if (error.response.status == 401) {
            console.log("reached here");
            
        }
        console.log(error);
        toast.error(error.response.data)
    }
}

export const logout = async () => {
    try {
        const response = await Api.post(studentRoutes.logout)
        return response
    } catch (error) {
        console.log(error);
        
    }
}