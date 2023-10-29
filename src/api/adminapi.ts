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


