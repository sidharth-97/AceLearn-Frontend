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
import RequestTutor from "./pages/student/HireTutor";
import Requests from "./pages/student/Requests";
import TutorJobs from "./pages/tutor/TutorJobs";
import TutorCardGrid from "./pages/tutor/TutorCardGrid";
import SuccessPage from "./components/common/SucessPage";
import PaymentFailed from "./components/common/PaymentFailed";
import VideoCall from "./components/common/VideoCall";
import FeedbackPage from "./pages/common/FeedbackPage";
import Subjects from "./pages/admin/Subjects";
import AllTutors from "./pages/tutor/AllTutors";
import NotificationsPage from "./pages/student/NotificationsPage";
import NotificationPage from "./pages/tutor/NotificationPage";
import Messenger from "./pages/student/Messenger";
import MessengerTutor from "./pages/tutor/Messenger";


function App() {

  
  const element = useRoutes([
    {
      path: "/",
      children: [
      {index:true,element:<Home/>},
        { path: "success", element: <SuccessPage /> },
        { path: "failed", element: <PaymentFailed /> },
        { path: "room/:roomId", element: <VideoCall /> },
        { path:"feedback-page/:id",element:<FeedbackPage/>}
    ]},
    {
      path: "/student",
      children: [
        { index: true, element: <><Navbar /><Signin user={"student"} /></> },
        { path: "login", element: <><Navbar /><Signin user={"student"} /></>},
        { path: "signup", element: <Signup /> },
        { path: "dashboard", element: <StudentProfile /> },
        { path: "profile", element: <PrivateRoute><EditStudentProfile /></PrivateRoute> },
        { path: "booktutor/:id", element: <BookTutor /> },
        { path: "requesttutor", element: <RequestTutor /> },
        { path: "requests", element: <Requests /> },
        { path: "notifications", element: <NotificationsPage /> },
        {path:"messenger",element:<Messenger/>}
      ],
    },
    {
      path: "/tutor",
      children: [
        { path: "login", element:<><Navbar/> <Signin user={"tutor"} /></> },
        { path: "signup", element: <TutorSignup /> },
        { path: "tutoronboarding", element: <TutorOnBoard /> },
        {path:"all-tutors",element:<AllTutors/>},
        { path: "tutordashboard", element: <TutorPrivate><TutorProfile /></TutorPrivate> },
        { path: "edit-profile", element: <TutorPrivate><EditTutorProfile /></TutorPrivate> },
        { path: "tutorProfile/:id", element: <DisplayTutor /> },
        { path: "tutorjobs", element: <TutorJobs /> },
        { path: "notifications", element: <NotificationPage /> },
       { path:"messenger",element:<MessengerTutor/>}
      ],
    },
    {
      path: "/admin",
      children: [
        { path: "login", element: <AdminLogin /> },
        { path: "dashboard", element: <AdminDash /> },
        { path: 'students', element:<AdminPrivate><StudentManagement /></AdminPrivate>  },
        { path: 'tutors', element: <AdminPrivate><TutorManagement /></AdminPrivate> },
        { path:"subjects",element:<Subjects/>}
      ]
    },
    { path: "*", element: <><Navbar /><ErrorPage /></> },
  ]);

  return element;
}

export default App;
