import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isStudent: localStorage.getItem('student') ?? null,
    isTutor:localStorage.getItem('tutor')??null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStudent: (state, action) => {
            state.isStudent = action.payload
            localStorage.setItem('student',action.payload)
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

export const { loginStudent, logoutstudent } = authSlice.actions

export default authSlice.reducer 