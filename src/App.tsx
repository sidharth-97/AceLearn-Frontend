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

function App() {
  const element = useRoutes([
    {
      path: "/",
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
        { path: "login", element: <Signin user={"student"} />},
        { path: "signup", element: <Signup /> },
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
      ],
    },
  ]);

  return element;
}

export default App;
