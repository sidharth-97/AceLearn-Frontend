import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice'
import modalReducer from './slice/modalSlice'
import { Student } from "./model/studentModel";
import { Tutor } from "./model/tutorModel";

 export interface RootState {
    auth: {
      isStudent: Student
      isTutor:Tutor
      // other auth properties...
    };
    // other slices of the state...
  }
  

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal:modalReducer
    }
})

export default store
