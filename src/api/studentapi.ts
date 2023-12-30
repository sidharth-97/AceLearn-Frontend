import studentRoutes from "../services/endpoints/studentEndpoints";
import Api from "../services/api";
import { toast } from "react-toastify";
import { handleErrors } from "../middleware/ErrorHandler";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

export const signup = async (student: Object) => {
  try {
    const response = await Api.post(studentRoutes.signup, student);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const signupfinal = async (student: Object) => {
  try {
    const response = await Api.post(studentRoutes.verifyOTP, student);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const login = async (loginData: Object) => {
  try {
    const response = await Api.post(studentRoutes.login, loginData);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const editStudent = async (data: Object) => {
  try {
    const response = await Api.put(studentRoutes.editProfile, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const studentDetails = async (id: string) => {
  try {
    const response = await Api.get(`${studentRoutes.studentDetails}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const logout = async () => {
  try {
    const response = await Api.post(studentRoutes.logout);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
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
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const viewRequest = async (id: string) => {
  try {
    const response = await Api.get(`${studentRoutes.viewRequestStatus}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {

    } else {
      toast.error("Something went wrong");
    }
  }
};

export const bookTutorByPost = async (data: any) => {
  try {
    const response = await Api.put(studentRoutes.bookTutorByPost, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getStudentSchedule = async (id: string) => {
  try {
    const response = await Api.get(`${studentRoutes.scheduleofstudent}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const paymentsession = async (obj: any) => {
  try {
    const response = await Api.post(studentRoutes.paymentsession, obj);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const showNotifications = async (id: string) => {
  try {
    const response = await Api.get(
      `${studentRoutes.studentNotifications}/${id}`
    );
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getConversations = async (id: string) => {
  try {
    const response = await Api.get(
      `${studentRoutes.studentConversations}/${id}`
    );
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getMesssages = async (id: string|undefined) => {
  try {
    const response = await Api.get(`${studentRoutes.getMessages}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const addMessages = async (data: any) => {
  try {
    const response = await Api.post(studentRoutes.addMessages, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllUsers = async (id: string) => {
  try {
    const response = await Api.get(`${studentRoutes.getAllUsers}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const addConversations = async (data: any) => {
  try {
    const response = await Api.post(studentRoutes.addConversations, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const bookWithWallet = async (data: any) => {
  try {
    const response = await Api.post(studentRoutes.bookWithWallet, data)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const addQuestions = async (data: any) => {
  try {
    const reponse = await Api.post(studentRoutes.addQuestions, data)
    return reponse
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const viewMyQuestions = async () => {
  try {
    const response = await Api.get(studentRoutes.viewMyQuestions)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const studentTimeline = async () => {
  try {
    const response = await Api.get(studentRoutes.studentTimeline)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const forgetPasswordStep1 = async (obj:{email:string,username:string}) => {
  try {
    const response = await Api.post(studentRoutes.forgetPasswordStep1,obj)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const forgetPasswordStep2 = async (otp:{otp:string})=>{
  try {
    const response = await Api.post(studentRoutes.forgetPasswordStep2, otp)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const forgetPasswordFinal = async (data:any) => {
  try {
    const response = await Api.post(studentRoutes.forgetPasswordFinal, data)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const studentPremium = async (data: { fees: string }) => {
  try {
    const response = await Api.post(studentRoutes.studentPremium, data)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

  export const listLiveClass = async () => {
    try {
      const response = await Api.get(studentRoutes.listLiveClass)
      return response
    } catch (error) {
      if (error && (error as AxiosError).isAxiosError) {
        handleErrors(error as AxiosError<ErrorResponse>);
      } else {
        toast.error("Something went wrong");
      }
    }
  }

export const regiterLiveclass = async (data:{student:string,id:string}) => {
    try {
      const response = await Api.post(studentRoutes.regiterLiveclass, data)
      return response
    } catch (error) {
      if (error && (error as AxiosError).isAxiosError) {
        // handleErrors(error as AxiosError<ErrorResponse>);
      } else {
        toast.error("Something went wrong");
      }
    }
}
  
export const jobComplete = async (data:any) => {
  try {
    const response = await Api.put(studentRoutes.jobComplete,data)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}
