
import './App.css'
import Navbar from './components/common/navbar'

import Home from './pages/user/Home'
import TutorProfile from './pages/tutor/TutorProfile'
import TutorOnBoard from './components/tutors/tutorOnBoard'

function App() {


  return (
    <>
      <Navbar/>
      {/* <Home/> */}
      {/* <TutorProfile /> */}
      <TutorOnBoard/>
    </>
  )
}

export default App
