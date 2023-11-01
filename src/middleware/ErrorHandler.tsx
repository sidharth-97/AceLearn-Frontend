import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const handleErrors = (error:AxiosError) => {

    if (error) {
        
        if (error.response && error.response.status == 401) {
            console.log(error);
            <Navigate to='/' replace />
        }
        
        toast.error("user blocked")
    }
};