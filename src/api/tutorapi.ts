import tutorRoutes from "../services/endpoints/tutorEndpoints";
import Api from "../services/api";
import { toast } from "react-toastify";
import { handleErrors } from "../middleware/ErrorHandler";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

export const signup = async (tutor: Object) => {
  try {
    const response = await Api.post(tutorRoutes.signup, tutor);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const signupFinal = async (tutor: Object) => {
  try {
    const response = await Api.post(tutorRoutes.otpverify, tutor);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const Tutorlogin = async (data: Object) => {
  try {
    const response = await Api.post(tutorRoutes.login, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      if (error && (error as AxiosError).isAxiosError) {
        handleErrors(error as AxiosError<ErrorResponse>);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
};

export const TutorDetails = async (id: string) => {
  try {
    const response = await Api.get(`${tutorRoutes.tutorDetails}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const TutorEditProfile = async (data: Object) => {
  try {
    const response = await Api.put(tutorRoutes.editProfile, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const tutorLogout = async () => {
  try {
    const response = await Api.post(tutorRoutes.logout);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getalltutors = async (query:string) => {
  try {
    const response = await Api.get(`${tutorRoutes.getalltutors}/${query}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const scheduledate = async (data: {
  tutor: any;
  timing: { date: string };
}) => {
  try {
    const response = await Api.post(tutorRoutes.scheduleTime, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const changeSchedule = async (data: {
  tutor: any;
  fee: Number;
  id: String;
  timing: { date: Date };
}) => {
  try {
    const response = await Api.post(tutorRoutes.changeSchedule, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const bookTutor = async (data: any) => {
  try {
    const response = await Api.post(tutorRoutes.bookTutor, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getTutorSchedule = async (id: string) => {
  try {
    const response = await Api.get(`${tutorRoutes.getTutorSchedule}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllJobs = async () => {
  try {
    const response = await Api.get(tutorRoutes.getAllJobs);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const applyTutorJobs = async (data: {
  id: string;
  tutor: string;
  fee: string;
  date: string;
}) => {
  try {
    const response = await Api.post(tutorRoutes.applyTutorJobs, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const addReview = async (data: {
  id: string;
  student: string;
  rating: number;
  description: string;
}) => {
  try {
    const response = await Api.post(tutorRoutes.addReview, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getTutorReview = async (id:any) => {
  try {
    const response = await Api.get(`${tutorRoutes.getTutorReview}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getOldReview = async (id: string) => {
  try {
    const response = await Api.get(`${tutorRoutes.getOldReview}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const tutorPayment = async (data: {
  id: string | undefined;
  tutor: any;
}) => {
  try {
    const response = await Api.put(tutorRoutes.tutorPayment, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      if (error && (error as AxiosError).isAxiosError) {
        handleErrors(error as AxiosError<ErrorResponse>);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
};

export const cancelBooking = async (data: {
  tutor: any;
  fee: any;
  id: any;
  timing: { date: any };
}) => {
  try {
    const response = await Api.post(tutorRoutes.chancelBooking, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      if (error && (error as AxiosError).isAxiosError) {
        handleErrors(error as AxiosError<ErrorResponse>);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
};

export const tutorNotifications = async (id: string) => {
  try {
    const response = await Api.get(`${tutorRoutes.tutorNotifications}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      if (error && (error as AxiosError).isAxiosError) {
        handleErrors(error as AxiosError<ErrorResponse>);
      } else {
        toast.error("Something went wrong");
      }
    }
  }
};

export const tutorConversations = async (id: string) => {
  try {
    const response = await Api.get(`${tutorRoutes.conversations}/${id}`);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getMessages = async (id:any) => {
  try {
    const response = await Api.get(`${tutorRoutes.getMessages}/${id}`);
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
    const response = await Api.post(tutorRoutes.addMessages, data);
    return response;
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const viewQuestions = async () => {
  try {
    const response = await Api.get(tutorRoutes.viewQuestions)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const submitSolution = async (data: any) => {
  try {
    const response = await Api.post(tutorRoutes.submitSolution, data)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const tutorSales = async () => {
  try {
    const response = await Api.get(tutorRoutes.tutorSales)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const buyTutorPremium = async (data:any) => {
  try {
    const response = await Api.post(tutorRoutes.buyTutorPremium,data)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const TforgetPasswordStep1 = async (obj:{email:string,username:string}) => {
  try {
    const response = await Api.post(tutorRoutes.forgetPasswordStep1,obj)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const TforgetPasswordStep2 = async (otp:{otp:string})=>{
  try {
    const response = await Api.post(tutorRoutes.forgetPasswordStep2, otp)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const TforgetPasswordFinal = async (data:any) => {
  try {
    const response = await Api.post(tutorRoutes.forgetPasswordFinal, data)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const tutoravilable = async (id: string) => {
  try {
    const response = await Api.get(`${tutorRoutes.tutoravilable}/${id}`)
    return response
  } catch (error) {
    console.log(error);
  }
}

export const scheduleLiveClass = async (data: any) => {
  try {
    const liveClass = await Api.post(tutorRoutes.scheduleLiveClass,data)
    return liveClass
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const viewLiveClassSchedule = async () => {
  try {
    const classes = await Api.get(tutorRoutes.viewLiveClassSchedule)
    return classes
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}

export const cancelLiveClass = async (id:string) => {
  try {
    const response = await Api.post(`${tutorRoutes.cancelLiveClass}/${id}`)
    return response
  } catch (error) {
    if (error && (error as AxiosError).isAxiosError) {
      handleErrors(error as AxiosError<ErrorResponse>);
    } else {
      toast.error("Something went wrong");
    }
  }
}