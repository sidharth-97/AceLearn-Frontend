import Api from "../services/api";
import AdminRoutes from "../services/endpoints/adminEndpoints";


export const adminLogin = async (data: Object)=>{
    try {
        const response = await Api.post(AdminRoutes.login, data)
    return response
    } catch (error) {
        console.log(error);
        
    }
    
}

export const getUserData = async () => {
    try {
        const response = await Api.get(AdminRoutes.getStudents)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export const getTutorData = async () => {
    try {
        const response = await Api.get(AdminRoutes.getTutors)  
        return response
    } catch (error) {
        console.log(error);
        
    }
}

export const blockStudent = async (id:string) => {
    try {
        const response = await Api.post(`${AdminRoutes.blockStudent}/${id}`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const blockTutor = async (id: string) => {
    try {
        const response = await Api.post(`${AdminRoutes.blockTutor}/${id}`)
        return response
    } catch (error) {
        console.log(error);
        
    }
}
