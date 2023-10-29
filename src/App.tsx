import "./App.css";
import Home from "./pages/student/Home";
import AdminDash from "./pages/admin/adminDash";
import Signin from "./components/common/Signin";
import { useRoutes, Outlet } from "react-router-dom";
import Signup from "./pages/student/Signup";
import Navbar from "./components/common/navbar";
// import TutorLogin from "./pages/tutor/TutorLogin";
import TutorSignup from "./pages/tutor/TutorSignup";
import OTPInput from "./components/common/OTPInput";
import TutorOnBoard from "./components/tutors/tutorOnBoard";
import TutorProfile from "./pages/tutor/TutorProfile";
import StudentProfile from "./pages/student/StudentProfile";
import EditStudentProfile from "./pages/student/edit-profile";
import PrivateRoute from "./components/common/PrivateRoute";
import EditTutorProfile from "./pages/tutor/EditProfile";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const element = useRoutes([
    {
      path: "/",
      errorElement:<ErrorPage/>,
      element: <Home />,
    },
    {
      path: "/student",
      children: [
        {
          index: true,
          element: (
            <>
              <Navbar />
              <Signin user={"student"} />
            </>
          ),
        },
        { path: "login", element: <Signin user={"student"} /> },
        { path: "signup", element: <Signup /> },
        { path: "dashboard", element: <StudentProfile /> },
        {
          path: "profile",
          element: (
            <PrivateRoute>
              <EditStudentProfile />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/tutor",
      children: [
        {
          path: "login",
          element: <Signin user={"tutor"} />,
        },
        { path: "signup", element: <TutorSignup /> },
        { path: "tutoronboarding", element: <TutorOnBoard /> },
        { path: "tutordashboard", element: <TutorProfile /> },
        {path:"edit-profile",element:<EditTutorProfile/>}
      ],
    }, {
      path: "*",
      element:(<><Navbar/><ErrorPage/></>)
    }
  ]);

  return element;
}

export default App;
