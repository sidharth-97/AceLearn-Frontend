import Navbar from "../../components/common/navbar"
import ScheduleLiveClass from "../../components/tutors/ScheduleLiveClass"
import TutorSidebar from "../../components/tutors/TutorSidebar"

const LiveClassTutor = () => {
  return (
      <div>
          <Navbar/>
          <div className="flex">
              <TutorSidebar/>
          <ScheduleLiveClass/>
          </div>
    </div>
  )
}

export default LiveClassTutor