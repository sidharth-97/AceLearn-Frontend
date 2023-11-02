import "./App.css";
import { useRoutes } from "react-router-dom";
import Home from "./pages/student/Home";
import Signin from "./components/common/Signin";
import Signup from "./pages/student/Signup";
import Navbar from "./components/common/navbar";
import TutorSignup from "./pages/tutor/TutorSignup";
import OTPInput from "./components/common/OTPInput";
import TutorOnBoard from "./components/tutors/tutorOnBoard";
import TutorProfile from "./pages/tutor/TutorProfile";
import StudentProfile from "./pages/student/StudentProfile";
import EditStudentProfile from "./pages/student/edit-profile";
import PrivateRoute, { AdminPrivate, TutorPrivate } from "./components/common/PrivateRoute";
import EditTutorProfile from "./pages/tutor/EditProfile";
import ErrorPage from "./pages/ErrorPage";
import AdminDash from "./pages/admin/adminDash";
import AdminLogin from "./pages/admin/AdminLogin";
import StudentManagement from "./pages/admin/StudentManagement";
import TutorManagement from "./pages/admin/TutorManagement";
import { useEffect } from "react";
import DisplayTutor from "./pages/tutor/displayTutor";
import BookTutor from "./pages/student/BookTutor";


function App() {

  
  const element = useRoutes([
    { path: "/", element: <Home />, errorElement: <ErrorPage /> },
    {
      path: "/student",
      children: [
        { index: true, element: <><Navbar /><Signin user={"student"} /></> },
        { path: "login", element: <><Navbar /><Signin user={"student"} /></>},
        { path: "signup", element: <Signup /> },
        { path: "dashboard", element: <StudentProfile /> },
        { path: "profile", element: <PrivateRoute><EditStudentProfile /></PrivateRoute> },
        {path:"booktutor",element:<BookTutor/>}
      ],
    },
    {
      path: "/tutor",
      children: [
        { path: "login", element:<><Navbar/> <Signin user={"tutor"} /></> },
        { path: "signup", element: <TutorSignup /> },
        { path: "tutoronboarding", element: <TutorOnBoard /> },
        { path: "tutordashboard", element: <TutorProfile /> },
        { path: "edit-profile", element: <TutorPrivate><EditTutorProfile /></TutorPrivate> },
        { path:"tutorProfile/:id", element:<DisplayTutor/>}
      ],
    },
    {
      path: "/admin",
      children: [
        { path: "login", element: <AdminLogin /> },
        { path: "dashboard", element: <AdminDash /> },
        { path: 'students', element:<AdminPrivate><StudentManagement /></AdminPrivate>  },
        { path: 'tutors', element: <AdminPrivate><TutorManagement/></AdminPrivate> }
      ]
    },
    { path: "*", element: <><Navbar /><ErrorPage /></> },
  ]);

  return element;
}

export default App;
