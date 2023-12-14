import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
}

export const handleErrors = (error: AxiosError<ErrorResponse>) => {
  if (error) {
    console.log(error, "error from handler");

    if (error.response && error.response.data?.message == "Blocked by Admin") {
      localStorage.removeItem("tutor");
      location.href = "/tutor/login";
    } else {
      const errorMessage = error.response?.data || "An error occurred";
      toast.error(errorMessage as string);
    }
  }
};
