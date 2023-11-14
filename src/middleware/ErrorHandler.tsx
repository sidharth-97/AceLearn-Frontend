import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const handleErrors = (error:AxiosError) => {

    if (error) {
        console.log(error,"error from handler");
        
        if (error.response && error.response.data?.message=="Blocked by Admin" ) {
            localStorage.removeItem("tutor")
            location.href="/tutor/login"
            
        } else {
            toast.error(error.response?.data)
        }
        
        
    }
};