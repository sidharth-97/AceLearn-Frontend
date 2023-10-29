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
import PrivateRoute from "./components/common/PrivateRoute";
import EditTutorProfile from "./pages/tutor/EditProfile";
import ErrorPage from "./pages/ErrorPage";
import AdminDash from "./pages/admin/adminDash";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  const element = useRoutes([
    { path: "/", element: <Home />, errorElement: <ErrorPage /> },
    {
      path: "/student",
      children: [
        { index: true, element: <><Navbar /><Signin user={"student"} /></> },
        { path: "login", element: <Signin user={"student"} /> },
        { path: "signup", element: <Signup /> },
        { path: "dashboard", element: <StudentProfile /> },
        { path: "profile", element: <PrivateRoute><EditStudentProfile /></PrivateRoute> },
      ],
    },
    {
      path: "/tutor",
      children: [
        { path: "login", element: <Signin user={"tutor"} /> },
        { path: "signup", element: <TutorSignup /> },
        { path: "tutoronboarding", element: <TutorOnBoard /> },
        { path: "tutordashboard", element: <TutorProfile /> },
        { path: "edit-profile", element: <EditTutorProfile /> },
      ],
    },
    {
      path: "/admin",
      children: [
        { path: "login", element: <AdminLogin /> },
        {path:"dashboard",element:<AdminDash/>}
      ]
    },
    { path: "*", element: <><Navbar /><ErrorPage /></> },
  ]);

  return element;
}

export default App;
