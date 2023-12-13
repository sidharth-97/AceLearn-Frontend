import { useState } from "react"
import Navbar from "../../components/common/navbar"
import LiveClassHome from "../../components/tutors/LiveClassHome"
import ScheduleLiveClass from "../../components/tutors/ScheduleLiveClass"
import TutorSidebar from "../../components/tutors/TutorSidebar"

const LiveClassTutor = () => {
  const [toggle,setToggle]=useState(false)
  return (
      <div>
          <Navbar/>
          <div className="flex">
              <TutorSidebar/>
        {toggle && <ScheduleLiveClass toggle={ setToggle} />}
      {!toggle &&  <LiveClassHome toggle={setToggle } />}
          </div>
    </div>
  )
}

export default LiveClassTutor