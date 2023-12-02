import React,{useState} from "react";
import Navbar from "../../components/common/navbar";
import TutorSidebar from "../../components/tutors/TutorSidebar";
import TutorSchedule from "../../components/tutors/TutorSchedule";
import TutorScheduleCalender from "../../components/tutors/TutorScheduleCalender";

const TutorSchedulePage = () => {
  const [change,setChange]=useState(false)
  return (
    <div>
      <Navbar />
      <div className="flex">
        <TutorSidebar />

        <div className="flex">
          <div className="flex-grow">
            <TutorScheduleCalender setChange={setChange} />
          </div>
          <div className="h-3/4 border-l border-gray-300 mx-4"></div>
          {/* Right Segment */}
          <div className="flex-grow">
            <TutorSchedule change={ change} setChange={ setChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSchedulePage;
