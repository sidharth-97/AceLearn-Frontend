import studentRoutes from "../services/endpoints/studentEndpoints";
import Api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleErrors } from "../middleware/ErrorHandler";
import { AxiosError } from "axios";

export const signup = async (student: Object) => {
  try {
    const response = await Api.post(studentRoutes.signup, student);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const signupfinal = async (student: Object) => {
  try {
    const response = await Api.post(studentRoutes.verifyOTP, student);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const login = async (loginData: Object) => {
  try {
    const response = await Api.post(studentRoutes.login, loginData);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const editStudent = async (data: Object) => {
  try {
    const response = await Api.post(studentRoutes.editProfile, data);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const studentDetails = async (id: string) => {
    try {
        const response = await Api.get(`${studentRoutes.studentDetails}/${id}`);
        return response;
    } catch (error:  any) {
    return handleErrors(error);
  }
};

export const logout = async () => {
  try {
    const response = await Api.post(studentRoutes.logout);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const postJob = async (formData: {
  student: string;
  subject: string;
  timeRange: string;
  class: string;
}) => {
  try {
    const response = await Api.post(studentRoutes.hireTutor, formData);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const viewRequest = async (id: string) => {
  try {
    const response = await Api.get(`${studentRoutes.viewRequestStatus}/${id}`);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const bookTutorByPost = async (data:any) => {
  try {
    const response = await Api.post(studentRoutes.bookTutorByPost, data);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const getStudentSchedule = async (id: string) => {
  try {
    const response = await Api.get(`${studentRoutes.scheduleofstudent}/${id}`);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};
export const paymentsession = async (obj: any) => {
  try {
    const response = await Api.post(studentRoutes.paymentsession, obj);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const showNotifications = async (id)=>{
  try {
    const response = await Api.get(`${studentRoutes.studentNotifications}/${id}`)
    return response
  } catch (error) {
    console.log(error);
    
  }
}

export const getConversations = async (id:string) => {
  try {
    const response = await Api.get(`${studentRoutes.studentConversations}/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getMesssages = async (id: string) => {
  try {
    const response = await Api.get(`${studentRoutes.getMessages}/${id}`)
    return response
  } catch (error) {
    console.log(error);
    
  }
}