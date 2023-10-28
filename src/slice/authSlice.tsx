import { createSlice } from '@reduxjs/toolkit'

const isStudentStored = localStorage.getItem('student');
const isStudent = isStudentStored ? JSON.parse(isStudentStored) : null;

const isTutorStored = localStorage.getItem('tutor')
const isTutor=isTutorStored?JSON.parse(isTutorStored):null

const initialState: { isStudent: boolean | null, isTutor: boolean | null } = {
  isStudent: isStudent,
  isTutor: isTutor
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStudent: (state, action) => {
            state.isStudent = action.payload
            localStorage.setItem('student',JSON.stringify(action.payload))
        },
        logoutstudent: (state, action) => {
            state.isStudent = null
            localStorage.removeItem('student')
        },
        loginTutor: (state, action) => {
            state.isTutor = action.payload
            localStorage.setItem('tutor', action.payload)
        },
        logoutTutor: (state, action) => {
            state.isTutor = null
            localStorage.removeItem('tutor')
        }
    }
})

export const { loginStudent, logoutstudent,loginTutor,logoutTutor } = authSlice.actions

export default authSlice.reducer 