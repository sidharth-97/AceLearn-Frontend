import { Routes, Route } from "react-router-dom";
import './App.css'
// import Navbar from './components/common/navbar'

import Home from './pages/user/Home'
import TutorProfile from './pages/tutor/TutorProfile'
import TutorOnBoard from './components/tutors/tutorOnBoard'
import Sidebar from './components/admin/AdminHome'
import AdminHome from './components/admin/AdminHome'
import AdminDash from "./pages/admin/adminDash";
import Navbar from "./pages/user/UserProfile";

function App() {


  return (
    <>
      {/* <Navbar/> */}
      {/* <Home/> */}
      {/* <TutorProfile /> */}
      {/* <Routes>
        <Route path="/" element={ <AdminDash/>} />
      </Routes> */}
      <Navbar />
      {/* <TutorOnBoard/>  */}
     
    </>
  )
}

export default App
