import { AxiosError } from "axios";
import Api from "../services/api";
import AdminRoutes from "../services/endpoints/adminEndpoints";
import { toast } from "react-toastify";

export const adminLogin = async (data: Object) => {
  try {
    const response = await Api.post(AdminRoutes.login, data);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const getUserData = async () => {
  try {
    const response = await Api.get(AdminRoutes.getStudents);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const getTutorData = async () => {
  try {
    const response = await Api.get(AdminRoutes.getTutors);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const blockStudent = async (id: string) => {
  try {
    const response = await Api.post(`${AdminRoutes.blockStudent}/${id}`);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const blockTutor = async (id: string) => {
  try {
    const response = await Api.post(`${AdminRoutes.blockTutor}/${id}`);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const addSubjects = async (subject: string) => {
  try {
    const response = await Api.post(AdminRoutes.addSubjects, subject);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const findSubjects = async () => {
  try {
    const response = await Api.get(AdminRoutes.findSubjects);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};

export const deleteSubject = async (data: object) => {
  try {
    const response = await Api.put(AdminRoutes.deleteSubject, data);
    return response;
  } catch (error: AxiosError<unknown> | any) {
    if (error.response && error.response.data) {
      toast.error(error.response.data);
    }
    console.log(error);
  }
};
